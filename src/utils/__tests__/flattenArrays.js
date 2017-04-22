// @flow

import flattenArrays from '../flattenArrays'

describe('Utils', () => {
  describe('flattenArrays', () => {
    it('concats the a primitive to the carry', () => {
      const carry = [1, 2]
      expect(flattenArrays(carry, 3)).toEqual([1, 2, 3])
    })

    it('concats the an array to the carry', () => {
      const carry = [1, 2]
      expect(flattenArrays(carry, [3, 4])).toEqual([1, 2, 3, 4])
    })
  })
})
