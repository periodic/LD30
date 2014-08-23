/*
 * Defines scenes and scene-specific setup and state.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
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
    require(['level1a', 'level1b', 'map'], function (aMap, bMap) {
      Crafty.e('DoubleMap').doubleMap(aMap, bMap);
    });
  });

  return {
    loading: 'Loading',
    test: 'Test',
  };
})
