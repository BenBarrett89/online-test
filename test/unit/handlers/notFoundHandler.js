const constants = require('../../../src/constants')
const initNotFoundHandler = require('../../../src/handlers/notFoundHandler')

describe('handlers/notFoundHandler', () => {
  it('should return the not found message with the not found status code (404)', () => {
    const notFoundHandler = initNotFoundHandler({ constants })

    const expectedResult = constants.errors.notFound

    const statusStub = sinon.stub()
    const sendStub = sinon.stub()

    const resMock = {
      status: statusStub,
      send: sendStub
    }

    statusStub
      .withArgs(constants.server.responseCodes.notFound)
      .returns(resMock)
    statusStub
      .returns(new Error('res.status called with unexpected parameters'))

    notFoundHandler(undefined, resMock)

    assert.equal(statusStub.firstCall.args[0], constants.server.responseCodes.notFound, 'res.status called with unexpected parameters')
    assert.deepEqual(sendStub.firstCall.args[0], expectedResult, 'res.send called with unexpected parameters')
  })
})
