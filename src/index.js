// @flow

const fs = require('fs')
const path = require('path')
const compile = require('./compiler')
const parse = require('./parser')

type optsType = {
  entryPoint: string,
  files: [string],
  sassOptions?: { [string]: any },
}

module.exports = (opts: optsType) => {
  const main = fs.readFileSync(opts.entryPoint).toString()
  const contents = opts.files.map(file => fs.readFileSync(file).toString())

  const sassOptions = opts.sassOptions || {}
  const options = Object.assign({}, opts.sassOptions, {
    includePaths: [path.dirname(opts.entryPoint)].concat(sassOptions.includePaths || []),
  })

  return compile(main, parse(contents), options)
}
