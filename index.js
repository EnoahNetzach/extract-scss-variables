const fs = require('fs')
const sass = require('node-sass')
const path = require('path')

const globalVariableSyntax = '\\$\'?((?!\\d)[\\w_-][\\w\\d_-]*)\'?:\\s*([^;]+)(?:\\s*!global;|;(?![^\\{]*\\}))'

const idOp = a => a
const flattenArrays = (carry, array) => carry.concat(array)

const wrappingCssId = 'extract-scss-values-test-class'
const wrap = (variable, value) => `#${wrappingCssId}.${variable}{content:"#{${value}}";}`
const unwrapRegExp = `${wrappingCssId}\\.(.+)\\s*\\{\\s*content:\\s*"(.+)"`

const splitMap = (carry, char) => {
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
}

const isAMap = value => value.startsWith('(')
    && value.endsWith(')')
    && value.includes(',')
    && value
      .slice(1, -1)
      .trim()
      .split('')
      .reduce(splitMap, { acc: [''], opened: 0 })
      .acc

const extractDeclarations = content => content.match(new RegExp(globalVariableSyntax, 'g'))

const parseDeclaration = (declaration, prefix) => {
  const matches = declaration
    .replace(/!default\s*;/, ';')
    .match(new RegExp(globalVariableSyntax))
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

const appendRules = (carry, entry) => `${carry}\n${wrap(entry.variable, entry.value)}`

const compileSass = options => data => sass.renderSync(Object.assign({}, options, { data })).css.toString()

const unwrap = (rule) => {
  const matched = rule.match(unwrapRegExp)

  return { variable: matched[1].trim(), value: matched[2] }
}

const omitDuplicates = (carry, entry) => (!carry[entry.variable]
  ? Object.assign(carry, { [entry.variable]: entry.value })
  : carry
)

module.exports = (opts) => {
  const main = fs.readFileSync(opts.entryPoint).toString()
  const contents = opts.files.map(file => fs.readFileSync(file).toString())

  const sassOptions = opts.sassOptions || {}
  const otions = Object.assign({}, opts.sassOptions, {
    includePaths: [path.dirname(opts.entryPoint)].concat(sassOptions.includePaths || []),
  })

  return contents
    .map(extractDeclarations)
    .reduce(flattenArrays, [])
    .map(element => parseDeclaration(element))
    .reduce(flattenArrays, [])
    .reduce(appendRules, main)
    .split()
    .map(compileSass(otions))
    .join()
    .match(new RegExp(unwrapRegExp, 'g'))
    .map(unwrap)
    .reverse()
    .reduce(omitDuplicates, {})
}
