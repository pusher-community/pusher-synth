define(['Tone/instrument/Synth', 'Tone/instrument/PolySynth', 'Tone/component/Analyser', 'pusher-js'], function (Synth, PolySynth, Analyser, Pusher) { 'use strict';

Synth = 'default' in Synth ? Synth['default'] : Synth;
PolySynth = 'default' in PolySynth ? PolySynth['default'] : PolySynth;
Analyser = 'default' in Analyser ? Analyser['default'] : Analyser;
Pusher = 'default' in Pusher ? Pusher['default'] : Pusher;

var noteToFrequency = function (note) { return 440 * Math.pow(2, (note-49)/12); }

var fft = new Analyser('fft', 32)
var waveform = new Analyser('waveform', 1024)


// const synth = new Synth().fan(fft, waveform).toMaster()

var synth = new PolySynth(3, Synth, {
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



var canvas = document.createElement('canvas')
var w = canvas.width = window.innerWidth
var h = canvas.height = window.innerHeight

document.body.appendChild(canvas)
var ctx = canvas.getContext('2d')

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


var pusher = new Pusher('dc6a0545f9f460f6c5e1', {cluster: 'eu', encrypted: true})

var channel = pusher.subscribe('midi')
channel.bind('message', function (m) {
  var f = noteToFrequency(m[1])

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

});