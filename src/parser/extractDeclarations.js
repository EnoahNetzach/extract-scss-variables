// @flow

import globalVariableSyntax from './globalVariableSyntax'

export default (content: string) => {
  const matches = content.match(new RegExp(globalVariableSyntax, 'g'))

  if (!matches) {
    throw new Error(`Error while extracting declaration:\n\t${content}`)
  }

  return matches
}
