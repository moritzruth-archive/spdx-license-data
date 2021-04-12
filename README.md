# spdx-license-data
> Open Source licenses as JSON

The data is automatically fetched from these repositories every day:
- [github/choosealicense.com](https://github.com/github/choosealicense.com)
- [spdx/license-list-data](https://github.com/spdx/license-list-data)

The information is then merged and committed into the repository if changes were made.

## Data
License objects have the following fields:
- `id` — Short identifier specified by [spdx.org/licenses](https://spdx.org/licenses/)
- `title` — The license name specified by [spdx.org/licenses](https://spdx.org/licenses/)
- `description` — A human-readable description of the license
- `howToUse` — Instructions on how to implement the license
- `note` — Additional information about the licenses
- `isOsiApproved` — Whether this license is OSI approved
- `isFsfLibre` — Whether this license complies with [the definition of free software by the FSF](https://www.gnu.org/philosophy/free-sw.html.en)
- `permissions` (array, see below)
- `conditions` (array, see below)
- `limitations` (array, see below)
- `text` — The license text with `[placeholders]`:
    - `[fullname]` - The full name or username of the copyright owner
    - `[login]` - The copyright owner's username
    - `[email]` - The copyright owner's primary email address
    - `[project]` - The project name
    - `[description]` - The description of the project
    - `[year]` - The current year
    - `[projecturl]` - The repository URL or other project website

### Permissions
- `commercial-use` — The software and derivatives may be used for commercial purposes.
- `modifications` — The software may be modified.
- `distribution` — The software may be distributed.
- `private-use` — The software may be used and modified in private.
- `patent-use` — The license provides an express grant of patent rights from contributors.

### Conditions
- `include-copyright` — A copy of the license and copyright notice must be included with the software.
- `include-copyright--source` — A copy of the license and copyright notice must be included with the software in source form, but is not required for binaries.
- `document-changes` — Changes made to the code must be documented.
- `disclose-source` — Source code must be made available when the software is distributed.
- `network-use-disclose` — Users who interact with the software via network are given the right to receive a copy of the source code.
- `same-license` — Modifications must be released under the same license when distributing the software. In some cases a similar or related license may be used.
- `same-license--file` — Modifications of existing files must be released under the same license when distributing the software. In some cases a similar or related license may be used.
- `same-license--library` — Modifications must be released under the same license when distributing the software. In some cases a similar or related license may be used, or this condition may not apply to works that use the software as a library.

### Limitations
- `trademark-use` — The license explicitly states that it does NOT grant trademark rights, even though licenses without such a statement probably do not grant any implicit trademark rights.
- `liability` — The license includes a limitation of liability.
- `patent-use` — The license explicitly states that it does NOT grant any rights in the patents of contributors.
- `warranty` — The license explicitly states that it does NOT provide any warranty.

## Files
All files are located in the [`data`](/data) directory.

- `licenses.json` — An array of all license objects without the `text` field.
- `licenses.full.json` — An array of all license objects.
- `license-names.json` — An array of all license IDs.
- `licenses/[id].json` — The license object for `[id]` without the `text` field.
- `licenses/[id].txt` — The license text for `[id]`.
- `licenses/[id].full.json` — The license object for `[id]`.

They are served under `https://licenses.m0.is`.

Example: To access [data/licenses/0BSD.json](/data/licenses/0BSD.json), use `https://licenses.m0.is/licenses/0BSD.json`

### NPM
![npm](https://img.shields.io/npm/v/spdx-license-data?style=flat-square)

```bash
npm install spdx-license-data
# or
yarn add spdx-license-data
```

Usage:
```js
import licenses from "spdx-license-data"

console.log(`There are ${licenses.length} licenses.`)
console.log(`Title of the AFL-3.0 license: ${licenses.find(license => license.id === "AFL-3.0").title}`)
```

## License
See [`LICENSE`](/LICENSE).
