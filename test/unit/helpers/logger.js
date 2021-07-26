const initLogger = require('../../../src/helpers/logger')

describe('helpers/logger', () => {
  it('should return a logger instance created with the expected parameters', () => {
    const environment = 'test'
    const level = 'warn'
    const name = 'unit-test'
    const serializers = sinon.spy()

    const expectedConfiguration = {
      environment,
      level,
      name,
      serializers
    }

    const expectedResult = {
      expected: true
    }

    const createLoggerStub = sinon.stub()
    createLoggerStub
      .withArgs(expectedConfiguration)
      .returns(expectedResult)
    createLoggerStub
      .returns(new Error('createLoggerStub called with unexpected parameters'))

    const bunyan = {
      createLogger: createLoggerStub,
      stdSerializers: serializers
    }

    const result = initLogger({ bunyan, environment, level, name })

    assert.isTrue(createLoggerStub.calledOnceWith(expectedConfiguration))
    assert.equal(
      result,
      expectedResult,
      'The logger returned was not the expected object'
    )
  })
})
