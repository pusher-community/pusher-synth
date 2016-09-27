
import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/synth.js',
  format: 'amd',
  plugins: [
    buble()
  ],
  dest: 'docs/synth.amd.js'
}
