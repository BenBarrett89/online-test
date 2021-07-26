module.exports = ({ constants }) => (req, res, next) => {
  if (req.validationErrors) {
    res.status(constants.server.responseCodes.clientError).send({ errors: req.validationErrors })
  } else next()
}
