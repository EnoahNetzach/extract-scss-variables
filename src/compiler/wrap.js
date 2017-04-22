// @flow

import type { ruleType } from '../utils/rule.type'

import wrappingCssId from './wrappingCssId'

export default (rule: ruleType) => `#${wrappingCssId}.${rule.variable}{content:"#{${rule.value}}";}`
