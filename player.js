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
      var collisions = this.hitInWorld('Impassable');
      if (collisions) {
        // Abort
        this.attr({
          x: from.x,
          y: from.y,
        });
        return;
      }

      var collisions = this.hitInWorld('Pushable');
      if (collisions) {
        var shift_x = this.x - from.x;
        var shift_y = this.y - from.y;

        var pathIsBlocked = collisions.some(function (collision) {
          collision.obj.shift(shift_x, shift_y);
          var willCollide = collision.obj.hitInWorld('Impassable').length > 0;
          collision.obj.shift(-shift_x, -shift_y);
          return willCollide;
        });

        if (!pathIsBlocked) {
          collisions.forEach(function (collision) {
            collision.obj.shift(shift_x, shift_y);
          });
        } else {
          // Abort
          this.attr({
            x: from.x,
            y: from.y,
          });
          return;
        }
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
      this.requires('Player, LightGuy, DarkWorld')
        .bind('LightTransition', this.hide)
        .bind('DarkTransition', this.show)
        .setName('LightGuy');
      this._world = 'DarkWorld';
    },
  });

  Crafty.c('DarkPlayer', {
    init: function () {
      this.requires('Player, DarkGuy, LightWorld')
        .bind('LightTransition', this.show)
        .bind('DarkTransition', this.hide)
        .setName('DarkGuy');
      this._world = 'LightWorld';
    },
  });
});
