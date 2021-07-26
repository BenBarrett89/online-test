const initValidateQueryCombination = require('../../../../src/validation/users/validateQueryCombination')

const invalidQueryCombinationError = {
  title: 'Invalid query combination',
  description: 'Please provide a valid combination of query string parameters'
}
const constants = {
  errors: {
    invalidQueryCombination: invalidQueryCombinationError
  }
}

const validateQueryCombination = initValidateQueryCombination({ constants })

describe('validation/users/validateQueryCombination', () => {
  it('should do nothing (other than call next) when the query combination is valid (latitude and longitude without city)', () => {
    const req = { query: { latitude: 0, longitude: 0 } }
    const next = sinon.spy()

    validateQueryCombination(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should do nothing (other than call next) when the query combination is valid (city without latitude and longitude)', () => {
    const req = { query: { city: 'Gotham' } }
    const next = sinon.spy()

    validateQueryCombination(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should add a validation error when city and latitude and longitude are all provided (no previous errors)', () => {
    const req = { query: { latitude: 0, longitude: 0, city: 'Gotham' } }
    const next = sinon.spy()

    const expectedValidationErrors = [invalidQueryCombinationError]

    validateQueryCombination(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should add a validation error when city and latitude and longitude are all provided (previous errors)', () => {
    const previousError = { title: 'Error', description: 'Well that was a mistake' }
    const existingValidationErrors = [previousError]
    const req = { query: { latitude: 0, longitude: 0, city: 'Gotham' }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = [previousError, invalidQueryCombinationError]

    validateQueryCombination(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should add a validation error when latitude is provided without longitude (no previous errors)', () => {
    const req = { query: { latitude: 0 } }
    const next = sinon.spy()

    const expectedValidationErrors = [invalidQueryCombinationError]

    validateQueryCombination(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should add a validation error when latitude is provided without longitude (previous errors)', () => {
    const previousError = { title: 'Error', description: 'Well that was a mistake' }
    const existingValidationErrors = [previousError]
    const req = { query: { latitude: 0 }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = [previousError, invalidQueryCombinationError]

    validateQueryCombination(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should add a validation error when longitude is provided without latitude (no previous errors)', () => {
    const req = { query: { longitude: 0 } }
    const next = sinon.spy()

    const expectedValidationErrors = [invalidQueryCombinationError]

    validateQueryCombination(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
  it('should add a validation error when longitude is provided without latitude (previous errors)', () => {
    const previousError = { title: 'Error', description: 'Well that was a mistake' }
    const existingValidationErrors = [previousError]
    const req = { query: { longitude: 0 }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = [previousError, invalidQueryCombinationError]

    validateQueryCombination(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to have been')
    assert.isTrue(next.called, 'next was not called when it was expected to have been')
  })
})
