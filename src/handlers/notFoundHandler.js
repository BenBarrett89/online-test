module.exports = ({ constants }) => (_, res) => {
  res.status(constants.server.responseCodes.notFound).send(constants.errors.notFound)
}
