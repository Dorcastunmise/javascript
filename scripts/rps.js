let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updScore();

/*
//if(score === null){
if(!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
} */
function pickComputerMove(){
  let randomNo = Math.random();
  let computerMove = '';

  if(randomNo >= 0 && randomNo < 1/3) {
    computerMove = 'rock';
  }
  else if(randomNo >= 1/3 && randomNo < 2/3){ 
    computerMove = 'paper';
  }
  else if(randomNo >= 2/3 && randomNo < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

function btnClick(data){
  let computerMove = pickComputerMove();
  
  
  if(computerMove === 'rock' && data === 'rock') result = 'Tie!';
  else if(computerMove === 'rock' && data === 'paper') result = 'You Win!';
  else if(computerMove === 'rock' && data === 'scissors') result = 'You Lose!';

  else if(computerMove === 'paper' && data === 'rock') result = 'You Lose!';
  else if(computerMove === 'paper' && data === 'paper') result = 'Tie!';
  else if(computerMove === 'paper' && data === 'scissors') result = 'You Win!';

  else if(computerMove === 'scissors' && data === 'rock') result = 'You Win!';
  else if(computerMove === 'scissors' && data === 'paper') result = 'You Lose!';
  else if(computerMove === 'scissors' && data === 'scissors') result = 'Tie!';

  if (result == 'You Win!') score.wins++;
  if (result == 'You Lose!') score.losses++;
  if (result == 'Tie!') score.ties++;

  scoreDescription(result, computerMove, data);
  localStorage.setItem('score', JSON.stringify(score));

  updScore();
  
}

function scoreDescription(result, computerMove, data) {
  document.querySelector('.js-result').innerText = result;
  let displData = `
    You
      <img src="images/${data}-emoji.png" alt="">
      <img src="images/${computerMove}-emoji.png" alt="">
    Computer
  `;
  document.querySelector('.js-moves').innerHTML = displData;
}

function updScore() {
  document.querySelector('.js-score').innerHTML = `
    Wins = ${score.wins}, Losses = ${score.losses}, Ties = ${score.ties}
  `;
}

function resetScoreboard(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updScore();
}

function rockClick(data){
  btnClick(data);
}

function paperClick(data){
  btnClick(data);
}

function scissorsClick(data){
  btnClick(data);
}


