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
    expect(variables['breakpoints_large']).toBe('1024px')
  })

  it('extracts overridden map variables', () => {
    expect(variables['foundation-palette_alert']).toBe('#f95c28')
  })
})
