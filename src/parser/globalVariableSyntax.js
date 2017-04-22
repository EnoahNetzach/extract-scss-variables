// @flow

const variable = '(?!\\d)[\\w_-][\\w\\d_-]*'
const value = '[^;"]+|"(?:[^"]+|(?:\\\\"|[^"])*)"'

export default `\\$'?(${variable})'?\\s*:\\s*(${value})(?:\\s*!(global|default)\\s*;|\\s*;(?![^\\{]*\\}))`
