import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import butternut from 'rollup-plugin-butternut'

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

export default {
  entry: pkg.module,
  format: 'iife',
  moduleName: 'Bimage',
  dest: pkg.main,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true 
    }),
    commonjs(),
    butternut()
  ],
  external
}