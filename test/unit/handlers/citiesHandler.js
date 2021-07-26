const constants = require('../../../src/constants')
const initCitiesHandler = require('../../../src/handlers/citiesHandler')

describe('handlers/citiesHandler', () => {
  it('should return the cities it was instantiated with formatted as an array', () => {
    const cities = {
      Atlantis: {
        latitude: 0,
        longitude: 0
      },
      "R'lyeh": {
        latitude: 1,
        longitude: 1
      }
    }

    const expectedResult = [
      {
        name: 'Atlantis',
        latitude: 0,
        longitude: 0
      },
      {
        name: "R'lyeh",
        latitude: 1,
        longitude: 1
      }
    ]

    const citiesHandler = initCitiesHandler({ cities, constants })

    const statusStub = sinon.stub()
    const sendSpy = sinon.spy()

    const resMock = {
      status: statusStub,
      send: sendSpy
    }

    statusStub
      .withArgs(constants.server.responseCodes.success)
      .returns(resMock)
    statusStub
      .returns(new Error('res.status called with unexpected parameters'))

    citiesHandler(undefined, resMock)

    assert.equal(statusStub.firstCall.args[0], constants.server.responseCodes.success, 'res.status called with unexpected parameters')
    assert.deepEqual(sendSpy.firstCall.args[0], expectedResult, 'res.send called with unexpected parameters')
  })
})
