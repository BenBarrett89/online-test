const cities = require('../../../src/data/cities')

describe('data/cities', () => {
  it('should exist and be a non-empty object', () => {
    assert.exists(cities)
    assert.isAbove(Object.keys(cities).length, 0)
  })
})
