
gameOptions = {
  height: 450,
  width: 600,
  nEnemies: 30,
  padding: 20
};


var gameBoard = d3.select('body').append('svg:svg')
    .attr('width', gameOptions.width)
    .attr('height', gameOptions.height)
    .attr('backgroun-posistion', 50% 50%)
    .style('background', '#1240AB');

  // returns array of objects with enemy properites
 var createEnemies = function() {
    return _.range(0, gameOptions.nEnemies).map(function(i) {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      };
    });
  };

// this will linearly scale the input/domain to output/range
// so we can work within the framework of 0 to 100 (see the Math.random line)
var axes = {
    x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
    y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
  };

  var enemy_data = createEnemies();
  console.log(enemy_data);

 //circle.enemy = circle AND enemy
    var enemies = gameBoard.selectAll('circle.enemy')
        .data(enemy_data, function(d) {return d.id;});
    enemies.enter().append('svg:circle')
        .attr('class', 'enemy')
        .attr('cx', function(enemy) {return axes.x(enemy.x);})
        .attr('cy', function(enemy) {return axes.y(enemy.y);})
        .attr('r', 20);
    enemies.exit().remove();

