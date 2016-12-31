// @flow

type carryType = { acc: Array<string>, opened: number }

module.exports = (carry: carryType, char: string) => {
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
