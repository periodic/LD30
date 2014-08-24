/*
 * Defines various environmental prop behaviors.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.c('ToggleBlock', {
    init: function () {
      this.requires('2D, Canvas'); // , Impassable');
      if (this.properties && this.properties.triggerId) {
        this.addComponent('Trigger_' + this.properties.triggerId);
      }
      this.active = false;
      console.log('Created toggleblock: ', this);
    },
    activate: function () {
      this.removeComponent('Impassable');
      this.active = true;
      // TODO: Change appearance.
    },
    deactivate: function () {
      this.addComponent('Impassable');
      this.active = false;
      // TODO: Change appearance.
    },
  });

  Crafty.c('Trigger', {
    init: function () {
      this.requires('2D, Collision')
        .bind('EnterFrame', this.checkForTrigger);
      this._active = false;
      this._triggerId = this.properties && this.properties.triggerId
                      ? this.properties.triggerId 
                      : k.globalTrigger;
      console.log('Created trigger: ', this);
    },
    checkForTrigger: function () {
      if (!this._active && this.intersect(this.getPlayerType)) {
        console.log('Triggering: ', this._triggerId);
        Crafty('Trigger_' + this._triggerId).each(function () {
          this.activate();
        });
      }
      if (this._active && !this.intersect(this.getPlayerType)) {
        console.log('Untriggering: ', this._triggerId);
        Crafty('Trigger_' + this._triggerId).each(function () {
          this.deactivate();
        });
      }
    },
  });
});
