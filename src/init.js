module.exports = ({
  app,
  axios,
  bunyan,
  constants,
  data,
  exit,
  handlers,
  helpers,
  router,
  routing,
  swaggerDocument,
  swaggerUi,
  validation
}) => {
  const logger = helpers.initLogger({
    bunyan,
    environment: constants.log.environment,
    level: constants.log.level,
    name: constants.log.name
  })

  const getAllUsers = helpers.initGetAllUsers({ axios, constants })
  const getDistance = helpers.initGetDistance({ constants: constants.calculation })
  const getUsersFromCity = helpers.initGetUsersFromCity({ axios, constants })

  const findUsersWithinRadius = helpers.initFindUsersWithinRadius({ getAllUsers, getDistance })

  const startServer = helpers.initStartServer({
    app,
    exit,
    port: constants.server.port,
    host: constants.server.host,
    log: logger,
    startMessage: constants.log.messages.serverStart
  })

  const initialisedHandlers = {
    cities: handlers.initCitiesHandler({ constants, cities: data.cities }),
    notFound: handlers.initNotFoundHandler({ constants }),
    users: handlers.initUsersHandler({
      cities: data.cities,
      constants,
      findUsersWithinRadius,
      getUsersFromCity,
      logger,
      sortById: helpers.sortById
    })
  }

  const initialisedValidation = {
    common: {
      sendValidationErrorResponse: validation.common.initSendValidationErrorResponse({ constants })
    },
    users: {
      validateCity: validation.users.initValidateCity({ cities: data.cities, constants }),
      validateLatitudeWithinBounds: validation.common.initValidateQueryWithinBounds({
        constants,
        query: 'latitude',
        route: constants.routing.users.name
      }),
      validateLongitudeWithinBounds: validation.common.initValidateQueryWithinBounds({
        constants,
        query: 'longitude',
        route: constants.routing.users.name
      }),
      validateQueryCombination: validation.users.initValidateQueryCombination({ constants }),
      validateRadiusWithinBounds: validation.common.initValidateQueryWithinBounds({
        constants,
        query: 'radius',
        route: constants.routing.users.name
      }),
      validateRequestParameters: validation.common.initValidateRequestParameters({
        constants,
        routeName: constants.routing.users.name
      })
    }
  }

  routing({
    router,
    configuration: constants.routing,
    handlers: initialisedHandlers,
    swaggerDocument,
    swaggerUi,
    validation: initialisedValidation
  })

  app.use(router)

  return startServer
}
