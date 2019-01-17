//what happens when you click a game square
var clickGameSquare = function(event) {
    if((activePlayer === 'player-one' && playerOne.isHuman) || (activePlayer === 'player-two' && playerTwo.isHuman)) {
        if(!event.target.classList.contains('player-one') && 
        !event.target.classList.contains('player-two')) {
            if(activePlayer === 'player-one') {
                event.target.classList.add('player-one');
                changeImage(playerOne, playerTwo, event.target);
                checkForWin();
                activePlayer = 'player-two';
                divPlayerOneDisplay.classList.remove('current-player');
                divPlayerTwoDisplay.classList.add('current-player');
            } else {
                event.target.classList.add('player-two');
                changeImage(playerTwo, playerOne, event.target);
                checkForWin();
                activePlayer = 'player-one';
                divPlayerTwoDisplay.classList.remove('current-player');
                divPlayerOneDisplay.classList.add('current-player');
            }
        }
    }
}
var changeImage = function (currentPlayer, otherPlayer, gameSquare) {
    var randomizer = Math.random();

    if((currentPlayer.race === 'Terran') && (otherPlayer.race === 'Terran') && (currentPlayer.player === 'player-two')) {
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
    if((currentPlayer.race === 'Protoss') && (otherPlayer.race === 'Protoss') && (currentPlayer.player === 'player-two')) {
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
    if((currentPlayer.race === 'Zerg') && (otherPlayer.race === 'Zerg') && (currentPlayer.player === 'player-two')) {
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

var cpuMove = function() {
    if(!playerOne.isHuman || !playerTwo.isHuman) {
        //find all empty gamesquares
        var arrEmptySquares = [];
        var p1AlmostWinningSquareLine1 = checkAlmostWinningLine('player-one', 'player-two',0,1,2);
        var p2AlmostWinningSquareLine1 = checkAlmostWinningLine('player-two', 'player-one',0,1,2);
        var p1AlmostWinningSquareLine2 = checkAlmostWinningLine('player-one', 'player-two',3,4,5);
        var p2AlmostWinningSquareLine2 = checkAlmostWinningLine('player-two', 'player-one',3,4,5);
        var p1AlmostWinningSquareLine3 = checkAlmostWinningLine('player-one', 'player-two',6,7,8);
        var p2AlmostWinningSquareLine3 = checkAlmostWinningLine('player-two', 'player-one',6,7,8);
        var p1AlmostWinningSquareLine4 = checkAlmostWinningLine('player-one', 'player-two',0,3,6);
        var p2AlmostWinningSquareLine4 = checkAlmostWinningLine('player-two', 'player-one',0,3,6);
        var p1AlmostWinningSquareLine5 = checkAlmostWinningLine('player-one', 'player-two',1,4,7);
        var p2AlmostWinningSquareLine5 = checkAlmostWinningLine('player-two', 'player-one',1,4,7);
        var p1AlmostWinningSquareLine6 = checkAlmostWinningLine('player-one', 'player-two',2,5,8);
        var p2AlmostWinningSquareLine6 = checkAlmostWinningLine('player-two', 'player-one',2,5,8);
        var p1AlmostWinningSquareLine7 = checkAlmostWinningLine('player-one', 'player-two',0,4,8);
        var p2AlmostWinningSquareLine7 = checkAlmostWinningLine('player-two', 'player-one',0,4,8);
        var p1AlmostWinningSquareLine8 = checkAlmostWinningLine('player-one', 'player-two',2,4,6);
        var p2AlmostWinningSquareLine8 = checkAlmostWinningLine('player-two', 'player-one',2,4,6);

        for(i = 0; i < arrGameSquares.length; i++) {
            if(!(arrGameSquares[i].classList.contains('player-one') || arrGameSquares[i].classList.contains('player-two'))) {
                arrEmptySquares.push(arrGameSquares[i]);
            }
        }
        if((!playerOne.isHuman) && (activePlayer === 'player-one')) {
            if(p1AlmostWinningSquareLine1 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine1].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine1]);   
            } else if (p1AlmostWinningSquareLine2 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine2].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine2]);
            } else if (p1AlmostWinningSquareLine3 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine3].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine3]);
            }else if (p1AlmostWinningSquareLine4 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine4].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine4]);
            }else if (p1AlmostWinningSquareLine5 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine5].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine5]);
            }else if (p1AlmostWinningSquareLine6 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine6].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine6]);
            }else if (p1AlmostWinningSquareLine7 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine7].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine7]);
            }else if (p1AlmostWinningSquareLine8 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine8].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p1AlmostWinningSquareLine8])
            } else if(p2AlmostWinningSquareLine1 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine1].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine1]); 
            } else if (p2AlmostWinningSquareLine2 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine2].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine2]);
            } else if (p2AlmostWinningSquareLine3 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine3].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine3]);
            }else if (p2AlmostWinningSquareLine4 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine4].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine4]);
            }else if (p2AlmostWinningSquareLine5 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine5].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine5]);
            }else if (p2AlmostWinningSquareLine6 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine6].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine6]);
            }else if (p2AlmostWinningSquareLine7 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine7].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine7]);
            }else if (p2AlmostWinningSquareLine8 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine8].classList.add('player-one');
                changeImage(playerOne, playerTwo, arrGameSquares[p2AlmostWinningSquareLine8]);
            } else {
                var randomizer = Math.floor(Math.random() * arrEmptySquares.length);
                arrEmptySquares[randomizer].classList.add(activePlayer);
                changeImage(playerOne, playerTwo, arrEmptySquares[randomizer]);
            }   
            checkForWin();
            activePlayer = 'player-two';
            divPlayerOneDisplay.classList.remove('current-player');
            divPlayerTwoDisplay.classList.add('current-player');
        } else if((!playerTwo.isHuman) && (activePlayer === 'player-two')) {  
            if(p2AlmostWinningSquareLine1 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine1].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine1]);   
            } else if (p2AlmostWinningSquareLine2 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine2].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine2]);
            } else if (p2AlmostWinningSquareLine3 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine3].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine3]);
            }else if (p2AlmostWinningSquareLine4 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine4].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine4]);
            }else if (p2AlmostWinningSquareLine5 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine5].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine5]);
            }else if (p2AlmostWinningSquareLine6 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine6].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine6]);
            }else if (p2AlmostWinningSquareLine7 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine7].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine7]);
            }else if (p2AlmostWinningSquareLine8 !== false) {
                arrGameSquares[p2AlmostWinningSquareLine8].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p2AlmostWinningSquareLine8])
            } else if(p1AlmostWinningSquareLine1 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine1].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine1]); 
            } else if (p1AlmostWinningSquareLine2 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine2].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine2]);
            } else if (p1AlmostWinningSquareLine3 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine3].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine3]);
            }else if (p1AlmostWinningSquareLine4 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine4].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine4]);
            }else if (p1AlmostWinningSquareLine5 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine5].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine5]);
            }else if (p1AlmostWinningSquareLine6 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine6].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine6]);
            }else if (p1AlmostWinningSquareLine7 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine7].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine7]);
            }else if (p1AlmostWinningSquareLine8 !== false) {
                arrGameSquares[p1AlmostWinningSquareLine8].classList.add('player-two');
                changeImage(playerTwo, playerOne, arrGameSquares[p1AlmostWinningSquareLine8]);
            } else {       
                var randomizer = Math.floor(Math.random() * arrEmptySquares.length);
                arrEmptySquares[randomizer].classList.add(activePlayer);
                changeImage(playerTwo, playerOne, arrEmptySquares[randomizer]);  
            } 
            checkForWin();
            activePlayer = 'player-one';
            divPlayerTwoDisplay.classList.remove('current-player');
            divPlayerOneDisplay.classList.add('current-player');
        }
    }
}
//check to see if a certain line is winning needs all three to be clicked
var isWinningLine = function (gameSquareClass, gameSquare1, gameSquare2, gameSquare3) {
    //go through possible winning line
    if(gameSquare1.classList.contains(gameSquareClass) && gameSquare2.classList.contains(gameSquareClass) && gameSquare3.classList.contains(gameSquareClass)) {
        return true;
    } else {
        return false;
    }

}

