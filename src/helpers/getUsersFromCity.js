module.exports = ({ axios, constants }) => async ({ cityName }) => {
  const response = await axios.get(`${constants.upstream.base}${constants.upstream.routes.cities.replace(constants.upstream.keys.city, cityName)}`)
  return response.data
}
