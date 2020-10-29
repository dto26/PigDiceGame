/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, isGamePlaying;
const btnNew = '.btn-new';
const btnRoll = '.btn-roll';
const btnHold = '.btn-hold';

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isGamePlaying) {
    // 1) Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // 2) Display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'assets/dice-' + dice + '.png';
    // 3) Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (isGamePlaying) {
    // Add current score to global scores
    scores[activePlayer] += roundScore;
    // Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // Check if the player won the game
    if (scores[activePlayer] >= 100) {
      // Active Player wins
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      isGamePlaying = false;
    } else {
      nextPlayer();
    }
  }
})

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  isGamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

// neumorphic
document.querySelector('.btn-new').addEventListener('click', function () {
  document.querySelector('.btn-new').classList.toggle('neumorphic--pressed')
  setTimeout(function () {
    document.querySelector('.btn-new').classList.toggle('neumorphic--pressed')
  }, 200);
});
document.querySelector('.btn-roll').addEventListener('click', function () {
  document.querySelector('.btn-roll').classList.toggle('neumorphic--pressed')
  setTimeout(function () {
    document.querySelector('.btn-roll').classList.toggle('neumorphic--pressed')
  }, 200);
});
document.querySelector('.btn-hold').addEventListener('click', function () {
  document.querySelector('.btn-hold').classList.toggle('neumorphic--pressed')
  setTimeout(function () {
    document.querySelector('.btn-hold').classList.toggle('neumorphic--pressed')
  }, 200);
});

function clickEffect(btn) {

}
