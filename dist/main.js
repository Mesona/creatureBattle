/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/battleView/battleView.js":
/*!**************************************!*\
  !*** ./src/battleView/battleView.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const HealthBar = __webpack_require__(/*! ./healthBar */ "./src/battleView/healthBar.js");
const DistanceBar = __webpack_require__(/*! ./distanceBar */ "./src/battleView/distanceBar.js");
const MoveCreatures = __webpack_require__(/*! ./moveCreature */ "./src/battleView/moveCreature.js");

function BattleView(ctx, canvas) {
  // function BattleView(game, ctx, playerCreature, enemyCreature) {
  this.ctx = ctx;
  this.canvas = canvas
  // this.game = game;
  // this.playerCreature = playerCreature;
  // this.enemyCreature = enemyCreature;
  // this.drawHealth(this.ctx);
  this.animationId = '';
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  console.log("STARTED")
  requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  // console.log("ANIMATE")
  // console.log(timeDelta)
  // console.log(time)

  this.animationId = requestAnimationFrame(this.animate.bind(this));
};

// const body = document.getElementsByClassName('body');
// body.addEventListener('click', () => {
//   cancelAnimationFrame(this.animationId);
// });

BattleView.prototype.step = function step(timeDelta) {
  DistanceBar(this.ctx, this.canvas);
  HealthBar(this.ctx, this.canvas, timeDelta);
  MoveCreatures(this.ctx, this.canvas, timeDelta);
}


module.exports = BattleView;

/***/ }),

/***/ "./src/battleView/distanceBar.js":
/*!***************************************!*\
  !*** ./src/battleView/distanceBar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function DistanceBar(ctx, canvas) {
  let playerCreature = JSON.parse(localStorage.getItem('playerCreature'));
  let aiCreature = JSON.parse(localStorage.getItem('aiCreature'));

  // distance bar
  ctx.clearRect(0, 0, canvas.width, 50);
  ctx.strokeStyle = "purple";
  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.lineTo(780,20);
  ctx.stroke();

  // animate creatures on distance bar
  ctx.beginPath();
  ctx.arc(playerCreature.pos + 80, 20, 10, 0, 2*Math.PI, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(aiCreature.pos + 20, 20, 10, 0, 2*Math.PI, true);
  ctx.fill();

  // Save creature state
  localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
  localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
}

module.exports = DistanceBar;

/***/ }),

/***/ "./src/battleView/healthBar.js":
/*!*************************************!*\
  !*** ./src/battleView/healthBar.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function HealthBar(ctx) {

  // draw(ctx) {
    // if (creature.owner === "AI") {
    //   this.ctx.strokeStyle = "red";
    //   this.ctx.strokeRect(530, 70, 250, 30);
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fillRect(530, 70, (250 - (250 * this.percentHealth)), 30);
    // } else {
    //   pos = 20 + (250 - (250 * this.percentHealth));
    //   this.ctx.strokeStyle = "red";
    //   this.ctx.strokeRect(20, 70, 250, 30);
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fillRect(pos, 70, (270 - pos), 30);
    // }
  // }

  ctx.strokeStyle = "red";
  ctx.strokeRect(20, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(20, 70, 250, 30);

  // opposing creature's health
  ctx.strokeStyle = "red";
  ctx.strokeRect(530, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(530, 70, 250, 30);
}

module.exports = HealthBar;

/***/ }),

/***/ "./src/battleView/moveCreature.js":
/*!****************************************!*\
  !*** ./src/battleView/moveCreature.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function MoveCreatures(ctx, canvas, timeDelta) {
  let playerCreature = JSON.parse(localStorage.getItem('playerCreature'));
  let aiCreature = JSON.parse(localStorage.getItem('aiCreature'));
  let timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  // Draw player creature
  ctx.fillStyle = "green"; 
  ctx.fillRect(playerCreature.pos,250,100,200); 
  if (playerCreature.pos + 100 >= aiCreature.pos){
    playerCreature.pos+=(Math.floor((Math.random() * 10) -10) * timeScale); 
  } else {
    playerCreature.pos+=(Math.floor((Math.random() * 10) -4) * timeScale); 
    playerCreature.pos = Math.min(Math.max(playerCreature.pos, 0));
  }

  // Draw opposing creature
  ctx.fillStyle = "blue"; 
  ctx.fillRect(aiCreature.pos, 250, 100, 200);
  if (aiCreature.pos <= playerCreature.pos + 100) {
    aiCreature.pos-=(Math.floor((Math.random() * 10) -10) * timeScale);
    aiCreature.pos = Math.min(Math.max(aiCreature.pos, 0), 700);
  } else {
    aiCreature.pos-=(Math.floor((Math.random() * 10) -4) * timeScale);
  }

  // Save new creature state
  localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
  localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MoveCreatures;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const BattleView = __webpack_require__(/*! ./battleView/battleView */ "./src/battleView/battleView.js");

