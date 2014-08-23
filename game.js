/*
 * Sets up the game and global state.
 */
define(['constants', 'scenes'], function(k, scenes) {
  Crafty.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.background('black');
  Crafty.viewport.init(k.canvasWidthPx, k.canvasHeightPx);
  Crafty.viewport.clampToEntities = true;

  scenes.loading();
})
