vsWho = "";
gameVersion = "";

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
    playerTurn = 1; // YOUR TURN, PLAYER 1
  }
  
  else {
    allPlayers[1].addScore();
    if (allPlayers[1].totalScore >= 20) {
      $("body").addClass("flashing");
      $("#message").show();
      $("#message").prepend("Player 2, You won the game!");
      $("reset").show();
    }
    playerTurn = 0; // What does this mean? "YOUR TURN, PLAYER 0"
  }
  displayScore();  

  while(playerTurn == 1 && vsWho == "computer"){
    versionCheck(); //because it rolled "1" --> go to "switchTurn()"
    // versionCheck(gameVersion);
    console.log(allPlayers[1].turnScore, allPlayers[1].totalScore)
  

      if(allPlayers[playerTurn].turnScore > 9){
      switchTurns();
      }  
  }

} 


//   ^ End Your Turn ^
//################################################################
//   V Roll Your Dice V

//Add options to play one of the other variations of Pig Dice using two or more dice
//1. select box for which variants/how many dice. (right now: 2-dice-mode)
//2. variable to capture/store game version selection
//3. When we diceroll --> hand game version to function
//4. do something with diceroll function(?)



//##################################################
function versionCheck () {
if (gameVersion == "one"){
  diceRoll();
} 
else {
  diceRollTwo();
}
}

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

function diceRollTwo(){
  var random = Math.floor(Math.random() * 6) + 1;
  var random2 = Math.floor(Math.random() * 6) + 1;

  $("#rolled-number").text(random + ", " + random2);

  if (random == 1 || random2 == 1){
    allPlayers[playerTurn].turnScore = 0;
    switchTurns();
  }
  else {
    allPlayers[playerTurn].turnScore += (random + random2); 

  }
  displayScore();
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
    
    gameVersion = $("#game-version").val();
    vsWho = $("#vs-who").val();
    versionCheck();
  });
  $("#pass").click(function(){
    switchTurns();
  });
  $("#reset").click(function() {
    resetGame();
  });
     
});

// Add option to play the computer - easy or hard levels:
//1. select box to choose to play computer
//2. store game mode "vs computer or vs player"
//3. In "Your turn", if "vs computer" then (what?)
//4. if player1's turn AND vs computer: computer decides player2's functions (Easy: Computer always stops after second roll.) 


// Easy: Computer always stops after second roll.

// Hard: Computer uses strategy based on current total and rolled dice.

// if (playerTurn == 1 && vsWho == "computer"){
//   // computer roll once and pass
//   do versionCheck(); //This will roll the dice for you. This is diceroll()
  
//   //if score is 9 or more, pass, else, roll again
//   if (allPlayers[1]turnScore >= 9){
//     switchTurns()<--
//   }
//   //do something with function player2 roll
  
// }


// 1.COMPUTER's Turn <--; "playerTurn = 0" <-- this means it's Chisato's turn // if (playerTurn !== 1)
//   A. Decide whether to roll or pass // ALWAYS ROLL AS FIRST THING (if turnscore > 9) PASS/ELSE ROLL AGAIN
//     1. ROLL <-- VersionCheck()
//     2. AddScore or //rolled 1 - lose turn?
//   B. PASS <-- switchTurns() | "playerTurn = 0!"

  // if (playerTurn == 1 && vsWho == "computer"){
  //   versionCheck();
  //   //CHECK IF THIS ROLLED A 1 AND DON'T CONTINUE

  //     if(allPlayers[playerTurn].turnScore < 9){
  //     versionCheck();
  //     }
  //     else {
  //     switchTurns();
  //     }
  // }
  

  
  
    