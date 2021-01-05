## @vue-forum/client

## Table of Contents
  - [Installation + Usage](#usage)

### <a name="usage"></a> Installation and Usage
The Vue Forum project is housed in a mono-repo architecture. To properly initialize the project, see the README in the repository root (at scope `@vue-forum/root`)

### Development Notes

#### Aliasing Paths
If you alias a new path, you **must** add it to the module-alias config in the package.json. If you do not, the transpiled JavaScript code will not be able to resolve the alias!
