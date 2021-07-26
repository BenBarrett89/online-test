const constants = require('../../src/constants')
const routing = require('../../src/routing')

describe('./routing', () => {
  it('should set up the routes with their handlers', () => {
    const allSpy = sinon.spy()
    const getSpy = sinon.spy()
    const routeStub = sinon.stub()

    const routerMock = {
      all: allSpy,
      get: getSpy,
      route: routeStub
    }

    routeStub.returns(routerMock)

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

    routing({ router: routerMock, configuration: constants.routing, handlers, validation })

    assert.isTrue(routeStub.calledWith(constants.routing.cities.route))
    assert.isTrue(routeStub.calledWith(constants.routing.users.route))
    assert.isTrue(routeStub.calledWith(constants.routing.unknown.route))
    assert.isTrue(getSpy.calledWith(citiesHandler))
    assert.isTrue(getSpy.calledWith(
      validateRequestParameters,
      validateQueryCombination,
      validateLatitudeWithinBounds,
      validateLongitudeWithinBounds,
      validateRadiusWithinBounds,
      validateCity,
      sendValidationErrorResponse,
      usersHandler
    ))
    assert.isTrue(allSpy.calledWith(notFoundHandler))
  })
})
