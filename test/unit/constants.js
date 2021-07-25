const constants = require('../../src/constants')

describe('./constants', () => {
  it('should exist and be a non-empty object', () => {
    assert.exists(constants)
    assert.isAbove(Object.keys(constants).length, 0)
  })
})
