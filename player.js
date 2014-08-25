/*
 * Defines the player controlled objects.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.c('Player', {
    init: function () {
      this.requires('2D, Canvas, Fourway, Collision, SpriteAnimation, DynamicZ')
        .attr({
          w: k.characterWidth,
          h: k.characterHeight,
        })
        .fourway(k.characterSpeed)
        .bind('Moved', this.movement)
        .bind('NewDirection', this._newDirection)
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
    _initAnimations: function () {
      this.reel('WalkS', k.characterWalkAnimationDuration, [
            [0,0], [1,0], [2,0], [3,0], [4,0], [5,0],
          ])
          .reel('WalkW', k.characterWalkAnimationDuration, [
            [0,1], [1,1], [2,1], [3,1], [4,1], [5,1],
          ])
          .reel('WalkE', k.characterWalkAnimationDuration, [
            [0,2], [1,2], [2,2], [3,2], [4,2], [5,2],
          ])
          .reel('WalkN', k.characterWalkAnimationDuration, [
            [0,3], [1,3], [2,3], [3,3], [4,3], [5,3],
          ])
          .reel('Spin', k.characterWalkAnimationDuration, [
            [0,0], [0,1], [0,2], [0,3]
          ]);
    },
    _hide: function () {
      this.cancelTween();
      this.tween({alpha: 0}, k.worldFadeTime);
      this.disableControl();
      return this;
    },
    _show: function () {
      this.cancelTween();
      this.visible = true;
      this.tween({alpha: 1.0}, k.worldFadeTime);
      this.enableControl();
      return this;
    },
    _newDirection: function (direction) {
      this.pauseAnimation();
      if (direction.x == 0 && direction.y == 0) return;

      if (Math.abs(direction.x) > Math.abs(direction.y)) {
        // X is dominant.
        if (direction.x > 0) {
          this.animate('WalkE', -1);
        } else {
          this.animate('WalkW', -1);
        }
      } else {
        // Y is dominant.
        if (direction.y > 0) {
          this.animate('WalkS', -1);
        } else {
          this.animate('WalkN', -1);
        }
      }
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
        .bind('DarkFadeOutStart', this._hide)
        .bind('DarkFadeInStart', this._show)
        .setName('LightGuy')
        ._initAnimations();
      this._world = 'DarkWorld';
    },
  });

  Crafty.c('DarkPlayer', {
    init: function () {
      this.requires('Player, DarkGuy, WorldEntity')
        .bind('LightFadeOutStart', this._hide)
        .bind('LightFadeInStart', this._show)
        .setName('DarkGuy')
        ._initAnimations();
      this._world = 'LightWorld';
    },
  });
});
