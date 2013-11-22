
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var winner = null;
var counter1 = 0
var counter2 = 0

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    // TODO: Check for rest of game winning cases
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
  )
 {
    winner = currentPlayer
    console.log('somebody won');
    // TODO: Trigger 'game-win' event with the winning player as the event data 
    $(document).trigger('game-win', winner);
  }
};

$(document).on('click', '#board .space', function (e) {
  
  var spaceNum = $(e.currentTarget).index();
  if (spaces[spaceNum]) {
    e.preventDefault();
    alert("That space is taken. Please choose a free square.");
  }
  else {
    // Mark the space with the current player's name
    spaces[spaceNum] = currentPlayer;
    console.log('You clicked on space #' + spaceNum); 
    // Add class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);  
  }
 
  checkForWinner();
  setNextTurn();
});

$(document).on('game-win', function (e, winner) {
  alert("Congrats " + winner + ", you won the game!");
  // TODO: Alert who won the game
});

var addCount1 = function() {
  return counter1++;
}

var addCount2 = function() {
  return counter2++;
}

$(document).on('game-win', function (e, winner) {
  if (winner === player1) {
    addCount1();
    $('.veggie').text('Veggie: ' + counter1);
  } else {
    addCount2();
    $('.junkfood').text('Junkfood: ' + counter2);
  }
});


// Start the game
setNextTurn();
