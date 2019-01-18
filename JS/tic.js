//what happens when you click a game square
var clickGameSquare = function(event) {
if(!txtWinnerMSg.classList.contains('winner')) {
    var totalSquares = document.querySelectorAll('.game-square').length;
    var totalSelectedSquares = 0;
        if(!event.target.classList.contains('player-one') && !event.target.classList.contains('player-two')) {
            if(activePlayer === 'player-one') {
                event.target.classList.add('player-one');
                playerOne.playerChoices.push(Number(event.target.classList[0]));
                changeImage(playerOne, playerTwo, event.target);
                if(checkForWin(playerOne)) {
                    playerWins(playerOne);
                } else {
                    totalSelectedSquares = (document.querySelectorAll('.player-one').length) + (document.querySelectorAll('.player-two').length);
                    if(totalSelectedSquares === totalSquares) {
                        noPlayerWins();
                    } else { 
                        if(playerTwo.isHuman === false) {
                            removeEventListeners();
                            activePlayer = 'player-two';
                            divPlayerOneDisplay.classList.remove('current-player');
                            divPlayerTwoDisplay.classList.add('current-player');
                            setTimeout(cpuMove, 3000, playerTwo, playerOne);
                        } else {
                            activePlayer = 'player-two';
                            divPlayerOneDisplay.classList.remove('current-player');
                            divPlayerTwoDisplay.classList.add('current-player');
                        }
                    }
                }

            } else if (activePlayer === 'player-two') {
                event.target.classList.add('player-two');
                playerTwo.playerChoices.push(Number(event.target.classList[0]));
                changeImage(playerTwo, playerOne, event.target);
                if(checkForWin(playerTwo)) {
                    playerWins(playerTwo);
                } else {
                    totalSelectedSquares = (document.querySelectorAll('.player-one').length) + (document.querySelectorAll('.player-two').length);
                    if(totalSelectedSquares === totalSquares) {
                        noPlayerWins();
                    } else { 
                        if(playerOne.isHuman === false) {
                            removeEventListeners();
                            activePlayer = 'player-one';
                            divPlayerTwoDisplay.classList.remove('current-player');
                            divPlayerOneDisplay.classList.add('current-player');
                            setTimeout(cpuMove, 3000, playerOne, playerTwo);
                        } else {
                            activePlayer = 'player-one';
                            divPlayerTwoDisplay.classList.remove('current-player');
                            divPlayerOneDisplay.classList.add('current-player'); 
                        }
                    }
                }
            }
        }
    }
}
var cpuTurns = function () {
    if(activePlayer === 'player-one') {
        cpuMove(playerOne,playerTwo);
    } else if (activePlayer === 'player-two') {
        cpuMove(playerTwo,playerOne);
    }
}
var cpuMove = function(player, opponent) {
    var arrEmptySquares = [];
    var almostWinSquarePlayer = checkForAlmostWin(player);
    var almostWinSquareOpponent = checkForAlmostWin(opponent);
    var totalSquares = document.querySelectorAll('.game-square').length;
    var totalSelectedSquares = 0;
    
    for(i = 0; i < arrGameSquares.length; i++) {
        if(!(arrGameSquares[i].classList.contains('player-one') || arrGameSquares[i].classList.contains('player-two'))) {
            arrEmptySquares.push(arrGameSquares[i]);
        }
    }
    if(almostWinSquarePlayer !== false ) {
        arrGameSquares[almostWinSquarePlayer].classList.add(player.playerClass);
        player.playerChoices.push( Number(arrGameSquares[almostWinSquarePlayer].classList[0]) );
        changeImage(player, opponent, arrGameSquares[almostWinSquarePlayer]);
    } else if(almostWinSquareOpponent !== false ) {
        arrGameSquares[almostWinSquareOpponent].classList.add(player.playerClass);
        player.playerChoices.push(Number(arrGameSquares[almostWinSquareOpponent].classList[0]));
        changeImage(player, opponent, arrGameSquares[almostWinSquareOpponent]);
    } else {
        var randomizer = Math.floor(Math.random() * arrEmptySquares.length);
        arrEmptySquares[randomizer].classList.add(player.playerClass);
        player.playerChoices.push(Number(arrEmptySquares[randomizer].classList[0]));
        changeImage(player, opponent, arrEmptySquares[randomizer]);
    }
    totalSelectedSquares = (document.querySelectorAll('.player-one').length) + (document.querySelectorAll('.player-two').length);
    if(checkForWin(player)) {
        removeEventListeners();
        playerWins(player);
    } else if(totalSelectedSquares === totalSquares) {
            removeEventListeners();
            noPlayerWins();
    }
    if(activePlayer === 'player-one') {
        activePlayer = 'player-two';
        divPlayerOneDisplay.classList.remove('current-player');
        divPlayerTwoDisplay.classList.add('current-player');
    } else if (activePlayer === 'player-two') {
        activePlayer = 'player-one';
        divPlayerTwoDisplay.classList.remove('current-player');
        divPlayerOneDisplay.classList.add('current-player');
    }
    if(opponent.isHuman) {
        addEventListeners();
    }
}
//change the image for a square and play the correct sound
var changeImage = function (currentPlayer, otherPlayer, gameSquare) {
    var randomizer = Math.random();
    if((currentPlayer.race === 'Terran') && (otherPlayer.race === 'Terran') && (currentPlayer.playerClass === 'player-two')) {
        gameSquare.style.backgroundImage = "url('IMG/SiegeTank.jpg')";
        if(randomizer <= 0.333) {  
            siegetank1.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            siegetank2.play();
        }else if (randomizer > 0.666) {
            siegetank3.play();
        }
    } else if(currentPlayer.race === 'Terran') {
        gameSquare.style.backgroundImage = "url('IMG/Marine.jpg')";
        if(randomizer <= 0.333) {  
            marineAudio.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            marineAudio2.play();
        }else if (randomizer > 0.666) {
            marineAudio3.play();
        }
    }
    if((currentPlayer.race === 'Protoss') && (otherPlayer.race === 'Protoss') && (currentPlayer.playerClass === 'player-two')) {
        gameSquare.style.backgroundImage = "url('IMG/Dragoon.png')";
        if(randomizer <= 0.333) {  
            dragoon1.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            dragoon2.play();
        }else if (randomizer > 0.666) {
            dragoon3.play();
        } 
    } else if(currentPlayer.race === 'Protoss') {
        gameSquare.style.backgroundImage = "url('IMG/Zealot.jpg')";  
        if(randomizer <= 0.333) {
            zealotAudio.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            zealotAudio2.play();
        }else if (randomizer > 0.666) {
            zealotAudio3.play();
        }    
    }
    if((currentPlayer.race === 'Zerg') && (otherPlayer.race === 'Zerg') && (currentPlayer.playerClass === 'player-two')) {
        gameSquare.style.backgroundImage = "url('IMG/Zergling.jpg')";
        if(randomizer <= 0.333) {  
            zergling1.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            zergling2.play();
        }else if (randomizer > 0.666) {
            zergling3.play();
        } 
    } else if(currentPlayer.race === 'Zerg') {
        gameSquare.style.backgroundImage = "url('IMG/Hydralisk.jpg')";
        if(randomizer <= 0.333) {  
            hydraliskAudio.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            hydraliskAudio2.play();
        }else if (randomizer > 0.666) {
            hydraliskAudio3.play();
        }    
    }
}


