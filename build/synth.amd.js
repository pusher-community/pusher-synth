define(['Tone/instrument/Synth', 'Tone/component/Analyser', 'pusher-js'], function (Synth, Analyser, pusherJs) { 'use strict';

Synth = 'default' in Synth ? Synth['default'] : Synth;
Analyser = 'default' in Analyser ? Analyser['default'] : Analyser;

var frequency = function (note) { return 440 * Math.pow(2, (note-69)/17); }

var fft = new Analyser('fft', 32)
var waveform = new Analyser('waveform', 1024)
var synth = new Synth().fan(fft, waveform).toMaster()


var canvas = document.createElement('canvas')
var w = canvas.width = window.innerWidth
var h = canvas.height = window.innerHeight

document.body.appendChild(canvas)
var ctx = canvas.getContext('2d')

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

});