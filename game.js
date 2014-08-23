/*
 * Sets up the game and global state.
 */
define(['constants', 'scenes'], function(k, scenes) {
  Crafty.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.background('black');
  Crafty.viewport.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.clampToEntities = true;

  Crafty.scene(scenes.loading, scenes.test, ['level1a', 'level1b']);
})
