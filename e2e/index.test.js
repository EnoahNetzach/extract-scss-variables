const variables = require('.').variables

describe('Extract SCSS variables', () => {
  it('produces an object', () => {
    expect(Object.keys(variables).length).toBeGreaterThan(0)
  })

  it('extracts simple variables', () => {
    expect(variables['transition-in']).toBe('box-shadow 0.2s ease')
  })

  it('extracts overridden simple variables', () => {
    expect(variables['global-font-size']).toBe('14px')
  })

  it('extracts variables which use functions', () => {
    expect(variables['shadow-z1']).toBe('0 1px 2px rgba(52, 58, 67, 0.08), 0 1px 4px rgba(52, 58, 67, 0.08)')
  })

  it('extracts map variables', () => {
    expect(variables.breakpoints.large).toBe('1024px')
  })

  it('extracts overridden map variables', () => {
    expect(variables['foundation-palette'].alert).toBe('#f95c28')
  })

  it('maintains copied variables the same', () => {
    expect(variables['palette-copy']).toEqual(variables['foundation-palette'])
  })

  it('handles strings containing map-like text', () => {
    expect(variables.stringMockingAMap).toBe('(a: 42, b: 666)')
  })

  it('handles strings with "&quot;" at the beginning and/or ending', () => {
    expect(variables.stringMockingTheQuoteEscaping).toBe('&quot;asdf&quot;')
  })

  it('handles strings with escaped quotes and semicolons', () => {
    expect(variables.stringWithEscapedQuotesAndSemicolons).toBe('asd"aef " ;fdsfd')
  })

  it('handles strings with an escaped backslash at the end', () => {
    expect(variables.stringWithEscapedBackslash).toBe('asd"aef " ;f\\\\')
  })

  it('extracts deep maps', () => {
    expect(variables.deepMap).toEqual({
      a: '1',
      b: '2',
      c: {
        a: '1',
        b: '2',
      },
    })
  })

  it('extracts deep map values', () => {
    expect(variables.deepMapValue).toBe('2')
  })
})
