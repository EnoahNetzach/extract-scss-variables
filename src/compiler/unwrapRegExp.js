// @flow

const wrappingCssId = require('./wrappingCssId')

module.exports = `#${wrappingCssId}\\.(.+)\\s*\\{\\s*content:\\s*["'](.+)["']`
