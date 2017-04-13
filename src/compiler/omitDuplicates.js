// @flow

import type { ruleType } from '../utils/rule.type'

module.exports = (carry: { [string]: string }, entry: ruleType) => (!carry[entry.variable]
  ? Object.assign(carry, { [entry.variable]: entry.value })
  : carry
)
