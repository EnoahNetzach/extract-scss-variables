// @flow

import type { ruleType } from '../utils/rule.type'

const quoteEscapeToken = require('../utils/quoteEscapeToken')

module.exports = (rule: ruleType) => ({
  value: rule.value
    .replace(/^"/g, `"${quoteEscapeToken}`).replace(/"$/g, `${quoteEscapeToken}"`)
    .replace(/^'/g, `'${quoteEscapeToken}`).replace(/'$/g, `${quoteEscapeToken}'`),
  variable: rule.variable,
})
