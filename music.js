/*
 * An audio manager to prevent sound overlap.
 */

define(['lib/crafty', 'constants'], function (Crafty, k) {
  Crafty.c('MusicManager', {
    _loaded: false,
    _paused: false,
    init: function () {
      this.requires("Storage");
      this.bind('PauseMusic', this._pauseMusic);
      this.bind('UnpauseMusic', this._unpauseMusic);
    },
    musicManager: function (soundId) {
      this._soundId = soundId
      return this;
    },
    start: function () {
      log('Starting music.');
      if (!this._loaded) {
        log('Playing ' + this._soundId);
        Crafty.audio.play(this._soundId, -1);
        this._loaded = true;
      }
    },
    _pauseMusic: function () {
      log('Pausing ' + this._soundId);
      Crafty.audio.pause(this._soundId);
      this._paused = true;
      Crafty.storage("musicStartsPaused", true);
    },
    _unpauseMusic: function () {
      log('Unpausing ' + this._soundId);
      Crafty.audio.unpause(this._soundId);
      this._paused = false;
      Crafty.storage("musicStartsPaused", false);
    },
  });
});
