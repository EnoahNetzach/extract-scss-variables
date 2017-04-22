// @flow

import type { ruleType } from '../utils/rule.type'

import quoteEscapeToken from '../utils/quoteEscapeToken'

export default (rule: ruleType) => ({
  value: typeof rule.value === 'string'
    ? rule.value.replace(new RegExp(`^${quoteEscapeToken}`), '').replace(new RegExp(`${quoteEscapeToken}$`), '')
    : rule.value,
  variable: rule.variable,
})
