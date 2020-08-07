const COLUMN_PX_WIDTH = 20;
const ROW_PX_HEIGHT = 20;

const CHINESE_CHARACTERS = ['中','文','简','繁','体','转','换','器','-','支','持','地','方','惯','用','词','汇','替','换'];

let currentMaxRows = 0;
const columnMatrixes = new Map();

class ColumnMatrix {

	constructor(rowOffset, characters) {

		this.rowOffset = rowOffset;
		this.characters = characters;

		this.move = this.move.bind(this);
		this.getData = this.getData.bind(this);
		
	}

	static make() {

		const characters = [];
		
		const characterCount = Math.max(
			2,
			Math.floor( Math.random() * (currentMaxRows / 2) )
		);

		const rowOffset = Math.max(
			2,
			Math.floor( Math.random() * ( currentMaxRows - characterCount ) )
		);
		
		for (i = 0; i < characterCount; i++) {

			let characterIdx = Math.floor(Math.random() * CHINESE_CHARACTERS.length);
			let character = CHINESE_CHARACTERS[characterIdx];
			characters.push(character);
			
		}

		return new ColumnMatrix(rowOffset, characters);
		
	}

	move() {

		let newYOffset = this.rowOffset + 1;

		if ( (newYOffset + this.characters.length) > currentMaxRows ) {

			newYOffset = -1 * this.characters.length;

		}

		this.rowOffset = newYOffset;
		
	}

	getData() {

		return { rowOffset: this.rowOffset, characters: this.characters };
		
	}
	
}

const getOrInitColumnMatrix = (columnIndex) => {

	key = columnIndex.toString();

	let obj = columnMatrixes.get(key);

	if (obj == undefined) {
		obj = ColumnMatrix.make();
		columnMatrixes.set(key, obj);
	}

	return obj;
	
}

const drawMatrix = () => {

	let screenWidth = window.innerWidth;
	let screenHeight = window.innerHeight;
	
	const c = document.getElementById("matrix-canvas");
	const ctx = c.getContext("2d");

	c.width = screenWidth;
	c.height = screenHeight;
	
	// Draw the background
	let gradient = ctx.createLinearGradient(0, 0, 0, 0.7 * screenHeight);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
	gradient.addColorStop(1, "rgba(0, 50, 0, 0.7)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, screenWidth, screenHeight);

	/* console.log("h", screenHeight, "w", screenWidth); */
	
	// Draw the letters
	let columnCount = screenWidth / COLUMN_PX_WIDTH;
	let rowCount = screenHeight / ROW_PX_HEIGHT;

	currentMaxRows = rowCount;

	/* console.log("max rows", currentMaxRows); */

	for (col = 0 ; col < columnCount; col++) {

		let xPos = col * COLUMN_PX_WIDTH;

		const columnMatrix = getOrInitColumnMatrix(col);
		const { rowOffset, characters } = columnMatrix.getData();
		
		for (charIdx = 0; charIdx < characters.length; charIdx++) {

			let yPos = (rowOffset * ROW_PX_HEIGHT) + (charIdx * ROW_PX_HEIGHT);

			ctx.fillStyle=`rgba(0, 255 ,0 , ${Math.max(charIdx, 1) / characters.length})`;

			const padding = 5;

			const rectWidth = COLUMN_PX_WIDTH - padding;
			const rectHeight = ROW_PX_HEIGHT - padding;

			const centerOut = padding / 2;

			/* ctx.fillRect(
				 xPos + (centerOut),
				 yPos + (centerOut),
				 rectWidth , rectHeight
				 ); */
			
			ctx.font = `${ROW_PX_HEIGHT}px Sans`;
			ctx.fillText(characters[charIdx], xPos, yPos);
			
		}

		columnMatrix.move();
		
	}


};

drawMatrix();
/* setInterval(drawMatrix, 1000); */
