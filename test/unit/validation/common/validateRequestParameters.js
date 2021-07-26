const initValidateRequestParameters = require('../../../../src/validation/common/validateRequestParameters')

const missingMandatoryQueryError = {
  title: 'Missing mandatory query string parameters',
  description: 'These are the query string parameters missing from the request: '
}
const routeName = 'people'
const constants = {
  errors: {
    missingMandatoryQuery: missingMandatoryQueryError
  },
  validation: {
    [routeName]: {
      mandatoryQuery: ['name', 'dateOfBirth']
    }
  }
}

const validateRequestParameters = initValidateRequestParameters({
  constants,
  routeName
})

describe('validation/common/validateRequestParameters', () => {
  it('should do nothing when all the mandatory request parameters are present in the request (no previous errors)', () => {
    const req = { query: { name: 'Jeff', dateOfBirth: '22 October 1952' } }
    const next = sinon.spy()

    validateRequestParameters(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should do nothing when all the mandatory request parameters are present in the request (previous errors)', () => {
    const existingValidationErrors = [{ error: 'from a previous validation ' }]
    const req = { query: { name: 'Jeff', dateOfBirth: '22 October 1952' }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = [...existingValidationErrors]

    validateRequestParameters(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was added when it was not expected to')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when a mandatory request parameter is missing from the request (no previous errors)', () => {
    const req = { query: { name: 'Jeff' } }
    const next = sinon.spy()

    const expectedValidationErrors = [
      Object.assign({}, missingMandatoryQueryError, {
        description: missingMandatoryQueryError.description + 'dateOfBirth'
      })
    ]

    validateRequestParameters(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when a mandatory request parameter is missing from the request (no previous errors)', () => {
    const existingValidationErrors = [{ error: 'from a previous validation ' }]
    const req = { query: { name: 'Jeff' }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = existingValidationErrors.concat(
      Object.assign({}, missingMandatoryQueryError, {
        description: missingMandatoryQueryError.description + 'dateOfBirth'
      })
    )

    validateRequestParameters(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when multiple mandatory request parameters are missing from the request (no previous errors)', () => {
    const req = { query: { somethingElse: 'huh?' } }
    const next = sinon.spy()

    const expectedValidationErrors = [
      Object.assign({}, missingMandatoryQueryError, {
        description: missingMandatoryQueryError.description + 'name, dateOfBirth'
      })
    ]

    validateRequestParameters(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when multiple mandatory request parameters are missing from the request (previous errors)', () => {
    const existingValidationErrors = [{ error: 'from a previous validation ' }]
    const req = { query: { somethingElse: 'huh?' }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = existingValidationErrors.concat(
      Object.assign({}, missingMandatoryQueryError, {
        description: missingMandatoryQueryError.description + 'name, dateOfBirth'
      })
    )

    validateRequestParameters(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
})
