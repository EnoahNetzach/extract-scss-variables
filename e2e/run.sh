#!/usr/bin/env bash

package_path=../`npm pack`

# Run in this directory
cd "$(dirname "$0")"

# Log every command
set -x

npm install
npm install ${package_path}

# Test the node version
node index.js

# Test the CLI version with a JSON string
tmp_file=`mktemp`
node_modules/.bin/extract-scss-variables \
  style/bundle.scss \
  -f node_modules/foundation-sites/scss/settings/_settings.scss \
  -f node_modules/foundation-sites/scss/_global.scss \
  -f style/_settings.scss \
  -f style/_globals.scss \
  -c '{"includePaths":["node_modules/foundation-sites/scss/"]}' \
  -o ${tmp_file}
test ! -z `cat ${tmp_file} | head -c 10`

# Test the CLI version with a JSON file
tmp_file=`mktemp`
node_modules/.bin/extract-scss-variables \
  style/bundle.scss \
  -f node_modules/foundation-sites/scss/settings/_settings.scss \
  -f node_modules/foundation-sites/scss/_global.scss \
  -f style/_settings.scss \
  -f style/_globals.scss \
  -c sass-config.json \
  -o ${tmp_file}
test ! -z `cat ${tmp_file} | head -c 10`
