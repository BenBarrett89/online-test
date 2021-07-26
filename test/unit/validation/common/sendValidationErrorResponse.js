const constants = require('../../../../src/constants')
const initSendValidationErrorResponse = require('../../../../src/validation/common/sendValidationErrorResponse')

const sendValidationErrorResponse = initSendValidationErrorResponse({ constants })

const sandbox = sinon.createSandbox()

describe('validation/common/sendValidationErrorResponse', () => {
  let req, res, next, status, send

  beforeEach(() => {
    status = sinon.stub()
    send = sinon.spy()

    req = {}
    res = {
      send,
      status
    }

    status.returns(res)

    next = sinon.spy()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should send the validation errors when there are some', () => {
    const validationErrors = [{ title: 'Validation Error' }]
    req.validationErrors = validationErrors

    sendValidationErrorResponse(req, res, next)

    assert.deepEqual(status.firstCall.args[0], constants.server.responseCodes.clientError, 'status called with unexpected parameters')
    assert.deepEqual(send.firstCall.args[0], { errors: validationErrors }, 'send called with unexpected parameters')
    assert.isFalse(next.called, 'next was called when it was not expected to be')
  })
  it('should go to the next callback when there are no validation errors', () => {
    sendValidationErrorResponse(req, res, next)

    assert.isFalse(status.called, 'status was called when it was not expected to be')
    assert.isFalse(send.called, 'send was called when it was not expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
})
