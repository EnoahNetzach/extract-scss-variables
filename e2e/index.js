const extractScssVariables = require('extract-scss-variables')
const path = require('path')

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

process.exit(Object.keys(variables).length > 0 ? 0 : 1)
