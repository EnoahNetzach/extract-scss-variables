import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import flow from 'rollup-plugin-flow'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js-harmony'
// FIXME: use this plugin when https://github.com/btd/rollup-plugin-visualizer/pull/5 is merged
// import visualizer from 'rollup-plugin-visualizer'

const targets = [
  { dest: 'dist/index.js', format: 'cjs' },
  { dest: 'dist/index.es.js', format: 'es' },
]

const plugins = [
  flow(),
  nodeResolve(),
  commonjs(),
  babel({
    babelrc: false,
    plugins: [
      'transform-flow-strip-types',
      'external-helpers',
    ],
    presets: [
      ['env', { modules: false, targets: { node: 4 } }],
    ],
  }),
  json(),
  uglify({}, minify),
//  visualizer({ filename: './bundle.stats.html' }),
]

export default {
  entry: 'src/index.js',
  moduleName: 'styled',
  external: ['fs', 'node-sass', 'path'],
  exports: 'named',
  targets,
  plugins,
}
