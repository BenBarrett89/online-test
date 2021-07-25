const constants = require('../../../src/constants')
const initUsersHandler = require('../../../src/handlers/usersHandler')
const sortById = require('../../../src/helpers/sortById')

const sandbox = sinon.createSandbox()

describe('handlers/usersHandler', () => {
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
  const queryCity = "R'lyeh"
  const queryRadius = 50
  const queryLatitude = 41
  const queryLongitude = 77
  const cityUser1 = {
    id: 1,
    name: 'Cthulhu, High Priest of the Great Old Ones'
  }
  const cityUser2 = {
    id: 9000,
    name: 'Francis Wayland Thurston'
  }
  const usersFromCity = [cityUser1, cityUser2]
  const radiusUser1 = {
    id: 2,
    name: 'George Gammell Angell'
  }
  const radiusUser2 = {
    id: 9001,
    name: 'John Raymond Legrasse'
  }
  const usersFromRadius = [radiusUser1, radiusUser2]
  const radiusLatLongUser1 = {
    id: 77,
    name: 'Luka Dončić'
  }
  const radiusLatLongUser2 = {
    id: 41,
    name: 'Dirk Nowitzki'
  }
  const usersFromRadiusLatLong = [radiusLatLongUser1, radiusLatLongUser2]

  let errorStub, logger, getUsersFromCity, findUsersWithinRadius, resMock, statusStub, sendStub

  beforeEach(() => {
    sendStub = sandbox.stub()
    statusStub = sandbox.stub()

    resMock = {
      status: statusStub,
      send: sendStub
    }

    statusStub
      .returns(resMock)

    errorStub = sandbox.stub()
    logger = {
      error: errorStub
    }

    getUsersFromCity = sandbox.stub()
    findUsersWithinRadius = sandbox.stub()

    getUsersFromCity
      .withArgs({ cityName: queryCity })
      .resolves(usersFromCity)
    getUsersFromCity
      .rejects(new Error('getUsersFromCity called with unexpected parameters'))

    findUsersWithinRadius
      .withArgs({ latitude: 1, longitude: 1, radius: queryRadius })
      .resolves(usersFromRadius)
    findUsersWithinRadius
      .withArgs({ latitude: queryLatitude, longitude: queryLongitude, radius: queryRadius })
      .resolves(usersFromRadiusLatLong)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return users in a city and within a given radius sorted by ID', async () => {
    const usersHandler = initUsersHandler({
      cities,
      constants,
      findUsersWithinRadius,
      getUsersFromCity,
      logger,
      sortById
    })

    const req = {
      query: {
        city: queryCity,
        radius: queryRadius
      }
    }

    const expectedResult = [cityUser1, radiusUser1, cityUser2, radiusUser2]

    await usersHandler(req, resMock)

    assert.deepEqual(statusStub.firstCall.args[0], constants.server.responseCodes.success, 'res.status called with unexpected parameters')
    assert.deepEqual(sendStub.firstCall.args[0], expectedResult, 'res.send called with unexpected parameters')
    assert.isFalse(errorStub.called, 'logger.error called when it was not expected to be')
  })
  it('should return users within a given radius of a latitude and longitude', async () => {
    const usersHandler = initUsersHandler({
      cities,
      constants,
      findUsersWithinRadius,
      getUsersFromCity,
      logger,
      sortById
    })

    const req = {
      query: {
        latitude: queryLatitude,
        longitude: queryLongitude,
        radius: queryRadius
      }
    }

    const expectedResult = [radiusLatLongUser2, radiusLatLongUser1]

    await usersHandler(req, resMock)

    assert.deepEqual(statusStub.firstCall.args[0], constants.server.responseCodes.success, 'res.status called with unexpected parameters')
    assert.deepEqual(sendStub.firstCall.args[0], expectedResult, 'res.send called with unexpected parameters')
    assert.isFalse(errorStub.called, 'logger.error called when it was not expected to be')
  })
  it('should return an internal server error message if something goes wrong', async () => {
    getUsersFromCity.reset()
    const error = new Error('Error wants to battle!')
    getUsersFromCity.rejects(error)

    const usersHandler = initUsersHandler({
      cities,
      constants,
      findUsersWithinRadius,
      getUsersFromCity,
      logger,
      sortById
    })

    const req = {
      query: {
        city: queryCity,
        radius: queryRadius
      }
    }

    await usersHandler(req, resMock)

    assert.isTrue(errorStub.called, 'logger.error not called when it was expected to be')
    assert.deepEqual(errorStub.firstCall.args[0], error, 'logger.error not called with the expected error')
    assert.deepEqual(statusStub.firstCall.args[0], constants.server.responseCodes.error, 'res.status called with unexpected parameters')
    assert.deepEqual(sendStub.firstCall.args[0], constants.errors.internalServerError, 'res.send called with unexpected parameters')
  })
})
