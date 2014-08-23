/*
 * Defines the player controlled objects.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.c('Player', {
    init: function () {
      this.requires('2D, Canvas, Fourway')
      .attr({
        w: k.characterWidth,
        h: k.characterHeight,
      })
      .fourway(2)
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
  });

  Crafty.c('LightPlayer', {
    init: function () {
      this.requires('Player, LightGuy')
        .bind('LightTransition', this.show)
        .bind('DarkTransition', this.hide)
        .setName('LightGuy');
    },
  });

  Crafty.c('DarkPlayer', {
    init: function () {
      this.requires('Player, DarkGuy')
        .bind('LightTransition', this.hide)
        .bind('DarkTransition', this.show)
        .setName('DarkGuy');
    },
  });
});
