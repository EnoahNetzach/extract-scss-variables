// @flow

const globalVariableSyntax = require('./globalVariableSyntax')

module.exports = (content: string) => {
  const matches = content.match(new RegExp(globalVariableSyntax, 'g'))

  if (!matches) {
    throw new Error(`Error while parsing declaration:\n\t${content}`)
  }

  return matches
}