//things that happen when a player wins
var playerWins = function(player) {
    txtWinnerMSg.className = "winner";
    txtWinnerName.textContent = player.name;
    player.score++;
    if(player.race === 'Terran') {
        terranWinAudio.play();
    }
    if(player.race === 'Protoss') {
        protossWinAudio.play();
    }
    if(player.race === 'Zerg') {
        zergWinAudio.play();
    }
    if(player.playerClass === 'player-one') {     
        txtPlayerOneScore.textContent = player.score;
    } else {
        txtPlayerTwoScore.textContent = player.score;
    }
    for(var i = 0; i < timerIntervals.length; i++) {
        cpuTimer = clearInterval(timerIntervals[i]);
    }
    removeEventListeners();
    setTimeout(createGameBoard, 5000);
}
//things that happen when its a draw
var noPlayerWins = function() {
    txtWinnerMSg.className = "winner";
    txtWinnerName.textContent = "NOBODY";

    var randomizer = Math.random();
    if(randomizer <= 0.333) {  
        drawAudio1.play();
    } else if (randomizer > 0.333 && randomizer <= 0.666) {
        drawAudio2.play();
    }else if (randomizer > 0.666) {
        drawAudio3.play();
    }
    arrGameSquares.forEach(function(gameSquare) {
        gameSquare.removeEventListener('click', clickGameSquare);
    });
    //clear timer intervals
    for(var i = 0; i < timerIntervals.length; i++) {
        cpuTimer = clearInterval(timerIntervals[i]);
    }
    removeEventListeners();
    setTimeout(createGameBoard, 5000);
}
var addEventListeners = function() {
    arrGameSquares.forEach(function(gameSquare) {
        gameSquare.addEventListener('click', clickGameSquare);
    });
}
var removeEventListeners = function() {
    arrGameSquares.forEach(function(gameSquare) {
        gameSquare.removeEventListener('click', clickGameSquare);
    });

}
var createGameBoard = function () {
    //reset gameboard
    while(divGameBoard.firstChild) {
        for(i = 0; i < arrGameSquares.length; i++) {
            arrGameSquares.pop();
        }
        divGameBoard.removeChild(divGameBoard.firstChild);
    }
    //clear choices array
    while(playerOne.playerChoices.length > 0) {
        playerOne.playerChoices.pop();
    }
    while(playerTwo.playerChoices.length > 0) {
        playerTwo.playerChoices.pop();
    }
    //clear all timers
    for(var i = 0; i < timerIntervals.length; i++) {
        cpuTimer = clearInterval(timerIntervals[i]);
    }

    txtWinnerMSg.className = "no-winner";
    //make 9 div elements for the grid
    for(var i = 0; i < 9; i++) {
        var gameSquareDiv = document.createElement('div');
        gameSquareDiv.classList.add(i);
        gameSquareDiv.classList.add('game-square');
        arrGameSquares.push(gameSquareDiv);
    }
    //show game board on screen
    arrGameSquares.forEach(function(gameSquare) {
    divGameBoard.appendChild(gameSquare);
    });
    activePlayer = 'player-one';
    divPlayerTwoDisplay.classList.remove('current-player');
    divPlayerOneDisplay.classList.add('current-player');
    if(playerOne.isHuman === false && playerTwo.isHuman === false) {
        removeEventListeners();
        cpuTimer = setInterval(cpuTurns, 3000);
        timerIntervals.push(cpuTimer);
    } else if(playerOne.isHuman === false) { 
        cpuMove(playerOne,playerTwo);
    } else {
        addEventListeners();
    }   
}


