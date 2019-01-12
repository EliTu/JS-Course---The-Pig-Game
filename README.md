# The-Pig-Game---JS-Course-Project (Version 1.0)
Jonas Schmedtmann JavaScript Course's Pig Game project ** All rights reserved to Jonas Schmedtmann for the game components **

**Now hosted on Github Pages: https://elitu.github.io/The-Pig-Game---JS-Course-Project/**

## 1.1 Intro:

** This application is part of Jonas Schmedtmann's Udemy course "The Complete JavaScript Course 2018: Build Real Projects!". This is the first "real" coding project on this course and it's purpose is to implement all that we've learned so far in the course regarding functional JavaScript. 

** Most of the outer layer of this app and it's design have been designed provided by Jonas (as part of the course materials) and so the credit is due to Jonas Schmedtmann. I indeed have added more HTML and CSS content as I was working on this project, like re-positioning buttons, adding the game setup menu, goal score counter etc. 

** Most of the JavaScript code has been written by me, some of it through the guidance of Jonas during the course. I believe there are still a lot of improvements needed to be made and that the code is not perfect, but I am relatively happy that the app functions as I intended so far. 

** More improvements and additions will be added in the future. In the next versions I would like to add animated transitions and perhaps shrink the JavaScript code with some more specific functions and variables.

** Big thank you for Jonas for being an awesome teacher! You rock man!

## 1.2 Game Rules: 

** 

## 1.3 Game Guide:

Game setup menu:

** Upon loading the page, you will be greeted by the game setup menu, while the background is darkened. This menu allows several options:
  
  - Player 1 & 2 name selection - Both player can type in custom names. Inputing a name is a must.
    
  - Select score goal - Use the slider to select the amount of points a player need to reach in order to win the game. Moves between 50 and 250.
    
   - Complete - After selecting the player names and desired score goal, press the 'complete' button to initialize the game.
    
Main game interface:

** The main game interface is the main screen where the game is being initialized and played. 
  
   - Player 1 & 2 interface - Player 1 & 2 have the same type of interface, player 1 is located on the left, player 2 located on the right. Both have "total score" and "current round score" counters, the top large number and the bottom number in the box respectively, which change as the game progresses. 
   
   - Active player marker - The active player marker is the red dot next to the player name, and also the deeper grey color in the player's box.
   
   - Goal score indicator - At the top-middle-right corner of the screen (inside player 2 box) there's an indicator that presents the            amount of points needed to be reached in order for a player to win the game, as was adjusted in the game setup window.  
   
   - Dice - A set of two dices that roll a random result between 1 and 6 upon pressing the 'roll' button. Displayed as long as the game          active, and the player didn't roll and double 1 or a double 6.
   
   - Double 1 or double 6 roll message - Upon dice rolling that amounts to double 1 or double 6, a message alert will replace the dice and display the penalty message. Will dissapear upon pressing again on the roll button.
   
   - Footer - At the bottom there is a small sleeve that upon hover will open the the footer that present the credits for this project.
   - Buttons - Roll, hold, new game and setting menu buttons. 
   
The buttons:

** The buttons have a specific functionality that allows the players to play the game, initiazlie a new game or re-adjust the settings of the game.
  
  - Roll button - Upon a press the dice will roll. Available after game initialization and as long as no player wont the game.
    
  - Hold button - Upon a press Adds the total current score to the total score and pass the turn to the other player. If there is 0 in  the current score box, it will simply pass the turn to the other player. Available after game initialization and as long as no player won the game.
    
  - New game button - Upon a press will initialize a new game (but saves the player names that were set during the game setup), as a    result the total scores and the current scores will be lost. Available after game initialization and also after a player won. Upon a player win, the button centers itself in the middle of the UI and needed to be pressed to renew a game. 
    
  - Setting menu button - Upon a press the game setup menu will appear and the game can be reconfigured. Upon pressing the 'Complete' button a new game will start with the new configurations.
