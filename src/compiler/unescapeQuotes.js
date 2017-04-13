// @flow

import type { ruleType } from '../utils/rule.type'

const quoteEscapeToken = require('../utils/quoteEscapeToken')

module.exports = (rule: ruleType) => ({
  value: typeof rule.value === 'string'
    ? rule.value.replace(new RegExp(`^${quoteEscapeToken}`), '').replace(new RegExp(`${quoteEscapeToken}$`), '')
    : rule.value,
  variable: rule.variable,
})
