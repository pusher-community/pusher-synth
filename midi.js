require('dotenv-safe').load()

const midi = require('midi')
const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
})

const input = new midi.input()

input.getPortCount()
input.getPortName(0)

input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime)
  pusher.trigger('midi', 'message', message)
})

// Open the first available input port.
input.openPort(0)

input.ignoreTypes(false, false, false)
