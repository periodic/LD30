define(['lib/crafty', 'constants', 'lib/tiledmapbuilder', 'props'], function (Crafty, k) {
  Crafty.c('Goal', {
    init: function () {
      this.requires('2D, Collision')
          .collision(
            [k.characterCollision.xMin, k.characterCollision.yMin],
            [k.characterCollision.xMin, k.characterCollision.yMax],
            [k.characterCollision.xMax, k.characterCollision.yMax],
            [k.characterCollision.xMax, k.characterCollision.yMin]
            );
      if (k.debug) {
        this.addComponent('WiredHitBox');
      }
    },
  });

  Crafty.c('LightGoal', {
    init: function () {
      this.requires('2D, Canvas, SpriteAnimation, LightPortal, LightWorld')
          .reel('Bob', k.portalAnimationDuration, 0, 0, 4)
          .animate('Bob', -1);
    },
  });

  Crafty.c('DarkGoal', {
    init: function () {
      this.requires('2D, Canvas, SpriteAnimation, DarkPortal, DarkWorld')
          .reel('Bob', k.portalAnimationDuration, 0, 0, 4)
          .animate('Bob', -1);
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
      this.requires("Tween");
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
      this.cancelTween();
      this.tween({alpha: 0}, k.worldFadeTime);
      return this;
    },
    show: function () {
      this.cancelTween();
      this.visible = true;
      this.tween({alpha: 1.0}, k.worldFadeTime);

      return this;
    },
  });

  Crafty.c('DarkWorld', {
    playerType: 'LightPlayer',
    _world: 'DarkWorld',
    _isComplete: false,
    init: function () {
      this.requires('WorldEntity')
        .bind('DarkFadeInStart', this.show)
        .bind('DarkFadeOutStart', this.hide)
        .bind('DarkFadeOutEnd', function () {
          this.visible = false;
        });
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
        .bind('LightFadeInStart', this.show)
        .bind('LightFadeOutStart', this.hide)
        .bind('LightFadeOutEnd', function () {
          this.visible = false;
        });
    },
    getPlayer: function () {
      return Crafty('DarkPlayer').get(0);
    },
  });

  Crafty.c('DoubleMap', {
    _transitionsEnabled: false,
    init: function () {
      this.requires('2D,Keyboard');
      this.bind('LightTransition', this.showLight);
      this.bind('DarkTransition', this.showDark);

      this.bind('DarkFadeInEnd', this._enableTransitions);
      this.bind('LightFadeInEnd', this._enableTransitions);

      this.bind('EnterFrame', this.checkGoal);

      this._lightDone = false;
      this._darkDone = false;
    },
    _enableTransitions: function () {
      this.bind('KeyDown', this.swap);
    },
    _disableTransitions: function () {
      this.unbind('KeyDown', this.swap);
    },
    showLight: function () {
      log("Starting light transition.");
      this._disableTransitions();

      Crafty.viewport.centerOn(Crafty('DarkPlayer'), k.worldTransitionTime);
      Crafty.trigger('DarkFadeOutStart');

      setTimeout(function () {
        Crafty.trigger('DarkFadeOutEnd');
        Crafty.trigger('LightFadeInStart');
      }, k.worldFadeTime);

      setTimeout(function () {
        Crafty.trigger('LightFadeInEnd');
        Crafty.viewport.follow(Crafty('DarkPlayer'), 0, 0);
      }, k.worldTransitionTime);
      return this;
    },
    showDark: function () {
      log("Starting dark transition.");
      this._disableTransitions();

      Crafty.viewport.centerOn(Crafty('LightPlayer'), k.worldTransitionTime);
      Crafty.trigger('LightFadeOutStart');

      setTimeout(function () {
        Crafty.trigger('LightFadeOutEnd');
        Crafty.trigger('DarkFadeInStart');
      }, k.worldFadeTime);

      setTimeout(function () {
        Crafty.trigger('DarkFadeInEnd');
        Crafty.viewport.follow(Crafty('LightPlayer'), 0, 0);
      }, k.worldTransitionTime);
      return this;
    },
    swap: function () {
      if (this.isDown('SPACE')) {
        Crafty.trigger(this._light.visible ? 'DarkTransition' : 'LightTransition');
      }
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
        this._disableTransitions();

        Crafty.audio.play("zone_out");

        var nextScene = this._nextScene;

        Crafty('Player').each(function () {
          this.disableControl();
          this.animate('Spin', 2);
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
