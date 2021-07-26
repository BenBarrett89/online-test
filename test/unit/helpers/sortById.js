const sortById = require('../../../src/helpers/sortById')

describe('helpers/sortById', () => {
  it('should should sort array items by their numerical ID when used as a sort function', () => {
    const item1 = { id: 5 }
    const item2 = { id: 1 }
    const item3 = { id: 3 }
    const item4 = { id: 2 }
    const item5 = { id: 4 }
    const unsortedArray = [item1, item2, item3, item4, item5]

    const expectedResult = [item2, item4, item3, item5, item1]

    const result = unsortedArray.sort(sortById)

    assert.deepEqual(result, expectedResult, 'result was not as expected')
  })
})
