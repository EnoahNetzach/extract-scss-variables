// @flow

type carryType = { acc: Array<string>, opened: number }

export default (carry: carryType | void, char: string): carryType => {
  const acc = carry ? carry.acc : ['']
  const opened = carry ? carry.opened : 0

  if (opened === 0 && char === ',') {
    return {
      opened,
      acc: acc.concat(''),
    }
  }

  const opens = char === '(' ? 1 : 0
  const closes = char === ')' ? -1 : 0

  return {
    acc: acc.slice(0, -1).concat(`${acc.slice(-1)[0]}${char}`),
    opened: Math.max(opened + opens + closes, 0),
  }
}
