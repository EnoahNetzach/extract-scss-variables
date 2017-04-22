// @flow

import splitMap from '../splitMap'

describe('Parser', () => {
  describe('splitMap', () => {
    it('leaves non-maps unchanged', () => {
      const text = 'this is not a map'
      expect(text.split('').reduce(splitMap, undefined)).toEqual({
        acc: [text],
        opened: jasmine.any(Number),
      })
    })

    it('splits simple maps', () => {
      const text = 'this: is, a: map'
      expect(text.split('').reduce(splitMap, undefined)).toEqual({
        acc: ['this: is', ' a: map'],
        opened: jasmine.any(Number),
      })
    })

    it('splits maps with inner brackets', () => {
      const text = 'this: is(a (complex)), map: !'
      expect(text.split('').reduce(splitMap, undefined)).toEqual({
        acc: ['this: is(a (complex))', ' map: !'],
        opened: jasmine.any(Number),
      })
    })

    it('splits maps with inner maps', () => {
      const text = 'this: is(this: is, another: map), a: map'
      expect(text.split('').reduce(splitMap, undefined)).toEqual({
        acc: ['this: is(this: is, another: map)', ' a: map'],
        opened: jasmine.any(Number),
      })
    })
  })
})
