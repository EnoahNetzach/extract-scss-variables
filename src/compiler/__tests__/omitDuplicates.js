// @flow

import omitDuplicates from '../omitDuplicates'

describe('Compiler', () => {
  describe('omitDuplicates', () => {
    it('appends a rule', () => {
      const rule = { value: 'value', variable: 'variable' }

      expect(omitDuplicates({}, rule))
        .toEqual({ variable: 'value' })
    })

    it('omits a duplicate rule', () => {
      const rules = { duplicate: 'value 1' }
      const rule = { value: 'value 2', variable: 'duplicate' }

      expect(omitDuplicates(rules, rule))
        .toEqual({ duplicate: 'value 1' })
    })
  })
})
