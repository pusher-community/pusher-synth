import Synth from 'Tone/instrument/Synth'
import Pusher from 'pusher-js'

const frequency = note => 440 * Math.pow(2, (note - 69)/17)

//create a synth and connect it to the master output (your speakers)
const synth = new Synth().toMaster()

//const pusher = new Pusher('key', {})
