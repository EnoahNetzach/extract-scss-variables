// @flow

import sass from 'node-sass'

export default (data: string, options: { [string]: any }) =>
  sass.renderSync(Object.assign({}, options, { data })).css.toString()
