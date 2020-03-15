# Ng Test Task (CI build simulation)

### Task description

The assignment is to simulate a CI/CD build progress view.
During a build execution the logs of the build are reported back to CI/CD and pushed to the UI using websockets.

The task will be to take a full log of a completed build (attached in the email) and present them in the UI.

The progress json contains a well defined structure for each step.

Deliverables:
1. A full working application
2. Simulation of the logs as if they were received during runtime and not at once as in the attached file
3. Repository with source code
4. README file with explanation of how to launch the application

Please put attention to the following:
- the correct design of the components
- the progress view should get a steam of data and handle it (it should not matter from where the stream itself comes from)

### Run instructions:

- clone repository
- run `npm install`
- run backend `npm run start:api`
- run frontend `npm run start`

### TODO:

- [x] Move components animations to separate files
- [x] Cover AppComponent code with comments
- [ ] Cover BuildProgressService code with comments
- [ ] Cover components/pipes code with comments
- [ ] Cover all components pipes with unit tests
- [ ] Cover all services with units tests
- [ ] Cover application with e2e tests
- [ ] Do more manual crossbrowser testing 
- [x] Implement autoscroll for build details output pane

### FIX:

- [x] AppComponent.buildLog$ should be refreshed after build restart
