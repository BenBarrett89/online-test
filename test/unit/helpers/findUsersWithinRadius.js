const initFindUsersWithinRadius = require('../../../src/helpers/findUsersWithinRadius')

describe('helpers/findUsersWithinRadius', () => {
  it('should filter users returned from getAllUsers to those within the given radius', async () => {
    const latitude = 20
    const longitude = 21
    const source = { latitude, longitude }
    const radius = 9000

    const latInRadius = -10
    const longInRadius = -10
    const latOutOfRadius = 10
    const longOutOfRadius = 10

    const distanceInRadius = radius - 1
    const distanceOutOfRadius = radius + 1

    const user1 = {
      name: 'Aina the End',
      latitude: latOutOfRadius,
      longitude: longOutOfRadius
    }
    const user2 = {
      name: 'Cent Chihiro Chittiii',
      latitude: latInRadius,
      longitude: longInRadius
    }
    const user3 = {
      name: 'Momoko Gumi Company',
      latitude: latOutOfRadius,
      longitude: longOutOfRadius
    }
    const user4 = {
      name: 'Ayuni D',
      latitude: latInRadius,
      longitude: longInRadius
    }
    const allUsers = [user1, user2, user3, user4]

    const getAllUsers = sinon.stub()
    getAllUsers.resolves(allUsers)

    const getDistance = sinon.stub()
    getDistance
      .withArgs({ source, destination: { latitude: latInRadius, longitude: longInRadius } })
      .returns(distanceInRadius)
    getDistance
      .withArgs({ source, destination: { latitude: latOutOfRadius, longitude: longOutOfRadius } })
      .returns(distanceOutOfRadius)

    const expectedResult = [user2, user4]

    const findUsersWithinRadius = initFindUsersWithinRadius({ getAllUsers, getDistance })

    const result = await findUsersWithinRadius({ latitude, longitude, radius })

    assert.deepEqual(result, expectedResult, 'result was not as expected')
  })
})
