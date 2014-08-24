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
      if (this.hit('Impassable')) {
        this.attr({
          x: from.x,
          y: from.y,
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
      this._world = 'LightWorld';
    },
  });

  Crafty.c('DarkPlayer', {
    init: function () {
      this.requires('Player, DarkGuy')
        .bind('LightTransition', this.hide)
        .bind('DarkTransition', this.show)
        .setName('DarkGuy');
      this._world = 'DarkWorld';
    },
  });
});
