const constants = require('../../src/constants')
const routing = require('../../src/routing')

describe('./routing', () => {
  it('should set up the routes with their handlers', () => {
    const allSpy = sinon.spy()
    const getSpy = sinon.spy()
    const routeStub = sinon.stub()

    const appMock = {
      all: allSpy,
      get: getSpy,
      route: routeStub
    }

    routeStub.returns(appMock)

    const helloWorldHandler = sinon.spy()
    const notFoundHandler = sinon.spy()
    const handlers = {
      helloWorld: helloWorldHandler,
      notFound: notFoundHandler
    }

    routing({ app: appMock, configuration: constants.routing, handlers })

    // assert.isTrue(getSpy.calledWith(helloWorldHandler), 'Hello world handler unused')
    // assert.isTrue(allSpy.calledWith(notFoundHandler), 'Not found handler unused')
  })
})
