/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CUSTOM:

- A player loses 40 points (of totalScore) when he rolls double 6, losses all points when he rolls double 1.
- Add an input field to the HTML where players can set the winning score, can also choose the names of player 1 an player 2.
- Add another dice to the game, player loses current score when even one of the dices rolls a 1.
** Customize CSS rules for buttons display upon win/ game initialization.

*/

    // Global game Variables:
// Score variables:
let totalScore; 
let roundScore; 
let goalPoints; // Goal score

// Components variables:
let activePlayer = 0; // Changes between 0 (player 1) and 1 (player 2)
let dice = [0, 0]; // Dice #1 and dice #2

// State variables:
let gameOn; // Is the game currently playing
let configured; // Configurations completed or not
    
    // Game initializing functions: 
gameSetup(); // Configuration menu
init(); 

 // Event for 'ROLL' button:
document.querySelector('.btn-roll').addEventListener('click', () => {
    if(configured) { // Game setup menu is up, game being configured
         if(gameOn) {  // Game is active

         // Generating a random number when rolling the dice:
         dice[0] = Math.floor(Math.random() * (7 - 1)) + 1;
         dice[1] = Math.floor(Math.random() * (7 - 1)) + 1;

            diceDisplay(); // Displaying the dices in the DOM

        // Update the round score if the rolled number !== 1 || !== 6:
        if (dice[0] !== 1 && dice[0] !==6 || dice[1] !== 1 && dice[1] !==6) { // Upon rolling any number between 2 to 5.
            roundScore += dice[0] + dice[1]; 
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            document.getElementById('roll-1-msg').style.display= "none";
            document.getElementById('roll-6-msg').style.display = "none";
        } else if (dice[0] === 6 && dice[1] === 6) { // Upon rolling double 6
            totalScore[activePlayer] -= 40;
            if (totalScore[activePlayer] < 0) {totalScore[activePlayer] = 0}
            document.getElementById("score-" + activePlayer).textContent = totalScore[activePlayer];
            document.getElementById('roll-6-msg').style.display = "block";
            document.getElementById('roll-1-msg').style.display= "none";
            nextPlayer();
        }  else { // Upon rolling double 1.
            totalScore[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = totalScore[activePlayer];
            nextPlayer();
            document.getElementById('roll-1-msg').style.display = "block";
            document.getElementById('roll-6-msg').style.display = "none";
        }
    }   
  }  
});

    // Event for 'HOLD' button:
document.querySelector('.btn-hold').addEventListener('click',() => {
    if(configured) { // Game setup menu is up, game being configured
        if(gameOn) { // Game is active
            totalScore[activePlayer] += roundScore; 

            document.getElementById("score-" + activePlayer).textContent = totalScore[activePlayer];
            
            // Check if a player won the game + Next player:
            if (totalScore[activePlayer] >= goalPoints) {
                document.getElementById('name-' + activePlayer + '-new').textContent = 'Winner!';
                document.querySelector('.dice-1').style.display = 'none';
                document.querySelector('.dice-2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.querySelector('.btn-roll').style.display = "none"; // Hiding the other buttons upon  player victory
                document.querySelector('.btn-hold').style.display = "none";
                document.querySelector('.btn-new').classList.add('new-position'); // Place the "new game" button in the middle of the container
                gameOn = false;
                } else {
                    nextPlayer();
                } 
    }
  }
}); 

    // Event for 'NEW GAME' button:
document.querySelector('.btn-new').addEventListener('click', init);

 // Pass to next Player function:
function nextPlayer() { // Calls for next player upon hold or roll 1

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

function init() {
    gameOn = true; // Game is active
    totalScore = [0, 0]; // Reset score
    roundScore = 0; // Reset score

    randomPlayer(); // Setting a random player

    document.querySelector('.dice-1').style.display = "none";
    document.querySelector('.dice-2').style.display = "none";
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('roll-1-msg').style.display= "none";
    document.getElementById('roll-6-msg').style.display = "none";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0-new').textContent = document.getElementById('input-1').value;
    document.getElementById('name-1-new').textContent = document.getElementById('input-2').value; 

    document.querySelector('.btn-roll').style.display = "block"; // Display back the button upon game start
    document.querySelector('.btn-hold').style.display = "block"; // Display back the button upon game startc
    document.querySelector('.btn-new').classList.remove('new-position');
 }

 // Random Player function:
function randomPlayer() { // Random player start the turn

    activePlayer = Math.floor(Math.random() * (2 - 0)); // Choose random between 0 and 1.

    if (activePlayer === 0) { // Changing the active class
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
    } else {
        document.querySelector('.player-0-panel').classList.remove('active'); 
        document.querySelector('.player-1-panel').classList.add('active');
    }
 }

 // Input Menu functions:
function openMenu() { // Activate the game options menu;
    document.querySelector('.input-menu').style.display = "block";
    gameSetup();
}

function submitInput() { // Upon clicking "complete"
    document.getElementById('name-0-new').textContent = document.getElementById('input-1').value;
    document.getElementById('name-1-new').textContent = document.getElementById('input-2').value;
    document.getElementById('name-0').style.display = "none"; 
    document.getElementById('name-1').style.display = "none";
    document.querySelector('.wrapper').classList.remove('game-setup');

    goalPoints = document.getElementById('score-slide').value;
    document.getElementById('score-goal').textContent = goalPoints;

    if(document.getElementById('name-0-new').textContent === '' || document.getElementById('name-1-new').textContent === '') {
        alert('No name input!');
    } else {
    configured = true;
    init();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.getElementById('score-goal').textContent = goalPoints;
    document.querySelector('.input-menu').style.display = "none";
    document.querySelector('.btn-new').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-menu').style.display = 'block';
    document.getElementById('score-goal-box').style.display = 'block';
    document.querySelector('.main').classList.remove('main');
    }
}
let sliderDisplay = (val) => document.getElementById('slider-value').textContent = val;// Displaying the value of the slider form


function gameSetup() { // While the game setup menu is up:
    configured = false;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-menu').style.display = 'none';
    document.getElementById('score-goal-box').style.display = 'none';

    // Darken the background.
    document.getElementById('dark-wrap').classList.add('main');
}

    // Display functions:

function diceDisplay() {
    let diceDomOne = document.querySelector('.dice-1');
    let diceDomTwo = document.querySelector('.dice-2'); 
    
    if(gameOn) { diceDomOne.style.display = "block"; 
    diceDomTwo.style.display = "block";}

    diceDomOne.src = `dice-${dice[0]}.png`;
    diceDomTwo.src = `dice-${dice[1]}.png`;
}