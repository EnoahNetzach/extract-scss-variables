// @flow

import type { ruleType } from '../utils/rule.type'

import appendRules from './appendRules'
import compileSass from './compileSass'
import constructMaps from './constructMaps'
import omitDuplicates from './omitDuplicates'
import unescapeQuotes from './unescapeQuotes'
import unwrap from './unwrap'
import unwrapRegExp from './unwrapRegExp'

export default (main: string, rules: Array<ruleType>, options: { [string]: any }) =>
  compileSass(rules.reduce(appendRules, main), options)
    .match(new RegExp(unwrapRegExp, 'g'))
    .map(unwrap)
    .map(constructMaps)
    .map(unescapeQuotes)
    .reverse()
    .reduce(omitDuplicates, {})
