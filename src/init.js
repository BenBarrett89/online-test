module.exports = ({
  axios,
  bunyan,
  constants,
  data,
  exit,
  express,
  handlers,
  helpers,
  routing
}) => {
  const app = express()

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
    startMessage: constants.log.messages.startMessage
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

  routing({
    app,
    configuration: constants.routing,
    handlers: initialisedHandlers
  })

  return startServer
}
