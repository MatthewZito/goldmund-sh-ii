## @vue-forum/auth

## Table of Contents
  - [Installation + Usage](#usage)
  - [Dev Notes](#dev)
    + [Aliasing Paths](#alias)
    + [Endpoints](#endpoints)

### <a name="usage"></a> Installation and Usage
The Vue Forum project is housed in a mono-repo architecture. To properly initialize the project, see the README in the repository root (at scope `@vue-forum/root`)

### <a name="dev"></a> Development Notes

#### <a name="alias"></a> Aliasing Paths
If you alias a new path, you **must** add it to the module-alias config in the package.json. If you do not, the transpiled JavaScript code will not be able to resolve the alias!

#### <a name="endpoints"></a> Auth Service Endpoints

Default Port: `5000`
Base Endpoint: `/users`

Register New User: `/users/register`
Login: `/users/login`
Renew Token: `/users/renew`
