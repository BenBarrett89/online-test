const constants = require('../../../src/constants')
const initGetDistance = require('../../../src/helpers/getDistance')

const getDistance = initGetDistance({ constants: constants.calculation })

describe('helpers/getDistance', () => {
  it('should calculate the distance in miles between two given coordinates (large distance)', () => {
    const tokyo = { latitude: 35.689487, longitude: 139.691711 }
    const osaka = { latitude: 34.693737, longitude: 135.502167 }

    const expectedResult = 246.34041823891616

    const result = getDistance({ source: tokyo, destination: osaka })

    assert.equal(result, expectedResult, 'The distance returned was not as expected')
  })
  it('should calculate the distance in miles between two given coordinates (small distance)', () => {
    const hexham = { latitude: 54.970219, longitude: -2.097920 }
    const newcastle = { latitude: 54.978252, longitude: -1.617780 }

    const expectedResult = 19.048355952314438

    const result = getDistance({ source: hexham, destination: newcastle })

    assert.equal(result, expectedResult, 'The distance returned was not as expected')
  })
})