var changeAvatar = function(event) {
    if(event.target.className = "player-one-race") {
        imgPlayerOneAvaterImage.src = 'IMG/' + selectPlayerOneRace.value + '.jpg';
    }
    if(event.target.className = "player-two-race") {
        imgPlayerTwoAvaterImage.src = 'IMG/' + selectPlayerTwoRace.value + '.jpg';
    }
}

//check if a player has won
var checkForWin = function (player) {
    var isWinning = [false,false,false];
    var winningSquares = [];

    for(var i = 0; i < winningLines.length; i++) {
        for(var e = 0; e < winningLines[i].length; e++) {
            if(player.playerChoices.includes(winningLines[i][e])) {
                isWinning[e] = true;
                winningSquares.push(winningLines[i][e]);
            } else {
                isWinning[e] = false;
            }
        }
        if(isWinning[0] === true && isWinning[1] === true && isWinning[2] === true) {
            for(var k = 0; k < winningSquares.length; k++) {
                arrGameSquares[winningSquares[k]].style.transform = 'scale(1.1)';
            }
            return true;
        }
        while(winningSquares.length > 0) {
            winningSquares.pop();
        }
    }
    return false;
}

var checkForAlmostWin = function (player) {
    var isWinning = [false,false,false];
    var winningSquares = [];
    var chosenSquare = 0;

    for(var i = 0; i < winningLines.length; i++) {
        for(var e = 0; e < winningLines[i].length; e++) {
            if(player.playerChoices.includes(winningLines[i][e])) {
                isWinning[e] = true;
                winningSquares.push(winningLines[i][e]);
            } else {
                isWinning[e] = false;
                chosenSquare = winningLines[i][e];
            }
        }
        if((isWinning[0] && isWinning[1]) || (isWinning[1] && isWinning[2]) || (isWinning[0] && isWinning[2])) {
            if(!arrGameSquares[chosenSquare].classList.contains('player-one') && !arrGameSquares[chosenSquare].classList.contains('player-two')) {
                return chosenSquare;
            }
        }
        while(winningSquares.length > 0) {
            winningSquares.pop();
        }
    }
    return false;    
}

