#!/usr/bin/env bash

# Error messages are redirected to stderr
function handle_error {
  echo "$(basename $0): ERROR! An error was encountered executing line $1." 1>&2
  echo 'Exiting with error.' 1>&2
  exit 1
}

function handle_exit {
  echo 'Exiting without error.' 1>&2
  exit
}

# Exit the script with a helpful error message when any error is encountered
trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# Cleanup before exit on any termination signal
trap 'set +x; handle_exit' SIGQUIT SIGTERM SIGINT SIGKILL SIGHUP

# Produce a packed package
package_path=../$(npm pack | tail -n1)

# Install peer dependencies for later usage
npm install node-sass@^${NODE_SASS}

# Build
npm run build

# Run in this directory
cd "$(dirname "$0")"

# Echo every command being executed
set -x

npm install
npm install ${package_path}

# Test the scss compiles
npm run scss
test -e css/bundle.css

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

cd ..

# Check coding style
npm run eslint

# Check types
npm run flow check

# Run tests & coverage
npm test -- --no-cache --coverage
