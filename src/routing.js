module.exports = ({ router, configuration, handlers, validation }) => {
  router.route(configuration.cities.route).get(handlers.cities)

  router.route(configuration.users.route)
    .get(
      validation.users.validateRequestParameters,
      validation.users.validateQueryCombination,
      validation.users.validateLatitudeWithinBounds,
      validation.users.validateLongitudeWithinBounds,
      validation.users.validateRadiusWithinBounds,
      validation.users.validateCity,
      validation.common.sendValidationErrorResponse,
      handlers.users
    )

  router.route(configuration.unknown.route).all(handlers.notFound)
}
