"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var COLUMN_PX_WIDTH = 20;
var ROW_PX_HEIGHT = 20;
var MOVE_SPEED = 50;
var CHINESE_CHARACTERS = ['中', '文', '简', '繁', '体', '转', '换', '器', '-', '支', '持', '地', '方', '惯', '用', '词', '汇', '替', '换'];
var currentMaxRows = 0;
var currentMaxOffset = 0;
var isWindowFocused = true;
var deltaTime = 0;
var now = 0;
var lastTimestamp = 0;
var columnMatrixes = new Map();

var ColumnMatrix = /*#__PURE__*/function () {
  function ColumnMatrix(rowOffset, characters) {
    _classCallCheck(this, ColumnMatrix);

    this.rowOffset = rowOffset;
    this.characters = characters;
    this.move = this.move.bind(this);
    this.getData = this.getData.bind(this);
  }

  _createClass(ColumnMatrix, [{
    key: "move",
    value: function move() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      /* console.log("move ", amount); */
      var newYOffset = this.rowOffset + amount;

      if (newYOffset >= currentMaxOffset + ROW_PX_HEIGHT) {
        newYOffset = -1 * this.characters.length * ROW_PX_HEIGHT;
      }

      newYOffset = Math.ceil(newYOffset);
      this.rowOffset = newYOffset;
    }
  }, {
    key: "getData",
    value: function getData() {
      return {
        rowOffset: this.rowOffset,
        characters: this.characters
      };
    }
  }], [{
    key: "make",
    value: function make() {
      var characters = [];
      var characterCount = Math.max(2, Math.floor(Math.random() * (currentMaxRows / 2)));
      var rowOffset = Math.max(2, Math.floor(Math.random() * (currentMaxRows - characterCount))) * ROW_PX_HEIGHT;

      for (var i = 0; i < characterCount; i++) {
        var characterIdx = Math.floor(Math.random() * CHINESE_CHARACTERS.length);
        var character = CHINESE_CHARACTERS[characterIdx];
        characters.push(character);
      }

      return new ColumnMatrix(rowOffset, characters);
    }
  }]);

  return ColumnMatrix;
}();

var getOrInitColumnMatrix = function getOrInitColumnMatrix(columnIndex) {
  var key = columnIndex.toString();
  var obj = columnMatrixes.get(key);

  if (obj == undefined) {
    obj = ColumnMatrix.make();
    columnMatrixes.set(key, obj);
  }

  return obj;
};

var drawMatrix = function drawMatrix() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var c = document.getElementById("matrix-canvas");
  var ctx = c.getContext("2d");
  c.width = screenWidth;
  c.height = screenHeight; // Draw the background

  var gradient = ctx.createLinearGradient(0, 0, 0, 0.7 * screenHeight);
  gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
  gradient.addColorStop(1, "rgba(0, 50, 0, 0.7)");
  ctx.fillStyle = gradient;
  ctx.font = "".concat(ROW_PX_HEIGHT, "px Sans");
  ctx.fillRect(0, 0, screenWidth, screenHeight); // Draw the letters

  var columnCount = screenWidth / COLUMN_PX_WIDTH;
  var rowCount = screenHeight / ROW_PX_HEIGHT;
  currentMaxRows = rowCount;
  currentMaxOffset = rowCount * ROW_PX_HEIGHT;

  for (var col = 0; col < columnCount; col++) {
    var xPos = col * COLUMN_PX_WIDTH;
    var columnMatrix = getOrInitColumnMatrix(col);

    var _columnMatrix$getData = columnMatrix.getData(),
      rowOffset = _columnMatrix$getData.rowOffset,
      characters = _columnMatrix$getData.characters;

    var moveBy = deltaTime * MOVE_SPEED;
    columnMatrix.move(moveBy);

    for (var charIdx = 0; charIdx < characters.length; charIdx++) {
      var yPos = rowOffset + charIdx * ROW_PX_HEIGHT;

      if (yPos < currentMaxOffset) {
        ctx.fillStyle = "rgba(0, 255 ,0 , ".concat(1 - yPos / screenHeight, ")");
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

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame;

function draw() {
  drawMatrix();
}

var activeAnimationFrame = null;

function render() {
  if (!isWindowFocused) {
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
  window.onblur = function () {
    isWindowFocused = false;
  };

  window.onfocus = function () {
    isWindowFocused = true;
  };
}

function init() {
  var canvas = document.getElementById("matrix-canvas");

  if (canvas != null) {
    window.addEventListener('focus', animate);
    animate();
  }
}

trackFocus();
window.onload = init;
