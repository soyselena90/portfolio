'use strict';

const statusDiv = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');
const cellGames = document.querySelectorAll('.game_cell');

//game constants
const xSymbol = '✕';
const oSymbol = '○';


//game variables

let gameIsLive = true;
let xIsnext = true;


//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol; 

const handleWin = (letter) => {
    gameIsLive = false;
    if(letter === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(letter)} 님 승리!`;
        alert(`${letterToSymbol(letter)} 님 승리!`);
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} 님 승리!</span>`;
        alert(`${letterToSymbol(letter)} 님 승리!`);
    } 
};

const checkGameStatus = () => {
    const topLeft = cellGames[0].classList[1];
    const topMiddle = cellGames[1].classList[1];
    const topRight = cellGames[2].classList[1];
    const mdLeft = cellGames[3].classList[1];
    const mdMiddle = cellGames[4].classList[1];
    const mdRight = cellGames[5].classList[1];
    const btmLeft = cellGames[6].classList[1];
    const btmMiddle = cellGames[7].classList[1];
    const btmRight = cellGames[8].classList[1];
    
    //winner?
    
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        handleWin(topLeft);
        cellGames[0].classList.add('won');
        cellGames[1].classList.add('won');
        cellGames[2].classList.add('won');

    } else if(mdLeft && mdLeft === mdMiddle && mdLeft === mdRight){
        handleWin(mdLeft);
        cellGames[3].classList.add('won');
        cellGames[4].classList.add('won');
        cellGames[5].classList.add('won');
    } else if(btmLeft && btmLeft === btmMiddle && btmLeft === btmRight){
        handleWin(btmLeft);
        cellGames[6].classList.add('won');
        cellGames[7].classList.add('won');
        cellGames[8].classList.add('won');
    } else if(topLeft && topLeft === mdLeft && topLeft === btmLeft){
        handleWin(topLeft);
        cellGames[0].classList.add('won');
        cellGames[3].classList.add('won');
        cellGames[6].classList.add('won');
    } else if(topMiddle && topMiddle === mdMiddle && topMiddle === btmMiddle){
        handleWin(topMiddle);
        cellGames[1].classList.add('won');
        cellGames[4].classList.add('won');
        cellGames[7].classList.add('won');
    } else if(topRight && topRight === mdRight && topRight === btmRight){
        handleWin(topRight);
        cellGames[2].classList.add('won');
        cellGames[5].classList.add('won');
        cellGames[8].classList.add('won');
    } else if(topLeft && topLeft === mdMiddle && topLeft === btmRight){
        handleWin(topLeft);
        cellGames[0].classList.add('won');
        cellGames[4].classList.add('won');
        cellGames[8].classList.add('won');
    } else if(topRight && topRight === mdMiddle && topRight === btmLeft){
        handleWin(topRight);
        cellGames[2].classList.add('won');
        cellGames[4].classList.add('won');
        cellGames[6].classList.add('won');
    } else if(topLeft && topMiddle && topRight && mdLeft && mdMiddle && mdRight && btmLeft && btmMiddle && btmLeft){
        gameIsLive = false;
        statusDiv.innerHTML = '무승부';
        alert("무승부입니다.");
    } else{
        xIsnext = !xIsnext;
        if(xIsnext){
            statusDiv.innerHTML = `Player : ${xSymbol}`;
        } else {
            statusDiv.innerHTML = `<span>Player : ${oSymbol}</span>`;
        }
    }
};

//event Handlers
const handleReset = ()=> {
    xIsnext = true;    
    statusDiv.innerHTML = `Player : ${xSymbol}`;
    for(const cellGame of cellGames){
        cellGame.classList.remove('x');
        cellGame.classList.remove('o');
        cellGame.classList.remove('won');
    }
    gameIsLive = true;
};
const handleCellClick = (e) => {
    const classList = e.target.classList;
   
    // 두번째요소를 선택할 때 o, x가 있는지확인
    if(!gameIsLive || classList[1] === 'x' || classList[1] === 'o'){ 
        return; // function end, nothing to do
    }
    
    if(xIsnext){
        classList.add('x'); 
        checkGameStatus();
    }else{
        classList.add('o'); 
        checkGameStatus();
    }
}

//event listeners
resetBtn.addEventListener('click', handleReset);


for(const cellGame of cellGames) {
    cellGame.addEventListener('click', handleCellClick);
}