const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;
const cellElements = document.querySelectorAll('[data-cell]');
const winText = document.querySelector('[data-message-text]')
const boardContainer = document.getElementById('container');
const showResult = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

startGame();
restartBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setHoverClass();
    showResult.classList.remove('show');
}

function handleClick(e) {
    const clickedCell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(clickedCell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurns();
        setHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winText.innerText = 'Draw!';
    }
    else {
        winText.innerText = `${circleTurn ? CIRCLE_CLASS : X_CLASS}'s wins!`
    }
    showResult.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(clickedCell, currentClass) {
    clickedCell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setHoverClass() {
    boardContainer.classList.remove(CIRCLE_CLASS);
    boardContainer.classList.remove(X_CLASS);
    if (circleTurn) {
        boardContainer.classList.add(CIRCLE_CLASS)
    }
    else boardContainer.classList.add(X_CLASS)
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}