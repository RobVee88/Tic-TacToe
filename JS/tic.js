//what happens when you click a game square
var clickGameSquare = function(event) {
    if((activePlayer === 'player-one' && playerOne.isHuman) || (activePlayer === 'player-two' && playerTwo.isHuman)) {
        if(!event.target.classList.contains('player-one') && 
        !event.target.classList.contains('player-two')) {
            if(activePlayer === 'player-one') {
                event.target.classList.add('player-one');
                changeImage(playerOne, event.target);
                checkForWin();
                activePlayer = 'player-two';
                divPlayerOneDisplay.classList.remove('current-player');
                divPlayerTwoDisplay.classList.add('current-player');
            } else {
                event.target.classList.add('player-two');
                changeImage(playerTwo, event.target);
                checkForWin();
                activePlayer = 'player-one';
                divPlayerTwoDisplay.classList.remove('current-player');
                divPlayerOneDisplay.classList.add('current-player');
            }
        }
    }
}
var changeImage = function (player, gameSquare) {
    var randomizer = Math.random();

    if(player.race === 'Terran') {
        gameSquare.style.backgroundImage = "url('IMG/Marine.jpg')";
        if(randomizer <= 0.333) {  
            marineAudio.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            marineAudio2.play();
        }else if (randomizer > 0.666) {
            marineAudio3.play();
        }
    }
    if(player.race === 'Protoss') {
        gameSquare.style.backgroundImage = "url('IMG/Zealot.jpg')";  
        if(randomizer <= 0.333) {
            zealotAudio.play();
        } else if (randomizer > 0.333 && randomizer <= 0.666) {
            zealotAudio2.play();
        }else if (randomizer > 0.666) {
            zealotAudio3.play();
        }    
    }
    if(player.race === 'Zerg') {
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
var cpuMove = function() {
    if(!playerOne.isHuman || !playerTwo.isHuman) {
        var arrEmptySquares = [];
        for(i = 0; i < arrGameSquares.length; i++) {
            if(!(arrGameSquares[i].classList.contains('player-one') || arrGameSquares[i].classList.contains('player-two'))) {
                arrEmptySquares.push(arrGameSquares[i]);
            }
        }
        if(!playerOne.isHuman && activePlayer === 'player-one') {
            var randomizer = Math.floor(Math.random() * arrEmptySquares.length);
            arrEmptySquares[randomizer].classList.add(activePlayer);
            changeImage(playerOne, arrEmptySquares[randomizer]);
            checkForWin();
            activePlayer = 'player-two';
            divPlayerOneDisplay.classList.remove('current-player');
            divPlayerTwoDisplay.classList.add('current-player');
        } else if(!playerTwo.isHuman && activePlayer === 'player-two') {
            var randomizer = Math.floor(Math.random() * arrEmptySquares.length);
            arrEmptySquares[randomizer].classList.add(activePlayer);
            changeImage(playerTwo, arrEmptySquares[randomizer]);            
            checkForWin();
            activePlayer = 'player-one';
            divPlayerTwoDisplay.classList.remove('current-player');
            divPlayerOneDisplay.classList.add('current-player');
        }
    }
}
//check to see if a certain line is winning
var isWinningLine = function (gameSquareClass, gameSquare1, gameSquare2, gameSquare3) {
    //go through possible winning line
    if(gameSquare1.classList.contains(gameSquareClass) && gameSquare2.classList.contains(gameSquareClass) && gameSquare3.classList.contains(gameSquareClass)) {
        return true;
    } else {
        return false;
    }

}

//reset gameboard
var resetBoard = function() {
    while(divGameBoard.firstChild) {
        for(i = 0; i < arrGameSquares.length; i++) {
            arrGameSquares.pop();
        }
        divGameBoard.removeChild(divGameBoard.firstChild);
        btnNewGame.addEventListener('click', newGame);
    }
    txtWinnerMSg.className = "no-winner";
    createGameBoard();
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
    if(player.player === 'player-one') {     
        txtPlayerOneScore.textContent = player.score;
    } else {
        txtPlayerTwoScore.textContent = player.score;
    }
    arrGameSquares.forEach(function(gameSquare) {
        gameSquare.removeEventListener('click', clickGameSquare);
    });
    cpuTimer = clearInterval(cpuTimer);
    setTimeout(resetBoard, 5000);
}
//things that happen when its a draw
var noPlayerWins = function() {
    txtWinnerMSg.className = "winner";
    txtWinnerName.textContent = "NOBODY";
    debugger
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
    cpuTimer = clearInterval(cpuTimer);
    setTimeout(resetBoard, 5000);
}

//call the winningline for each possible winning line
var checkForWin = function() {
    if(isWinningLine(activePlayer,arrGameSquares[0],arrGameSquares[1],arrGameSquares[2])){
        arrGameSquares[0].style.transform = 'scale(1.1)';
        arrGameSquares[1].style.transform = 'scale(1.1)';
        arrGameSquares[2].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[3],arrGameSquares[4],arrGameSquares[5])){
        arrGameSquares[3].style.transform = 'scale(1.1)';
        arrGameSquares[4].style.transform = 'scale(1.1)';
        arrGameSquares[5].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[6],arrGameSquares[7],arrGameSquares[8])){
        arrGameSquares[6].style.transform = 'scale(1.1)';
        arrGameSquares[7].style.transform = 'scale(1.1)';
        arrGameSquares[8].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[0],arrGameSquares[3],arrGameSquares[6])){
        arrGameSquares[0].style.transform = 'scale(1.1)';
        arrGameSquares[3].style.transform = 'scale(1.1)';
        arrGameSquares[6].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[1],arrGameSquares[4],arrGameSquares[7])){
        arrGameSquares[1].style.transform = 'scale(1.1)';
        arrGameSquares[4].style.transform = 'scale(1.1)';
        arrGameSquares[7].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[2],arrGameSquares[5],arrGameSquares[8])){
        arrGameSquares[2].style.transform = 'scale(1.1)';
        arrGameSquares[5].style.transform = 'scale(1.1)';
        arrGameSquares[8].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[0],arrGameSquares[4],arrGameSquares[8])){
        arrGameSquares[0].style.transform = 'scale(1.1)';
        arrGameSquares[4].style.transform = 'scale(1.1)';
        arrGameSquares[8].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }  
    } else if(isWinningLine(activePlayer,arrGameSquares[2],arrGameSquares[4],arrGameSquares[6])){
        arrGameSquares[2].style.transform = 'scale(1.1)';
        arrGameSquares[4].style.transform = 'scale(1.1)';
        arrGameSquares[6].style.transform = 'scale(1.1)';
        if(activePlayer === 'player-one') {
            playerWins(playerOne); 
        } else {
            playerWins(playerTwo);
        }    
    } else {
        var totalSquares = document.querySelectorAll('.game-square').length;
        var totalSelectedSquares = (document.querySelectorAll('.player-one').length) + (document.querySelectorAll('.player-two').length);
        if(totalSelectedSquares === totalSquares) {
            noPlayerWins();
        }        
    }
}

