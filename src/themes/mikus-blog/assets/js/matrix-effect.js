"use strict";
const COLUMN_PX_WIDTH = 35;
const ROW_PX_HEIGHT = 35;
const MOVE_SPEED = 100;
const CHARACTER_SHIFT_SPEED = 15;
const CHARACTER_CHAINS_PER_COLUMN = 1;

var currentMaxRows = 0;
var currentMaxOffset = 0;

var isWindowFocused = true;

var deltaTime = 0;
var now = 0;
var lastTimestamp = 0;

function makeCharacters() {

  var res = [];

  for (let i = 224; i < 240; i++) {
    res.push(String.fromCharCode(i));
  }

  for (let i = 97; i < 122; i++) {
    res.push(String.fromCharCode(i));
  }

  return res;

}
//['中', '文', '简', '繁', '体', '转', '换', '器', '支', '持', '地', '方', '惯', '用', '词', '汇', '替', '换'];
const CHARACTERS = ['0', '1'];  // makeCharacters();

const matrix = [];

function randomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomInt(min, max) {
  return Math.floor(randomNumber(min, max));
}

function getDivisiblesOfNumber(number) {

  let divisibles = [];

  let denominator = number;

  while (denominator > 0) {
    if (number % denominator == 0)
      divisibles.push(denominator);
    denominator -= 1;
  }

  return divisibles;

}

function randomIntDivisibleBy(min, max) {

  let divisibles = getDivisiblesOfNumber(max);

  divisibles = divisibles.filter(d => d >= min);

  let idx = randomInt(0, divisibles.length - 1);

  return divisibles[idx];

}

class AnimatedChars {

  constructor(rowOffset, characters, timeTillUpdate, moveSpeed, opacity) {

    this.rowOffset = rowOffset;
    this.characters = characters;
    this.moveSpeed = moveSpeed;
    this.opacity = opacity;
    this.length = characters.length;

    this.move = this.move.bind(this);
    this.getData = this.getData.bind(this);

    this.timeTillUpdate = timeTillUpdate;

  }

  static make(yOffset = 0, maxSpeed) {

    const characters = [];

    const characterCount = randomInt(Math.floor(0.7 * currentMaxRows), currentMaxRows);

    const moveSpeed =
      randomIntDivisibleBy(
        Math.floor(0.8 * maxSpeed),
        maxSpeed
      );

    const rowOffset = yOffset + randomNumber(characterCount / 2, currentMaxRows * 2) * ROW_PX_HEIGHT;

    const opacity = randomNumber(0.1, 0.9);

    for (let i = 0; i < characterCount; i++) {

      let characterIdx = randomInt(0, CHARACTERS.length - 1);
      let character = CHARACTERS[characterIdx];
      characters.push(character);


    }

    const timeTillUpdate = randomInt(1, CHARACTER_SHIFT_SPEED);

    return new AnimatedChars(
      rowOffset,
      characters,
      timeTillUpdate,
      moveSpeed,
      opacity);

  }

  update() {

    if (this.characters.length < 2)
      return;

    if (this.timeTillUpdate <= 0) {

      let elementIdx = randomInt(0, this.characters.length - 2);

      let idxs = [elementIdx, this.characters.length - 1];

      idxs.forEach(i => {
        let characterIdx = randomInt(0, CHARACTERS.length - 1);
        let character = CHARACTERS[characterIdx];
        this.characters[i] = character;
      });

      this.timeTillUpdate = CHARACTER_SHIFT_SPEED;

    }
    else {

      this.timeTillUpdate -= deltaTime * MOVE_SPEED;

    }
    // for (let i = 0; i < this.timeTillUpdate.length; i++) {

    //   if (this.timeTillUpdate[i] <= 0) {
    //     let characterIdx = randomInt(0, CHARACTERS.length);
    //     let character = CHARACTERS[characterIdx];
    //     this.characters[i] = character;
    //     this.timeTillUpdate[i] = CHARACTER_SHIFT_SPEED;
    //   }
    //   else {
    //     this.timeTillUpdate[i] -= deltaTime * MOVE_SPEED;
    //   }

    // }

  }

