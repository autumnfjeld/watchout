var startGame = function (){

/*** Game Setup *****************************/
  gameOps = {
    height: window.innerHeight,
    width: window.innerWidth  ,
    player_r: 7, 
    enemy_r: 15,
    nEnemies: 5,
    padding: 20
  };

  // How can I center this?
  var gameBoard = d3.select('body').append('svg:svg')
      .attr('width', gameOps.width).attr('height', gameOps.height)
      .style('background', '#8B94B5');

  var axes = {
      x: d3.scale.linear().domain([0, 100]).range([0, gameOps.width]),
      y: d3.scale.linear().domain([0, 100]).range([0, gameOps.height])
    };

/*** Enemy *****************************************************/
    // returns array of objects with enemy properites
  var createEnemies = function() {
    return _.range(0, gameOps.nEnemies).map(function(i) {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      };
    });
  };

  var enemy_data = createEnemies();
  //console.log('enemy_data', enemy_data[0]);

 //circle.enemy = circle AND enemy
  var enemies = gameBoard.selectAll('circle.enemy')
      .data(enemy_data, function(d) {return d.id;});

  enemies.enter().append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy) {return axes.x(enemy.x);})
      .attr('cy', function(enemy) {return axes.y(enemy.y);})
      .attr('r', gameOps.enemy_r)
      .style('fill', '#2D2C45');
  enemies.exit().remove();

  var enemyTransition = function() {
    enemies.transition().duration(2000)
        .attr('cx', function(d,i) {return axes.x(Math.random() * 100);})
        .attr('cy', function(d,i) {return axes.y(Math.random() * 100);});
    //enemies.each(collision); //problem is this is only called at transition,not during motion
  };

  setInterval(function(){
     enemyTransition();
   }, 2000);

  /*** Player **********************************************************/
  var player = gameBoard.append('circle')
      .attr('class', 'player')
      .attr('cx', gameOps.width/2).attr('cy', gameOps.height/2).attr('r', gameOps.player_r)
      .style('fill', 'green');
      
  var dragmove = function(){
      d3.select(this)
          .attr("cx", x = d3.event.x)
          .attr("cy", y = d3.event.y);
  };

  var drag = d3.behavior.drag()
      .on("drag", dragmove);

//  collision from enemies point of view
  var collision = function(enemy,i){
    //console.log('id', enemy.id);
    enemy = d3.select(this);
    console.log('px', player.attr('cx'), 'ex', enemy.attr('cx'))
    var diff_x = parseFloat(enemy.attr('cx')) - player.attr('cx');
    var diff_y = parseFloat(enemy.attr('cy')) - player.attr('cy');
    var dist = Math.sqrt(Math.pow(diff_x,2) + Math.pow(diff_y,2));
    console.log('dist', dist, 'player', player.attr('cx'));
    if ( (dist < (gameOps.player_r + gameOps.enemy_r)) ){
      console.log('Boooom!!!')
      enemy.style('fill', 'red');
    }
  };

  d3.timer(function(){enemies.each(collision);});

  // // collsion from player point of view
  // var collision = function(player){
  //   //console.log('id', enemy.id);
  //   enemy = d3.select(this);
  //   console.log('px', player.attr('cx'), 'ex', enemy.attr('cx'))
  //   var diff_x = parseFloat(enemy.attr('cx')) - player.attr('cx');
  //   var diff_y = parseFloat(enemy.attr('cy')) - player.attr('cy');
  //   var dist = Math.sqrt(Math.pow(diff_x,2) + Math.pow(diff_y,2));
  //   console.log('dist', dist, 'player', player.attr('cx'));
  //   if ( (dist < (gameOps.player_r + gameOps.enemy_r)) ){
  //     console.log('Boooom!!!')
  //     enemy.style('fill', 'red');
  //   }
  // };

  player.call(drag);

  //enemies.transition().duration(500).each(collision);


}; // end of startGame

startGame();
//setInterval(function(){
//   startGame();
// }, 1000);





