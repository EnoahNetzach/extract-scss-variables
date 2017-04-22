// @flow

import appendRules from '../appendRules'

describe('Compiler', () => {
  describe('appendRules', () => {
    it('appends a valid rule', () => {
      const rule = { value: 'value', variable: 'variable' }

      expect(appendRules('carry', rule))
        .toEqual('carry\n#extract-scss-values-test-class.variable{content:"#{value}";}')
    })
  })
})
