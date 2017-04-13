// @flow

import type { ruleType } from '../utils/rule.type'

const appendRules = require('./appendRules')
const compileSass = require('./compileSass')
const constructMaps = require('./constructMaps')
const omitDuplicates = require('./omitDuplicates')
const unescapeQuotes = require('./unescapeQuotes')
const unwrap = require('./unwrap')
const unwrapRegExp = require('./unwrapRegExp')

module.exports = (main: string, rules: Array<ruleType>, options: { [string]: any }) =>
  compileSass(rules.reduce(appendRules, main), options)
    .match(new RegExp(unwrapRegExp, 'g'))
    .map(unwrap)
    .map(constructMaps)
    .map(unescapeQuotes)
    .reverse()
    .reduce(omitDuplicates, {})
