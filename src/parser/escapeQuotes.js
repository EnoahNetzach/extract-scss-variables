// @flow

import type { ruleType } from '../utils/rule.type'

import quoteEscapeToken from '../utils/quoteEscapeToken'

export default (rule: ruleType) => ({
  value: rule.value
    .replace(/^"/g, `"${quoteEscapeToken}`).replace(/"$/g, `${quoteEscapeToken}"`)
    .replace(/^'/g, `'${quoteEscapeToken}`).replace(/'$/g, `${quoteEscapeToken}'`),
  variable: rule.variable,
})
