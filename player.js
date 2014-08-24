/*
 * Defines the player controlled objects.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.c('Player', {
    init: function () {
      this.requires('2D, Canvas, Fourway, Collision, DynamicZ')
        .attr({
          w: k.characterWidth,
          h: k.characterHeight,
        })
        .fourway(2.5)
        .bind('Moved', this.movement)
        .collision(
          [k.characterCollision.xMin, k.characterCollision.yMin],
          [k.characterCollision.xMin, k.characterCollision.yMax],
          [k.characterCollision.xMax, k.characterCollision.yMax],
          [k.characterCollision.xMax, k.characterCollision.yMin]
          )
        .dynamicZ(k.interactiveZLayer);
      this.bumpSound = limitSound('bump', 500);

      if (k.debug) {
        this.addComponent('WiredHitBox');
      }
    },
    _show: function () {
      this.alpha = 1.0;
      this.enableControl();
      this.dynamicZ(k.interactiveZLayer);
    },
    _hide: function () {
      this.alpha = 0.6;
      this.disableControl();
      this.dynamicZ(k.decalZLayer + 1);
    },
    movement: function (from) {
      var collisions = this.hitInWorld('ImpassablePlayerOnly');

      if (collisions) {
        // Abort
        var collidingOnlyEmpties = collisions.every(function (collision) {
          return collision.obj.has("TileEmpty");
        })
        if (!collidingOnlyEmpties){
          this.bumpSound();
        }
        this.attr({
          x: from.x,
          y: from.y,
        });
        return;
      }

      collisions = this.hitInWorld('Pushable');
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
            collision.obj.trigger('Moved');
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
  });

  Crafty.c('LightPlayer', {
    init: function () {
      this.requires('Player, LightGuy, WorldEntity')
        .bind('LightTransition', this._hide)
        .bind('DarkTransition', this._show)
        .setName('LightGuy');
      this._world = 'DarkWorld';
    },
  });

  Crafty.c('DarkPlayer', {
    init: function () {
      this.requires('Player, DarkGuy, WorldEntity')
        .bind('LightTransition', this._show)
        .bind('DarkTransition', this._hide)
        .setName('DarkGuy');
      this._world = 'LightWorld';
    },
  });
});
