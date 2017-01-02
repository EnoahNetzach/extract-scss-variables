// @flow

const unwrap = require('../unwrap')

describe('Compiler', () => {
  describe('unwrap', () => {
    it('unwraps a valid rule', () => {
      const text = '#extract-scss-values-test-class.rule-variable { content: "rule value"; }'

      expect(unwrap(text)).toEqual({
        value: 'rule value',
        variable: 'rule-variable',
      })
    })

    it('throws if it is not a declaration', () => {
      const text = 'this is not a rule'

      expect(() => unwrap(text)).toThrowError(/Error while unwrapping rule:\n\t/)
    })
  })
})
