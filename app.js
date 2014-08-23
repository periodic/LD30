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
    'lib/Tiled/tiledmapbuilder': [
      'lib/Tiled/modules/create_mocks_module',
      'lib/crafty',
    ],
  },
});

require(['game'], function (game) {
  window.game = game;
});
