/*
 * Global constants.  Import this file as 'k' for convenience.
 */
define({
  globalTrigger: 'Global',

  buttonWidth: 32,
  buttonHeight: 32,
  muteButtonX: 8,
  muteButtonY: 8,
  resetButtonX: 48,
  resetButtonY: 8,

  tileWidth: 64,
  tileHeight: 64,
  canvasWidthTiles: 10,
  canvasHeightTiles: 8,
  canvasWidthPx: 10 * 64,
  canvasHeightPx: 8 * 64,

  groundZLayer: 0,
  decalZLayer: 64,
  interactiveZLayer: 128,
  decorationZLayer: 256,

  characterSpeed: 4, // px / frame
  characterWidth: 40,
  characterHeight: 68,
  characterCollision: {
    xMin: 0,
    yMin: 26,
    xMax: 42,
    yMax: 68,
  },
  characterWalkAnimationDuration: 600, // ms

  portalHeight: 98,
  portalWidth: 42,
  portalCollision: {
    xMin: 0,
    yMin: 98 - 22,
    xMax: 42,
    yMax: 98,
  },
  portalOffset: 32,
  portalAnimationDuration: 800, // ms

  worldTransitionTime: 250, // ms
  worldFadeTime: 125, // ms
  levelFadeOut: 1500, // ms

  debug: false,
});
