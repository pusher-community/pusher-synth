import Synth from 'Tone/instrument/Synth'
import PolySynth from 'Tone/instrument/PolySynth'
import Analyser from 'Tone/component/Analyser'
import Pusher from 'pusher-js'

const noteToFrequency = note => 440 * Math.pow(2, (note-69)/17)

const fft = new Analyser('fft', 32)
const waveform = new Analyser('waveform', 1024)


// const synth = new Synth().fan(fft, waveform).toMaster()

const synth = new PolySynth(3, Synth, {
  "oscillator" : {
  "type" : "fatsawtooth",
    "count" : 3,
    "spread" : 30
  },
  "envelope": {
    "attack": 0.01,
    "decay": 0.1,
    "sustain": 0.5,
    "release": 0.4,
    "attackCurve" : "exponential"
  },
})
.fan(fft, waveform).toMaster();



const canvas = document.createElement('canvas')
const w = canvas.width = window.innerWidth
const h = canvas.height = window.innerHeight

document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

window.ctx = ctx
window.synth = synth

// console.log("yup?", ctx, synth)

//const pusher = new Pusher('key', {})


ctx.lineJoin = "round"
ctx.lineWidth = 5
ctx.strokeStyle = '#549eff'
ctx.fillStyle = '#549eff'

function draw(){
  requestAnimationFrame(draw)

  ctx.clearRect(0, 0, w, h)
  var values = waveform.analyse()
  ctx.beginPath()

  var s = Math.min(w,h)/2.3

  for (var i = 0, len = values.length; i < len; i++){
    var val = values[i] / 255

    // var x = w * (i / len)
    // var y = val * h
    var o = (i/len) * Math.PI * 2.01

    var x = w/2 + (Math.sin(o) * s * val)
    var y = h/2 + (Math.cos(o) * s * val)

    ctx.lineTo(x, y)
  }

  // ctx.lineTo(w,0)
  // ctx.fill()
  ctx.stroke()
}

requestAnimationFrame(draw)


const pusher = new Pusher('dc6a0545f9f460f6c5e1', {cluster: 'eu', encrypted: true})

const channel = pusher.subscribe('midi')
channel.bind('message', (m) => {
  const f = noteToFrequency(m[1])

  if(m[0]==144) {
    synth.triggerAttack(f)
  }
  if(m[0]==128) {
    synth.triggerRelease(f)
  }
})

// setInterval(function(){
//   var note = 27 + ~~(Math.random() * 50)
//
//   synth.triggerAttackRelease(frequency(note), "4n")
//
// }, 560)
