module.exports = ({ app, configuration, handlers }) => {
  app.route(configuration.cities.route).get(handlers.cities)

  app.route(configuration.users.route).get(handlers.users)

  app.route(configuration.unknown.route).all(handlers.notFound)
}
