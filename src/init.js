module.exports = ({
  axios,
  bunyan,
  constants,
  exit,
  express,
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

  const getDistance = helpers.initGetDistance({ constants: constants.calculation })

  const startServer = helpers.initStartServer({
    app,
    exit,
    port: constants.server.port,
    host: constants.server.host,
    log: logger,
    startMessage: constants.log.messages.startMessage
  })

  routing({
    app,
    configuration: constants.routing,
    handlers: {
      helloWorld: (_, res) => res.send('Hello World!'),
      notFound: (_, res) => res.send('Not found!')
    }
  })

  return startServer
}
