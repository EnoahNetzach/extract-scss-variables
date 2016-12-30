#!/usr/bin/env node
/* eslint-disable no-console, strict */

'use strict'

const commander = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const extractScssVariables = require('..')

let entryPoint = ''

const getFiles = (file, files) => files.concat(file)

const program = commander
  .version(require('../package.json').version)
  .usage(`${chalk.green('<entry-point>')} [options]`)
  .action((name) => {
    entryPoint = name
  })
  .option('-f, --file <path>', 'Input from where to extract the variables', getFiles, [])
  .option('-o, --output <path>', 'Output file path')
  .option('-c, --sass-config <json-or-path>', 'JSON string or path to a JSON file containing node-sass options')
  .parse(process.argv)

if (!entryPoint) {
  console.error('Please specify the entry point.')
  console.log()
  console.log(`Run ${chalk.cyan(`${program.name()}  --help`)} to see all options.`)
  process.exit(1)
} else if (program.file.length === 0) {
  console.error('Please specify at least one file.')
  console.log()
  console.log(`Run ${chalk.cyan(`${program.name()}  --help`)} to see all options.`)
  process.exit(1)
} else if (!program.output) {
  console.error('Please specify the output file.')
  console.log()
  console.log(`Run ${chalk.cyan(`${program.name()}  --help`)} to see all options.`)
  process.exit(1)
}

let sassConfig = program.sassConfig || '{}'
const sassConfigPath = path.resolve(process.cwd(), program.sassConfig)
if (program.sassConfig && fs.existsSync(sassConfigPath)) {
  sassConfig = fs.readFileSync(sassConfigPath)
}

const variables = extractScssVariables({
  entryPoint,
  files: program.file,
  sassOptions: JSON.parse(sassConfig),
})

fs.writeFileSync(program.output, JSON.stringify(variables))
