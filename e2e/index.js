const path = require('path')
const extractScssVariables = process.env.NODE_ENV === 'test'
  ? require('..')
  : require('extract-scss-variables')

const nodeModulesPath = path.join(__dirname, 'node_modules')
const stylePath = path.join(__dirname, 'style')

const files = [
  [nodeModulesPath, 'foundation-sites', 'scss', 'settings', '_settings.scss'],
  [nodeModulesPath, 'foundation-sites', 'scss', '_global.scss'],
  [stylePath, '_settings.scss'],
  [stylePath, '_globals.scss'],
].map(paths => path.join.apply(path, paths))

const includePaths = [
  [nodeModulesPath, 'foundation-sites/scss/'],
].map(paths => path.join.apply(path, paths))

const variables = extractScssVariables({
  files,
  entryPoint: path.join(stylePath, 'bundle.scss'),
  sassOptions: { includePaths },
})

if (process.env.NODE_ENV === 'test') {
  module.exports = { variables }
} else {
  process.exit(Object.keys(variables).length > 0 ? 0 : 1)
}
