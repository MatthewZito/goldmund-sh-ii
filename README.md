## @lan-monitor
LAN Monitor is a user interface for monitoring and administrating your local network.

## Table of Contents
  - [Packages](#pkg)
  - [Installation + Usage](#usage)
  - [Scripts](#scripts)
  - [FAQ](#faq)

### <a name="pkg"></a> Packages

  - [@lan-monitor/client] Vue user interface for LAN monitoring and management
  - [@lan-monitor/api] Node API for routing and interfacing with UNIX processes

### <a name="usage"></a> Installation and Usage
The LAN Monitor project is housed in a mono-repo architecture. To properly initialize the project, from the repository root (here):

  1. Install Lerna globally `npm i -g lerna | yarn add -g lerna`
     a. Optionally, you can use npx - just prefix all lerna commands with `npx <cmd>`
  2. Install dependencies and symlink: `lerna run bootstrap`
  3. Initialize required services: `lerna run serve:watch`

### <a name="scripts"></a> Package Scripts

#### Serve w/ full HMR Config (dev)
```
lerna run serve:watch
```

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

### <a name="faq"></a> FAQ

#### Why Yarn?
Because Yarn's Workspaces feature has more mature integration with Lerna at this time. NPM 7 has introduced Workspaces, but this feature is not as battle-tested.

#### Why a Mono-Repo?
I find them fascinating and in many instances useful; it's a personal choice of dabbling in this curiosity. Another way to do this would be to integrate the services with Docker (which I may yet do at some point in the future), leverage git subtrees and/or submodules, or to utilize the 'concurrently' package at the root level of the repository to simply execute dev and build scripts in parallel. Any of these options would suffice.

This project is largely intended to be an enterprise Vue example, as well; there's an ample amount of Vue projects across public repositories that don't necessarily reflect how the framework might be used in an enterprise production setting. This project aims to remedy that.
