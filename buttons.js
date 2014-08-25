/*
 * Defines the buttons that go up in the upper-right.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  /*
   * The mute button.
   */
  Crafty.c("MuteButton", {
    _stopped: false,
    init: function () {
      this.requires("2D, Canvas, Persist, Image, Mouse, Button")
          .image('images/audio-high.png')
          .bind('Click', this._toggleMute)
          .bind('ViewportScroll', this._onScroll)
          .attr({
            x: k.muteButtonX,
            y: k.muteButtonY,
            w: k.buttonWidth,
            h: k.buttonHeight,
            z: k.buttonZ,
          });

      this._stopped = Crafty.storage("musicStartsPaused");
      if (this._stopped) {
        this._mute();
      }
    },
    muteButton: function (manager) {
      this._manager = manager;
    },
    _onScroll: function () {
      this.x = -Crafty.viewport.x + k.muteButtonX;
      this.y = -Crafty.viewport.y + k.muteButtonY;
    },
    _toggleMute: function () {
      log('Clicked');
      if (this._stopped) {
        this._unmute();
      } else {
        this._mute();
      }
    },
    _unmute: function () {
      this._stopped = false;
      this.image('images/audio-high.png')

      Crafty.trigger('UnpauseMusic');
    },
    _mute: function () {
      this._stopped = true;
      this.image('images/audio-mute.png')

      Crafty.trigger('PauseMusic');
    },
  });

  /*
   * The level-reset button.  Should be instantiated only after the game is started.
   */
  Crafty.c("ResetButton", {
    _stopped: false,
    init: function () {
      this.requires("2D, Canvas, Persist, Image, Mouse, Button")
          .image('images/refresh.png')
          .bind('Click', this._resetScene)
          .bind('ViewportScroll', this._viewportScroll)
          .bind('SceneChange', this._sceneChange)
          .attr({
            x: k.resetButtonX,
            y: k.resetButtonY,
            w: k.buttonWidth,
            h: k.buttonHeight,
            z: k.buttonZ,
          });
    },
    _viewportScroll: function () {
      this.x = -Crafty.viewport.x + k.resetButtonX;
      this.y = -Crafty.viewport.y + k.resetButtonY;
    },
    _sceneChange: function (ev) {
      this._currentScene = ev.newScene;
    },
    _resetScene: function () {
      if (this._currentScene) {
        if (this._currentScene == 'Victory') {
          log('Resetting game.');
          Crafty.scene('Intro');
        } else {
          log('Resetting level.');
          Crafty.scene(this._currentScene);
        }
      }
    },
  });
});
