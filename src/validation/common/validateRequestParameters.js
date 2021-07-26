module.exports = ({ constants, routeName }) => (req, res, next) => {
  const missingMandatoryQuery = constants.validation[routeName].mandatoryQuery
    .reduce((missing, param) => {
      const paramPresent = Object.keys(req.query).includes(param)
      return paramPresent ? missing : missing.concat(param)
    }, [])
  if (missingMandatoryQuery.length) {
    const missingMandatoryQueryError = Object.assign({}, constants.errors.missingMandatoryQuery)
    missingMandatoryQueryError.description =
      missingMandatoryQueryError.description + missingMandatoryQuery.join(', ')

    req.validationErrors = req.validationErrors
      ? req.validationErrors.concat([missingMandatoryQueryError])
      : [missingMandatoryQueryError]
  }
  next()
}
