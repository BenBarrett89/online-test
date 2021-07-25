module.exports = ({
  cities,
  constants,
  findUsersWithinRadius,
  getUsersFromCity,
  logger,
  sortById
}) => async (req, res) => {
  try {
    const city = req.query.city ? cities[req.query.city] : undefined
    const latitude = city ? city.latitude : req.query.latitude
    const longitude = city ? city.longitude : req.query.longitude
    const radius = req.query.radius

    const usersFromCity = city ? await getUsersFromCity({ cityName: req.query.city }) : []
    const usersWithinRadius = await findUsersWithinRadius({ latitude, longitude, radius })

    const users = new Set([...usersFromCity, ...usersWithinRadius])

    res
      .status(constants.server.responseCodes.success)
      .send([...users].sort(sortById))
  } catch (error) {
    logger.error(error)
    res
      .status(constants.server.responseCodes.error)
      .send(constants.errors.internalServerError)
  }
}
