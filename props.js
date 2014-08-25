/*
 * Defines various environmental prop behaviors.
 */
define(['lib/crafty', 'constants', 'assets'], function(Crafty, k) {
  Crafty.c('ToggleBlock', {
    init: function () {
      this.requires('2D, Canvas, Impassable, DynamicZ')
          .dynamicZ(k.interactiveZLayer);
      this._active = false;

      this.properties = this.properties || {};
      this.properties.tiggerId = k.globalTrigger;

      this.bind('SignalActive', this._activate);
      this.bind('SignalInactive', this._deactivate);

      if (k.debug) {
        this.addComponent('WiredHitBox');
      }
    },
    _activate: function (signal) {
      if (signal != this.properties.triggerId) return;
      console.log('Activating block.');
      this.removeComponent('Impassable')
          .removeComponent('ImpassablePlayerOnly')
          .dynamicZ(k.decalZLayer);
      this._active = true;
      if (this._world == 'DarkWorld') {
        this.removeComponent('DarkBlockInactive')
            .addComponent('DarkBlockActive');
      } else {
        this.removeComponent('LightBlockInactive')
            .addComponent('LightBlockActive');
      }
    },
    _deactivate: function (signal) {
      if (signal != this.properties.triggerId) return;
      console.log('Deactivating block.');
      this.addComponent('Impassable')
          .dynamicZ(k.interactiveZLayer);
      this._active = false;
      if (this._world == 'DarkWorld') {
        this.removeComponent('DarkBlockActive')
            .addComponent('DarkBlockInactive');
      } else {
        this.removeComponent('LightBlockActive')
            .addComponent('LightBlockInactive');
      }
    },
  });

  Crafty.c('Trigger', {
    init: function () {
      this.requires('2D, Collision, DynamicZ')
          .collision()
          .dynamicZ(k.decalZLayer)
          .bind('EnterFrame', this.checkForTrigger)
          .bind('SignalActive', this._activate)
          .bind('SignalInactive', this._deactivate);

      this._active = false;

      this.properties = this.properties || {};
      this.properties.tiggerId = k.globalTrigger;
    },
    checkForTrigger: function () {
      var shouldBeActive = this.hit(this.playerType);
      if (!this._active && shouldBeActive) {
        console.log('Activating signal: ', this.properties.triggerId);
        Crafty.trigger('SignalActive', this.properties.triggerId);
      }
      if (this._active && !shouldBeActive) {
        Crafty.trigger('SignalInactive', this.properties.triggerId);
        console.log('Deactivating signal: ',  this.properties.triggerId);
      }
      this._active = shouldBeActive;
    },
    _activate: function (signal) {
      if (signal != this.properties.triggerId) return;
      if (this._world == 'DarkWorld') {
        this.removeComponent('DarkTriggerInactive')
            .addComponent('DarkTriggerActive');
      } else {
        this.removeComponent('LightTriggerInactive')
            .addComponent('LightTriggerActive');
      }
    },
    _deactivate: function (signal) {
      if (signal != this.properties.triggerId) return;
      if (this._world == 'DarkWorld') {
        this.removeComponent('DarkTriggerActive')
            .addComponent('DarkTriggerInactive');
      } else {
        this.removeComponent('LightTriggerActive')
            .addComponent('LightTriggerInactive');
      }
    },
  });

  Crafty.c('PushableTop', {
    init: function () {
      this.requires('2D, Canvas, Collision, MovableBlockTop, DynamicZ')
          .dynamicZ(k.decorationZLayer)
          .attr({
            w: k.tileWidth,
            h: k.tileHeight,
          });
    },
  });

  Crafty.c('Pushable', {
    init: function () {
      this.requires('2D, Canvas, Collision, DynamicZ, MovableBlockBottom')
          .dynamicZ(k.interactiveZLayer)
          .collision(
            [k.blockCollision.xMin, k.blockCollision.yMin],
            [k.blockCollision.xMin, k.blockCollision.yMax],
            [k.blockCollision.xMax, k.blockCollision.yMax],
            [k.blockCollision.xMax, k.blockCollision.yMin])
          .bind('Invalidate', this._invalidate)
          .timeout(this._checkForMovement, 200);
      this._topSprite = Crafty.e('PushableTop')
        .attr({
          x: this.x,
          y: this.y - k.tileHeight,
        })
      this.attach(this._topSprite);

      if (k.debug) {
        this.addComponent('WiredHitBox');
      }
    },
    _checkForMovement: function () {
      if (this._oldX && this._oldY && (this._oldX != this._x || this._oldY != this._y)) {
        if (!this._moving) {
          this._moving = true;
          Crafty.audio.play('block_push', -1);
        }
      } else {
        if (this._moving) {
          this._moving = false;
          Crafty.audio.stop('block_push');
        }
      }
      if (this._oldX != this._x || this._oldY != this._y) {
        this._oldX = this._x;
        this._oldY = this._y;
        console.log(this._oldX, this._oldY);
      }
      this.timeout(this._checkForMovement, 200);
    },
    _invalidate: function () {
      if (this.hitInWorld) {
        var holeCollisions = this.hitInWorld('Hole');
        if (holeCollisions) {
          var consumed = holeCollisions.reduce(function (block, collision) {
            if (!block) return null;
            if (Math.abs(collision.overlap) >= 28) {
              collision.obj.consume(block);
              return null;
            }
            return block;
          }, this);

          if (consumed) {
            Crafty.audio.stop('block_push');
          }
        }
      }
    },
  });

  Crafty.c('Hole', {
    init: function () {
      this.requires('2D, Canvas, Collision, DynamicZ, ImpassablePlayerOnly')
          .dynamicZ(k.decalZLayer);
    },
    consume: function (block) {
      if (this._world == 'LightWorld') {
        this.addComponent('LightHoleFull');
      } else {
        this.addComponent('DarkHoleFull');
      }
      this.removeComponent('ImpassablePlayerOnly')
          .removeComponent('Hole')
          .removeComponent('DarkHoleEmpty')
          .removeComponent('LightHoleEmpty');

      Crafty.audio.play('block_drop');
      block.destroy();
    },
  });
});
