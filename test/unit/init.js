const constants = require('../../src/constants')
const init = require('../../src/init')

describe('./init', () => {
  it('should initialise the functions and wire them together before returning the startServer entrypoint function', () => {
    const appUseSpy = sinon.spy()
    const appMock = {
      use: appUseSpy
    }
    const routerMock = { mock: 'express.Router' }

    const axiosMock = { mock: 'axios' }
    const bunyanMock = { mock: 'bunyan' }

    const sortByIdSpy = sinon.spy()

    const dataCitiesMock = { mock: 'data/cities' }
    const dataMock = {
      cities: dataCitiesMock
    }

    const exitSpy = sinon.spy()

    const initLoggerStub = sinon.stub()
    const logger = sinon.spy()
    initLoggerStub
      .withArgs({
        bunyan: bunyanMock,
        environment: constants.log.environment,
        level: constants.log.level,
        name: constants.log.name
      })
      .returns(logger)
    initLoggerStub.throws(new Error('initLogger called with unexpected parameters'))

    const initGetAllUsersStub = sinon.stub()
    const getAllUsers = sinon.spy()
    initGetAllUsersStub
      .withArgs({ axios: axiosMock, constants })
      .returns(getAllUsers)
    initGetAllUsersStub.throws(new Error('initGetAllUsers called with unexpected parameters'))

    const initGetDistanceStub = sinon.stub()
    const getDistance = sinon.spy()
    initGetDistanceStub
      .withArgs({ constants: constants.calculation })
      .returns(getDistance)
    initGetDistanceStub.throws(new Error('initGetDistance called with unexpected parameters'))

    const initGetUsersFromCityStub = sinon.stub()
    const getUsersFromCity = sinon.spy()
    initGetUsersFromCityStub
      .withArgs({ axios: axiosMock, constants })
      .returns(getUsersFromCity)
    initGetUsersFromCityStub.throws(new Error('initGetUsersFromCity called with unexpected parameters'))

    const initFindUsersWithinRadiusStub = sinon.stub()
    const findUsersWithinRadius = sinon.spy()
    initFindUsersWithinRadiusStub
      .withArgs({ getAllUsers, getDistance })
      .returns(findUsersWithinRadius)
    initFindUsersWithinRadiusStub.throws(new Error('initFindUsersWithinRadius called with unexpected parameters'))

    const initCitiesHandlerStub = sinon.stub()
    const citiesHandler = sinon.spy()
    initCitiesHandlerStub
      .withArgs({ constants, cities: dataCitiesMock })
      .returns(citiesHandler)
    initCitiesHandlerStub.throws(new Error('initCitiesHandler called with unexpected parameters'))
    const initNotFoundHandlerStub = sinon.stub()
    const notFoundHandler = sinon.spy()
    initNotFoundHandlerStub
      .withArgs({ constants })
      .returns(notFoundHandler)
    initNotFoundHandlerStub.throws(new Error('initNotFoundHandler called with unexpected parameters'))
    const initUsersHandlerStub = sinon.stub()
    const usersHandler = sinon.spy()
    initUsersHandlerStub
      .withArgs({
        cities: dataCitiesMock,
        constants,
        findUsersWithinRadius,
        getUsersFromCity,
        logger,
        sortById: sortByIdSpy
      })
      .returns(usersHandler)
    initUsersHandlerStub.throws(new Error('initUsersHandler called with unexpected parameters'))

    const initStartServerStub = sinon.stub()
    const startServer = sinon.spy()
    initStartServerStub
      .withArgs({
        app: appMock,
        exit: exitSpy,
        port: constants.server.port,
        host: constants.server.host,
        log: logger,
        startMessage: constants.log.messages.serverStart
      })
      .returns(startServer)
    initStartServerStub.throws(new Error('initStartServer called with unexpected parameters'))

    const initSendValidationErrorResponseStub = sinon.stub()
    const sendValidationErrorResponse = sinon.spy()
    initSendValidationErrorResponseStub
      .withArgs({ constants })
      .returns(sendValidationErrorResponse)
    initSendValidationErrorResponseStub.throws(new Error('initSendValidationErrorResponse called with unexpected parameters'))
    const initValidateQueryWithinBoundsStub = sinon.stub()
    const validateLatitudeWithinBounds = sinon.spy()
    initValidateQueryWithinBoundsStub
      .withArgs({
        constants,
        query: 'latitude',
        route: constants.routing.users.name
      })
      .returns(validateLatitudeWithinBounds)
    const validateLongitudeWithinBounds = sinon.spy()
    initValidateQueryWithinBoundsStub
      .withArgs({
        constants,
        query: 'longitude',
        route: constants.routing.users.name
      })
      .returns(validateLongitudeWithinBounds)
    const validateRadiusWithinBounds = sinon.spy()
    initValidateQueryWithinBoundsStub
      .withArgs({
        constants,
        query: 'radius',
        route: constants.routing.users.name
      })
      .returns(validateRadiusWithinBounds)
    initValidateQueryWithinBoundsStub.throws(new Error('initValidateQueryWithinBounds called with unexpected parameters'))
    const initValidateRequestParametersStub = sinon.stub()
    const validateRequestParameters = sinon.spy()
    initValidateRequestParametersStub
      .withArgs({
        constants,
        routeName: constants.routing.users.name
      })
      .returns(validateRequestParameters)
    initValidateRequestParametersStub.throws(new Error('initValidateRequestParameters called with unexpected parameters'))
    const initValidateCityStub = sinon.stub()
    const validateCity = sinon.spy()
    initValidateCityStub
      .withArgs({ cities: dataCitiesMock, constants })
      .returns(validateCity)
    initValidateCityStub.throws(new Error('initValidateCity called with unexpected parameters'))
    const initValidateQueryCombinationStub = sinon.stub()
    const validateQueryCombination = sinon.spy()
    initValidateQueryCombinationStub
      .withArgs({ constants })
      .returns(validateQueryCombination)
    initValidateQueryCombinationStub.throws(new Error('initValidateQueryCombination called with unexpected parameters'))

    const handlersMock = {
      initCitiesHandler: initCitiesHandlerStub,
      initNotFoundHandler: initNotFoundHandlerStub,
      initUsersHandler: initUsersHandlerStub
    }

    const helpersMock = {
      initFindUsersWithinRadius: initFindUsersWithinRadiusStub,
      initGetAllUsers: initGetAllUsersStub,
      initGetDistance: initGetDistanceStub,
      initGetUsersFromCity: initGetUsersFromCityStub,
      initLogger: initLoggerStub,
      initStartServer: initStartServerStub,
      sortById: sortByIdSpy
    }

    const routingSpy = sinon.spy()

    const validationMock = {
      common: {
        initSendValidationErrorResponse: initSendValidationErrorResponseStub,
        initValidateQueryWithinBounds: initValidateQueryWithinBoundsStub,
        initValidateRequestParameters: initValidateRequestParametersStub
      },
      users: {
        initValidateCity: initValidateCityStub,
        initValidateQueryCombination: initValidateQueryCombinationStub
      }
    }

    const initialisedHandlers = {
      cities: citiesHandler,
      notFound: notFoundHandler,
      users: usersHandler
    }
    const initialisedValidation = {
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
    const expectedRouting = {
      router: routerMock,
      configuration: constants.routing,
      handlers: initialisedHandlers,
      validation: initialisedValidation
    }

    const result = init({
      app: appMock,
      axios: axiosMock,
      bunyan: bunyanMock,
      constants,
      data: dataMock,
      exit: exitSpy,
      handlers: handlersMock,
      helpers: helpersMock,
      routing: routingSpy,
      router: routerMock,
      validation: validationMock
    })

    assert.deepEqual(result, startServer, 'startServer was not returned from the initialisation as expected')
    assert.deepEqual(appUseSpy.firstCall.args[0], routerMock, 'app.use not called with the router')
    assert.deepEqual(routingSpy.firstCall.args[0], expectedRouting, 'routing not called with the expected parameters')
  })
})
