// @flow

const variable = '(?!\\d)[\\w_-][\\w\\d_-]*'
const value = '[^;"]+|"(?:[^"]+|(?:\\\\"|[^"])*)"'

module.exports = `\\$'?(${variable})'?\\s*:\\s*(${value})(?:\\s*!(global|default)\\s*;|\\s*;(?![^\\{]*\\}))`
