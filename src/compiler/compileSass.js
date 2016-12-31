// @flow

const sass = require('node-sass')

module.exports = (data: string, options: { [string]: any }) =>
  sass.renderSync(Object.assign({}, options, { data })).css.toString()
