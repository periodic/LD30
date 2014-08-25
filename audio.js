/*
 * An audio manager to prevent sound overlap.
 */

define(['lib/crafty'], function () {

  Crafty.c('AudioManager', {
    _soundsPlaying: {},
    init: function () {
    },
    play: function (soundId) {
      if (!this._soundsPlaying[soundId]) {
        log('Playing ' + soundId);
        Crafty.audio.play(soundId, -1);
        this._soundsPlaying[soundId] = 'playing';
      }
      return this;
    },
    pause: function (soundId) {
      if (this._soundsPlaying[soundId] == 'playing') {
        log('Pausing ' + soundId);
        Crafty.audio.pause(soundId);
        this._soundsPlaying[soundId] = 'paused';
      }
      return this;
    },
    unpause: function (soundId) {
      if (this._soundsPlaying[soundId] == 'paused') {
        log('Unpausing ' + soundId);
        Crafty.audio.unpause(soundId);
        this._soundsPlaying[soundId] = 'playing';
      }
      return this;
    },
    stop: function (soundId) {
      if (this._soundsPlaying[soundId]) {
        log('Stopping ' + soundId);
        Crafty.audio.stop(soundId);
        this._soundsPlaying[soundId] = false;
      }
      return this;
    },
  });

  return Crafty.e('AudioManager');
});
