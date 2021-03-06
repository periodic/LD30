/*
 * Global constants.  Import this file as 'k' for convenience.
 */
define({
  globalTrigger: 'Global',

  buttonWidth: 32,
  buttonHeight: 32,
  buttonZ: 9001,
  muteButtonX: 640 - (32 + 8),
  muteButtonY: 512 - (32 + 8),
  resetButtonX: 640 - (32 + 8) * 2,
  resetButtonY: 512 - (32 + 8),

  tileWidth: 64,
  tileHeight: 64,
  canvasWidthTiles: 10,
  canvasHeightTiles: 8,
  canvasWidthPx: 640,
  canvasHeightPx: 512,

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

  blockCollision: {
    xMin: 6,
    yMin: 6,
    xMax: 58,
    yMax: 58,
  },

  worldTransitionTime: 500, // ms
  worldFadeTime: 250, // ms
  levelFadeOut: 1500, // ms

  debug: false,
});
