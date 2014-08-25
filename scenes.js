/*
 * Defines scenes and scene-specific setup and state.
 */
define(['lib/crafty', 'constants', 'assets', 'player', 'map'], function(Crafty, k) {

  /*
   * Creates a map, places characters and does the initial map transition.
   * |lightMap| and |darkMap| should have the loaded JSON data of their
   * respective maps.  |nextScene| is the name of the scene to transition to
   * when this map is complete.  |opt_transition| is either "Light" or "Dark" to
   * specify which map to start on.
   */
  function buildLevel(lightMap, darkMap, nextScene, opt_transition) {
    var transition = opt_transition || 'Light';
    var map = Crafty.e('DoubleMap')
      .doubleMap(lightMap, darkMap)
      .onComplete(nextScene);

    var lightStart = Crafty('LightWorld StartPosition');
    Crafty.e('DarkPlayer').attr({
      x: lightStart.x,
      y: lightStart.y - k.characterCollision.yMin,
    });

    var darkStart = Crafty('DarkWorld StartPosition');
    Crafty.e('LightPlayer').attr({
      x: darkStart.x,
      y: darkStart.y - k.characterCollision.yMin,
    });

    var lightGoal = Crafty('LightWorld Goal');
    var lightPortal = Crafty.e('LightGoal');
    lightPortal.attr({
      x: lightGoal.x + (lightGoal.w - lightPortal.w) / 2,
      y: lightGoal.y + (lightGoal.h - k.portalHeight - k.portalCollision.yMin) / 2,
      z: lightGoal.y + lightGoal.h,
    });

    var darkGoal = Crafty('DarkWorld Goal');
    var darkPortal = Crafty.e('DarkGoal');
    darkPortal.attr({
      x: darkGoal.x + (darkGoal.w - darkPortal.w) / 2,
      y: darkGoal.y + (darkGoal.h - k.portalHeight - k.portalCollision.yMin) / 2,
      z: darkGoal.y + darkGoal.h,
    });

    Crafty.background('#373737');
    Crafty.trigger(transition + 'Transition');
    Crafty.audio.play("zone_in", 1);
  }

  Crafty.scene('Loading', function (nextScene, assetList) {
    var loadingText = Crafty.e('2D, Canvas, Text')
      .textFont({weight: 'bold', size: '20px', align: 'center'})
      .textColor('#FFFFFF')
      .text('Loading...')
      .attr({
        x: k.canvasWidthPx / 2,
        y: k.canvasHeightPx / 2,
      });
    loadingText.x = (k.canvasWidthPx - loadingText._w) / 2;
    loadingText.y = (k.canvasHeightPx - loadingText._h) / 2;

    require(assetList, function () {
      Crafty.scene(nextScene);
    });
  });

  Crafty.c('CenterText', {
    init: function () {
      this.requires('2D, Canvas, Text')
          .textFont({weight: 'bold', size: '16px', align: 'center'})
          .textColor('#FFFFFF');
    },
    centerHorizontal: function () {
      this.x = (k.canvasWidthPx - this._w) / 2;
      return this;
    },
    centerVertical: function () {
      this.y = (k.canvasHeightPx - this._h) / 2;
      return this;
    }
  });
  Crafty.scene('Victory', function () {
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;

    var centerX = k.canvasWidthPx / 2;
    var loadingText = Crafty.e('CenterText')
      .textFont({size: '20px'})
      .text('Victory!')
      .centerHorizontal()
      .centerVertical();

    var broughtToYou = Crafty.e('CenterText')
      .text('Brought to you by Team Rollo')
      .attr({y: loadingText.y + 40})
      .centerHorizontal();

    var art = Crafty.e('CenterText')
      .text('Art: Zoe Patrick')
      .attr({y: broughtToYou.y + 40})
      .centerHorizontal();
    var design = Crafty.e('CenterText')
      .text('Design: Brian Torrence, Lindsay Haven')
      .attr({y: broughtToYou.y + 60})
      .centerHorizontal();
    var engineering = Crafty.e('CenterText')
      .text('Engineering: Drew Haven')
      .attr({y: broughtToYou.y + 80})
      .centerHorizontal();
    var sound = Crafty.e('CenterText')
      .text('Sound: Lindsay Haven')
      .attr({y: broughtToYou.y + 100})
      .centerHorizontal();
    var production = Crafty.e('CenterText')
      .text('Production: Lindsay Haven')
      .attr({y: broughtToYou.y + 120})
      .centerHorizontal();

    var particleOptions = {
      maxParticles: 80,
      size: 10,
      sizeRandom: 2,
      speed: 5,
      speedRandom: 1.2,
      // Lifespan in frames
      lifeSpan: 200,
      lifeSpanRandom: 50,
      // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
      angle: 0,
      angleRandom: 20,
      startColour: [255, 131, 0, 1],
      startColourRandom: [48, 50, 45, 0],
      endColour: [245, 35, 0, 0],
      endColourRandom: [60, 60, 60, 0],
      // Only applies when fastMode is off, specifies how sharp the gradients are drawn
      sharpness: 50,
      sharpnessRandom: 10,
      // Random spread from origin
      spread: 5,
      // How many frames should this last
      duration: -1,
      // Will draw squares instead of circle gradients
      fastMode: false,
      gravity: { x: 0, y: 0.1 },
      // sensible values are 0-3
      jitter: 0
    }
    var leftParticles = Crafty.e('2D, Canvas, Particles')
      .particles(particleOptions)
      .attr({
        x: loadingText.x - 50,
        y: loadingText.y + loadingText.h,
      });
    var rightParticles = Crafty.e('2D, Canvas, Particles')
      .particles(particleOptions)
      .attr({
        x: loadingText.x + loadingText.w + 50,
        y: loadingText.y + loadingText.h,
      });
  });

  Crafty.scene('Test', function () {
    require(['Light Test', 'Dark Test'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Victory');
    });
  });

  Crafty.scene('Map_001', function () {
    require(['Light Map 1', 'Dark Map 1'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Map_002');
    });
  });

  Crafty.scene('Map_002', function () {
    require(['Light Map 2', 'Dark Map 2'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Map_003');
    });
  });

  Crafty.scene('Map_003', function () {
    require(['Light Map 3', 'Dark Map 3'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Map_004');
    });
  });

  Crafty.scene('Map_004', function () {
    require(['Light Map 4', 'Dark Map 4'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Victory');
    });
  });

  Crafty.scene('Map_Walking_Test', function () {
    require(['walking_test_map_light', 'walking_test_map_dark', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Victory');
    });
  });

  Crafty.scene('LongWalk', function () {
    require(['LongWalkLight', 'LongWalkDark'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Victory');
    });
  });

  return {
    loading: 'Loading',
    map1: 'Map_001',
    map2: 'Map_002',
    victory: 'Victory',
  };
})
