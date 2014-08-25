/*
 * Sets up the game and global state.
 */
define(['constants', 'scenes', 'audio'], function(k, scenes, audio) {
  Crafty.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.clampToEntities = true;

  Crafty.e("ResetButton");

  Crafty.scene(scenes.loading, 'Map_001', ['level1a', 'level1b']);
})
