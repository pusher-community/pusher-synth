({

    name: 'node_modules/almond/almond',
    include: ['./docs/synth.amd'],
    insertRequire: ['./docs/synth.amd'],

    // name: "./docs/synth.amd.js",
    out: "./docs/synth.js",
    paths: {
      'pusher-js': './node_modules/pusher-js/dist/web/pusher'
    },

    // removes doc comments in Tonejs
    preserveLicenseComments: false
})
