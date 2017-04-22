// @flow

import unwrapRegExp from './unwrapRegExp'

export default (rule: string) => {
  const matches = rule.match(unwrapRegExp)

  if (!matches) {
    throw new Error(`Error while unwrapping rule:\n\t${rule}`)
  }

  return { variable: matches[1].trim(), value: matches[2] }
}
