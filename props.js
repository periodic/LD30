/*
 * Defines various environmental prop behaviors.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.c('ToggleBlock', {
    init: function () {
      this.requires('2D, Canvas, Impassable');
      this._active = false;

      this.properties = this.properties || {};
      this.properties.tiggerId = k.globalTrigger;

      this.bind('SignalActive', this.activate);
      this.bind('SignalInactive', this.deactivate);
    },
    activate: function (signal) {
      if (signal != this.properties.triggerId) return;
      console.log('Activating block.');
      this.removeComponent('Impassable');
      this._active = true;
      // TODO: Change appearance.
    },
    deactivate: function (signal) {
      if (signal != this.properties.triggerId) return;
      console.log('Deactivating block.');
      this.addComponent('Impassable');
      this._active = false;
      // TODO: Change appearance.
    },
  });

  Crafty.c('Trigger', {
    init: function () {
      this.requires('2D, Collision')
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

  Crafty.c('Pushable', {
    init: function () {
      this.requires('2D, Collision');
    },
  });
});
