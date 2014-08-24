/*
 * Global constants.  Import this file as 'k' for convenience.
 */
define({
  globalTrigger: 'Global',

  tileWidth: 32,
  tileHeight: 32,
  canvasWidthTiles: 20,
  canvasHeightTiles: 20,
  canvasWidthPx: 20 * 32,
  canvasHeightPx: 15 * 32,

  groundZLayer: 0,
  decalZLayer: 32,
  interactiveZLayer: 64,
  decorationZLayer: 100,

  characterSpeed: 2, // px / frame
  characterWidth: 21,
  characterHeight: 34,
  characterCollision: {
    xMin: 0,
    yMin: 13,
    xMax: 21,
    yMax: 34,
  },

  levelFadeOut: 1500, // ms
});