function Game(ctx, canvas) {
    this.creature = [];
    this.weapon = [];
    this.armor = [];
    this.ctx = ctx;

    new BattleView(ctx, canvas).start();
    let playerCreature = {pos: 0, currentHealth: 100, maxHealth: 100}
    let aiCreature = {pos: 700, currentHealth: 100, maxHealth: 100}
    localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
    localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
  }

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// import _ from 'lodash';

// function component() {
//   // let element = document.createElement('div');
//   // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   // return element;


  
// }

const Game = __webpack_require__(/*! ./game */ "./src/game.js");
// const GameView = require('./gameView');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  new Game(ctx, canvas);
  // new GameView(game, ctx).start();


  // // shim layer with setTimeout fallback 
  // window.requestAnimFrame = (function(){ 
  //   return  window.requestAnimationFrame       ||  
  //           window.webkitRequestAnimationFrame ||  
  //           window.mozRequestAnimationFrame    ||  
  //           window.oRequestAnimationFrame      ||  
  //           window.msRequestAnimationFrame     ||  
  //           function( callback ){ 
  //             window.setTimeout(callback, 1000 / 60); 
  //           }; 
  // })(); 

  // let x = 0; 
  // let y = 800;
  // function drawIt() { 
  //   window.requestAnimFrame(drawIt);
  //   // new BattleView(game, ctx).start();

   


  //   // player's creature's health
  //   ctx.strokeStyle = "red";
  //   ctx.strokeRect(20, 70, 250, 30);
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(20, 70, 250, 30);

  //   // opposing creature's health
  //   ctx.strokeStyle = "red";
  //   ctx.strokeRect(530, 70, 250, 30);
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(530, 70, 250, 30);

  //   ctx.clearRect(0,100,canvas.width,canvas.height);  
  //   ctx.fillStyle = "green"; 
  //   ctx.fillRect(x,250,100,200); 
  //   if (x + 100 >= y) { // If the blocks are touching
  //     x+=Math.floor((Math.random() * 10) -10); 
  //   } else if (x + 210 >= 800) {
  //     x+=Math.floor((Math.random() * 10) -10); 
  //   } else {
  //     x+=Math.floor((Math.random() * 10) -4); 
  //   }
  //   ctx.fillStyle = "blue"; 
  //   ctx.fillRect(y, 250, 100, 200);
  //   if (y <= x + 100) { // If the blocks are touching
  //     y-=Math.floor((Math.random() * 10) -10);
  //   } else if (y - 210 <= 0) {
  //     y-=Math.floor((Math.random() * 10) -10);
  //   } else {
  //     y-=Math.floor((Math.random() * 10) -4);
  //   }
  //   // distance bar
  //   ctx.clearRect(0, 0, canvas.width, 50);
  //   ctx.strokeStyle = "purple";
  //   ctx.beginPath();
  //   ctx.moveTo(20,20);
  //   ctx.lineTo(780,20);
  //   ctx.stroke();
  
  //   // animate creature spot on distance bar
  //   ctx.beginPath();
  //   ctx.arc(x + 30, 20, 10, 0, 2*Math.PI, true);
  //   ctx.fill();
  
  //   ctx.beginPath();
  //   ctx.arc(y - 30, 20, 10, 0, 2*Math.PI, true);
  //   ctx.fill();
  // } 


  // window.requestAnimFrame(drawIt); 

});

// document.body.appendChild(component());


/***/ })

/******/ });
//# sourceMappingURL=main.js.map