//event for when 'new game' button is clicked
var newGame = function () {
    divSideBarOverlay.style.visibility = 'hidden';
    overylayMenu.style.visibility = 'visible';
    for(var i = 0; i < timerIntervals.length; i++) {
        cpuTimer = clearInterval(timerIntervals[i]);
    }
} 
// event for when 'start game' button is clicked in overlay menu
var startGame = function () {
    if(!(txtPlayerOneName.value === '') && !(txtPlayerTwoName.value === '')) {
        playerOne.name = txtPlayerOneName.value;
        if(selectPlayerOneIsHuman.value === "Human") {
            playerOne.isHuman = true;
        } else {
            playerOne.isHuman = false;
        }
        playerOne.race = selectPlayerOneRace.value;
        playerOne.displayImage = 'IMG/' + playerOne.race + '.jpg';

        playerTwo.name = txtPlayerTwoName.value;
        if(selectPlayerTwoIsHuman.value === "Human") {
            playerTwo.isHuman = true;
        } else {
            playerTwo.isHuman = false;
        }
        playerTwo.race = selectPlayerTwoRace.value;
        playerTwo.displayImage = 'IMG/' + playerTwo.race + '.jpg';
        playerOne.score = 0;
        playerTwo.score = 0;
        txtPlayerOneScore.textContent = playerOne.score;
        txtPlayerTwoScore.textContent = playerTwo.score;

        txtPlayerOneDisplayName.textContent = playerOne.name;
        txtPlayerTwoDisplayName.textContent = playerTwo.name;
        imgPlayerOneDisplay.src = playerOne.displayImage;
        imgPlayerTwoDisplay.src = playerTwo.displayImage;
        overylayMenu.style.visibility = 'hidden';
        divGameBoard.style.backgroundImage = 'none';
        divPlayerOneDisplay.style.visibility = 'visible';
        divPlayerTwoDisplay.style.visibility = 'visible';
        createGameBoard();
    } else {
        txtErrorMessage.textContent = "Please enter a name for both players!";
    }
}
var timerIntervals = [];

var winningLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//create the two players
var playerOne = {
    playerClass: 'player-one',
    name: '',
    race: '',
    isHuman: true,
    score: 0,
    displayImage: '',
    playerChoices: []
}
var playerTwo = {
    playerClass: 'player-two',
    name: '',
    race: '',
    isHuman: true,
    score: 0,
    displayImage: '',
    playerChoices: []
}

//activeplayer
var activePlayer = '';


