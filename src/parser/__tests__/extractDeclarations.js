// @flow

const extractDeclarations = require('../extractDeclarations')

describe('Parser', () => {
  describe('extractDeclarations', () => {
    it('extract global scoped declarations', () => {
      const text = '$decl-1: 1;\n$decl-2: 2;'

      expect(extractDeclarations(text)).toEqual([
        '$decl-1: 1;',
        '$decl-2: 2;',
      ])
    })

    it('extract global scoped default declarations', () => {
      const text = '$decl-default: "default" !default;'

      expect(extractDeclarations(text)).toEqual([
        '$decl-default: "default" !default;',
      ])
    })

    it('extract global declared declarations', () => {
      const text = '.c {\n' +
        '  $inner-decl-global: "inner"!global;' +
        '}'

      expect(extractDeclarations(text)).toEqual([
        '$inner-decl-global: "inner"!global;',
      ])
    })

    it('does not extract scoped declarations', () => {
      const text = '$decl-1: 1;\n' +
        '.c {\n' +
        '  $inner-decl: "inner";\n' +
        '}'

      expect(extractDeclarations(text)).toEqual([
        '$decl-1: 1;',
      ])
    })

    it('throws if there are no declarations', () => {
      const text = '.c {\n' +
        '  $inner-decl: "inner";\n' +
        '}'

      expect(() => extractDeclarations(text)).toThrowError(/Error while extracting declaration:\n\t/)
    })
  })
})
