## @lan-monitor/client

## Table of Contents
  - [Installation + Usage](#usage)
  - [Scripts](#scripts)

### <a name="usage"></a> Installation and Usage
The LAN Monitor project is housed in a mono-repo architecture. To properly initialize the project, see the README in the repository root (at scope `@lan-monitor/root`)


### <a name="scripts"></a> Package Scripts
If you are contributing, it is recommended that you initialize the dev environment via the root scope, as aforementioned.
Nevertheless, follows are the scoped scripts:

#### Serve w/ HMR (dev)
```
npm|yarn run serve
```

#### Serve w/ HMR Enabled on Webpack Config (dev)
This command watches the Vue config for changes so you don't need to recompile upon changes:

```
npm|yarn run serve:watch
```

#### Compile, Minify Build (prod)
```
npm|yarn run build
```

#### Lint Files (no auto-fix)
```
npm|yarn run lint
```

#### Lint and Auto-fix Files
```
npm|yarn run lint:fix
```

#### Inspect Current Environment and Node Proc
```
npm|yarn run env:inspect
```
