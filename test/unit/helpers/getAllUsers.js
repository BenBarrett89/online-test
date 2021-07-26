const constants = require('../../../src/constants')
const initGetAllUsers = require('../../../src/helpers/getAllUsers')

describe('helpers/getAllUsers', () => {
  it('should get all the users by calling the upstream API', async () => {
    const getStub = sinon.stub()
    const axios = {
      get: getStub
    }

    const data = [
      {
        id: 1,
        name: 'Some user'
      },
      {
        id: 2,
        name: 'Some other user'
      }
    ]

    const response = {
      data
    }

    getStub
      .withArgs(`${constants.upstream.base}${constants.upstream.routes.users}`)
      .resolves(response)

    const getAllUsers = initGetAllUsers({ axios, constants })

    const expectedResult = data

    const result = await getAllUsers()

    assert.deepEqual(result, expectedResult, 'result was not as expected')
  })
})
