/*
 * Sets up the game and global state.
 */
define(['constants', 'scenes', 'music', 'buttons'], function(k, scenes) {
  Crafty.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.clampToEntities = true;

  Crafty.e("MusicManager").musicManager('instrumental').start();
  Crafty.e("MuteButton");
  Crafty.e("ResetButton");

  Crafty.scene('TitleScreen');
})
