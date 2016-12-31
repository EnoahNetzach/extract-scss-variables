// @flow

import type { ruleType } from './rule.type'

const wrappingCssId = require('./wrappingCssId')

module.exports = (rule: ruleType) => `#${wrappingCssId}.${rule.variable}{content:"#{${rule.value}}";}`
