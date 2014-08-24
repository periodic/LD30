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

      this.bind('SignalActive', this.activate);
      this.bind('SignalInactive', this.deactivate);
    },
    activate: function (signal) {
      if (signal != this.properties.triggerId) return;
      console.log('Activating block.', this);
      this.removeComponent('Impassable')
          .removeComponent('ImpassablePlayerOnly')
          .dynamicZ(k.decalZLayer);
      this._active = true;
      // TODO: Change appearance.
    },
    deactivate: function (signal) {
      if (signal != this.properties.triggerId) return;
      console.log('Deactivating block.');
      this.addComponent('Impassable')
          .dynamicZ(k.interactiveZLayer);
      this._active = false;
      // TODO: Change appearance.
    },
  });

  Crafty.c('Trigger', {
    init: function () {
      this.requires('2D, Collision, DynamicZ')
          .dynamicZ(k.decalZLayer)
          .bind('EnterFrame', this.checkForTrigger);
      this._active = false;

      this.properties = this.properties || {};
      this.properties.tiggerId = k.globalTrigger;
    },
    checkForTrigger: function () {
      var shouldBeActive = this.intersect(this.getPlayer());
      if (!this._active && shouldBeActive) {
        console.log('Activating signal: ', this.properties.triggerId);
        Crafty.trigger('SignalActive', this.properties.triggerId)
      }
      if (this._active && !shouldBeActive) {
        console.log('Deactivating signal: ',  this.properties.triggerId);
        Crafty.trigger('SignalInactive', this.properties.triggerId)
      }
      this._active = shouldBeActive;
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
          .bind('Invalidate', this._invalidate);
      this._topSprite = Crafty.e('PushableTop')
        .attr({
          x: this.x,
          y: this.y - k.tileHeight,
        })
      this.attach(this._topSprite);
    },
    _invalidate: function () {
      if (this.hitInWorld) {
        var holeCollisions = this.hitInWorld('Hole');
        if (holeCollisions) {
          log("I'm touching a hole!", holeCollisions);
          var consumed = holeCollisions.reduce(function (block, collision) {
            if (!block) return null;
            if (Math.abs(collision.overlap) >= 28) {
              collision.obj.consume(block);
              return null;
            }
            return block;
          }, this);

          if (consumed) return;
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
      log("Nom, nom, blocks.", this, block);
      if (this._world == 'LightWorld') {
        this.addComponent('LightHoleFull');
      } else {
        this.addComponent('DarkHoleFull');
      }
      this.removeComponent('ImpassablePlayerOnly')
          .removeComponent('DarkHoleEmpty')
          .removeComponent('LightHoleEmpty');

      block.destroy();
    },
  });
});
