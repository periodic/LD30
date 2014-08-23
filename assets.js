/*
 * Defines and loads assets.
 */
define(['lib/crafty', 'constants'], function (Crafty, k) {
  Crafty.sprite('images/whiteguy.png', {
    'LightGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  Crafty.sprite('images/blackguy.png', {
    'DarkGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  Crafty.audio.add("ambient", "audio/ambient.mps3");
});
