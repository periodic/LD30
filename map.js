define(['lib/crafty', 'constants', 'lib/tiledmapbuilder', 'props'], function (Crafty, k) {
  Crafty.c('Goal', {
    init: function () {
      this.requires('2D, Canvas');
    },
  });

  Crafty.c('Impassable', {
    init: function () {
      this.requires('2D');
    },
  });

  Crafty.c('TileEmpty', {
    init: function () {
      this.requires('2D').attr({
        w: k.tileWidth,
        h: k.tileHeight,
      });
    },
  });

  Crafty.c('World', {
    init: function () {
      this.requires('2D, Canvas, TiledMapBuilder');
    },
    shown: function (visibility) {
      this.visible = visibility;
      this._children.forEach(function (e) {
        e.visible = visibility;
      });
      return this;
    },
    hide: function () {
      return this.shown(false);
    },
    show: function () {
      return this.shown(true);
    },
  });

  Crafty.c('DarkWorld', {
    init: function () {
    },
    getPlayerType: function () {
      return 'LightPlayer';
    },
    getPlayer: function () {
      return Crafty('LightPlayer').get(0);
    },
  });

  Crafty.c('LightWorld', {
    init: function () {
    },
    getPlayerType: function () {
      return 'DarkPlayer';
    },
    getPlayer: function () {
      return Crafty('DarkPlayer').get(0);
    },
  });

  Crafty.c('DoubleMap', {
    init: function () {
      this.requires('2D,Keyboard');
      this.bind('KeyDown', function () {
        if (this.isDown('SPACE')) {
          this.swap();
        }
      })
      this.bind('LightTransition', this.showLight);
      this.bind('DarkTransition', this.showDark);
      this.bind('EnterFrame', this.checkGoal);

      this._lightDone = false;
      this._darkDone = false;
    },
    showLight: function () {
      console.log("Light transition triggered.");
      this._light.show();
      this._dark.hide();
      return this;
    },
    showDark: function () {
      console.log("Dark transition triggered.");
      this._light.hide();
      this._dark.show();
      return this;
    },
    swap: function () {
      Crafty.trigger(this._light.visible ? 'DarkTransition' : 'LightTransition');
      return this;
    },
    doubleMap: function(mapData1, mapData2) {
      this._light = Crafty.e("World, LightWorld").setMapDataSource(mapData1);
      this._dark = Crafty.e("World, DarkWorld").setMapDataSource(mapData2);

      this._light.createWorld(function (map) {});
      this._dark.createWorld(function (map) {});

      this._light._children.forEach(function (e) {
        e.addComponent('LightWorld');
      });
      this._dark._children.forEach(function (e) {
        e.addComponent('DarkWorld');
      });

      Crafty('Ground TileEmpty').each(function () { 
        this.addComponent('Impassable');
      });

      return this;
    },
    checkGoal: function () {
      var lightGoal = Crafty('LightWorld Goal').get(0);
      var darkGoal = Crafty('DarkWorld Goal').get(0);
      
      this._lightDone = lightGoal.contains(Crafty('DarkPlayer'));
      this._darkDone = darkGoal.contains(Crafty('LightPlayer'));

      if (this._lightDone && this._darkDone) {
        console.log('Level complete.');
        Crafty.scene(this._nextScene);
      }
    },
    onComplete: function(nextScene) {
      // TODO: Call this when the map is complete.
      this._nextScene = nextScene;
    },
  });
});
