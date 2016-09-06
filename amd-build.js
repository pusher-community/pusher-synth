({

    name: 'node_modules/almond/almond',
    include: ['./build/synth.amd'],
    insertRequire: ['./build/synth.amd'],

    // name: "./build/synth.amd.js",
    out: "./build/synth.js",
    paths: {
      'pusher-js': './node_modules/pusher-js/dist/web/pusher'
    },

    // removes doc comments in Tonejs
    preserveLicenseComments: false
})