  move(deltaTime) {

    let amount = this.moveSpeed * deltaTime;

    let newYOffset = this.rowOffset + amount;

    if (newYOffset >= (currentMaxOffset + ROW_PX_HEIGHT)) {

      newYOffset = (-1 * this.characters.length) * ROW_PX_HEIGHT;

    }

    newYOffset = Math.ceil(newYOffset);

    this.rowOffset = newYOffset;

  }

  getData() {

    return { rowOffset: this.rowOffset, characters: this.characters };

  }

}

var lastSpeed = MOVE_SPEED;
var speedComponent = (MOVE_SPEED / 6);

const getOrInitAnimatedChars = (columnIndex) => {

  if (matrix[columnIndex] !== undefined) {
    return matrix[columnIndex];
  }

  let lastOffset = 0;
  let arr = [];

  for (let i = 0; i < CHARACTER_CHAINS_PER_COLUMN; i++) {
    let chars = AnimatedChars.make(lastOffset, lastSpeed);
    arr[i] = chars;
    lastOffset = chars.rowOffset * chars.length;
  }

  matrix[columnIndex] = arr;

  lastSpeed = lastSpeed - speedComponent;

  if (lastSpeed < 0) {
    lastSpeed = MOVE_SPEED;
  }

  return arr;

};

const glowTextEffect = (ctx, xPos, yPos) => {

  ctx.fillStyle = "#fff";
  // let r = COLUMN_PX_WIDTH / 2;
  // let a = 0;
  // let rgb = '255, 255, 255';
  // let g = ctx.createRadialGradient(r, r, 0, r, r, r);
  // g.addColorStop(0, `rgba(${rgb}, ${a})`);
  // g.addColorStop(1, `rgba(${rgb}, 0.6)`);
  // ctx.fillStyle = g;
  // ctx.fillRect(xPos, yPos, r, r);

};

const drawMatrix = () => {

  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  const textWidth = ROW_PX_HEIGHT * 0.8;

  const c = document.getElementById("matrix-canvas");
  const ctx = c.getContext("2d");

  c.width = screenWidth;
  c.height = screenHeight;

  // Draw the background
  // let gradient = ctx.createLinearGradient(0, 0, 0, 0.7 * screenHeight);
  // gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
  // gradient.addColorStop(1, "rgba(0, 50, 0, 0.7)");

  ctx.fillStyle = "#000";
  ctx.font = `${textWidth}px Sans`;
  ctx.fillRect(0, 0, screenWidth, screenHeight);

  // Draw the letters
  let columnCount = screenWidth / COLUMN_PX_WIDTH;
  let rowCount = screenHeight / ROW_PX_HEIGHT;

  currentMaxRows = rowCount;
  currentMaxOffset = rowCount * ROW_PX_HEIGHT;


  for (let col = 0; col < columnCount; col++) {

    let xPos = col * COLUMN_PX_WIDTH;

    const columnCharacterArr = getOrInitAnimatedChars(col);

    columnCharacterArr.forEach(columnCharacters => {

      const { rowOffset, characters } = columnCharacters.getData();

      columnCharacters.move(deltaTime);

      for (let charIdx = 0; charIdx < characters.length; charIdx++) {

        let yPos = rowOffset + (charIdx * ROW_PX_HEIGHT);

        if (yPos < (currentMaxOffset + ROW_PX_HEIGHT)) {

          if (charIdx == characters.length - 1) {

            glowTextEffect(ctx, xPos, yPos);

          } else {

            ctx.fillStyle = `rgba(0, 255 ,0 , ${(charIdx / characters.length) - (1 * columnCharacters.opacity)})`;

          }

          ctx.fillText(characters[charIdx], xPos, yPos);

        }

      }

      columnCharacters.update();

    });



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
    return;
  }

  now = performance.now();
  deltaTime = (now - lastTimestamp) / 1000.0;
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

  window.onblur = function () { isWindowFocused = false; };
  window.onfocus = function () { isWindowFocused = true; };

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
