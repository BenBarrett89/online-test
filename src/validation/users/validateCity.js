module.exports = ({ constants, cities }) => (req, res, next) => {
  const city = req.query.city
  if (city) {
    if (!cities[city]) {
      const cityNotRecognisedError = Object.assign({}, constants.errors.cityNotRecognised)

      req.validationErrors = req.validationErrors
        ? req.validationErrors.concat([cityNotRecognisedError])
        : [cityNotRecognisedError]
    }
  }
  next()
}
