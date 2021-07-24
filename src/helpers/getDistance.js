module.exports = ({ constants }) => ({ source, destination }) => {
  // use the Haversine formula (see https://en.wikipedia.org/wiki/Haversine_formula) to calculate the distance between the coordinates in meters
  const sourceLatitude = source.latitude * constants.degreesToRadiansFactor
  const destinationLatitude = destination.latitude * constants.degreesToRadiansFactor
  const differenceInLatitude = (destination.latitude - source.latitude) * constants.degreesToRadiansFactor
  const differenceInLongitude = (destination.longitude - source.longitude) * constants.degreesToRadiansFactor

  const distanceInKilometers =
    2 * constants.earthRadius *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(differenceInLatitude / 2), 2) +
        Math.cos(sourceLatitude) * Math.cos(destinationLatitude) *
        Math.pow(Math.sin(differenceInLongitude / 2), 2)
      )
    )

  // convert the distance in kilometers to miles to return
  return distanceInKilometers * constants.milesInKilometer
}
