// @flow

import type { ruleType } from './rule.type'

const wrap = require('./wrap')

module.exports = (carry: string, entry: ruleType) => `${carry}\n${wrap(entry)}`
