module.exports = ({ axios, constants }) => async () => {
  const response = await axios.get(`${constants.upstream.base}${constants.upstream.routes.users}`)
  return response.data
}
