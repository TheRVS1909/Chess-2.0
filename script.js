let body = document.querySelector('body');

function generateChessBoard() {
	for (let i = 8; i > 0; i--) {
		let rank = document.createElement('section');
		rank.classList.add('rank');
		rank.setAttribute('number', i);
		for (let j = 1; j < 9; j++) {
			let cell = document.createElement('div');
			cell.setAttribute('number', i);
			cell.setAttribute('symbol', j);
			if (((i % 2 == 0) && (j % 2 == 0)) || ((i % 2 == 1) && (j % 2 == 1))) (cell.classList.add('blackCell', 'cell'));
			else (cell.classList.add('whiteCell', 'cell'));
			rank.append(cell);
		}
		body.append(rank);
	}
}

generateChessBoard();

let whitePiecesUser1 = [];
let blackPiecesUser2 = [];

const rerenderPiece = (x0, y0, x, y, piece1) => {
	let currentCell = document.querySelector(`[number="${y0}"] > [symbol="${x0}"]`);
	let possibleCell = document.querySelector(`[number="${y}"] > [symbol="${x}"]`);
	let piece = currentCell.cloneNode(1);

	if (possibleCell.hasChildNodes()) {
		possibleCell.childNodes[0].remove();
		possibleCell.append(piece.childNodes[0]);
		currentCell.childNodes[0].remove();
	}

	//const callback1 = () => initialClickCallback(possibleCell);
	//possibleCell.addEventListener('click', callback1);

	//const callback2 = () => initialClickCallback(currentCell);
	//currentCell.addEventListener('click', callback2);
	//piece1.setCurrentCoords(x, y);
}

const renderPossibleMoves = (x0, y0, x, y, piece) => {
	let currentCell = document.querySelector(`[number="${y0}"] > [symbol="${x0}"]`);
	let possibleCell = document.querySelector(`[number="${y}"] > [symbol="${x}"]`);
	if (!possibleCell.hasChildNodes()) {
		const circle = document.createElement('div');
		circle.classList.add('light');
		possibleCell.appendChild(circle);
	}
	const tryRerenderPiece = () => rerenderPiece(x0, y0, x, y, piece);
	possibleCell.addEventListener('click', tryRerenderPiece);
	const callback = () => initialClickCallback(currentCell);
	const deleteCircle = () => {
		if (possibleCell.hasChildNodes()) {
			possibleCell.childNodes[0].remove();
		}
		currentCell.addEventListener('click', callback);
	}

	currentCell.removeEventListener('click', callback);
	currentCell.addEventListener('click', deleteCircle);


}

class Piece {
	constructor(name) {
		this.name = name;
	}

	currentCoords = {};
	firstClick = 1;
	setCurrentCoords(x0, y0) {
		this.currentCoords.symbol = x0;
		this.currentCoords.number = y0;
	}

	move(x, y) {
		renderPossibleMoves(this.currentCoords.symbol, this.currentCoords.number, x, y);
	}

	checkFreeCells(x, y) {
		let possibleCell = document.querySelector(`[number="${y}"] > [symbol="${x}"]`);
		if (possibleCell.childNodes[0]) {
			return 1
		} else return 0;
	}

	cutEnemy() { }
}
class Pawn extends Piece {
	constructor(name) {
		super(name);
		if (name.includes('white')) {
			whitePiecesUser1.push(this);
		} else if (name.includes('black')) {
			blackPiecesUser2.push(this);
		}
	}

