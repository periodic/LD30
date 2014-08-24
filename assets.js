/*
 * Defines and loads assets and supporting fuctions.
 */

// Limits the rate at which a sound can be played
function limitSound(sound_id, delay_ms) {
  var time = Date.now();

  return function () {
    if (Date.now() > time + delay_ms) {
      time = Date.now();
      Crafty.audio.play(sound_id);
    }
  };
}

// Defines needed assets
define(['lib/crafty', 'constants'], function (Crafty, k) {
  // Images
  Crafty.sprite('images/whiteguy.png', {
    'LightGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  Crafty.sprite('images/blackguy.png', {
    'DarkGuy': [0, 0, k.characterWidth, k.characterHeight],
  });
  
  // Audio
  Crafty.audio.add("ambient", "audio/ambient.mp3");
  Crafty.audio.add("bump", "audio/bump.wav");
  Crafty.audio.add("dark_walk", "audio/dark_walk.wav");
  Crafty.audio.add("zone_in", "audio/zone_in.wav");
  Crafty.audio.add("zone_out", "audio/zone_out.wav");
});



