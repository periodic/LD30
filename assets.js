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
  Crafty.sprite(42, 72, 'images/fatblackcat-walk.png', {
    'DarkGuy': [0, 0],
  });

  Crafty.sprite(42, 68, 'images/fatwhitecat-walk.png', {
    'LightGuy': [0, 0],
  });

  Crafty.sprite(42, 94, 'images/portal-light-animation.png', {
    'LightPortal': [0,0],
  });

  Crafty.sprite(42, 94, 'images/portal-dark-animation.png', {
    'DarkPortal': [0,0],
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
  Crafty.audio.add("ambient", "audio/ambient.wav");
  Crafty.audio.add("instrumental", "audio/instrumental.ogg");
  Crafty.audio.add("bump", "audio/bump.wav");
  Crafty.audio.add("dark_walk", "audio/dark_walk.wav");
  Crafty.audio.add("zone_in", "audio/zone_in.wav");
  Crafty.audio.add("zone_out", "audio/zone_out.wav");
});



