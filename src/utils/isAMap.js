// @flow

const splitMap = require('./splitMap')

module.exports = (value: string) => value.startsWith('(')
  && value.endsWith(')')
  && value.includes(',')
  && value
    .slice(1, -1)
    .trim()
    .split('')
    .reduce(splitMap, { acc: [''], opened: 0 })
    .acc
