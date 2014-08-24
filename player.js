/*
 * Defines the player controlled objects.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.c('Player', {
    init: function () {
      this.requires('2D, Canvas, Fourway, Collision')
      .attr({
        w: k.characterWidth,
        h: k.characterHeight,
      })
      .fourway(2)
      .bind('Moved', this.movement)
      //.onHit('TileEmpty', this.stopMovement)
      //.onHit('Impassable', this.stopMovement);
    },
    show: function () {
      this.alpha = 1.0;
      this.z = k.activeZLayer;
      this.enableControl();
    },
    hide: function () {
      this.alpha = 0.3;
      this.z = k.inactiveZLayer;
      this.disableControl();
    },
    movement: function (from) {
      var collisions = this.hit('Impassable');
      if (collisions) {
        var inWorld = collisions.some(function (collision) {
          return collision.obj.has(this._world);
        }, this);
        if (inWorld) {
          this.attr({
            x: from.x,
            y: from.y,
          });
          return;
        }
      }
      var collisions = this.hit('Pushable');
      if (collisions) {
        var inWorldCollisions = collisions.filter(function (collision) {
          return collision.obj.has(this._world);
        }, this);
        var shift_x = this.x - from.x;
        var shift_y = this.y - from.y;
        inWorldCollisions.forEach(function (collision) {
          collision.obj.shift(shift_x, shift_y);
        });
      }
    },
    stopMovement: function () {
      this._speed = 0;
      if (this._movement) {
        this.x -= this._movement.x;
        this.y -= this._movement.y;
      }
    },
  });

  Crafty.c('LightPlayer', {
    init: function () {
      this.requires('Player, LightGuy')
        .bind('LightTransition', this.show)
        .bind('DarkTransition', this.hide)
        .setName('LightGuy');
      this._world = 'DarkWorld';
    },
  });

  Crafty.c('DarkPlayer', {
    init: function () {
      this.requires('Player, DarkGuy')
        .bind('LightTransition', this.hide)
        .bind('DarkTransition', this.show)
        .setName('DarkGuy');
      this._world = 'LightWorld';
    },
  });
});
