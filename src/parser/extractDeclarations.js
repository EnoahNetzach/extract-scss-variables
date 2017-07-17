// @flow

import globalVariableSyntax from './globalVariableSyntax'

export default (content: string) => {
  const matches = content.match(new RegExp(globalVariableSyntax, 'g'))

  if (!matches) {
    return []
  }

  return matches
}
