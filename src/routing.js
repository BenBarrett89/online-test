module.exports = ({
  router,
  configuration,
  handlers,
  swaggerDocument,
  swaggerUi,
  validation
}) => {
  router.use(configuration.apiDocs.route, swaggerUi.serve)
  router.get(configuration.apiDocs.route, swaggerUi.setup(swaggerDocument))

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
