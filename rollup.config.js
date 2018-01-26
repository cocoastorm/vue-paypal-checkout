import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { rollup } from 'rollup';

import clone from 'lodash/cloneDeep';
import camelcase from 'camelcase';
import chalk from 'chalk';

import { default as vueConfig, pack } from './config/rollup-plugin-vue.config';
import babelConfig from './config/babel.config';

let cache;

const config = {
  input: 'src/main.js',
  output: [
    { format: 'es', file: `dist/${pack.name}.esm.js` },
    { format: 'cjs', file: `dist/${pack.name}.common.js` },
  ],
  plugins: [
    vue(vueConfig),
    babel(babelConfig),
  ],
  strict: false,
  cache,
};

// --- DO NOT CHANGE BEYOND THIS ---
if (vueConfig.standalone) {
  const options = clone(config);
  options.output = [];
  options.plugins = [
    builtins(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    uglify(),
  ].concat(options.plugins);

  rollup(options).then(bundle => bundle.write({
    format: 'umd',
    file: `dist/${pack.name}.min.js`,
    name: camelcase(pack.name),
  })).then(() => {
    console.log(chalk.cyan('Build complete.\n'))
  }).catch(err => {
    console.log(
      chalk.red('Build Failed.\n'),
      chalk.yellow(err),
      chalk.yellow(err.stack)
    )
  });
}

export default config;
