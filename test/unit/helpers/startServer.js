const initStartServer = require('../../../src/helpers/startServer')

const sandbox = sinon.createSandbox()

describe('helpers/startServer', () => {
  let appMock, exitSpy, listenStub, logErrorSpy, logInfoSpy, logMock

  const port = 6666
  const host = 'host.com'
  const startMessage = 'START'

  beforeEach(() => {
    // stubs
    listenStub = sandbox.stub()
    listenStub.withArgs(port, host).returns(undefined)
    listenStub.returns(Error('app.listen called with unexpected parameters'))

    // spies
    exitSpy = sandbox.spy()
    logInfoSpy = sandbox.spy()
    logErrorSpy = sandbox.spy()

    // mocks
    appMock = {
      listen: listenStub
    }
    logMock = {
      error: logErrorSpy,
      info: logInfoSpy
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should start the server on the provided host and port and log the start', () => {
    const startServer = initStartServer({
      app: appMock,
      exit: exitSpy,
      port,
      host,
      log: logMock,
      startMessage
    })

    startServer()

    assert.isTrue(
      listenStub.calledOnceWith(port, host),
      'app.listen not called with expected parameters'
    )
    assert.isTrue(
      logInfoSpy.calledOnceWith(startMessage, `${host}:${port}`),
      'log.info not called with expected parameters'
    )
    assert.isTrue(logErrorSpy.notCalled, 'log.error called when not expected')
    assert.isTrue(exitSpy.notCalled, 'exit called when not expected')
  })
  it('should catch and error during start up, log the error and exit', () => {
    const error = new Error('I am an error')
    listenStub.withArgs(port, host).throws(error)

    const startServer = initStartServer({
      app: appMock,
      exit: exitSpy,
      port,
      host,
      log: logMock,
      startMessage
    })

    startServer()

    assert.isTrue(
      listenStub.calledOnceWith(port, host),
      'app.listen not called with expected parameters'
    )
    assert.isTrue(logInfoSpy.notCalled, 'log.info called when not expected')
    assert.isTrue(
      logErrorSpy.calledOnceWith(error),
      'log.error not called with expected parameters'
    )
    assert.isTrue(exitSpy.calledOnce, 'exit not called')
  })
})