var createGameBoard = function () {
    //make 9 div elements for the grid
    for(var i = 0; i < 9; i++) {
        var gameSquareDiv = document.createElement('div');
        gameSquareDiv.classList.add('game-square');
        gameSquareDiv.classList.add(i);
        arrGameSquares.push(gameSquareDiv);
    }
    //show game board on screen
    arrGameSquares.forEach(function(gameSquare) {
    divGameBoard.appendChild(gameSquare);
    });
    activePlayer = 'player-one';
    divPlayerTwoDisplay.classList.remove('current-player');
    divPlayerOneDisplay.classList.add('current-player');
    arrGameSquares.forEach(function(gameSquare) {
        gameSquare.addEventListener('click', clickGameSquare);
    });
    cpuTimer = setInterval(cpuMove, 2000);
}

//start a new game
var newGame = function () {
    cpuTimer = clearInterval(cpuTimer);
    overylayMenu.style.visibility = 'visible';
}

var startGame = function () {
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
    resetBoard();
}
var changeAvatar = function(event) {
    debugger
    if(event.target.className = "player-one-race") {
        imgPlayerOneAvaterImage.src = 'IMG/' + selectPlayerOneRace.value + '.jpg';
    }
    if(event.target.className = "player-two-race") {
        imgPlayerTwoAvaterImage.src = 'IMG/' + selectPlayerTwoRace.value + '.jpg';
    }
}

//create the two players
var playerOne = {
    player: 'player-one',
    name: '',
    race: '',
    isHuman: true,
    score: 0,
    displayImage: ''
}
var playerTwo = {
    player: 'player-two',
    name: '',
    race: '',
    isHuman: true,
    score: 0,
    displayImage: ''
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

//add eventlisteners
btnNewGame.addEventListener('click', newGame);
btnStartGame.addEventListener('click', startGame);
selectPlayerOneRace.addEventListener('input', changeAvatar);
selectPlayerTwoRace.addEventListener('input', changeAvatar);

//audio files

var hydraliskAudio = new Audio('Audio/hydraliskAudio.wav');
var hydraliskAudio2 = new Audio('Audio/hydralisk2.wav');
var hydraliskAudio3 = new Audio('Audio/hydralisk3.wav');

var marineAudio = new Audio('Audio/marineAudio.wav');
var marineAudio2 = new Audio('Audio/marine2.wav');
var marineAudio3 = new Audio('Audio/marine3.wav');

var zealotAudio = new Audio('Audio/zealotAudio.wav');
var zealotAudio2 = new Audio('Audio/zealot2.wav');
var zealotAudio3 = new Audio('Audio/zealot3.wav');

var zergWinAudio = new Audio('Audio/zergWinAudio.wav');
var protossWinAudio = new Audio('Audio/protossWinAudio.wav');
var terranWinAudio = new Audio('Audio/terrinWinAudio.wav');

var drawAudio1 = new Audio('Audio/draw1.wav');
var drawAudio2 = new Audio('Audio/draw2.wav');
var drawAudio3 = new Audio('Audio/draw3.wav');

var cpuTimer = undefined;