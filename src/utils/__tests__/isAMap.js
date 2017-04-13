// @flow

const isAMap = require('../isAMap')

describe('Parser', () => {
  describe('isAMap', () => {
    it('is false when it is not a map', () => {
      const text = 'this is not a map'
      expect(isAMap(text)).toBeFalsy()
    })

    it('is true when it is a map', () => {
      const text = '(this: is, a: map)'
      expect(isAMap(text)).toBeTruthy()
    })
  })
})
