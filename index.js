const fs = require('fs')
const sass = require('node-sass')
const path = require('path')

const globalVariableSyntax = /\$'?((?!\d)[\w_-][\w\d_-]*)'?:\s*([^;]+)(?:\s*!global;|;(?![^\{]*\}))/

const idOp = a => a
const flattenArrays = (carry, array) => carry.concat(array)

const isAMap = (value) => {
  const couldBe = value.startsWith('(')
    && value.endsWith(')')
    && value.includes(',')

  if (!couldBe) {
    return false
  }

  return value
    .slice(1, -1)
    .trim()
    .split('')
    .reduce((carry, char) => {
      if (carry.opened === 0 && char === ',') {
        return {
          acc: carry.acc.concat(''),
          opened: carry.opened,
        }
      }

      const opens = char === '(' ? 1 : 0
      const closes = char === ')' ? -1 : 0

      return {
        acc: carry.acc.slice(0, -1).concat(`${carry.acc.slice(-1)[0]}${char}`),
        opened: carry.opened + opens + closes,
      }
    }, { acc: [''], opened: 0 })
    .acc
}

const parseDeclaration = (declaration, prefix = '') => {
  const matches = declaration
    .replace(/!default\s*;/, ';')
    .match(new RegExp(globalVariableSyntax, 'u'))
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

const wrappingCssId = 'extract-scss-values-test-class'
const wrap = (variable, value) =>
  `#${wrappingCssId}.${variable}{content:"#{${value}}";}`
const unwrapRegExp = `${wrappingCssId}\\.(.+)\\s*\\{\\s*content:\\s*"(.+)"`

module.exports = ({ entryPoint, files, sassOptions = {} }) => {
  const main = fs.readFileSync(entryPoint).toString()
  const contents = files.map(file => fs.readFileSync(file).toString())

  const options = Object.assign({}, sassOptions, {
    includePaths: [path.dirname(entryPoint), ...(sassOptions.includePaths || [])],
  })

  return contents
    .map(content => content.match(new RegExp(globalVariableSyntax, 'gu')))
    .reduce(flattenArrays, [])
    .map(element => parseDeclaration(element))
    .reduce(flattenArrays, [])
    .reduce((carry, { value, variable }) => `${carry}\n${wrap(variable, value)}`, main)
    .split()
    .map(data => sass.renderSync(Object.assign({}, options, { data })).css.toString())
    .join()
    .match(new RegExp(unwrapRegExp, 'g'))
    .map((rule) => {
      const matched = rule.match(unwrapRegExp)

      return { variable: matched[1].trim(), value: matched[2] }
    })
    .reverse()
    .reduce((carry, entry) => {
      if (carry[entry.variable]) {
        return carry
      }

      return Object.assign(carry, { [entry.variable]: entry.value })
    }, {})
}
