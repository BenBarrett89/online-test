module.exports = ({ constants }) => (req, res, next) => {
  // !== undefined used as 0 is falsy but a valid value for latitude and longitude
  const queryCombinationValid =
    (req.query.city && !(req.query.latitude !== undefined || req.query.longitude !== undefined)) ||
    ((req.query.latitude !== undefined && req.query.longitude !== undefined) && !req.query.city)
  if (!queryCombinationValid) {
    const invalidQueryCombinationError = Object.assign({}, constants.errors.invalidQueryCombination)

    req.validationErrors = req.validationErrors
      ? req.validationErrors.concat([invalidQueryCombinationError])
      : [invalidQueryCombinationError]
  }
  next()
}
