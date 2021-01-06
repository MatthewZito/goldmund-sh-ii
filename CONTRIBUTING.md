## Contributing

Contributions are absolutely welcome. Please file an issue using one of the issue templates if you've suggestions for improvements or new features. Ideally, you will have done this *prior to* submitting a pull request with your contributions.

### Conventions
Follows are the project conventions.

#### Commits
This project observes the [Conventional Commits](https://www.conventionalcommits.org) standard and has automated tooling in place to enforce it. Please do not bypass the commit hooks; your commit will be aborted if it doesn't follow the Conventional Commits standard so you can fix the message.

This may seem strict, but this strategy is used for automating changelogs and semver.

#### Coding Style
Coding style doesn't need to accord to some sort of draconian mandate; do your thing - but I appreciate efforts to keep submissions aligned with the existing work. This helps keep the project neat, organized, and accessible to future contributors.

#### Linting
This project uses [eslint](https://eslint.org/) for linting at each package scope. Lerna is used to hoist shared dependencies and configurations; each package's eslint configuration extends that found at the root level of the repository. Linting rules per-package should be added to that package's scoped eslint config.

Linting is automated using commit hooks that will be installed in the project's `.git` directory when you bootstrap the project dependencies. The pre-commit hook will run each project's lint config, *only if that project has staged changes*.

Please do not bypass the commit hooks; if you are committing a change that warrants bypassing the linting configuration, use an [Eslint magic comment](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments).

#### Testing
A hard requirement for PRs is passing tests. Tests should run automatically for any submodules of the mono-repo that have staged changes; please don't bypass these.

If you are adding a new feature, add tests to support it. If you are changing a feature, ensure the existing tests are still applicable to that feature, and capture the scope of what that feature is doing (and shouldn't be doing).
