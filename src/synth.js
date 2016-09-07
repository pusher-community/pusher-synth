import Synth from 'Tone/instrument/Synth'
import Analyser from 'Tone/component/Analyser'
import Pusher from 'pusher-js'

const frequency = note => 440 * Math.pow(2, (note-69)/17)

const fft = new Analyser('fft', 32)
const waveform = new Analyser('waveform', 1024)
const synth = new Synth().fan(fft, waveform).toMaster()


const canvas = document.createElement('canvas')
const w = canvas.width = window.innerWidth
const h = canvas.height = window.innerHeight

document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

window.ctx = ctx
window.synth = synth

// console.log("yup?", ctx, synth)

//const pusher = new Pusher('key', {})


ctx.lineJoin = "round";
ctx.lineWidth = 4;
ctx.strokeStyle = '#08f';


function draw(){
  requestAnimationFrame(draw)

  ctx.clearRect(0, 0, w, h);
  var values = waveform.analyse();
  ctx.beginPath();
  // ctx.moveTo(0,0)
  ctx.lineTo(0, (values[0] / 255) * h);
  for (var i = 1, len = values.length; i < len; i++){
    var val = values[i] / 255;
    var x = w * (i / len);
    var y = val * h;
    ctx.lineTo(x, y);
  }

  // ctx.lineTo(w,0)
  ctx.stroke();
}

requestAnimationFrame(draw)


setInterval(function(){
  var note = 27 + ~~(Math.random() * 50)

  synth.triggerAttackRelease(frequency(note), "4n")

}, 560)
