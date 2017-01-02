// @flow

const idOp = require('../utils/idOp')
const isAMap = require('./isAMap')
const globalVariableSyntax = require('./globalVariableSyntax')

const parseDeclaration = (declaration: string, prefix?: string) => {
  const matches = declaration
    .replace(/!(default|global)\s*;/, ';')
    .match(new RegExp(globalVariableSyntax))

  if (!matches) {
    throw new Error(`Error while parsing declaration:\n\t${declaration}`)
  }

  const variable = matches[1].trim().replace('_', '-')
  const prefixed = prefix ? `${prefix}_${variable}` : variable
  const value = matches[2].trim()

  const map = isAMap(value)
  if (!map) {
    return { value, variable: prefixed }
  }

  return map
    .map(element => element.trim())
    .filter(idOp)
    .map(element => parseDeclaration(`$${element};`, prefixed))
}

module.exports = parseDeclaration
