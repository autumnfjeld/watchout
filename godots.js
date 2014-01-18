var startGame = function (){

/*** Game Setup *****************************/
  gameOptions = {
    height: 450,
    width: 600,
    nEnemies: 30,
    padding: 20
  };

  // How can I center this?
  var gameBoard = d3.select('body').append('svg')
      .attr('width', gameOptions.width)
      .attr('height', gameOptions.height)
      .style('background', '#8B94B5');

  var axes = {
      x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
      y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
    };

/*** Enemy *****************************************************/
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

  var enemy_data = createEnemies();
  console.log('enemy_data', enemy_data[0]);

 //circle.enemy = circle AND enemy
  var enemies = gameBoard.selectAll('circle.enemy')
      .data(enemy_data, function(d) {return d.id;});
  enemies.enter().append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy) {return axes.x(enemy.x);})
      .attr('cy', function(enemy) {return axes.y(enemy.y);})
      .attr('r', 10)
      .style('fill', '#2D2C45');
  //enemies.exit().remove();


  var enemyTransition = function() {
    enemies.transition().duration(1000)
        .attr('cx', function(d,i) {return axes.x(Math.random() * 100);})
        .attr('cy', function(d,i) {return axes.y(Math.random() * 100);});
  };

  setInterval(function(){
     enemyTransition();
   }, 1000);

  /*** Player **********************************************************/

  

   var dragmove = function(){
      console.log('moving', arguments);
      d3.select(this)
          .attr("cx", x = d3.event.x)
          .attr("cy", y = d3.event.y);
    };

  var drag = d3.behavior.drag()
      .on("drag", dragmove);

  var player = gameBoard.append('circle')
      .attr('class', 'player')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 10)
      .style('fill', 'green')
      .call(drag);
  

  // var dragmove2 = function() {
  //     x += d3.event.dx
  //     y += d3.event.dy
  //     d3.select(this).attr("transform", function(){
  //         return "translate(" + [ x,y ] + ")"
  //     })
  // };

}; // end of startGame

startGame();
//setInterval(function(){
//   startGame();
// }, 1000);





