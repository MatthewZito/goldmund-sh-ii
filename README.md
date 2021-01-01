## @lan-monitor
LAN Monitor is a user interface for monitoring and administrating your local network.

## Table of Contents
  - [Packages](#pkg)
  - [Installation + Usage](#usage)
  - [Scripts](#scripts)

### <a name="pkg"></a> Packages

  - [@lan-monitor/client]() Vue user interface for LAN monitoring and management
  - [@lan-monitor/api]() Node API for routing and interfacing with UNIX processes

### <a name="usage"></a> Installation and Usage
The LAN Monitor project is housed in a mono-repo architecture. To properly initialize the project, from the repository root (here):

  1. Install Lerna globally `npm i -g lerna | yarn add -g lerna`
    *  a. Optionally, you can use npx - just prefix all lerna commands with `npx <cmd>`
  1. Install dependencies and symlink: `lerna run bootstrap`
  2. Initialize required services: `lerna run serve:watch`

### <a name="scripts"></a> Scripts

#### Serve w/ full HMR Config (dev)
```
lerna run serve:watch --stream
```

OR

Serve w/bash script
1. Add execute permissions: `chmod -R u+x scripts/`
2. `./scripts/serve.sh`

#### Lint Files (no auto-fix)
```
lerna run lint
```

#### Lint and Auto-fix Files
```
lerna run lint:fix
```

#### Inspect Current Environment and Node Processes
```
lerna run env:inspect
```
