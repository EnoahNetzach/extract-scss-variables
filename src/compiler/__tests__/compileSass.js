// @flow

jest.mock('node-sass', () => {
  const renderSync = () => ({
    css: {
      toString: () => 'compiled',
    },
  })

  return { renderSync }
})

const sass = require('node-sass')
const compileSass = require('../compileSass')

describe('Compiler', () => {
  describe('compileSass', () => {
    it('appends a valid rule', () => {
      spyOn(sass, 'renderSync').and.callThrough()

      expect(compileSass('data', { option: 42 })).toEqual('compiled')

      expect(sass.renderSync).toHaveBeenCalledWith({
        data: 'data',
        option: 42,
      })
    })
  })
})
