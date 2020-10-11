'use strict';

var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';

var gGamerPos
var gBoard
var gCounterBalls
var gBallIntterval


function init() {
	gGamerPos = { i: 2, j: 9 };

	gBoard = buildBoard();
	gCounterBalls = 0
	renderBoard(gBoard);
	gBallIntterval = setInterval(apperBalls, 3000)


}
function killGame() {
	clearInterval(gBallIntterval)
	alert('you WIN!')
	init()
}
// function isVictory() {
// 	var emptyCellCounter = 0
// 	for (var i = 0; i < gBoard.length; i++) {
// 		for (var j = 0; j < gBoard[0].length; j++) {
// 			if (gBoard[i][j].gameElement === '') {
// 				emptyCellCounter++
// 				if (emptyCellCounter === ((gBoard.length - 2) * (gBoard[0].length - 2) - 1)) killGame()
// 				console.log ((gBoard.length - 2) * (gBoard[0].length - 2) - 1)
// 			}
// 		}
// 	}
// }




function buildBoard() {
	var board = [];
	// TODO: Create the Matrix 10 * 12 
	// TODO: Put FLOOR everywhere and WALL at edges
	var height = 10;
	var width = 12;
	var cell = {}
	for (var i = 0; i < height; i++) {
		board[i] = [];
		for (var j = 0; j < width; j++) {
			cell = {
				type: FLOOR,
				gameElement: ''
			}
			if (i === 0 || j === 0 || i === height - 1 || j === width - 1) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// TODO: Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	board[0][5] = board[9][5] = board[5][0] = board[5][11] = {
		type: FLOOR,
		gameElement: ''
	}

	board[3][3].gameElement = BALL;
	board[4][5].gameElement = BALL;
	// if (board[0][5].gameElement === GAMER) {
	// 	board[0][5].gameElement === ''
	// 	board[9][5].gameElement === GAMER
	// }

	// console.log(board);
	return board;
}
function apperBalls() {
	var gEmptyCells = []
	for (var i = 1; i < gBoard.length - 1; i++) {
		for (var j = 1; j < gBoard[1].length - 1; j++) {
			if (gBoard[i][j].type === FLOOR && gBoard[i][j].gameElement === '') {
				gEmptyCells.push({ i, j })
			}
		}
	}
	var emptyCell = gEmptyCells[getRandomIntInclusive(0, gEmptyCells.length - 1)]
	gBoard[emptyCell.i][emptyCell.j].gameElement = BALL
	renderCell({ i: emptyCell.i, j: emptyCell.j }, BALL_IMG);

}

// gBoard
// getRandomIntInclusive(min, max)


// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;

}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	var absDistance = jAbsDiff + iAbsDiff;

	console.log('abs distance vetween cells:', absDistance);

	// If the clicked Cell is one of the four allowed
	if (absDistance === 1) {

		if (targetCell.gameElement === BALL) {
			gCounterBalls++
			var elCounterBall = document.querySelector('.counterBalls')
			elCounterBall.innerText = gCounterBalls
		

			// console.log('Collecting!');
		}

		// Todo: Move the gamer
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = '';
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[i][j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);



	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);


}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	// console.log(event);

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}


