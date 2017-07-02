# contributing

Information for those wishing to make contributions to this project

## communication

This project uses [**Gitter**](https://gitter.im) for communication and discussion.

Feel free to join the [`ghosts-of-denth/Lobby`](https://gitter.im/ghosts-of-denth/Lobby) room.

## issue tracker

This project's GitHub issue tracker is used to collect and track bugs, enhancements, and questions/discussions.

If you find a bug in this project, please open an issue for it. Likewise, if you'd like to request an enhancement, ask a question, or initiate a discussion, please open an issue.

## pull requests

Pull Requests are more than welcome!

Please read through this entire contributing document before creating a Pull Request, and make sure to track and groom what you will be contributing within the issue tracker - this will greatly improve the chance that your hard work will be accepted.

Create a separate branch for your changes, and avoid developing on master in order to give yourself the most flexibility. Limit the scope of your contribution to a single fix or feature and avoid excessive or superfluous commits, like merge commits. Rebae and squash your commits in order to improve readability. Minimalism is greatly appreciated.

This project follows [**Test Driven Development (TDD)**](https://en.wikipedia.org/wiki/Test-driven_development) - please familiarize yourself with this technique, if needed. Contributors are expected to write tests before writing any code, and near perfect code coverage (~100%) is expected.

If you need help making your contribution, please reach out to the maintainers - we would love to help with whatever you need!

## continuous integration

This project uses [**TravisCI**](https://travis-ci.org/) for Continuous Integration.

All Pull Requests will be automatically built by TravisCI, and the results will be reported back to GitHub. Pull Requests will not be accepted unless they have been built successfully. Any pushes/merges to master will also be built.

The TravisCI configuration is located in [`.travis.yml`](.travis.yml).

## linting

This project uses [`eslint`](https://github.com/eslint/eslint) for linting.

To lint the project:
```bash
npm run lint
```

The eslint configuration is located in [`.eslintrc.yml`](.eslintrc.yml)

## testing

This project uses the [`mocha`](https://github.com/mochajs/mocha) testing framework, [`sinon`](https://github.com/sinonjs/sinon) for mocking, and [`istanbul`](https://github.com/gotwarlost/istanbul) for capturing code coverage.

To run the project's tests:
```bash
npm test
```
