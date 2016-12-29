# Extract SCSS variables

[![Build Status](https://travis-ci.org/EnoahNetzach/extract-scss-variables.svg?branch=master)](https://travis-ci.org/EnoahNetzach/extract-scss-variables)
[![NPM Version](http://img.shields.io/npm/v/extract-scss-variables.svg?style=flat)](https://www.npmjs.org/package/extract-scss-variables)

An utility for extracting variables from `.scss` files.

### Installation

```bash
npm install --save-dev extract-scss-variables
```

[**Node SASS**](https://github.com/sass/node-sass) must be installed, too.  
If not present already, just install it with:

```bash
npm install --save-dev node-sass
```
### Usage

```javascript
var extractScssVariables = require('extract-scss-variables');
var variables = extractScssVariables({
  entryPoint: entryPath,
  files: filePaths,
  sassOptions: { 
    includePaths: includePaths,
  },
});
```

Internally variable declarations are extracted and their value is appended at the end of a copy of the provided `entryPath` file.  
Using the "`content:`" trick:
```scss
#test {
  content: "#{$extracted-value}";
}
```
and compiling the `entryPath` copy with **node-sass**, the computed values could be easily extracted.

### CLI

Running the CLI version will produce a JSON file containing all extracted variables.

 - `<entry-point>`: SCSS entry point
 - `-f, --file <path>`: path to a `.scss` file from where to extract the variables. It can occur multiple times
 - `-c, --sass-config`: JSON string or path to a JSON file with **node-sass** additional config
 - `-o, --output <path>`: path where to save the JSON output

For example:
```bash
extract-scss-values bundle.scss -f _globals.scss -f _settings.scss
```
