// @flow

const globalVariableSyntax = '\\$\'?((?!\\d)[\\w_-][\\w\\d_-]*)\'?:\\s*([^;]+)(?:\\s*!global;|;(?![^\\{]*\\}))'

const idOp = a => a
const flattenArrays = (carry: Array<any>, array: Array<any>|any) => carry.concat(array)

const splitMap = (carry, char) => {
  if (carry.opened === 0 && char === ',') {
    return {
      acc: carry.acc.concat(''),
      opened: carry.opened,
    }
  }

  const opens = char === '(' ? 1 : 0
  const closes = char === ')' ? -1 : 0

  return {
    acc: carry.acc.slice(0, -1).concat(`${carry.acc.slice(-1)[0]}${char}`),
    opened: carry.opened + opens + closes,
  }
}

const isAMap = value => value.startsWith('(')
&& value.endsWith(')')
&& value.includes(',')
&& value
  .slice(1, -1)
  .trim()
  .split('')
  .reduce(splitMap, { acc: [''], opened: 0 })
  .acc

const extractDeclarations = (content) => {
  const matches = content.match(new RegExp(globalVariableSyntax, 'g'))

  if (!matches) {
    throw new Error(`Error while parsing declaration:\n\t${content}`)
  }

  return matches
}

const parseDeclaration = (declaration, prefix) => {
  const matches = declaration
    .replace(/!default\s*;/, ';')
    .match(new RegExp(globalVariableSyntax))

  if (!matches) {
    throw new Error(`Error while parsing declaration:\n\t${declaration}`)
  }

  const variable = matches[1].trim().replace('_', '-')
  const prefixed = prefix ? `${prefix}_${variable}` : variable
  const value = matches[2].trim()

  const map = isAMap(value)
  if (!map) {
    return { value, variable: prefixed }
  }

  return map
    .map(element => element.trim())
    .filter(idOp)
    .map(element => parseDeclaration(`$${element};`, prefixed))
}

module.exports = (contents: Array<string>) => contents
    .map(extractDeclarations)
    .reduce(flattenArrays, [])
    .map(element => parseDeclaration(element))
    .reduce(flattenArrays, [])
