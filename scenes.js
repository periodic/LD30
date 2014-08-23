/*
 * Defines scenes and scene-specific setup and state.
 */
define(['lib/crafty', 'constants', 'assets', 'player'], function(Crafty, k) {

  function buildLevel(lightMap, darkMap, nextScene) {
    var map = Crafty.e('DoubleMap')
      .doubleMap(lightMap, darkMap)
      .onComplete(nextScene);

    var lightStart = Crafty('LightWorld StartPosition').addComponent('LightPlayer');
    var darkStart = Crafty('DarkWorld StartPosition').addComponent('DarkPlayer');

    Crafty.trigger('LightTransition');
  }

  Crafty.scene('Loading', function (nextScene, assetList) {
    Crafty.background('black');
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

  Crafty.scene('Test', function () {
    require(['level1a', 'level1b', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'insertNextLevelHere');
    });
  });

  Crafty.scene('Map_001', function () {
    require(['Dark Map 1', 'Light Map 1', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'insertNextLevelHere');
    });
  });

  return {
    loading: 'Loading',
    test: 'Test',
  };
})
