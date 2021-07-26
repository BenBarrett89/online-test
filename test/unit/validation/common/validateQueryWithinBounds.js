const initValidateQueryWithinBounds = require('../../../../src/validation/common/validateQueryWithinBounds')

const query = 'powerLevel'
const route = 'zfighters'
const upperBound = 9000
const lowerBound = 0
const queryParameterOutOfBoundsError = { mock: true }
const constants = {
  errors: {
    queryParameterOutOfBounds: queryParameterOutOfBoundsError
  },
  validation: {
    [route]: {
      bounds: {
        [query]: {
          upper: upperBound,
          lower: lowerBound
        }
      }
    }
  }
}

const validateQueryWithinBounds = initValidateQueryWithinBounds({
  constants,
  query,
  route
})

describe('validation/common/validateQueryWithinBounds', () => {
  it('should do nothing if the query parameter has not been passed (no previous errors)', () => {
    const req = { query: { somethingElse: 'but not the query parameter' } }
    const next = sinon.spy()

    validateQueryWithinBounds(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should do nothing if the query parameter has not been passed (previous errors)', () => {
    const validationErrors = [{ error: 'Existing error' }]
    const req = { query: { somethingElse: 'but not the query parameter' }, validationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = [...validationErrors]

    validateQueryWithinBounds(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was added when it was not expected to')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should do nothing if the query paramter is valid', () => {
    const req = { query: { [query]: (upperBound + lowerBound / 2) } }
    const next = sinon.spy()

    validateQueryWithinBounds(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when the query parameter is below the lower bound (no previous errors)', () => {
    const value = lowerBound - 1
    const req = { query: { [query]: value } }
    const next = sinon.spy()

    const expectedValidationErrors = [
      Object.assign({}, queryParameterOutOfBoundsError, {
        description: `Query parameter '${query}' with value of ${value} was not within the expected bounds (between ${lowerBound} and ${upperBound})`
      })
    ]

    validateQueryWithinBounds(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when the query parameter is below the lower bound (previous errors)', () => {
    const value = lowerBound - 1
    const existingValidationErrors = [{ blah: true }]
    const req = { query: { [query]: value }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = existingValidationErrors.concat(
      Object.assign({}, queryParameterOutOfBoundsError, {
        description: `Query parameter '${query}' with value of ${value} was not within the expected bounds (between ${lowerBound} and ${upperBound})`
      })
    )

    validateQueryWithinBounds(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when the query parameter is above the upper bound (no previous errors)', () => {
    const value = upperBound + 1
    const req = { query: { [query]: value } }
    const next = sinon.spy()

    const expectedValidationErrors = [
      Object.assign({}, queryParameterOutOfBoundsError, {
        description: `Query parameter '${query}' with value of ${value} was not within the expected bounds (between ${lowerBound} and ${upperBound})`
      })
    ]

    validateQueryWithinBounds(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when the query parameter is above the upper bound (previous errors)', () => {
    const value = upperBound + 1
    const existingValidationErrors = [{ blah: true }]
    const req = { query: { [query]: value }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = existingValidationErrors.concat(
      Object.assign({}, queryParameterOutOfBoundsError, {
        description: `Query parameter '${query}' with value of ${value} was not within the expected bounds (between ${lowerBound} and ${upperBound})`
      })
    )

    validateQueryWithinBounds(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was not added when it was expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
})
