/*
 * Defines scenes and scene-specific setup and state.
 */
define(['lib/crafty', 'constants', 'assets', 'player'], function(Crafty, k) {

  /*
   * Creates a map, places characters and does the initial map transition.
   * |lightMap| and |darkMap| should have the loaded JSON data of their
   * respective maps.  |nextScene| is the name of the scene to transition to
   * when this map is complete.  |opt_transition| is either "Light" or "Dark" to
   * specify which map to start on.
   */
  function buildLevel(lightMap, darkMap, nextScene, opt_transition) {
    var transition = opt_transition || 'Dark';
    var map = Crafty.e('DoubleMap')
      .doubleMap(lightMap, darkMap)
      .onComplete(nextScene);

    var lightStart = Crafty('LightWorld StartPosition');
    Crafty.e('DarkPlayer').attr({
      x: lightStart.x,
      y: lightStart.y,
    });
    var darkStart = Crafty('DarkWorld StartPosition');
    Crafty.e('LightPlayer').attr({
      x: darkStart.x,
      y: darkStart.y,
    });

    Crafty.trigger(transition + 'Transition');
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

  Crafty.scene('Victory', function () {
    var loadingText = Crafty.e('2D, Canvas, Text')
      .textFont({weight: 'bold', size: '20px', align: 'center'})
      .textColor('#FFFFFF')
      .text('Victory!')
      .attr({
        x: k.canvasWidthPx / 2,
        y: k.canvasHeightPx / 2,
      });
    loadingText.x = (k.canvasWidthPx - loadingText._w) / 2;
    loadingText.y = (k.canvasHeightPx - loadingText._h) / 2;
  });

  Crafty.scene('Test', function () {
    require(['level1a', 'level1b', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Victory');
    });
  });
  
  Crafty.scene('Map_001', function () {
    require(['Light Map 1', 'Dark Map 1', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Map_002');
    });
  });
  
  Crafty.scene('Map_002', function () {
    require(['Light Map 2', 'Dark Map 2', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Victory');
    });
  });
  
  Crafty.scene('Map_003', function () {
    require(['Light Map 3', 'Dark Map 3', 'map'], function (lightMap, darkMap) {
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
