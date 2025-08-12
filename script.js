console.log(localStorage.getItem("scores"));
let gameResult = document.querySelector('.gameResult');

let scores = JSON.parse(localStorage.getItem("scores")) || {
    wins: 0,
    losses: 0,
    ties: 0
};

gameResult.innerHTML = `<p style="margin-top:50px;font-size:18px;font-weight:bold">Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}</p>`

/*
        
if (scores === null){
        wins: 0,
        losses: 0,
        ties: 0
    };
        
*/

let isAutoPlay = false;
let intervalId;

document.querySelector('.autoPlayButton').addEventListener('click', () => {
    autoPlay();
});

function autoPlay(){

    if(!isAutoPlay){
        isAutoPlay = true;
        intervalId = setInterval(() => {
            const playerMove = compMove();
            computeRPS(playerMove);
        },1000)
    }
    else{
        clearInterval(intervalId);
        isAutoPlay = false;
    }
}


function compMove(){

    const randChoice = Math.random();
    let computerMove = '';
    if (randChoice >= 0 && randChoice <= 1 / 3) {
        computerMove = 'rock';
    }

    else if (randChoice > 1 / 3 && randChoice <= 2 / 3) {
        computerMove = 'paper';
    }
    else if (randChoice > 2 / 3 && randChoice <= 1) {
        computerMove = 'scissors';
    }

    return computerMove;

}


document.querySelector('.gameButton-rock').addEventListener('click', () => {
    computeRPS('rock');
});

document.querySelector('.gameButton-paper').addEventListener('click', () => {
    computeRPS('paper');
});

document.querySelector('.gameButton-scissors').addEventListener('click', () => {
    computeRPS('scissors');
});


document.body.addEventListener('keydown', (event) => {
    if(event.key == 'r'){
        computeRPS('rock');
    }

    else if(event.key == 'p'){
        computeRPS('paper');
    }
    else if(event.key == 's'){
        computeRPS('scissors');
    }
});

function computeRPS(userChoice) {

    let userMove = userChoice;
    let computerMove = compMove();
    let result = '';


    if ((computerMove === 'rock' && userMove === 'rock') || (computerMove === 'paper' && userMove === 'paper') || (computerMove === 'scissors' && userMove === 'scissors')) {
        result = 'TIE';
        scores.ties += 1;
    }

    else if ((computerMove === 'paper' && userMove === 'rock') || (computerMove === 'rock' && userMove === 'scissors') || (computerMove === 'scissors' && userMove === 'paper')) {
        result = 'YOU LOSE';
        scores.losses += 1;
    }

    else if ((computerMove === 'rock' && userMove === 'paper') || (computerMove === 'paper' && userMove === 'scissors') || (computerMove === 'scissors' && userMove === 'rock')) {
        result = 'YOU WIN';
        scores.wins += 1;
    }

    localStorage.setItem("scores", JSON.stringify(scores));

    return displayScores(userMove, computerMove, scores.wins, scores.losses, scores.ties, result);



}

function displayScores(userMove, computerMove, wins, losses, ties, result) {
    return gameResult.innerHTML = `<p style="margin-top:50px;margin-bottom:30px;font-weight:bold;font-size:35px;">"${result}"</p>
            <p style="font-weight:bold">
                You picked - <img src="images/${userMove}-emoji.png" style="height:60px">, Computer picked - <img src="images/${computerMove}-emoji.png" style="height:60px">.
            </p>
            <p style="margin-top:50px;font-size:18px;font-weight:bold">
                Wins: ${wins}, Losses: ${losses}, Ties: ${ties}
            </p>`;

}

document.querySelector('.resetButton').addEventListener('click', () => {
    resetScore();
});

function resetScore() {
    scores.wins = 0, scores.losses = 0, scores.ties = 0;
    localStorage.setItem("scores", JSON.stringify(scores));
    let quer = `Scores Reset - Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
    gameResult.innerHTML = `<p style="margin-top:50px;font-size:18px;font-weight:bold">${quer}</p>`;
    alert(quer);
    return quer;
}