	move() {
		if ((this.currentCoords.number == 2) && (this.name.includes('white'))) {
			if ((super.checkFreeCells
				(this.currentCoords.symbol, this.currentCoords.number + 2) == 1) && (super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number + 1) == 1)) {
				return
			} else if (super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number + 2) == 1) {
				super.move(this.currentCoords.symbol, this.currentCoords.number + 1);
				return
			} else {
				super.move(this.currentCoords.symbol, this.currentCoords.number + 1);
				//super.move(this.currentCoords.symbol, this.currentCoords.number + 2);
				return
			}
		}

		if ((this.currentCoords.number == 7) && (this.name.includes('black'))) {

			if ((super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number - 2) == 1) && (super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number - 1) == 1)) {
				return
			} else if (super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number - 2) == 1) {
				super.move(this.currentCoords.symbol, this.currentCoords.number - 1);
				return
			} else {
				//super.move(this.currentCoords.symbol, this.currentCoords.number - 2);
				super.move(this.currentCoords.symbol, this.currentCoords.number - 1);
				return
			}
		}

		if (this.name.includes('white')) {
			if (super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number + 1) == 1) {
				return
			}
			super.move(this.currentCoords.symbol, this.currentCoords.number + 1);
		}
		if (this.name.includes('black')) {
			if (super.checkFreeCells(this.currentCoords.symbol, this.currentCoords.number - 1) == 1) {
				return
			}
			super.move(this.currentCoords.symbol, this.currentCoords.number - 1);
		}
	}
}
class King extends Piece {
	constructor(name) {
		super(name);
		if (name.includes('white')) {
			whitePiecesUser1.push(this);
		} else if (name.includes('black')) {
			blackPiecesUser2.push(this);
		}
	}
}
class Queen extends Piece {
	constructor(name) {
		super(name);
		if (name.includes('white')) {
			whitePiecesUser1.push(this);
		} else if (name.includes('black')) {
			blackPiecesUser2.push(this);
		}
	}
}
class Rook extends Piece {
	constructor(name) {
		super(name);
		if (name.includes('white')) {
			whitePiecesUser1.push(this);
		} else if (name.includes('black')) {
			blackPiecesUser2.push(this);
		}
	}
}
class Knight extends Piece {
	constructor(name) {
		super(name);
		if (name.includes('white')) {
			whitePiecesUser1.push(this);
		} else if (name.includes('black')) {
			blackPiecesUser2.push(this);
		}
	}
}
class Bishop extends Piece {
	constructor(name) {
		super(name);
		if (name.includes('white')) {
			whitePiecesUser1.push(this);
		} else if (name.includes('black')) {
			blackPiecesUser2.push(this);
		}
	}
}

function generatePlayerPieces() {
	for (let i = 1; i < 9; i++) {
		let whitePawn = new Pawn('whitePawn');
		whitePawn.setCurrentCoords(i, 2);

		let blackPawn = new Pawn('blackPawn');
		blackPawn.setCurrentCoords(i, 7);
	}

	let whiteKing = new King('whiteKing');
	whiteKing.setCurrentCoords(5, 1);

	let blackKing = new King('blackKing');
	blackKing.setCurrentCoords(5, 8);

	let whiteQueen = new Queen('whiteQueen');
	whiteQueen.setCurrentCoords(4, 1);

	let blackQueen = new Queen('blackQueen');
	blackQueen.setCurrentCoords(4, 8);


	let whiteRook1 = new Rook('whiteRook');
	whiteRook1.setCurrentCoords(1, 1);

	let whiteRook2 = new Rook('whiteRook');
	whiteRook2.setCurrentCoords(8, 1);

	let blackRook1 = new Rook('blackRook');
	blackRook1.setCurrentCoords(1, 8);

	let blackRook2 = new Rook('blackRook');
	blackRook2.setCurrentCoords(8, 8);

	let whiteKnight1 = new Knight('whiteKnight');
	whiteKnight1.setCurrentCoords(2, 1);

	let whiteKnight2 = new Knight('whiteKnight');
	whiteKnight2.setCurrentCoords(7, 1);

	let blackKnight1 = new Knight('blackKnight');
	blackKnight1.setCurrentCoords(2, 8);

	let blackKnight2 = new Knight('blackKnight');
	blackKnight2.setCurrentCoords(7, 8);

	let whiteBishop1 = new Bishop('whiteBishop');
	whiteBishop1.setCurrentCoords(3, 1);

	let whiteBishop2 = new Bishop('whiteBishop');
	whiteBishop2.setCurrentCoords(6, 1);

	let blackBishop1 = new Bishop('blackBishop');
	blackBishop1.setCurrentCoords(3, 8);

	let blackBishop2 = new Bishop('blackBishop');
	blackBishop2.setCurrentCoords(6, 8);
}

