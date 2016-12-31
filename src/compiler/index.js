// @flow

import type { ruleType } from './rule.type'

const appendRules = require('./appendRules')
const compileSass = require('./compileSass')
const omitDuplicates = require('./omitDuplicates')
const unwrap = require('./unwrap')
const unwrapRegExp = require('./unwrapRegExp')

module.exports = (main: string, rules: Array<ruleType>, options: { [string]: any }) =>
  compileSass(rules.reduce(appendRules, main), options)
    .match(new RegExp(unwrapRegExp, 'g'))
    .map(unwrap)
    .reverse()
    .reduce(omitDuplicates, {})
