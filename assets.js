/*
 * Defines and loads assets.
 */
define(['lib/crafty', 'constants'], function (Crafty, k) {
  // Images
  Crafty.sprite('images/fatcatwhite.png', {
    'LightGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  Crafty.sprite('images/fatcatblack.png', {
    'DarkGuy': [0, 0, k.characterWidth, k.characterHeight],
  });

  Crafty.sprite(k.tileWidth, k.tileHeight, 'images/tileset2.png', {
    'DarkHole': [0, 1],
    'DarkHoleFull': [1, 1],
    'LightHole': [2, 1],
    'LightHoleFull': [3, 1],
    'MovableBlockTop': [4, 0],
    'MovableBlockBottom': [4, 1],
  });
  
  // Audio
  Crafty.audio.add("ambient", "audio/ambient.mps3");
  Crafty.audio.add("bump", "audio/bump.mps3");
  Crafty.audio.add("dark_walk", "audio/dark_walk.mps3");
  Crafty.audio.add("zone_in", "audio/zone_in.mps3");
  Crafty.audio.add("zone_out", "audio/zone_out.mps3");
});
