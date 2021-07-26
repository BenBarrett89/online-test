const constants = require('../../src/constants')
const routing = require('../../src/routing')

describe('./routing', () => {
  it('should set up the routes with their handlers', () => {
    const allSpy = sinon.spy()
    const getSpy = sinon.spy()
    const useSpy = sinon.spy()
    const routeStub = sinon.stub()

    const routerMock = {
      all: allSpy,
      get: getSpy,
      route: routeStub,
      use: useSpy
    }

    routeStub.returns(routerMock)

    const swaggerDocument = { rawDocument: true }
    const setupSwagger = { setup: true }

    const serveMock = { serve: true }
    const setupStub = sinon.stub()
    setupStub
      .withArgs(swaggerDocument)
      .returns(setupSwagger)

    const swaggerUiMock = {
      serve: serveMock,
      setup: setupStub
    }

    const citiesHandler = sinon.spy()
    const notFoundHandler = sinon.spy()
    const usersHandler = sinon.spy()

    const handlers = {
      cities: citiesHandler,
      notFound: notFoundHandler,
      users: usersHandler
    }

    const sendValidationErrorResponse = sinon.spy()
    const validateCity = sinon.spy()
    const validateLatitudeWithinBounds = sinon.spy()
    const validateLongitudeWithinBounds = sinon.spy()
    const validateQueryCombination = sinon.spy()
    const validateRadiusWithinBounds = sinon.spy()
    const validateRequestParameters = sinon.spy()

    const validation = {
      common: {
        sendValidationErrorResponse
      },
      users: {
        validateCity,
        validateLatitudeWithinBounds,
        validateLongitudeWithinBounds,
        validateQueryCombination,
        validateRadiusWithinBounds,
        validateRequestParameters
      }
    }

    routing({
      router: routerMock,
      configuration: constants.routing,
      handlers,
      swaggerDocument,
      swaggerUi: swaggerUiMock,
      validation
    })

    assert.isTrue(routeStub.calledWith(constants.routing.cities.route), 'cities route not configured as expected')
    assert.isTrue(routeStub.calledWith(constants.routing.users.route), 'users route not configured as expected')
    assert.isTrue(routeStub.calledWith(constants.routing.unknown.route), '* route not configured as expected')
    assert.isTrue(getSpy.calledWith(constants.routing.apiDocs.route, setupSwagger), 'apiDoc get not configured as expected')
    assert.isTrue(getSpy.calledWith(citiesHandler), 'cities get not configured as expected')
    assert.isTrue(getSpy.calledWith(
      validateRequestParameters,
      validateQueryCombination,
      validateLatitudeWithinBounds,
      validateLongitudeWithinBounds,
      validateRadiusWithinBounds,
      validateCity,
      sendValidationErrorResponse,
      usersHandler
    ), 'users get not configured as expected')
    assert.isTrue(allSpy.calledWith(notFoundHandler), '* all not configured as expected')
    assert.isTrue(useSpy.calledWith(constants.routing.apiDocs.route, serveMock), 'apiDoc use not configured as expected')
  })
})
