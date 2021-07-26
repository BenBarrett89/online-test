const initValidateCity = require('../../../../src/validation/users/validateCity')

const cities = {
  Atlantis: {
    fictional: true,
    underwater: true
  },
  "R'lyeh": {
    fictional: true,
    underwater: true
  }
}
const cityNotRecognisedError = {
  title: 'City not recognised',
  description: 'Please only call with cities that we know about and have coordinates for'
}
const constants = {
  errors: {
    cityNotRecognised: cityNotRecognisedError
  }
}

const validateCity = initValidateCity({ cities, constants })

describe('validation/users/validateCity', () => {
  it('should do nothing (other than call next) when no city is passed as a parameter', () => {
    const req = { query: { otherStuff: true } }
    const next = sinon.spy()

    validateCity(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should do nothing when the city is a recognised city', () => {
    const req = { query: { city: 'Atlantis' } }
    const next = sinon.spy()

    validateCity(req, undefined, next)

    assert.notProperty(req, 'validationErrors', 'A validation error was added when it was not expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when the city is not a recognised city (no previous errors)', () => {
    const req = { query: { city: 'Avalon' } }
    const next = sinon.spy()

    const expectedValidationErrors = [cityNotRecognisedError]

    validateCity(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was added when it was not expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
  it('should add a validation error when the city is not a recognised city (previous errors)', () => {
    const existingError = { title: 'I am an error', description: 'I have been described as one anyhow' }
    const existingValidationErrors = [existingError]
    const req = { query: { city: 'Springfield' }, validationErrors: existingValidationErrors }
    const next = sinon.spy()

    const expectedValidationErrors = [existingError, cityNotRecognisedError]

    validateCity(req, undefined, next)

    assert.deepEqual(req.validationErrors, expectedValidationErrors, 'A validation error was added when it was not expected to be')
    assert.isTrue(next.called, 'next was not called when it was expected to be')
  })
})
