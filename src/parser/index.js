// @flow

import flattenArrays from '../utils/flattenArrays'
import escapeQuotes from './escapeQuotes'
import extractDeclarations from './extractDeclarations'
import parseDeclaration from './parseDeclaration'

export default (contents: Array<string>) => contents
  .map(extractDeclarations)
  .reduce(flattenArrays, [])
  .map(element => parseDeclaration(element))
  .reduce(flattenArrays, [])
  .map(escapeQuotes)
