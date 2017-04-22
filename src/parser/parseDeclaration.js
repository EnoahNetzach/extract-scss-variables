// @flow

import globalVariableSyntax from './globalVariableSyntax'

export default (declaration: string) => {
  const matches = declaration
    .replace(/\s*!(default|global)\s*;/, ';')
    .match(new RegExp(globalVariableSyntax))

  if (!matches) {
    throw new Error(`Error while parsing declaration:\n\t${declaration}`)
  }

  const variable = matches[1].trim().replace('_', '-')
  const value = matches[2].trim().replace(/\s*\n+\s*/, '')

  return { value, variable }
}
