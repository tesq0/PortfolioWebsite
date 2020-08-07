const c = document.getElementById("matrix-canvas");
const ctx = c.getContext("2d");

const COLUMN_PX_WIDTH = 10;

const drawMatrix = () => {

	let screenWidth = window.innerWidth;
	let screenHeight = window.innerHeight;
	
	// Draw the background
	ctx.fillStyle="rgba(0, 0 ,0 , .04)";
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle="#0f0";
	
	// Draw the letters
	let columnCount = screenWidth / COLUMN_PX_WIDTH;

	for (i = 0 ; i < columnCount; i++) {

		
		
	}


};

setInterval(drawMatrix,30);
