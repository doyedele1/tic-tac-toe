let boxes = Array.from(document.getElementsByClassName('box'));
let playText = document.getElementById('play-text');
let restartBtn = document.getElementById('restart-button');
// AN ARRAY TO KEEP TRACK OF THE LETTER IN THE BOXES
let spaces = [];
let oLetter = "O";
let xLetter = "X";
let currentPlayer;
let count = 0;

// FUNCTION TO DRAW BOARD USING BORDERS
let drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid var(--blue);`;
        }
        if (index % 3 === 0) {
            styleString += `border-right: 3px solid var(--blue);`;
        }
        if (index % 3 === 2) {
            styleString += `border-left: 3px solid var(--blue);`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid var(--blue);`;
        }

        box.style = styleString;

        box.addEventListener('click', boxClicked);
    });
};

// FUNCTION TO FILL THE BOXES WITH O & X LETTERS
let boxClicked = (e) => {
    let id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        count++;
        if(playerHasWon()) {
            playText.innerText = `${currentPlayer} has won!`;
            return;
        }
        currentPlayer = currentPlayer === oLetter ? xLetter : oLetter;

        // TO CHECK FOR A DRAW
        if (count === 9) {
            playText.innerText = `Points shared!`;
        }
    }
};

// FUNCTION TO CHECK WHICH PLAYER HAS WON
let playerHasWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top!`);
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on the left!`);
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally!`);
            return true;
        }
    } 
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on the right!`);
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on the bottom!`);
            return true;
        }
    }
    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins in the middle vertically!`);
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins in the middle horizontally!`);
            return true;
        }
    }
};

// FUNCTION TO RESTART THE GAME
let restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    count = 0;
    boxes.forEach((box) => {
        box.innerText = '';
    });
    playText.innerText = `Play`;
    currentPlayer = oLetter;
};

restartBtn.addEventListener('click', restart);

restart();
drawBoard();