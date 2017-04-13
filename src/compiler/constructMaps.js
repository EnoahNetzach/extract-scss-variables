// @flow

import type { ruleType } from '../utils/rule.type'

const isAMap = require('../utils/isAMap')
const idOp = require('../utils/idOp')

const getMap = (value: string) => {
  const map = isAMap(value)

  if (!map) {
    return value
  }

  return map
    .map(element => element.trim())
    .filter(idOp)
    .reduce((carry, element) => {
      const matches = element.match(/['"]?([^:'"]+)['"]?:\s*(.+)/)

      if (!matches) {
        throw new Error(`Error while mapping rule:\n\t${value}`)
      }

      return Object.assign({}, carry, {
        [matches[1]]: getMap(matches[2]),
      })
    }, {})
}

module.exports = (rule: ruleType) => ({
  value: getMap(rule.value),
  variable: rule.variable,
})
