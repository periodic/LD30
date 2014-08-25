/*
 * An audio manager to prevent sound overlap.
 */

define(['lib/crafty'], function () {
  /*
   * The mute button.
   */
  Crafty.c("MuteButton", {
    _stopped: false,
    init: function () {
      this.requires("2D, Canvas, Persist, Image, Mouse")
          .image('images/audio-high.png')
          .bind('Click', this._toggleMute)
          .bind('ViewportScroll', this._onScroll)
          .attr({
            x: 0,
            y: 0,
            w: 32,
            h: 32,
          });
    },
    muteButton: function (manager) {
      this._manager = manager;
    },
    _onScroll: function () {
      this.x = -Crafty.viewport.x;
      this.y = -Crafty.viewport.y;
    },
    _toggleMute: function () {
      log('Clicked');
      if (this._stopped) {
        this._stopped = false;
        this._manager.play('instrumental');
        this.image('images/audio-high.png')
      } else {
        this._stopped = true;
        this._manager.stop('instrumental');
        this.image('images/audio-mute.png')
      }
    },
  });


  Crafty.c('AudioManager', {
    _soundsPlaying: {},
    init: function () {
      this.one('EnterFrame', this._createMuteButton);
    },
    _createMuteButton: function () {
      this._muteButton = Crafty.e('MuteButton').muteButton(this);
    },
    playOnce: function (soundId) {
      log('Playing ' + soundId);
      Crafty.audio.play(soundId, 1);
      return this;
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
