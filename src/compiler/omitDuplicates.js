// @flow

import type { ruleType } from '../utils/rule.type'

export default (carry: { [string]: string }, entry: ruleType) => (!carry[entry.variable]
  ? Object.assign(carry, { [entry.variable]: entry.value })
  : carry
)
