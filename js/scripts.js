//player constructor
function player (id){
  this.totalScore = 0; //permanent
  this.turnScore = 0;  //temporary 
  this.id = id;
} 
//modifications to players
player.prototype.addScore = function(){
  this.totalScore += this.turnScore;
  this.turnScore = 0;
}


//  List Of Players = [First Player, Second Player]
var playerTurn = 0; 
var allPlayers = [];
allPlayers.push(new player(0))
allPlayers.push(new player(1))

// referee neutral
function switchTurns() {
  if (playerTurn === 0){
    allPlayers[0].addScore();
    if (allPlayers[0].totalScore >= 20) {
      $("body").addClass("flashing");
      $("#message").show();
      $("#message").prepend("Player 1, You won the game!");
      $("reset").show();
    }
    playerTurn = 1;
  }
  
  else {
    allPlayers[1].addScore();
    if (allPlayers[1].totalScore >= 20) {
      $("body").addClass("flashing");
      $("#message").show();
      $("#message").prepend("Player 2, You won the game!");
      $("reset").show();
    }
    playerTurn = 0;
  }
  displayScore();
  
} 


//   ^ End Your Turn ^
//################################################################
//   V Roll Your Dice V

function diceRoll() {
  var random = Math.floor(Math.random() * 6) + 1;
  $("#rolled-number").text(random);
  if (random == 1){
    allPlayers[playerTurn].turnScore = 0;
    switchTurns();
  }
  else {
    allPlayers[playerTurn].turnScore += random; 
  }
  displayScore();
 // displayRolledNum();
}


// ^ Roll Your Dice ^
//##################################################################
// V Reset Game V

function resetGame() {
  allPlayers[0].turnScore = 0;
  allPlayers[1].turnScore = 0;
  allPlayers[0].totalScore = 0;
  allPlayers[1].totalScore = 0;
  $("body").removeClass("flashing");
  $("#message").hide();
  displayScore();
  $("#rolled-number").text("0");
}
//^ Reset the Game
//##################################################################
//V Update the score display (call after everything, basically)

function displayScore() {
  $("#score").html("Player: " + playerTurn + " Turn Score: " + allPlayers[playerTurn].turnScore);
  $("#total-score").html("Player: " + playerTurn + " Total Score: " + allPlayers[playerTurn].totalScore);
}

//^ Update the score display
//#################################################################
//V Document.ready event listeners V

$(document).ready(function() {
  $("#roll").click(function(){
    diceRoll();
  });
  $("#pass").click(function(){
    switchTurns();
  });
  $("#reset").click(function() {
    resetGame();
  });
  
  
  
});