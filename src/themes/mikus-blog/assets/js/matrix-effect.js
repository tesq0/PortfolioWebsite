"use strict";
const COLUMN_PX_WIDTH = 20;
const ROW_PX_HEIGHT = 20;
const MOVE_SPEED = 50;

const CHINESE_CHARACTERS = ['中','文','简','繁','体','转','换','器','-','支','持','地','方','惯','用','词','汇','替','换'];

var currentMaxRows = 0;
var currentMaxOffset = 0;

var isWindowFocused = true;

var deltaTime = 0;
var now = 0
var lastTimestamp = 0;

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
		) * ROW_PX_HEIGHT;
		
		for (let i = 0; i < characterCount; i++) {

			let characterIdx = Math.floor(Math.random() * CHINESE_CHARACTERS.length);
			let character = CHINESE_CHARACTERS[characterIdx];
			characters.push(character);
			
		}

		return new ColumnMatrix(rowOffset, characters);
		
	}

	move(amount = 1) {

		/* console.log("move ", amount); */

		let newYOffset = this.rowOffset + amount;
		
		if ( newYOffset >= (currentMaxOffset + ROW_PX_HEIGHT) ) {

			newYOffset = (-1 * this.characters.length) * ROW_PX_HEIGHT;

		}

		newYOffset = Math.ceil(newYOffset);
		
		this.rowOffset = newYOffset;
		
	}

	getData() {

		return { rowOffset: this.rowOffset, characters: this.characters };
		
	}
	
}

const getOrInitColumnMatrix = (columnIndex) => {

	let key = columnIndex.toString();

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
	ctx.font = `${ROW_PX_HEIGHT}px Sans`;
	ctx.fillRect(0, 0, screenWidth, screenHeight);

	// Draw the letters
	let columnCount = screenWidth / COLUMN_PX_WIDTH;
	let rowCount = screenHeight / ROW_PX_HEIGHT;

	currentMaxRows = rowCount;
	currentMaxOffset = rowCount * ROW_PX_HEIGHT;


	for (let col = 0 ; col < columnCount; col++) {

		let xPos = col * COLUMN_PX_WIDTH;

		const columnMatrix = getOrInitColumnMatrix(col);
		const { rowOffset, characters } = columnMatrix.getData();

		let moveBy = deltaTime * MOVE_SPEED;
		columnMatrix.move(moveBy);

		for (let charIdx = 0; charIdx < characters.length; charIdx++) {

			let yPos = rowOffset + (charIdx * ROW_PX_HEIGHT);

			if (yPos < currentMaxOffset) {
				ctx.fillStyle=`rgba(0, 255 ,0 , ${1 - (yPos / screenHeight)})`;
				ctx.fillText(characters[charIdx], xPos, yPos);
			}

			/*
			const padding = 5;
			const rectWidth = COLUMN_PX_WIDTH - padding;
			const rectHeight = ROW_PX_HEIGHT - padding;
			const centerOut = padding / 2;

			 ctx.fillRect(
				 xPos + (centerOut),
				 yPos + (centerOut),
				 rectWidth , rectHeight
			 );
			*/
			
		}
		
	}

	
};

var requestAnimationFrame = window.requestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.oRequestAnimationFrame ||
															window.msRequestAnimationFrame;


var cancelAnimationFrame = window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame || 
        window.webkitCancelAnimationFrame ||
        window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||
        window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||
        window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame;

function draw() {
	
	drawMatrix();

}

var activeAnimationFrame = null;

function render() {

	if (!document.hasFocus()) {
		return
	}
	
	now = performance.now( );
	deltaTime = ( now - lastTimestamp ) / 1000.0;
	lastTimestamp = now;
	draw();

	activeAnimationFrame = requestAnimationFrame(render);

}

function cancelAnimation() {
	if (activeAnimationFrame !== null) {
		cancelAnimationFrame(activeAnimationFrame);
	}
}

function animate() {

	cancelAnimation();
	lastTimestamp = performance.now();
	activeAnimationFrame = requestAnimationFrame(render);

}

function trackFocus() {

	window.onblur = function() { isWindowFocused = false; }
	window.onfocus = function() { isWindowFocused = true; }
	
}

function init() {

	const canvas = document.getElementById("matrix-canvas");

	if (canvas != null) {
		draw(); // first draw;
		window.addEventListener('focus', animate);
		animate();
	}
	
}

trackFocus();
window.onload = init;

