/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables controlling state of game
let scores,
  roundScore,
  activePlayer,
  isGamePlaying;

// Css classes maybe?
const btnNew = '.btn-new';
const btnRoll = '.btn-roll';
const btnHold = '.btn-hold';

// Initialize app
init();

/**
 * Control roll button
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGamePlaying) {
        // 1) Random number
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2) Check/update round score
        if (dice === 1) {
            nextPlayer()
        }
        else {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

        // 2.9) Get dice dom
        let diceDOM = document.querySelector('.dice');

        // 3) Do animation.. the anticipation is building!
        let r = 15 // Animation rate
        document.querySelector('.btn-roll').disabled = true
        diceDOM.style.transform = 'translateX(-50%) rotate(-360deg)'
        animate(
            function* generator() {
                for (let a = 0; a <= 360; a += r) {
                    diceDOM.style.transform = 'translateX(-50%) rotate(-' + (360 - a) + 'deg)'
                    yield;
                }
            }, 
            function callback() {
                // Reenable button
                document.querySelector('.btn-roll').disabled = false

                // 4) Display the result
                diceDOM.style.display = 'block';
                diceDOM.src = 'assets/dice-' + dice + '.png';
            }
        )
    }
});

/**
 * Control hold button
 */
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

/**
 * Control initialization
 */
document.querySelector('.btn-new').addEventListener('click', init);

/**
 * Initialize game
 */
function init() {
    // Initialize variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isGamePlaying = true;

    // Set dice
    document.querySelector('.dice').style.display = 'none';

    // Set scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Set players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Set panel styling
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Player 0 goes first
    document.querySelector('.player-0-panel').classList.add('active');
}

/**
 * Transition to next player
 */
function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Reset current turn score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Toggle active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Reset dice
    document.querySelector('.dice').style.display = 'none';
}

/**
 * What the heck is this malarkey
 * 
 *        v v v v v
 */

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


// Animation helper
function animate(generator, callback) {
    let routine = generator();
    let animFrame = function() {
        let n = routine.next()
        if (n.done) { callback() }
        else { requestAnimationFrame(animFrame) }
    }
    requestAnimationFrame(animFrame)
}