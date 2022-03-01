/* Variables */

const rollDice = document.getElementById("roll");
const holdGame = document.getElementById("hold");
const newGame = document.getElementById("new-game");
const rulesGame = document.getElementById("rules");
let currentP1 = document.getElementById("current-0");
let currentP2 = document.getElementById("current-1");
let globalP1 = document.getElementById("score-0");
let globalP2 = document.getElementById("score-1");
let imgDice = document.querySelector(".dice-img");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let board = document.querySelector(".board");
let globalScore, roundScore, activePlayer, gamePlaying;

/* New Game */

newGame.addEventListener("click", () => {
  init();
});

/* Rules */

rulesGame.addEventListener("click", () => {
  alert(
    "To play to Dice Game you need to be two players. Each player has a current and a global score initialized to 0. When it's your turn, you can click on ROLL DICE as many times as you want. Your current score will increase. But be carefull, if you roll a 1, your current score will be lost and it will be your opponent's turn. To save your current score in your global, you can click on HOLD, then, it will be your opponent's turn. The first player who will get a global score of 100 will win the party !"
  );
});

/* Function Next Player */

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  currentP1.textContent = "0";
  currentP2.textContent = "0";
  player1.classList.toggle("active");
  player2.classList.toggle("active");
  board.classList.toggle("flipped");
}

/* Initialisation */

function init() {
  globalScore = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  globalP1.textContent = "0";
  globalP2.textContent = "0";
  currentP1.textContent = "0";
  currentP2.textContent = "0";
  player1.textContent = "Player 1";
  player2.textContent = "Player 2";
  player1.classList.add("active");
  board.classList.add("flipped");
}

/* GAME */

init();

/* Roll Dice */

rollDice.addEventListener("click", () => {
  if (gamePlaying) {
    imgDice.classList.add("shake");
    setTimeout(() => {
      imgDice.classList.remove("shake");
    }, 1200);
    let audio = new Audio("audio-dé.mp3");
    audio.play();
    let valueDice = Math.floor(Math.random() * 6) + 1;
    imgDice.src = `img/dice-${valueDice}.png`;

    if (valueDice !== 1) {
      roundScore += valueDice;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else {
      nextPlayer();
    }
  }
});

/* Hold */

holdGame.addEventListener("click", () => {
  if (gamePlaying) {
    globalScore[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      globalScore[activePlayer];
    if (globalScore[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      gamePlaying = false;
      alert("Player " + activePlayer + " wins!");
    } else {
      nextPlayer();
    }
  }
});
