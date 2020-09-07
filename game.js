/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;
let loop;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 288;
// document.body.appendChild(canvas);

let bgReady,
	heroReady,
	monsterReady,
	bomb1Ready,
	bomb2Ready,
	bomb3Ready,
	bomb4Ready;
let bgImage,
	heroImage,
	monsterImage,
	bomb1Image,
	bomb2Image,
	bomb3Image,
	bomb4Image;

let startTime = Date.now();
//const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
	bgImage = new Image();
	bgImage.onload = function () {
		// show the background image
		bgReady = true;
	};
	bgImage.src = "images/bg.png";
	heroImage = new Image();
	heroImage.onload = function () {
		// show the hero image
		heroReady = true;
	};
	heroImage.src = "images/roc1.png";

	monsterImage = new Image();
	monsterImage.onload = function () {
		// show the monster image
		monsterReady = true;
	};
	monsterImage.src = "images/monster.png";

	bomb1Image = new Image();
	bomb1Image.onload = function () {
		// show the bomb1 image
		bomb1Ready = true;
	};
	bomb1Image.src = "images/bomb.png";

	bomb2Image = new Image();
	bomb2Image.onload = function () {
		// show the bomb1 image
		bomb2Ready = true;
	};
	bomb2Image.src = "images/bomb.png";

	bomb3Image = new Image();
	bomb3Image.onload = function () {
		// show the bomb1 image
		bomb3Ready = true;
	};
	bomb3Image.src = "images/bomb.png";

	bomb4Image = new Image();
	bomb4Image.onload = function () {
		// show the bomb1 image
		bomb4Ready = true;
	};
	bomb4Image.src = "images/bomb.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 1.25;

//let monsterX = 100;
//let monsterY = 0;

let bomb1X = Math.floor(Math.random() * canvas.width);
let bomb1Y = -350;

let bomb2X = Math.floor(Math.random() * canvas.width);
let bomb2Y = -50;

let bomb3X = Math.floor(Math.random() * canvas.width);
let bomb3Y = -150;

let bomb4X = Math.floor(Math.random() * canvas.width);
let bomb4Y = -250;

let bombsY = [bomb1Y, bomb2Y, bomb3Y, bomb4Y];
let bombsX = [bomb1X, bomb2X, bomb3X, bomb4X];
let allBombs = [bombsX, bombsY];

