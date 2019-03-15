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
const Combat= __webpack_require__(/*! ./combat */ "./src/battleView/combat.js");

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
  if (this.game.gameSpeed() % 4 === 0) {
    DistanceBar(this.game, this.ctx, this.canvas);
    HealthBar(this.game, this.ctx, this.canvas);
    MoveCreatures(this.game, this.ctx, this.canvas, timeDelta);
    Combat(this.game);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}


module.exports = BattleView;

/***/ }),

/***/ "./src/battleView/combat.js":
/*!**********************************!*\
  !*** ./src/battleView/combat.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Combat(game) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature()

  // Calculates distance between the two
  creatureDistance = aiCreature.pos - playerCreature.pos - 100;
  // console.log(creatureDistance)
  if (creatureDistance < 151) {
    aiCreature.currentHP -= playerCreature.attack('close');
    playerCreature.currentHP -= aiCreature.attack('close');
  } else if (creatureDistance < 401) {
    aiCreature.currentHP -= playerCreature.attack('mid');
    playerCreature.currentHP -= aiCreature.attack('mid');
  } else {
    aiCreature.currentHP -= playerCreature.attack('far');
    playerCreature.currentHP -= aiCreature.attack('far');
  }

  playerCreature.currentHP = Math.min(Math.max(playerCreature.currentHP, 0));
  aiCreature.currentHP = Math.min(Math.max(aiCreature.currentHP, 0));
}



module.exports = Combat;

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

function HealthBar(game, ctx, canvas) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

  let playerPercentHealth = playerCreature.currentHP / playerCreature.maxHP;
  let aiPercentHealth = aiCreature.currentHP / aiCreature.maxHP;

  ctx.clearRect(0,70,canvas.width,30);

  // Player creature's health 
  pos = 20 + (250 - (250 * playerPercentHealth));
  // pos = 20 + (250 - (250 * 0.5));
  ctx.strokeStyle = "red";
  ctx.strokeRect(20, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(pos, 70, (270 - pos), 30);
  
  // AI creature's health
  ctx.strokeStyle = "red";
  ctx.strokeRect(530, 70, 250, 30);
  ctx.fillStyle = "red";
  // ctx.fillRect(530, 70, (250 / aiPercentHealth), 30);
  ctx.fillRect(530, 70, (250 * aiPercentHealth), 30);
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

// OLD RANDOMIZED MOVEMENT SYSTEM //
  // If the player's creature is touching the opposing creature
  if (playerCreature.pos + 100 >= aiCreature.pos){
    // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -(playerCreature.spd * 2)) * timeScale); 
    playerCreature.pos+=Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -(playerCreature.spd * 2)); 
  } else {
    // Default movement pattern, randomizes completely and has no directional "preference"
    // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -playerCreature.spd) * timeScale); 
    playerCreature.pos+=Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -playerCreature.spd); 
  }

  // Prevents the creature from "falling off" the screen
  playerCreature.pos = Math.min(Math.max(playerCreature.pos, 0));

// END OLD RANDOMIZED MOVEMENT SYSTEM

// NEW MOVEMENT SYSTEM
  if (
    playerCreature.pos === playerCreature.nextPosition ||
    playerCreature.pos + 110 >= aiCreature.pos
    ) {
    playerCreature.nextPosition = playerCreature.pos + ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10));

    // Prevents the creature from "falling off" the screen
    playerCreature.nextPosition = Math.min(Math.max(playerCreature.nextPosition, 10), aiCreature.pos - 110);
  }

  if (playerCreature.pos < playerCreature.nextPosition) {
    playerCreature.pos += playerCreature.spd;
  } else {
    playerCreature.pos -= playerCreature.spd;
  }



// END NEW MOVEMENT SYSTEM

// Draw opposing creature
ctx.fillStyle = "blue"; 
ctx.fillRect(aiCreature.pos, 250, 100, 200);

// START OLD MOVEMENT SYSTEM
//   // If aiCreature is touching playerCreature
//   if (aiCreature.pos <= playerCreature.pos + 110) {
//     // aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -(aiCreature.spd * 2)) * timeScale);
//     aiCreature.pos-=Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -(aiCreature.spd * 2));
//   } else {
//     // Default movement pattern, completely random with no directional preference
//     // aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -aiCreature.spd) * timeScale);
//     aiCreature.pos-=Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -aiCreature.spd);
//   }
  
//   // Prevents the creature from "falling off" the screen
//   aiCreature.pos = Math.min(Math.max(aiCreature.pos, 0), 700);
// END OLD MOVEMENT SYSTEM

  // NEW MOVEMENT SYSTEM
  if (
    aiCreature.pos === aiCreature.nextPosition ||
    aiCreature.pos <= playerCreature.pos + 110
    ) {
    aiCreature.nextPosition = aiCreature.pos + ((Math.random() < 0.5 ? -1 : 1) * (aiCreature.spd * 10));

    // Prevents the creature from "falling off" the screen
    aiCreature.nextPosition = Math.min(Math.max(aiCreature.nextPosition, playerCreature.pos + 110), 690);
  }

  if (aiCreature.pos < aiCreature.nextPosition) {
    aiCreature.pos += aiCreature.spd;
  } else {
    aiCreature.pos -= aiCreature.spd;
  }

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
  nextPosition = position,
  strength = 10,
  speed = 5,
  defense = 10,
  healthPoints = 100,
  weapon = null,
  armor = null,
  attacks = [
    // {rangeMin: 0, rangeMax: 150, damage: 10},
    // {rangeMin: 151, rangeMax: 400, damage: 10},
    // {rangeMid: 401, rangeMax: 700, damage: 5},
    {damage: 1},
    {damage: 1},
    {damage: 5},
    ]
  ) {
  
  this.pos = position;
  this.nextPosition = nextPosition;
  this.str = strength;
  this.spd = speed;
  this.def = defense;
  this.maxHP = healthPoints;
  this.currentHP = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  this.attacks = attacks;

  Creature.prototype.attack = (range) => {
    // console.log(this.attacks)
    if (range === "close") {
      return this.attacks[0].damage;
    } else if (range === "mid") {
      // console.log('here')
      return this.attacks[1].damage;
    } else {
      return this.attacks[2].damage;
    }
  }
}


  // switch(range) {
  //   case 'close':
  //     // console.log("Smash");
  //     return this.attacks[0].damage;
  //   case 'mid':
  //     // console.log("Smack");
  //     return this.attacks;
  //   case 'far':
  //     // console.log("pew pew");
  //     return this.attacks[2].damage;
  //   default:
  //     return null;
  // }
// }

// Creature.prototype.attack = (range) => {
// // attack = range => {
//   if (range === "close") {
//     console.log("Smash");
//     console.log(this.pos)
// } else if (range === "mid") {
//     console.log("boom");
//     console.log(this.pos)
//   } else {
//     console.log("pew pew");
//   }
// }

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
  let gameSpeed = 0

  Game.prototype.playerCreature = () => {
      return playerCreature;
    }
    
  Game.prototype.aiCreature= () => {
    return aiCreature;
  }

  Game.prototype.gameSpeed = () => {
    return gameSpeed;
  }

  Game.prototype.gameSpeedStep = () => {
    gameSpeed++;
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
// Damage ranges (8-10, 7-13 eg. instead of static)
// Figure out how to slow everything down

/***/ })

/******/ });
//# sourceMappingURL=main.js.map