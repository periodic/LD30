/*
 * Defines and loads assets.
 */
define(['lib/crafty', 'constants'], function (Crafty, k) {
  // Images
  Crafty.sprite('images/whiteguy.png', {
    'LightGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  Crafty.sprite('images/blackguy.png', {
    'DarkGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  
  // Audio
  Crafty.audio.add("ambient", "audio/ambient.mps3");
  Crafty.audio.add("bump", "audio/bump.mps3");
  Crafty.audio.add("dark_walk", "audio/dark_walk.mps3");
  Crafty.audio.add("zone_in", "audio/zone_in.mps3");
  Crafty.audio.add("zone_out", "audio/zone_out.mps3");
});
