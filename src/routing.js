module.exports = ({ app, configuration, handlers }) => {
  app.route(configuration.cities.route).get(handlers.helloWorld)

  app.route(configuration.users.route).get(handlers.helloWorld)

  app.route(configuration.unknown.route).all(handlers.notFound)
}
