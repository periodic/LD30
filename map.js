define(['lib/crafty', 'constants', 'lib/tiledmapbuilder', 'props'], function (Crafty, k) {
  Crafty.c('Goal', {
    init: function () {
      this.requires('2D, Canvas, DynamicZ')
          .dynamicZ(k.interactiveZLayer)
          .bind('Invalidate', this._updateSprite);
    },
    _updateSprite: function () {
      log("Invalidated portal");
      var updated = false;
      if (this._world == 'DarkWorld') {
        log("Creating dark portal");
        updated = true;
        this.addComponent('DarkPortal');
      }
      if (this._world == 'LightWorld') {
        log("Creating light portal");
        updated = true;
        this.addComponent('LightPortal');
      }
      if (updated) {
        this.unbind('Invalidate', this._updateSprite);
        this.y = this.y - k.portalOffset;
      }
    },
  });

  Crafty.c('Impassable', {
    init: function () {
      this.requires('2D, Collision, ImpassablePlayerOnly')
          .collision();
      if (k.debug) {
        this.addComponent('WiredHitBox');
      }
    },
  });

  Crafty.c('ImpassablePlayerOnly', {
    init: function () {
      this.requires('2D, Collision')
          .collision();
      if (k.debug) {
        this.addComponent('WiredHitBox');
      }
    },
  });

  Crafty.c('DynamicZ', {
    _zBonus: 0,
    init: function () {
      this.requires('2D')
          .bind('Invalidate', this._updateZ);
    },
    dynamicZ: function (zBonus) {
      this._zBonus = zBonus;
      this._updateZ();
      return this;
    },
    _updateZ: function () {
      this.z = Math.floor(this._y + this._h + this._zBonus);
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
  });

  Crafty.c('WorldEntity', {
    init: function () {
      this._children.forEach(function (e) {
        if (e.addComponent) {
          e.addComponent(this._world);
        }
      }, this);
    },
    hitInWorld: function (component) {
      var collisions = this.hit(component);

      if (collisions) {
        var remaining = collisions.filter(function (collision) {
          return collision.obj.has(this._world);
        }, this);
        if (remaining.length > 0) {
          return remaining;
        }
      }
      return false;
    },
    hide: function () {
      this.visible = false;
      return self;
    },
    show: function () {
      this.visible = true;
      return self;
    },
  });

  Crafty.c('DarkWorld', {
    playerType: 'LightPlayer',
    _world: 'DarkWorld',
    _isComplete: false,
    init: function () {
      this.requires('WorldEntity')
        .bind('LightTransition', this.hide)
        .bind('DarkTransition', this.show)
    },
    getPlayer: function () {
      return Crafty('LightPlayer').get(0);
    },
  });

  Crafty.c('LightWorld', {
    playerType: 'DarkPlayer',
    _world: 'LightWorld',
    init: function () {
      this.requires('WorldEntity')
        .bind('LightTransition', this.show)
        .bind('DarkTransition', this.hide)
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
      Crafty.audio.play("ambient", -1);
      //Crafty.audio.play("instrumental", -1);
    },
    showLight: function () {
      console.log("Light transition triggered.");
      Crafty.background('#373737');
      Crafty.viewport.follow(Crafty('DarkPlayer'), 0, 0);
      return this;
    },
    showDark: function () {
      console.log("Dark transition triggered.");
      Crafty.background('#373737');
      Crafty.viewport.follow(Crafty('LightPlayer'), 0, 0);
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

      Crafty('Tile').each(function () {
        this.z = this.y;
      });

      Crafty('Ground TileEmpty').each(function () {
        this.addComponent('Impassable');
      });

      return this;
    },
    checkGoal: function () {
      var lightGoal = Crafty('LightWorld Goal').get(0);
      var darkGoal = Crafty('DarkWorld Goal').get(0);

      this._lightDone = lightGoal.intersect(Crafty('DarkPlayer'));
      this._darkDone = darkGoal.intersect(Crafty('LightPlayer'));

      if (this._lightDone && this._darkDone && !this._isComplete) {
        console.log('Level complete.');

        this._isComplete = true;

        //Crafty.audio.pause("instrumental")
        Crafty.audio.play("zone_out");

        var nextScene = this._nextScene;

        Crafty('Player').each(function () {
          this.disableControl();
          this.pauseAnimation();
        });

        setTimeout(function () {
          Crafty.scene(nextScene);
        }, k.levelFadeOut);
      }
    },
    onComplete: function(nextScene) {
      this._nextScene = nextScene;
    },
  });
});
