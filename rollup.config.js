
import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/synth.js',
  format: 'amd',
  plugins: [
    buble()
  ],
  dest: 'build/synth.amd.js'
}
