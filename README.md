## Enterprise Vue Forum
Vue Forum is a full stack template for creating a real production-grade forum app with Vue.js and Node. The system leverages and demonstrates an enterprise implementation of micro-services, event-streaming, and mono-repo with cloud infrastructure.

## Table of Contents
  - [Packages](#pkg)
  - [Installation + Usage](#usage)
  - [Scripts](#scripts)

### <a name="pkg"></a> Packages and Services
  - [@vue-forum/client](https://github.com/MatthewZito/vue-forum/tree/master/packages/client) Vue user interface
  - [@vue-forum/auth](https://github.com/MatthewZito/vue-forum/tree/master/packages/auth) Authentication and user micro-service
  - [@vue-forum/common](https://github.com/MatthewZito/vue-forum/tree/master/packages/common) Transitive utility dependencies consumed by various services

### <a name="usage"></a> Installation and Usage
The Vue Forum project is housed in a mono-repo architecture, orchestrated in a containerized environment. To properly initialize the system, use either the docker-compose or kubernetes (skaffold) dev configurations.

#### Install
*This section is optional and only required for contributors/dev*

You'll need to install Lerna and Yarn globally if you plan to contribute or develop on top of this project. See the [contributing guide](https://github.com/MatthewZito/vue-forum/blob/master/CONTRIBUTING.md) for more detailed information on how the mono-repo works.

#### Running Locally
**Running with Docker Compose (recommended for development):**
1. [Install Docker](https://docs.docker.com/get-docker/)
2. In the root directory, run `docker-compose up --build`

**Running with kubectl:**

[See the Kubernetes dev guide](https://github.com/MatthewZito/vue-forum/blob/master/docs/k8s_setup.md)

### <a name="scripts"></a>

#### NPM Scripts
These scripts will execute for each applicable package. To run at a specific scope, use Lerna's `exec` or `--scope` subcommands.

##### Lint Files (no auto-fix)
```
lerna run lint
```

##### Lint and Auto-fix Files
```
lerna run lint:fix
```

##### Inspect Current Environment and Node Processes
```
lerna run env:inspect
```

##### Symlink Transitive Dependencies
```
yarn link
```

#### Shell Scripts
You'll need to add execute permissions before running these: `chmod -R u+x scripts/`

##### Build All Required Docker Images
```
./scripts/bootstrap_images.sh
```

##### Remove All Vue-Forum Images
```
./scripts/purge_images.sh
```
