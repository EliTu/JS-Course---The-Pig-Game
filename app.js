/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var totalScore, roundScore, activePlayer, gameOn;

init(); // Invoking the game initialization function upon page start
/* Commenting out due to implementing in function:
totalScore = [0, 0]; // Player1[0], player2[1]
roundScore = 0; // One player at a time
activePlayer = 0; // Moves between 0 (player1) and 1 (player2) */

// dice = Math.floor(Math.random() * (7 - 1)) + 1; // Random number between 1 and 6 on each function call, including (Max - Min) + min values.

// document.querySelector('#current-' + activePlayer).textContent = dice; // Manipulating the the HTML document content according to the value of our variables, adding plain text.

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // Manipulating the HTML document content with HTML elements.

// var x = document.querySelector('#score-0').textContent; // Reading the content of an HTML element, using the querySelector method.
// console.log(x);

// document.querySelector('.dice').style.display = "none"; // Hide the dice img at the start of the game.

/* function btn() { // Callback function
    // Do something here
}
btn();

document.querySelector('.btn-roll').addEventListener('click', btn); // eventListener using a callback function. */ // We'll use the anonymous function.

/* Commenting out due to implementing in function:
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0'; */

 // Event for 'ROLL' button:
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gameOn) { // State variable, by default its value is 'true'.
        // 1. Generate a random number on a click of the button:
        let dice = Math.floor(Math.random() * (7 - 1)) + 1;

        // 2. Display the result:
        let diceDOM = document.querySelector('.dice'); // Set the selector for the dice class into a variable, for quick future uses.
        diceDOM.style.display = "block"; // make the dice visible again
        diceDOM.src = 'dice-' + dice + '.png'; // Select a different dice image according to the number that was rolled (2 = dice-2.png etc)

        // 3. Update the round score IF the rolled number !== 1:
        if (dice !== 1) { // Upon rolling any number between 2 to 6.
            roundScore += dice; // roundScore(total) = roundScore(current) + dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore; // Display the round score in the container of the selected player.
            document.getElementById('roll-1-msg').style.display= "none";
        } else { // Upon rolling 1.
            nextPlayer();
            document.getElementById('roll-1-msg').style.display = "block"; // Upon rolling 1, a message block appears.
        }
    }   
    
}); // eventListener using an anonymous function.

    // Event for 'HOLD' button:
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gameOn) { // gameOn = true
        totalScore[activePlayer] += roundScore; // totalScore index is updated by the active player (0 or 1).
            // Update the UI:
        document.getElementById("score-" + activePlayer).textContent = totalScore[activePlayer];
        
        // Check if a player won the game + Next player:
        if (totalScore[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-roll').style.display = "none"; // Hiding the other buttons upon  player victory
            document.querySelector('.btn-hold').style.display = "none";
            document.querySelector('.btn-new').style.top = "250px"; // Place the "new game" button in the middle of the container
            gameOn = false;

                /* Commenting out my old version:
            activePlayer === 0 ? alert('Player 1 WON THE GAME!') : alert('Player 2 WON THE GAME!'); 
            clearScore(); 
            RandomPlayer();  
            console.log(activePlayer); */
            } else {
                nextPlayer();
            } 
    }
}); 

    // Event for 'NEW GAME' button:
document.querySelector('.btn-new').addEventListener('click', init);
   /* Commenting out my version:
    clearScore();
    RandomPlayer();
    console.log(activePlayer); */


 // Pass to next Player function:
function nextPlayer() { // Calls for next player upon hold or roll 1

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

 // Clear scores function:
function clearScore() { // Clearing the stats back to 0 at game start

    totalScore[activePlayer] = 0;
    roundScore = 0;
    
    document.getElementById('name-0').textContent = 'Player 1'; // Reverting the names back to original after a winner is declared
    document.getElementById('name-1').textContent = 'Player 2'; 

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-' + activePlayer).textContent = '0';
   
}

function init() {
    gameOn = true;
    totalScore = [0, 0]; // Reset score
    roundScore = 0; // Reset score

    randomPlayer(); // Choose a random player upon game initialization

    document.querySelector('.dice').style.display = "none";
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2'; 

    document.querySelector('.btn-roll').style.display = "block"; // Display back the button upon game start
    document.querySelector('.btn-hold').style.display = "block"; // Display back the button upon game start
    document.querySelector('.btn-new').style.top = "45px";
 }


 // Random Player function:
function randomPlayer() { // Random player start the turn

    activePlayer = Math.floor(Math.random() * (2 - 0)); // Choose random between 0 and 1.
    console.log(activePlayer); // Player turn track, for testing

    if (activePlayer === 0) { // Changing the active class
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
    } else {
        document.querySelector('.player-0-panel').classList.remove('active'); 
        document.querySelector('.player-1-panel').classList.add('active');
    }
 }


/*     // Test function (used only for testing game functionality):
document.querySelector('img').addEventListener('click', function() {
        totalScore[activePlayer] = 99;
        document.getElementById('score-0').textContent = '99';
        document.getElementById('score-1').textContent = '99';
    }); */

    // Coding Challenge 6: customized
// 1. A player loses 50 points (of totalScore) when he rolls double 6.
// 2. Add an input field to the HTML where players can set the winning score, can also choose the names of player 1 an player 2.
// 3. Add another dice to the game, player loses current score when even one of the dices rolls a 1.
// ** Customize CSS rules for buttons display upon win/ game initialization.