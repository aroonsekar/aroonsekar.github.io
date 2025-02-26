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
    let emptyCells = cells.filter(cell => cell.innerHTML === '');
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerHTML = 'O';
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

function resetGame() {
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    gameActive = true;
    message.innerHTML = '';
    playAgainButton.style.display = 'none';
}

createBoard();

// JavaScript for Night Mode Toggle
const nightModeToggle = document.getElementById('night-mode-toggle');
const body = document.body;

nightModeToggle.addEventListener('click', () => {
   // Toggle dark mode class on body

   // Change button text depending on current state
   if (nightModeToggle.textContent === 'Dark Mode') {
    nightModeToggle.textContent = 'Light Mode';
   } else {
    nightModeToggle.textContent = 'Dark Mode';
   }
 });

function toggleNightMode() {
    body.classList.toggle('night-mode');
    document.querySelector('header').classList.toggle('night-mode');
    document.querySelector('footer').classList.toggle('night-mode');
    document.querySelector('p').classList.toggle('night-mode');


    // Select all contact-link elements and toggle night-mode class
    document.querySelectorAll('.contact-link').forEach(link => {
        link.classList.toggle('night-mode');
    });

    // Toggle class for elements with the 'night-mode' styles
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
    document.querySelectorAll('.timeline-container::before').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.timeline-heading').forEach(content => {
        content.classList.toggle('night-mode');
    });
    document.querySelectorAll('.timeline-details').forEach(content => {
        content.classList.toggle('night-mode');
    });
}

// Event listener for the night mode button
nightModeToggle.addEventListener('click', toggleNightMode);


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