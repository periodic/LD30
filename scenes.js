/*
 * Defines scenes and scene-specific setup and state.
 */
define(['lib/crafty', 'constants', 'assets', 'player'], function(Crafty, k) {

  function buildLevel(lightMap, darkMap, nextScene) {
    var map = Crafty.e('DoubleMap')
      .doubleMap(lightMap, darkMap)
      .onComplete(nextScene);

    var lightStart = Crafty('LightWorld StartPosition');
    Crafty.e('LightPlayer').attr({
      x: lightStart.x,
      y: lightStart.y,
    });
    var darkStart = Crafty('DarkWorld StartPosition');
    Crafty.e('DarkPlayer').attr({
      x: darkStart.x,
      y: darkStart.y,
    });

    Crafty.trigger('LightTransition');
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

  Crafty.scene('Map_001', function () {
    require(['Dark Map 1', 'Light Map 1', 'map'], function (lightMap, darkMap) {
      buildLevel(lightMap, darkMap, 'Map_001');
    });
  });

  return {
    loading: 'Loading',
    test: 'Test',
  };
})
