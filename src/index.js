// @flow

import fs from 'fs'
import path from 'path'
import compile from './compiler'
import parse from './parser'

type optsType = {
  entryPoint: string,
  files: [string],
  sassOptions?: { [string]: any },
}

export default (opts: optsType) => {
  const main = fs.readFileSync(opts.entryPoint).toString()
  const contents = opts.files.map(file => fs.readFileSync(file).toString())

  const sassOptions = opts.sassOptions || {}
  const includePaths = sassOptions.includePaths || []

  const options = Object.assign({}, opts.sassOptions, {
    includePaths: [path.dirname(opts.entryPoint)].concat(includePaths),
  })

  return compile(main, parse(contents), options)
}
