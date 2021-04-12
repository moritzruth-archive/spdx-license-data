import { Octokit } from "@octokit/rest"
import fs from "fs-extra"
import fetch from "node-fetch"
import * as pathLib from "path";
import { fileURLToPath } from "url";
import grayMatter from "gray-matter"

const resolvePath = (...parts) => pathLib.resolve(pathLib.dirname(fileURLToPath(import.meta.url)), ...parts)

await fs.rmdir(resolvePath("data"), { recursive: true })
await fs.mkdirs(resolvePath("data/licenses"))

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

console.log("Getting license file names from choosealicense.com repository")

const calNames = (await octokit.rest.repos.getContent({
  owner: "github",
  repo: "choosealicense.com",
  path: "_licenses"
})).data.map(file => file.name.slice(0, -4))

console.log("Fetching license data")

const licenses = await Promise.all(calNames.map(async name => {
  const calRaw = await fetch(`https://raw.githubusercontent.com/github/choosealicense.com/gh-pages/_licenses/${name}.txt`).then(response => response.text())

  const calParsed = grayMatter(calRaw, {
    language: "yaml"
  })

  const id = calParsed.data["spdx-id"]

  const spdxData = await fetch(`https://raw.githubusercontent.com/spdx/license-list-data/master/json/details/${id}.json`).then(response => response.json())

  return {
    id,
    title: calParsed.data.title,
    description: calParsed.data.description,
    howToUse: calParsed.data.how,
    isOsiApproved: Boolean(spdxData.isOsiApproved),
    isFsfLibre: Boolean(spdxData.isFsfLibre),
    permissions: calParsed.data.permissions,
    conditions: calParsed.data.conditions,
    limitations: calParsed.data.limitations,
    note: calParsed.data.note,
    text: calParsed.content
  }
}))

console.log("Writing license-ids.json")
await fs.writeJSON(resolvePath("data/license-ids.json"), licenses.map(license => license.id))

console.log("Writing licenses.json")
await fs.writeJSON(resolvePath("data/licenses.json"), licenses.map(license => ({
  ...license,
  text: undefined
})))

console.log("Writing licenses.full.json")
await fs.writeJSON(resolvePath("data/licenses.full.json"), licenses)

console.log("Writing license files")
await Promise.all(licenses.map(async license => {
  await fs.writeJSON(resolvePath(`data/licenses/${license.id}.json`), {
    ...license,
    text: undefined
  })

  await fs.writeJSON(resolvePath(`data/licenses/${license.id}.full.json`), license)
  await fs.writeJSON(resolvePath(`data/licenses/${license.id}.txt`), license.text)
}))
