
gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};


var gameBoard = d3.select('body').append('svg')   // namespace:tag necesaary???
    .attr('width', gameOptions.width)
    .attr('height', gameOptions.height)
    .style('background', 'blue');

var data = "abcdefghijklmnopqrstuvwxyz".split("");
//var data = "helloooo";

// note that this adds html attributes in the tag, rather than setting
// css styling
var text = gameBoard.selectAll("text").data(data)
      .enter().append("text")
      .attr("font-family", "sans-serif")
      .attr("x", 30)
      .attr("y", function(d,i){ return i*10;})
      .text(function(d){ return d;});