//returns index of arrGamesSquares for the chosen square
var checkAlmostWinningLine = function (gameSquareClass1, gameSquareClass2, num1, num2, num3) {
    debugger
    if( arrGameSquares[num1].classList.contains(gameSquareClass1) && 
         (arrGameSquares[num2].classList.contains(gameSquareClass1) || arrGameSquares[num3].classList.contains(gameSquareClass1)) 
       || (arrGameSquares[num2].classList.contains(gameSquareClass1) && arrGameSquares[num3].classList.contains(gameSquareClass1))) {


            if(!arrGameSquares[num1].classList.contains(gameSquareClass1) && !arrGameSquares[num1].classList.contains(gameSquareClass2)) {
                return num1;
            }
            if(!arrGameSquares[num2].classList.contains(gameSquareClass1) && !arrGameSquares[num2].classList.contains(gameSquareClass2)) {
                return num2;
            }
            if(!arrGameSquares[num3].classList.contains(gameSquareClass1) && !arrGameSquares[num3].classList.contains(gameSquareClass2)) {
                return num3;
            } else {
                return false;
            }
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
    cpuTimer = clearInterval(cpuTimer);
    cpuTimer = setInterval(cpuMove, 2000);
}

//start a new game
var newGame = function () {
    cpuTimer = clearInterval(cpuTimer);
    divSideBarOverlay.style.visibility = 'hidden';
    overylayMenu.style.visibility = 'visible';
}

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
        resetBoard();
    } else {
        txtErrorMessage.textContent = "Please enter a name for both players!";
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