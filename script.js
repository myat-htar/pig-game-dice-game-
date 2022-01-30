let player1 = document.querySelector(".player--1");
let player2 = document.querySelector(".player--2");
let player1Score = document.getElementById("player--1--score");
let player2Score = document.getElementById("player--2--score");
let player1Current = document.getElementById("current--1");
let player2Current = document.getElementById("current--2");
let diceImage = document.querySelector(".dice-image");
let btnNewGame = document.querySelector(".btn--new-game");
let btnRollDice = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let scores, currentScore, activePlayer, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 1;
  scores = [0, 0]; //[player--1--score, player--2--score]
  playing = true;

  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player1.classList.remove("player--win");
  player2.classList.remove("player--win");

  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  diceImage.classList.add("hidden");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// For Roll dice button
btnRollDice.addEventListener("click", function () {
  if (playing) {
    const diceNo = Math.trunc(Math.random() * 6) + 1;
    diceImage.classList.remove("hidden");
    diceImage.src = `images/dice-${diceNo}.png`;
    if (diceNo != 1) {
      // Add dice no in current score
      currentScore += diceNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// For hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to final score
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`player--${activePlayer}--score`).textContent =
      scores[activePlayer - 1];
    // 2. Check if final score is greater than 30
    if (scores[activePlayer - 1] >= 30) {
      // Finish Game and declare winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--win");
      diceImage.classList.add("hidden");
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      playing = false;
      document.querySelector(
        `.player--${activePlayer} .declare-winner`
      ).textContent = "You Win!";
    } else {
      if (currentScore > 0) {
        // Switch player
        switchPlayer();
      } else {
        alert("You have to roll dice to get score!!");
      }
    }
  }
});
// For New game button
btnNewGame.addEventListener("click", function () {
  document.querySelector(
    `.player--${activePlayer} .declare-winner`
  ).textContent = " ";
  init();
});

// For How to Modal box
let btnHowto = document.querySelector(".btn--how-to");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let closeModalBtn = document.querySelector(".close-modal");
let closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnHowto.addEventListener("click", function (e) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
