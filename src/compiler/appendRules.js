// @flow

import type { ruleType } from '../utils/rule.type'

import wrap from './wrap'

export default (carry: string, entry: ruleType) => `${carry}\n${wrap(entry)}`
