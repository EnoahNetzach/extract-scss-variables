// @flow

const flattenArrays = require('../utils/flattenArrays')
const escapeQuotes = require('./escapeQuotes')
const extractDeclarations = require('./extractDeclarations')
const parseDeclaration = require('./parseDeclaration')

module.exports = (contents: Array<string>) => contents
  .map(extractDeclarations)
  .reduce(flattenArrays, [])
  .map(element => parseDeclaration(element))
  .reduce(flattenArrays, [])
  .map(escapeQuotes)
