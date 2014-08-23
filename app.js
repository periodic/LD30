require.config({
  // Cache buster.  Remove for production.  Appends the timestamp to all
  // included files to avoid the cache.  Note that changes to this file may
  // require a hard reload.
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'text': 'lib/text',
  },
  shim: {
    'lib/crafty': {
      exports: 'Crafty',
    },
    'lib/tiledmapbuilder': [
      'lib/crafty',
      'lib/create_mocks_module',
    ],
  },
});

require(['game'], function (game) {
  window.game = game;
});