//let bombX = Math.floor(Math.random()*(canvas.width-27));
//let bombY = -450;

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};
function setupKeyboardListeners() {
	// Check for keys pressed where key represents the keycode captured
	// For now, do not worry too much about what's happening here.
	addEventListener(
		"keydown",
		function (key) {
			keysDown[key.keyCode] = true;
		},
		false
	);

	addEventListener(
		"keyup",
		function (key) {
			delete keysDown[key.keyCode];
		},
		false
	);
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let gameover = false;
let update = function () {
	console.log("aaa");
	// Update the time.

	if (!gameover) {
		elapsedTime = Math.floor((Date.now() - startTime) / 1000);
		document.getElementById(
			"stopwatch"
		).innerHTML = `record: ${elapsedTime} seconds`;
	}
	//if (38 in keysDown) { // Player is holding up key
	//heroY -= 5;
	//}
	//if (40 in keysDown) { // Player is holding down key
	//heroY += 5;
	//}
	if (37 in keysDown) {
		// Player is holding left key
		heroX -= 5;
	}
	if (39 in keysDown) {
		// Player is holding right key
		heroX += 5;
	}

	if (heroX < 0) {
		heroX = 0;
	}
	if (heroX > 470) {
		heroX = 470;
	}

	bomb1Y += 3;

	bomb2Y += 4;

	bomb3Y += 3;

	bomb4Y += 3;

	if (bomb1Y > canvas.height) {
		bomb1Y = 0;
		bomb1X = Math.floor(Math.random() * canvas.width);
	}

	if (bomb2Y > canvas.height) {
		bomb2Y = 0;
		bomb2X = Math.floor(Math.random() * canvas.width);
	}

	if (bomb3Y > canvas.height) {
		bomb3Y = 0;
		bomb3X = Math.floor(Math.random() * canvas.width);
	}

	if (bomb4Y > canvas.height) {
		bomb4Y = 0;
		bomb4X = Math.floor(Math.random() * canvas.width);
	}

	//Y += 3;

	if (bomb1Y == canvas.height) {
		bomb1X = Math.floor(Math.random() * canvas.width);
		bomb1Y = -50;
	} else if (bomb2Y == canvas.height) {
		bomb2X = Math.floor(Math.random() * canvas.width);
		bomb2Y = -150;
	} else if (bomb3Y == canvas.height) {
		bomb3X = Math.floor(Math.random() * canvas.width);
		bomb3Y = -250;
	} else if (bomb4Y == canvas.height) {
		bomb4X = Math.floor(Math.random() * canvas.width);
		bomb4Y = -350;
	}
	//else if(bombY == canvas.height) {
	//bombY = Math.floor(Math.random()*(canvas.width-30));
	//bombY = -450;
	//}

	// Check if player and monster collided. Our images
	// are about 32 pixels big.
	// if (
	//   heroX <= (monsterX + 32)
	//   && monsterX <= (heroX + 32)
	//   && heroY <= (monsterY + 32)
	//   && monsterY <= (heroY + 32)
	// ) //{
	// Pick a new location for the monster.
	// Note: Change this to place the monster at a new, random location.
	//  monsterX = monsterX + 50;
	//monsterY = monsterY + 70;
	//}

	if (
		heroX <= bomb1X + 30 &&
		bomb1X <= heroX + 52 &&
		heroY <= bomb1Y + 30 &&
		bomb1Y <= heroY + 103
	) {
		// hide monster and hero
		heroReady = false;
		bomb1Ready = false;
		bomb2Ready = false;
		bomb3Ready = false;
		bomb4Ready = false;
		//bombReady = false;
		// move hero out of canvas
		heroX = -600;
		heroY = -600;
	}
	if (
		heroX <= bomb2X + 30 &&
		bomb2X <= heroX + 52 &&
		heroY <= bomb2Y + 30 &&
		bomb2Y <= heroY + 103
	) {
		// hide monster and hero
		heroReady = false;
		bomb1Ready = false;
		bomb2Ready = false;
		bomb3Ready = false;
		bomb4Ready = false;
		// move hero out of canvas
		heroX = -600;
		heroY = -600;
	}
	if (
		heroX <= bomb3X + 30 &&
		bomb3X <= heroX + 52 &&
		heroY <= bomb3Y + 30 &&
		bomb3Y <= heroY + 103
	) {
		// hide monster and hero
		heroReady = false;
		bomb1Ready = false;
		bomb2Ready = false;
		bomb3Ready = false;
		bomb4Ready = false;
		// move hero out of canvas
		heroX = -600;
		heroY = -600;
	}

	if (
		heroX <= bomb4X + 30 &&
		bomb4X <= heroX + 52 &&
		heroY <= bomb4Y + 30 &&
		bomb4Y <= heroY + 103
	) {
		// hide monster and hero
		heroReady = false;
		bomb1Ready = false;
		bomb2Ready = false;
		bomb3Ready = false;
		bomb4Ready = false;
		// move hero out of canvas
		heroX = -600;
		heroY = -600;
	}
	if (heroReady == false) {
		document.getElementById("gOver").innerHTML = "Player died";
		document.getElementById(
			"stopwatch"
		).innerHTML = `record: ${elapsedTime} seconds`;
		document.getElementById(
			"result"
		).innerHTML = `Your Record: ${elapsedTime} Seconds`;
		gameover = true;
		cancelAnimationFrame(loop);
	}
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, heroX, heroY);
	}
	if (bomb1Ready) {
		ctx.drawImage(bomb1Image, bomb1X, bomb1Y);
	}
	if (bomb2Ready) {
		ctx.drawImage(bomb2Image, bomb2X, bomb2Y);
	}
	if (bomb3Ready) {
		ctx.drawImage(bomb3Image, bomb3X, bomb3Y);
	}
	if (bomb4Ready) {
		ctx.drawImage(bomb4Image, bomb4X, bomb4Y);
	}
};

function reset() {
	startTime = Date.now();
	console.log("dfsd");
	cancelAnimationFrame(loop);
	gameover = false;
	heroReady = true;
	bomb1Ready = true;
	bomb2Ready = true;
	bomb3Ready = true;
	bomb4Ready = true;
	elapsedTime = 0;
	heroX = canvas.width / 2;
	heroY = canvas.height / 1.25;
	document.getElementById("gOver").innerHTML = "";
	document.getElementById(
		"stopwatch"
	).innerHTML = `record: ${elapsedTime} seconds`;
	console.log(gameover);
	main();
}

//if (monsterReady) {
//ctx.drawImage(monsterImage, monsterX, monsterY);
//}
// ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
//};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
	update();
	render();
	// Request to do this again ASAP. This is a special method
	// for web browsers.
	loop = requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame =
	w.requestAnimationFrame ||
	w.webkitRequestAnimationFrame ||
	w.msRequestAnimationFrame ||
	w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
