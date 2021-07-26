module.exports = ({ constants, query, route }) => (req, res, next) => {
  const parameter = req.query[query]
  if (parameter) {
    const bounds = constants.validation[route].bounds[query]
    const withinBounds = bounds.lower <= parameter && bounds.upper >= parameter
    if (!withinBounds) {
      const queryParameterOutOfBoundsError = Object.assign({}, constants.errors.queryParameterOutOfBounds)
      queryParameterOutOfBoundsError.description =
        `Query parameter '${query}' with value of ${parameter} was not within the expected bounds (between ${bounds.lower} and ${bounds.upper})`

      const validationErrors = req.validationErrors

      req.validationErrors = validationErrors
        ? validationErrors.concat([queryParameterOutOfBoundsError])
        : [queryParameterOutOfBoundsError]
    }
  }
  next()
}
