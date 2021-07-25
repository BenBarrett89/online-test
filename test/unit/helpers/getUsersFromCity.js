const constants = require('../../../src/constants')
const initGetUsersFromCity = require('../../../src/helpers/getUsersFromCity')

describe('helpers/getUsersFromCity', () => {
  it('should get the users associated to a city by calling the upstream API', async () => {
    const getStub = sinon.stub()
    const axios = {
      get: getStub
    }

    const data = [
      {
        id: 88,
        name: 'Some city user'
      },
      {
        id: 89,
        name: 'Some other city user'
      }
    ]

    const response = {
      data
    }

    const cityName = 'Springfield'

    getStub
      .withArgs(`${constants.upstream.base}${constants.upstream.routes.cities.replace(constants.upstream.keys.city, cityName)}`)
      .resolves(response)

    const getUsersFromCity = initGetUsersFromCity({ axios, constants })

    const expectedResult = data

    const result = await getUsersFromCity({ cityName })

    assert.deepEqual(result, expectedResult, 'result was not as expected')
  })
})
