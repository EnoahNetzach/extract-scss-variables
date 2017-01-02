// @flow

const globalVariableSyntax = require('./globalVariableSyntax')

module.exports = (content: string) => {
  const matches = content.match(new RegExp(globalVariableSyntax, 'g'))

  if (!matches) {
    throw new Error(`Error while extracting declaration:\n\t${content}`)
  }

  return matches
}
