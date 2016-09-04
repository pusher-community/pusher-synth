
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/synth.js',
  format: 'umd',
  moduleName: 'synth',
  plugins: [
    nodeResolve({jsnext: true}),
    commonjs(),
    buble(),
    uglify()
  ],
  dest: 'build/synth.js'
}