generatePlayerPieces();

console.log(whitePiecesUser1);
console.log(blackPiecesUser2);

function genetarePiecesStart() {
	let rank1 = document.querySelectorAll('[number="1"]');
	let rank2 = document.querySelectorAll('[number="2"]');
	let rank7 = document.querySelectorAll('[number="7"]');
	let rank8 = document.querySelectorAll('[number="8"]');

	for (let i = 1; i < rank1.length; i++) {
		let whitePiece = document.createElement('img');
		let blackPiece = document.createElement('img');

		let whitePawn = document.createElement('img');
		whitePawn.src = "./Img/whitePieces/whitePawn.png";
		whitePawn.classList.add('pawn');

		let blackPawn = document.createElement('img');
		blackPawn.src = "./Img/blackPieces/blackPawn.png";
		blackPawn.classList.add('pawn');

		switch (i) {
			case 1:
			case 8:
				whitePiece.src = "./Img/whitePieces/whiteRook.png";
				whitePiece.classList.add("rook");
				blackPiece.src = "./Img/blackPieces/blackRook.png";
				blackPiece.classList.add("rook");
				break;

			case 2:
			case 7:
				whitePiece.src = "./Img/whitePieces/whiteKnight.png";
				whitePiece.classList.add("knight");
				blackPiece.src = "./Img/blackPieces/blackKnight.png";
				blackPiece.classList.add("knight");
				break;

			case 3:
			case 6:
				whitePiece.src = "./Img/whitePieces/whiteBishop.png";
				whitePiece.classList.add("bishop");
				blackPiece.src = "./Img/blackPieces/blackBishop.png";
				blackPiece.classList.add("bishop");
				break;

			case 4:
				whitePiece.src = "./Img/whitePieces/whiteQueen.png";
				whitePiece.classList.add("queen");
				blackPiece.src = "./Img/blackPieces/blackQueen.png";
				blackPiece.classList.add("queen");
				break;

			case 5:
				whitePiece.src = "./Img/whitePieces/whiteKing.png";
				whitePiece.classList.add("king");
				blackPiece.src = "./Img/blackPieces/blackKing.png";
				blackPiece.classList.add("king");
				break;

		}
		rank1[i].append(whitePiece);
		rank2[i].append(whitePawn);
		rank7[i].append(blackPawn);
		rank8[i].append(blackPiece);
	}
}

genetarePiecesStart();

function showWinner(user) {
	let block = document.createElement('div');
	block.innerText = "Победитель - " + user;
	block.classList.add('winner');
	body.replaceWith(block);

	//alert('Победитель: ' + user);
}

function pieceMove(piece) {
	let cellNumber = piece.getAttribute('number');
	let cellSymbol = piece.getAttribute('symbol');

	let whiteFoundPieceIndex = whitePiecesUser1.findIndex
		(piece => (piece.currentCoords.number == cellNumber) && (piece.currentCoords.symbol == cellSymbol));
	console.log(whiteFoundPieceIndex);

	if (whiteFoundPieceIndex != -1) {
		whitePiecesUser1[whiteFoundPieceIndex].move();

	} else {
		let blackFoundPieceIndex = blackPiecesUser2.findIndex
			(piece => (piece.currentCoords.number == cellNumber) && (piece.currentCoords.symbol == cellSymbol));
		if (blackFoundPieceIndex != -1) {
			blackPiecesUser2[blackFoundPieceIndex].move();
		}
	}
}

function initialClickCallback(cell) {
	const cellCurrentState = document.querySelector
		(`[number="${+cell.getAttribute('number')}"] > [symbol="${+cell.getAttribute('symbol')}"]`);
	if (cellCurrentState.hasChildNodes()) pieceMove(cellCurrentState);
}

let cellBoard = document.querySelectorAll('.cell');
for (let cell of cellBoard) {
	const callback = () => initialClickCallback(cell);
	cell.addEventListener('click', callback);
}