//array for the gamesquares
var arrGameSquares = [];

//cache dom elements
var divGameBoard = document.querySelector('.game-board');
var txtPlayerOneScore = document.querySelector('.player-one-score');
var txtPlayerTwoScore = document.querySelector('.player-two-score');
var btnNewGame = document.querySelector('.btn-new-game');
var txtWinnerMSg = document.querySelector('.no-winner');
var txtWinnerName = document.querySelector('.txt-winner');
var btnStartGame = document.querySelector('.btn-start-game');
var overylayMenu = document.querySelector('.overlay');
var txtPlayerOneName = document.querySelector('.player-one-name-input');
var selectPlayerOneIsHuman = document.querySelector('.player-one-human-cpu');
var selectPlayerOneRace = document.querySelector('.player-one-race');
var txtPlayerTwoName = document.querySelector('.player-two-name-input');
var selectPlayerTwoIsHuman = document.querySelector('.player-two-human-cpu');
var selectPlayerTwoRace = document.querySelector('.player-two-race');
var txtPlayerOneDisplayName = document.querySelector('.player-one-name');
var txtPlayerTwoDisplayName = document.querySelector('.player-two-name');
var imgPlayerOneDisplay = document.querySelector('.player-one-display-image');
var imgPlayerTwoDisplay = document.querySelector('.player-two-display-image');
var imgPlayerOneAvaterImage = document.querySelector('.player-one-avatar-image');
var imgPlayerTwoAvaterImage = document.querySelector('.player-two-avatar-image');
var divPlayerOneDisplay = document.querySelector('.player-one-display');
var divPlayerTwoDisplay = document.querySelector('.player-two-display');
var txtErrorMessage = document.querySelector('.error-message');
var divSideBarOverlay = document.querySelector('.side-bar-overlay');

divPlayerOneDisplay.style.visibility = 'hidden';
divPlayerTwoDisplay.style.visibility = 'hidden';

//add eventlisteners
btnNewGame.addEventListener('click', newGame);
btnStartGame.addEventListener('click', startGame);
selectPlayerOneRace.addEventListener('input', changeAvatar);
selectPlayerTwoRace.addEventListener('input', changeAvatar);

//audio files

var hydraliskAudio = new Audio('Audio/hydraliskAudio.wav');
var hydraliskAudio2 = new Audio('Audio/hydralisk2.wav');
var hydraliskAudio3 = new Audio('Audio/hydralisk3.wav');

var zergling1 = new Audio('Audio/zergling1.wav');
var zergling2 = new Audio('Audio/zergling2.wav');
var zergling3 = new Audio('Audio/zergling3.wav');

var marineAudio = new Audio('Audio/marineAudio.wav');
var marineAudio2 = new Audio('Audio/marine2.wav');
var marineAudio3 = new Audio('Audio/marine3.wav');

var siegetank1 = new Audio('Audio/siegetank1.wav');
var siegetank2 = new Audio('Audio/siegetank2.wav');
var siegetank3 = new Audio('Audio/siegetank3.wav');

var zealotAudio = new Audio('Audio/zealotAudio.wav');
var zealotAudio2 = new Audio('Audio/zealot2.wav');
var zealotAudio3 = new Audio('Audio/zealot3.wav');

var dragoon1 = new Audio('Audio/dragoon1.wav');
var dragoon2 = new Audio('Audio/dragoon2.wav');
var dragoon3 = new Audio('Audio/dragoon3.wav');

var zergWinAudio = new Audio('Audio/zergWinAudio.wav');
var protossWinAudio = new Audio('Audio/protossWinAudio.wav');
var terranWinAudio = new Audio('Audio/terrinWinAudio.wav');

var drawAudio1 = new Audio('Audio/draw1.wav');
var drawAudio2 = new Audio('Audio/draw2.wav');
var drawAudio3 = new Audio('Audio/draw3.wav');

var cpuTimer = undefined;








