// @flow

import type { ruleType } from '../utils/rule.type'

const wrappingCssId = require('./wrappingCssId')

module.exports = (rule: ruleType) => `#${wrappingCssId}.${rule.variable}{content:"#{${rule.value}}";}`
