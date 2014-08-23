/*
 * Defines scenes and scene-specific setup and state.
 */
define(['lib/crafty', 'constants'], function(Crafty, k) {
  Crafty.scene('Loading', function () {
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
  });

  return {
    loading: function () {
      Crafty.scene('Loading');
    },
  };
})
