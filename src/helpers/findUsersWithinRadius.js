module.exports = ({ getAllUsers, getDistance }) => async ({ latitude, longitude, radius }) => {
  const source = { latitude, longitude }
  const allUsers = await getAllUsers()
  return allUsers.reduce((returnArray, user) => {
    const destination = { latitude: user.latitude, longitude: user.longitude }
    const distance = getDistance({ source, destination })
    const withinRadius = distance < radius
    return withinRadius ? returnArray.concat(user) : returnArray
  }, [])
}
