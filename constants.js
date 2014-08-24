/*
 * Global constants.  Import this file as 'k' for convenience.
 */
define({
  globalTrigger: 'Global',

  tileWidth: 64,
  tileHeight: 64,
  canvasWidthTiles: 10,
  canvasHeightTiles: 8,
  canvasWidthPx: 10 * 64,
  canvasHeightPx: 8 * 64,

  groundZLayer: 0,
  decalZLayer: 32,
  interactiveZLayer: 64,
  decorationZLayer: 100,

  characterSpeed: 4, // px / frame
  characterWidth: 42,
  characterHeight: 68,
  characterCollision: {
    xMin: 0,
    yMin: 26,
    xMax: 42,
    yMax: 68,
  },

  levelFadeOut: 1500, // ms
});
