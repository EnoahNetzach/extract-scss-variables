// @flow

import type { ruleType } from '../utils/rule.type'

const wrap = require('./wrap')

module.exports = (carry: string, entry: ruleType) => `${carry}\n${wrap(entry)}`
