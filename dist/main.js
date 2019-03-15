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

function BattleView(game, ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  // this.animationId = '';
  this.game = game;
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  console.log(this.game.playerCreature().pos)
  requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  this.animationId = requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.step = function step(timeDelta) {
  DistanceBar(this.game, this.ctx, this.canvas);
  HealthBar(this.game, this.ctx);
  MoveCreatures(this.game, this.ctx, this.canvas, timeDelta);
}


module.exports = BattleView;

/***/ }),

/***/ "./src/battleView/distanceBar.js":
/*!***************************************!*\
  !*** ./src/battleView/distanceBar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function DistanceBar(game, ctx, canvas) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

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
}

module.exports = DistanceBar;

/***/ }),

/***/ "./src/battleView/healthBar.js":
/*!*************************************!*\
  !*** ./src/battleView/healthBar.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function HealthBar(game, ctx) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();


  let playerPercentHealth = playerCreature.maxHP / playerCreature.currentHP;
  let aiPercentHealth = aiCreature.maxHP / aiCreature.currentHP;

  // Player creature's health 
  pos = 20 + (250 - (250 * playerPercentHealth));
  ctx.strokeStyle = "red";
  ctx.strokeRect(20, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(pos, 70, (270 - pos), 30);
  
  // AI creature's health
  ctx.strokeStyle = "red";
  ctx.strokeRect(530, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(530, 70, (250 / aiPercentHealth), 30);
}

module.exports = HealthBar;

/***/ }),

/***/ "./src/battleView/moveCreature.js":
/*!****************************************!*\
  !*** ./src/battleView/moveCreature.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function MoveCreatures(game, ctx, canvas, timeDelta) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

  let timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  // Draw player creature
  ctx.fillStyle = "green"; 
  ctx.fillRect(playerCreature.pos,250,100,200); 

  // Agressive movement pattern, randomizes but favors moving towards enemy
  // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1) -(playerCreature.spd / 2) * timeScale))); 

  // If the player's creature is touching the opposing creature
  if (playerCreature.pos + 100 >= aiCreature.pos){
    playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -(playerCreature.spd * 2)) * timeScale); 
  } else {
    // Default movement pattern, randomizes completely and has no directional "preference"
    playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -playerCreature.spd) * timeScale); 
  }

  // Prevents the creature from "falling off" the screen
  playerCreature.pos = Math.min(Math.max(playerCreature.pos, 0));


  // Draw opposing creature
  ctx.fillStyle = "blue"; 
  ctx.fillRect(aiCreature.pos, 250, 100, 200);

  // If aiCreature is touching playerCreature
  if (aiCreature.pos <= playerCreature.pos + 110) {
    aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -(aiCreature.spd * 2)) * timeScale);
  } else {
    // Default movement pattern, completely random with no directional preference
    aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -aiCreature.spd) * timeScale);
  }
  
  // Prevents the creature from "falling off" the screen
  aiCreature.pos = Math.min(Math.max(aiCreature.pos, 0), 700);
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MoveCreatures;

/***/ }),

/***/ "./src/creature.js":
/*!*************************!*\
  !*** ./src/creature.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Creature(
  position = 200,
  strength = 10,
  speed = 5,
  defense = 10,
  healthPoints = 100,
  weapon = null,
  armor = null
  ) {
  
  this.pos = position;
  this.str = strength;
  this.spd = speed;
  this.def = defense;
  this.maxHP = healthPoints;
  this.currentHP = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  

}

module.exports  = Creature;

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Creature = __webpack_require__(/*! ./creature */ "./src/creature.js");

function Game() {
  let playerCreature = new Creature();
  let aiCreature = new Creature(pos = 500);

  localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
  localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
  
  Game.prototype.playerCreature = () => {
      return playerCreature;
    }
    
  Game.prototype.aiCreature= () => {
    return aiCreature;
  }
}

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const BattleView = __webpack_require__(/*! ./battleView/battleView */ "./src/battleView/battleView.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  let game = new Game();
  new BattleView(game, ctx, canvas).start();
});

// MISC TODO LIST

/***/ })

/******/ });
//# sourceMappingURL=main.js.map