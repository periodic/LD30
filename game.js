/*
 * Sets up the game and global state.
 */
define(['constants', 'scenes'], function(k, scenes) {
  Crafty.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.clampToEntities = true;

  Crafty.scene(scenes.loading, 'Map_001', ['level1a', 'level1b']);
})
