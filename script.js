
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
function computeRPS(userChoice) {
    const randChoice = Math.random();
    let userMove = userChoice;
    let compMove = '';
    let result = '';
    let out = '';
    if (randChoice >= 0 && randChoice <= 1 / 3) {
        compMove = 'rock';
    }

    else if (randChoice > 1 / 3 && randChoice <= 2 / 3) {
        compMove = 'paper';
    }
    else if (randChoice > 2 / 3 && randChoice <= 1) {
        compMove = 'scissors';
    }


    if ((compMove === 'rock' && userMove === 'rock') || (compMove === 'paper' && userMove === 'paper') || (compMove === 'scissors' && userMove === 'scissors')) {
        result = 'TIE';
        scores.ties += 1;
    }

    else if ((compMove === 'paper' && userMove === 'rock') || (compMove === 'rock' && userMove === 'scissors') || (compMove === 'scissors' && userMove === 'paper')) {
        result = 'YOU LOSE';
        scores.losses += 1;
    }

    else if ((compMove === 'rock' && userMove === 'paper') || (compMove === 'paper' && userMove === 'scissors') || (compMove === 'scissors' && userMove === 'rock')) {
        result = 'YOU WIN';
        scores.wins += 1;
    }

    localStorage.setItem("scores", JSON.stringify(scores));

    console.log(displayScores(userMove, compMove, scores.wins, scores.losses, scores.ties, result));
    return displayScores(userMove, compMove, scores.wins, scores.losses, scores.ties, result);



}

function displayScores(userMove, compMove, wins, losses, ties, result) {
    return gameResult.innerHTML = `<p style="margin-top:50px;margin-bottom:30px;font-weight:bold;font-size:35px;">"${result}"</p>
            <p style="font-weight:bold">You picked - <img src="images/${userMove}-emoji.png" style="height:60px">, Computer picked - <img src="images/${compMove}-emoji.png" style="height:60px">.</p>
            <p style="margin-top:50px;font-size:18px;font-weight:bold">Wins: ${wins}, Losses: ${losses}, Ties: ${ties}</p>`;

}

function resetScore() {
    scores.wins = 0, scores.losses = 0, scores.ties = 0;
    localStorage.setItem("scores", JSON.stringify(scores));
    let quer = `Scores Reset - Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
    gameResult.innerHTML = `<p style="margin-top:50px;font-size:18px;font-weight:bold">${quer}</p>`;
    alert(quer);
    return quer;
}