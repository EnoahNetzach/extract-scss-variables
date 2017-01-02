const idOp = require('../idOp')

describe('Utils', () => {
  describe('idOp', () => {
    it('returns the argument', () => {
      const a = {}
      expect(idOp(a)).toBe(a)
    })
  })
})
