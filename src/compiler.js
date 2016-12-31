// @flow

const sass = require('node-sass')

const wrappingCssId = 'extract-scss-values-test-class'
const wrap = (variable, value) => `#${wrappingCssId}.${variable}{content:"#{${value}}";}`
const unwrapRegExp = `${wrappingCssId}\\.(.+)\\s*\\{\\s*content:\\s*"(.+)"`

const appendRules = (carry, entry) => `${carry}\n${wrap(entry.variable, entry.value)}`

const compileSass = (data, options) => sass.renderSync(Object.assign({}, options, { data })).css.toString()

const unwrap = (rule) => {
  const matched = rule.match(unwrapRegExp)

  return { variable: matched[1].trim(), value: matched[2] }
}

const omitDuplicates = (carry, entry) => (!carry[entry.variable]
  ? Object.assign(carry, { [entry.variable]: entry.value })
  : carry
)

type ruleType = { value: string, variable: string }

module.exports = (main: string, rules: Array<ruleType>, options: { [string]: any }) =>
  compileSass(rules.reduce(appendRules, main), options)
    .match(new RegExp(unwrapRegExp, 'g'))
    .map(unwrap)
    .reverse()
    .reduce(omitDuplicates, {})
