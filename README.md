## @vue-forum
Vue Forum is a fullstack system template for creating a forum site with Vue.js and Node. The system leverages and demonstrates an enterprise implementation of micro-services, event-streaming, and mono-repo in a cloud-infrastructure.

## Table of Contents
  - [Packages](#pkg)
  - [Installation + Usage](#usage)
  - [Scripts](#scripts)

### <a name="pkg"></a> Packages and Services

  - [@vue-forum/client](https://github.com/MatthewZito/vue-forum/tree/master/packages/client) Vue user interface
  - [@vue-forum/auth](https://github.com/MatthewZito/vue-forum/tree/master/packages/auth) Authentication and user micro-service
  - [@vue-forum/common](https://github.com/MatthewZito/vue-forum/tree/master/packages/common) Transitive utility dependencies consumed by various services

### <a name="usage"></a> Installation and Usage
The Vue Forum project is housed in a mono-repo architecture, orchestrated in a containerized environment. To properly initialize the system, you may run either the docker-compose or kubernetes (skaffold) dev configurations.

Running with Docker Compose:
[See the Docker dev guide]()

Running with kubectl:
[See the Kubernetes dev guide]()

See the [contributing guide]() for more detailed information on how the mono-repo works.

### <a name="scripts"></a> Scripts
These scripts will execute for each applicable package. To run at a specific scope, use Lerna's `exec` or `--scope` subcommands.

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

#### Symlink Transitive Dependencies
```
yarn link
```
