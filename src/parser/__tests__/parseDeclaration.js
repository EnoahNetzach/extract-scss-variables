// @flow

const parseDeclaration = require('../parseDeclaration')

describe('Parser', () => {
  describe('parseDeclaration', () => {
    it('parses a simple declaration', () => {
      const text = '$decl-1: 1;'

      expect(parseDeclaration(text)).toEqual({
        value: '1',
        variable: 'decl-1',
      })
    })

    it('parses default declarations', () => {
      const text = '$decl-default: "default" !default;'

      expect(parseDeclaration(text)).toEqual({
        value: '"default"',
        variable: 'decl-default',
      })
    })

    it('parses global declarations', () => {
      const text = '$decl-global: "global" !global;'

      expect(parseDeclaration(text)).toEqual({
        value: '"global"',
        variable: 'decl-global',
      })
    })

    it('converts "_" in "-" ("_" are reserved for maps)', () => {
      const text = '$decl_underscore: "underscore";'

      expect(parseDeclaration(text)).toEqual({
        value: '"underscore"',
        variable: 'decl-underscore',
      })
    })

    it('parses map declarations', () => {
      const text = '$decl-map: (\n' +
        ' a: 1,' +
        ' b: rgb(0, 0, 0),' +
        ' c: (x: 1, y: 2, z: 3),' +
        ');'

      expect(parseDeclaration(text)).toEqual({
        value: '(a: 1, b: rgb(0, 0, 0), c: (x: 1, y: 2, z: 3),)',
        variable: 'decl-map',
      })
    })

    it('throws if it is not a declaration', () => {
      const text = 'this is not a declaration'

      expect(() => parseDeclaration(text)).toThrowError(/Error while parsing declaration:\n\t/)
    })
  })
})
