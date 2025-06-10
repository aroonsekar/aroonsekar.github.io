// JavaScript for Accordion Functionality
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
            button.querySelector('span').textContent = '+';
        } else {
            document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.accordion-button span').forEach(i => i.textContent = '+');

            content.style.display = "block";
            button.querySelector('span').textContent = '-';
        }
    });
});

// Function to update and display the current time in hh:mm:ss format
function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function showCurrentTime() {
        const now = new Date();
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(showCurrentTime, 1000); // Update every second
}

// Update current time on page load
window.addEventListener('load', updateCurrentTime);

// Function to calculate and display the page size
function updatePageSize() {
    const pageSizeElement = document.getElementById('page-size');
    const resources = performance.getEntriesByType('resource');
    
    let totalSize = 0;
    resources.forEach(resource => {
        if (resource.transferSize) {
            totalSize += resource.transferSize;
        }
    });

    let sizeText;
    if (totalSize < 1024) {
        sizeText = `${totalSize} Bytes`;
    } else if (totalSize < 1024 * 1024) {
        sizeText = `${(totalSize / 1024).toFixed(2)} KB`;
    } else {
        sizeText = `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    }

    pageSizeElement.textContent = `Page Size: ${sizeText}`;
}

// Update page size on load
window.addEventListener('load', updatePageSize);

// JavaScript for Tic-Tac-Toe Game
const board = document.getElementById('board');
const message = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(event) {
    if (!gameActive || event.target.innerHTML !== '') return;

    event.target.innerHTML = currentPlayer;
    if (checkWin(currentPlayer)) {
        gameActive = false;
        message.innerHTML = currentPlayer === 'X' ? 'You win!' : 'Computer wins!';
        playAgainButton.style.display = 'block';
    } else if (cells.every(cell => cell.innerHTML !== '')) {
        gameActive = false;
        message.innerHTML = 'It\'s a draw!';
        playAgainButton.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            computerMove();
        }
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === '') {
            cells[i].innerHTML = 'O';
            let score = minimax(cells, 0, false);
            cells[i].innerHTML = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== undefined) {
        cells[move].innerHTML = 'O';
    }

    if (checkWin('O')) {
        gameActive = false;
        message.innerHTML = 'Computer wins!';
        playAgainButton.style.display = 'block';
    } else if (cells.every(cell => cell.innerHTML !== '')) {
        gameActive = false;
        message.innerHTML = 'It\'s a draw!';
        playAgainButton.style.display = 'block';
    } else {
        currentPlayer = 'X';
    }
}


function checkWin(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].innerHTML === player);
    });
}

function checkWinState(player, boardState) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => boardState[index].innerHTML === player);
    });
}


function minimax(boardState, depth, isMaximizing) {
    if (checkWinState('O', boardState)) return 10 - depth;
    if (checkWinState('X', boardState)) return depth - 10;
    if (boardState.every(cell => cell.innerHTML !== '')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i].innerHTML === '') {
                boardState[i].innerHTML = 'O';
                let score = minimax(boardState, depth + 1, false);
                boardState[i].innerHTML = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i].innerHTML === '') {
                boardState[i].innerHTML = 'X';
                let score = minimax(boardState, depth + 1, true);
                boardState[i].innerHTML = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}



function resetGame() {
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    gameActive = true;
    message.innerHTML = '';
    playAgainButton.style.display = 'none';
}

createBoard();
/* ================================
   DARK/LIGHT MODE GLOW ANIMATION
================================ */
const nightModeToggle = document.getElementById('night-mode-toggle');
const body = document.body;

// The overlay divs for glows -- must match your HTML IDs
const darkGlow = document.getElementById('dark-glow');
const lightGlow = document.getElementById('light-glow');

// When we click the toggle, figure out if we're going from Light->Dark or Dark->Light
nightModeToggle.addEventListener('click', () => {
    const goingDark = (nightModeToggle.textContent === 'I am Batman');

    // 1) Update button text
    if (goingDark) {
        nightModeToggle.textContent = 'Let there be light';
    } else {
        nightModeToggle.textContent = 'I am Batman';
    }

    // 2) Trigger the correct glow effect
    triggerGlow(goingDark);

    // 3) Toggle night mode classes
    toggleNightMode();
});

/**
 * Triggers a radial gradient glow from the button's position.
 * goingDark = true => use #dark-glow
 * goingDark = false => use #light-glow
 */
function triggerGlow(goingDark) {
    // 1) Get the button's x/y position
    const btnRect = nightModeToggle.getBoundingClientRect();
    const centerX = btnRect.left + btnRect.width / 2;
    const centerY = btnRect.top + btnRect.height / 2;

    // 2) Decide which overlay to use
    const overlay = goingDark ? darkGlow : lightGlow;

    // 3) Build a radial gradient centered on (centerX, centerY)
    // We'll use window.scrollX / scrollY in case the button is not at top-left
    const pageX = centerX + window.scrollX;
    const pageY = centerY + window.scrollY;

    if (goingDark) {
      // black/dark glow
      overlay.style.background = `radial-gradient(circle at ${pageX}px ${pageY}px, rgba(0,0,0,1) 100%, transparent 100%)`;
    } else {
      // white glow
      overlay.style.background = `radial-gradient(circle at ${pageX}px ${pageY}px, rgba(255,255,255,1) 100%, transparent 100%)`;
    }

    // 4) Activate it by toggling the "glow-active" class
    // First remove the class so we can re-trigger from scratch
    overlay.classList.remove('glow-active');
    void overlay.offsetWidth; // force a reflow
    overlay.classList.add('glow-active');

    // 5) Optional: remove the glow after some time
    setTimeout(() => {
        overlay.classList.remove('glow-active');
    }, 1000);
}

// Our usual function that toggles the .night-mode classes
function toggleNightMode() {
    body.classList.toggle('night-mode');
    document.querySelector('header').classList.toggle('night-mode');
    document.querySelector('footer').classList.toggle('night-mode');
    // Toggle night-mode class on every paragraph
    document.querySelectorAll('p').forEach(p => {
        p.classList.toggle('night-mode');
    });

    // contact-link
    document.querySelectorAll('.contact-link').forEach(link => {
        link.classList.toggle('night-mode');
    });
    
    // accordion
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.classList.toggle('night-mode');
    });
    document.querySelectorAll('.accordion-content').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.toggle('night-mode');
    });
    document.querySelectorAll('.location-info').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.footer-content').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.left-section').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('#page-size').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('#created-by').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('#current-time').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('#night-mode-toggle').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.timeline-dot').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.timeline-heading').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.timeline-details').forEach(content => {
        content.classList.toggle('night-mode');
    });
}

/* ==============================
   TIMELINE: TOGGLE DETAILS
============================== */
const timelineHeadings = document.querySelectorAll('.timeline-heading');
timelineHeadings.forEach(heading => {
    heading.addEventListener('click', () => {
        const details = heading.nextElementSibling; 
        details.classList.toggle('active');
    });
});
