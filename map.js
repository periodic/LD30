define(['lib/crafty', 'lib/tiledmapbuilder'], function () {
  Crafty.c('World', {
    init: function () {
      this.requires('2D, Canvas, TiledMapBuilder');
    },
    shown: function (visibility) {
      this.visible = visibility;
      this._children.forEach(function (e) {
        e.visible = visibility;
      });
    },
    hide: function () {
      this.shown(false);
    },
    show: function () {
      this.shown(true);
    },
  });

  Crafty.c('DoubleMap', {
    init: function () {
      this.requires('Keyboard');
      this.bind('KeyDown', function () {
        if (this.isDown('SPACE')) {
          this.swap();
        }
      })
    },
    swap: function () {
      this._dark.shown(this._light.visible);
      this._light.shown(!this._light.visible);
    },
    doubleMap: function(mapData1, mapData2) {
      this._light = Crafty.e("World, LightWorld").setMapDataSource(mapData1);
      this._dark = Crafty.e("World, DarkWorld").setMapDataSource(mapData2);

      this._light.createWorld(function (map) {
        console.log("Created world 1.");
      });
      this._dark.createWorld(function (map) {
        console.log("Created world 2.");
      });
      this._dark.hide();
    },
  });
});
