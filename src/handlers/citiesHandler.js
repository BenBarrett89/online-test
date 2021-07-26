module.exports = ({ cities, constants }) => {
  const citiesArray = Object.keys(cities).map(cityName =>
    Object.assign({ name: cityName }, cities[cityName])
  )
  return (_, res) => {
    res.status(constants.server.responseCodes.success).send(citiesArray)
  }
}
