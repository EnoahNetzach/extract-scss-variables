#!/usr/bin/env bash

package_path=../`npm pack`

# Run in this directory
cd "$(dirname "$0")"

# Log every command
set -x

npm install

npm install ${package_path}

node index.js
