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

function BattleView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;
  this.animationId = 0;
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this)); 
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  
  if (this.game.playerCreature().currentHP === 0 || this.game.aiCreature().currentHP === 0) {
    this.step(timeDelta);
    this.step(timeDelta);
    this.step(timeDelta);
    this.step(timeDelta);
    cancelAnimationFrame(this.animationId);
    this.finishCombat();
    
  } else {
    this.animationId = requestAnimationFrame(this.animate.bind(this)); 
  }
};

BattleView.prototype.step = function step(timeDelta) {
  if (this.game.getGameSpeed() % 4 === 0) {
    DistanceBar(this.game, this.ctx, this.canvas);
    HealthBar(this.game, this.ctx, this.canvas);
    MoveCreatures(this.game, this.ctx, this.canvas, timeDelta);
    Combat(this.game, this.animationId);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

BattleView.prototype.finishCombat = function() {
  let text;
  if (this.game.playerCreature().currentHP === 0 && this.game.aiCreature().currentHP === 0) {
    text = "You tie!";
  } else if (this.game.playerCreature().currentHP === 0) {
    text = "Opponent wins!";
  } else {
    text = "You win!";
  }

  this.game.aiCreature().restoreHP();
  this.game.playerCreature().restoreHP();
  this.game.aiCreature().resetPos(500);
  this.game.playerCreature().resetPos(200);
  this.textFadeIn(text);
}

BattleView.prototype.textFadeIn = function(text) {
  this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
  this.ctx.font = "italic 40pt Arial";
  let xloc;
  if (text === "Opponent wins!") {
    xloc = 200;
  } else {
    xloc = 300;
  }
  this.ctx.fillText(text, xloc, 250);
  setTimeout(this.textFadeOut(text, xloc), 5000);
}

BattleView.prototype.textFadeOut = function(text, xloc) {
  let alpha = 1.0,   // full opacity
  interval = setInterval(() => {
      // this.canvas.width = this.canvas.width; // Clears the canvas
      this.ctx.clearRect(0, 200, this.canvas.width, 70);
      this.ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
      this.ctx.font = "italic 40pt Arial";
      this.ctx.fillText(text, xloc, 250);
      alpha = alpha - 0.05; // decrease opacity (fade out)
      if (alpha < 0) {
        this.ctx.clearRect(0, 200, this.canvas.width, 70);
        clearInterval(interval);
      }
  }, 50);

  setTimeout(() => this.gameView.switchScreen(this.gameView), 1000);
};



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
  let aiCreature = game.aiCreature();

  // Calculates distance between the two
  creatureDistance = aiCreature.pos - playerCreature.pos - 100;
  playerCreatureDamageModifier = (playerCreature.str / 100) + 1;
  playerCreatureDefenseModifier = (playerCreature.def / 100) + 1;
  aiCreatureDamageModifier = (aiCreature.str / 100) + 1;
  aiCreatureDefenseModifier = (aiCreature.def / 100) + 1;

  playerCreature.attackTimer = playerCreature.attackTimer - playerCreature.agi;
  aiCreature.attackTimer = aiCreature.attackTimer - aiCreature.agi;
  
  if (playerCreature.attackTimer < 0) {
    playerCreature.attackTimer += 25;
    if (creatureDistance < 151) {
      aiCreature.currentHP -= (playerCreature.attack('close') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
    } else if (creatureDistance < 401) {
      aiCreature.currentHP -= (playerCreature.attack('mid') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
    } else {
      aiCreature.currentHP -= (playerCreature.attack('far')  * playerCreatureDamageModifier / aiCreatureDefenseModifier);
    }
  }


  if(aiCreature.attackTimer < 0) {
    aiCreature.attackTimer += 25;
    if (creatureDistance < 151) {
      playerCreature.currentHP -= aiCreature.attack('close') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
    } else if (creatureDistance < 401) {
      playerCreature.currentHP -= aiCreature.attack('mid') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
    } else {
      playerCreature.currentHP -= aiCreature.attack('far') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
    }
  }

  // if (creatureDistance < 151) {
  //   aiCreature.currentHP -= (playerCreature.attack('close') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
  //   playerCreature.currentHP -= aiCreature.attack('close') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
  // } else if (creatureDistance < 401) {
  //   aiCreature.currentHP -= (playerCreature.attack('mid') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
  //   playerCreature.currentHP -= aiCreature.attack('mid') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
  // } else {
  //   aiCreature.currentHP -= (playerCreature.attack('far')  * playerCreatureDamageModifier / aiCreatureDefenseModifier);
  //   playerCreature.currentHP -= aiCreature.attack('far') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
  // }

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
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(aiCreature.pos + 20, 20, 10, 0, 2*Math.PI, true);
  ctx.fillStyle = "blue";
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
  let timing = Math.floor(playerCreature.animationFrame / 4); 

  let playerSpriteX = 512 * (timing % 6);
  let playerSpriteY = 0;
  switch (playerSpriteX) {
    case 1536:
      playerSpriteX = 1024;
      playerSpriteY = 512;
      break;
    case 2048:
      playerSpriteX = 512;
      playerSpriteY = 512;
      break;
    case 2560:
      playerSpriteX = 0;
      playerSpriteY = 512;
      break;
  }

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  ctx.drawImage(
    game.playerCreature().creatureImage,
    playerSpriteX, playerSpriteY, 512, 512,
    playerCreature.pos, 290, 200, 200);

  playerCreature.animationFrameStep();


  // Agressive movement pattern, randomizes but favors moving towards enemy
  // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1) -(playerCreature.spd / 2) * timeScale))); 

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

  let aiTiming = Math.floor(aiCreature.animationFrame / 4); 

  let aiSpriteX = 512 * (aiTiming % 6);
  let aiSpriteY = 0;
  switch (aiSpriteX) {
    case 1536:
      aiSpriteX = 1024;
      aiSpriteY = 512;
      break;
    case 2048:
      aiSpriteX = 512;
      aiSpriteY = 512;
      break;
    case 2560:
      aiSpriteX = 0;
      aiSpriteY = 512;
      break;
  }
  
  ctx.drawImage(
    game.aiCreature().creatureImage,
    aiSpriteX, aiSpriteY, 512, 512,
    aiCreature.pos, 290, 200, 200);
    
  aiCreature.animationFrameStep();
    
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
  character = "./docs/creatures/OceanosL.png",
  nextPosition = position,
  strength = 14,
  defense = 13,
  agi = 13,
  speed = 5,
  healthPoints = 100,
  attackTimer = 25,
  weapon = null,
  armor = null,
  attacks = {
    // {rangeMin: 0, rangeMax: 150, damage: 10},
    // {rangeMin: 151, rangeMax: 400, damage: 10},
    // {rangeMid: 401, rangeMax: 700, damage: 5},
    attackClose: 4,
    attackMid: 3,
    attackFar: 3,
    }
  ) {
  
  this.pos = position;
  this.nextPosition = nextPosition;
  this.str = strength;
  this.def = defense;
  this.agi = agi;
  this.spd = speed;
  this.maxHP = healthPoints;
  this.attackTimer = attackTimer;
  this.currentHP = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  this.attacks = attacks;
  this.animationFrame = 0;
  this.creatureImage = new Image();
  this.creatureImage.src = character;
  this.behaviorList = ["Random", "Aggressive", "Neutral", "Timid"];

  Creature.prototype.attack = (range) => {
    if (range === "close") {
      return (Math.random() * this.attacks.attackClose) + 1;
    } else if (range === "mid") {
      return (Math.random() * this.attacks.attackMid) + 1;
    } else {
      return (Math.random() * this.attacks.attackFar) + 1;
    }
  }

  Creature.prototype.restoreHP = function() {
    this.currentHP = this.maxHP;
  }

  Creature.prototype.updateBehavior = function(direction) {
    if (direction === "left") {
      this.behaviorList.push(this.behaviorList.shift());
    } else {
      this.behaviorList.unshift(this.behaviorList.pop());
    }
    console.log(this.behaviorList)
  }
}
  
Creature.prototype.resetPos = function(newPos) {
  this.pos = newPos;
}

Creature.prototype.updateStats = function(armor) {
  this.str = 10 + armor.str;
  this.def = 10 + armor.def;
  this.agi = 10 + armor.agi;
}

Creature.prototype.updateAttacks = function(weapon) {
  this.attacks.attackClose = weapon.attackClose;
  this.attacks.attackMid = weapon.attackMid;
  this.attacks.attackFar = weapon.attackFar;
}

Creature.prototype.animationFrameStep = function() {
  this.animationFrame++;
};

Creature.prototype.getBehavior = function() {
  return this.behaviorList[0];
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
const Equipment = __webpack_require__(/*! ./preparationView/equipment */ "./src/preparationView/equipment.js");

function Game() {
  let equipment = new Equipment();
  equipment.addDefaultWeapon();
  equipment.addWeapon();
  equipment.addWeapon();
  equipment.addWeapon();
  equipment.addDefaultArmor();
  equipment.addArmor();
  equipment.addArmor();
  equipment.addArmor();
  let playerCreature = new Creature(pos = 200, character = './docs/creatures/BigFishPlayer.png');
  let aiCreature = new Creature(pos = 500);
  let gameSpeed = 0;
  let gameScreen = "prep";


  Game.prototype.playerCreature = () => {
    return playerCreature;
  }
    
  Game.prototype.aiCreature = () => {
    return aiCreature;
  }

  Game.prototype.resetGameSpeed = () => {
    this.gameSpeed = 0;
  }

  Game.prototype.getGameSpeed = () => {
    return gameSpeed;
  }

  Game.prototype.gameSpeedStep = () => {
    gameSpeed++;
  }

  Game.prototype.screen = () => {
    return gameScreen;
  }

  Game.prototype.setScreen = (newScreen) => {
    gameScreen = newScreen;
  };

  Game.prototype.getWeapons = () => {
    return equipment.getWeapons();
  }

  Game.prototype.getArmors = () => {
    return equipment.getArmors();
  }

  Game.prototype.rotateWeapons = (direction) => {
    equipment.rotateWeapons(direction);

    playerCreature.updateAttacks(equipment.getWeapons()[0]);
  }

  Game.prototype.rotateArmors = (direction) => {
    equipment.rotateArmors(direction);
    playerCreature.updateStats(this.getArmors()[0]);
  }

  Game.prototype.rotateBehavior = function(direction) {
    playerCreature.updateBehavior(direction);
  }

  Game.prototype.weaponDescription = () => {
    return equipment.weaponDescription();
  }

  Game.prototype.armorDescription = () => {
    return equipment.armorDescription();
  }

  Game.prototype.getWeaponDamages = () => {
    return `Close: ${equipment.weapons[0].attackClose},
            Medium: ${equipment.weapons[0].attackMid},
            Far: ${equipment.weapons[0].attackFar}`;
  }

  Game.prototype.getArmorStats = () => {
    return `Str: ${equipment.armors[0].str},
            Def: ${equipment.armors[0].def},
            Agi: ${equipment.armors[0].agi}`;
  }

  Game.prototype.getBehavior = function() {
    return playerCreature.getBehavior();
  }

}

module.exports = Game;

/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PreparationView = __webpack_require__(/*! ./preparationView/preparationView */ "./src/preparationView/preparationView.js");
const BattleView = __webpack_require__(/*! ./battleView/battleView */ "./src/battleView/battleView.js");

function GameView(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;
}

GameView.prototype.switchScreen = function switchScreen(gameView) {
  if (this.game.screen() === "battle") {
    this.game.setScreen("prep");
    this.game.resetGameSpeed();
    
    // Remove the forest background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.remove("front-image-layers-forest");
    this.canvas.classList.remove("back-image-layers-forest");

    // Apply the hills background
    backgroundLayerFront.classList.add("front-image-layers-hills");
    this.canvas.classList.add("back-image-layers-hills");

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new PreparationView(this.game, this.ctx, this.canvas, gameView).start();
  } else {
    this.game.setScreen("battle");
    this.game.resetGameSpeed();
    
    // Remove the hills background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.remove("front-image-layers-hills");
    this.canvas.classList.remove("back-image-layers-hills");

    // Apply the forest background
    backgroundLayerFront.classList.add("front-image-layers-forest");
    this.canvas.classList.add("back-image-layers-forest");
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new BattleView(this.game, this.ctx, this.canvas, gameView).start();
  }
}

module.exports = GameView;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const BattleView = __webpack_require__(/*! ./battleView/battleView */ "./src/battleView/battleView.js");
const PreparationView = __webpack_require__(/*! ./preparationView/preparationView */ "./src/preparationView/preparationView.js");
const GameView = __webpack_require__(/*! ./gameView */ "./src/gameView.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  let gameView = new GameView(game, ctx, canvas);
  // new BattleView(game, ctx, canvas, gameView).start();
  new PreparationView(game, ctx, canvas, gameView).start();
});

// Creature sprites from:
// https://aekashics.itch.io/aekashics-librarium-librarium-static-batch-megapack

// Backgrounds from:
// https://edermunizz.itch.io/

// TODO
// Fix creatures to use hashmap, so custom assignments and stat management are easier
// More involved animation, if possible
// Damage numbers
// Pause movement and attack animation while attacking
// projectile animation for mid/far ranged attacks

/***/ }),

/***/ "./src/preparationView/armor.js":
/*!**************************************!*\
  !*** ./src/preparationView/armor.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Armor(
    stats = generateStats(),
    name = generateArmorName(),
    description = generateArmorDescription()) {
  this.str = stats.str;
  this.def = stats.def;
  this.agi = stats.agi;
  this.name = name;
  this.description = description;
}

generateStats = function() {
  // let statTotal = 10;
  let str = Math.floor(Math.random() * 10);
  let def = Math.floor(Math.random() * (10 - str))
  let agi = 10 - str - def;
  return {str: str, def: def, agi: agi}

}

generateArmorName = function() {
  const prefix = [
    "collar",
    "pendant",
    "greaves",
    "gauntlet",
    "shield",
    "helm",
    "cloak",
    // "spectacles"
    "ring",
  ]
  const suffix = [
    "protection",
    "evasion",
    "fortitude",
    "moxy",
    "resiliance",
    "enervation",
    "awe",
    "fancy feet"
  ]
  let armorName = prefix[Math.floor(Math.random() * 8)]
              + " of " + suffix[Math.floor(Math.random() * 8)];

  return armorName;
}

generateArmorDescription = function() {
  const possibilities = [
    "Placeholder Text",
    "Lorem Ipsum",
    "To be expanded upon later",
    "Filler text!",
    // "This armor was once worn by . . .",
    // "This rusty bucket offers . . .",
    // "This is a placebo",
    // "I guess you can use this?",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Armor;

/***/ }),

/***/ "./src/preparationView/creatureBox.js":
/*!********************************************!*\
  !*** ./src/preparationView/creatureBox.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function CreatureBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;
  let playerCreature = this.game.playerCreature();

  // Box border to see where it lies on the canvas
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0, 300, canvas.width, 200);
  // ctx.clearRect(10, 310, (canvas.width - 20), 180);

  ctx.clearRect(350, 290, 200, 200);

  // let playerSpriteX = playerCreature.animationFrame * 1;
  // let playerSpriteY = 512;
  // let playerSpriteY = playerCreature.animationFrame * 1;
  // let playerSpriteY = 512 * Math.floor(playerCreature.animationFrame / 4);

  // let timing = Math.floor(playerCreature.animationFrame); 
  let timing = Math.floor(playerCreature.animationFrame / 4); 

  // let playerSpriteX = 512 * (timing % 9);

  // WORKING< FOR TESTINGS SMALLER IDLE ANIMATION
  // let playerSpriteY = 512 * (Math.floor(timing / 9) % 2);
  let playerSpriteX = 512 * (timing % 6);
  let playerSpriteY = 0;
  switch (playerSpriteX) {
    case 1536:
      playerSpriteX = 1024;
      playerSpriteY = 512;
      break;
    case 2048:
      playerSpriteX = 512;
      playerSpriteY = 512;
      break;
    case 2560:
      playerSpriteX = 0;
      playerSpriteY = 512;
      break;
  }

  // let playerSpriteY = 512 * (Math.floor(timing / 9) % 6);

  // console.log(playerSpriteY)
  ctx.drawImage(
    this.game.playerCreature().creatureImage,
    // testImage,
    playerSpriteX, playerSpriteY, 512, 512,
    // 0, playerSpriteY, 512, 512,
    // playerSpriteX, 0, 512, 512,
    350, 290, 200, 200);

  playerCreature.animationFrameStep();

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText("Next battle: ", 600, 400);
}




module.exports = CreatureBox;

/***/ }),

/***/ "./src/preparationView/descriptionBox.js":
/*!***********************************************!*\
  !*** ./src/preparationView/descriptionBox.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function DescriptionBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  // Box border for testing UI bounds
  // ctx.fillStyle = "orange";
  // ctx.fillRect(400, 0, 400, 300);
  ctx.clearRect(410, 10, 380, 280);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(getLines(ctx, this.game.weaponDescription(), 350), 425, 52);
  ctx.fillText(getLines(ctx, this.game.getWeaponDamages(), 350), 425, 71);
  ctx.fillText(getLines(ctx, this.game.armorDescription(), 350), 425, 146);
  ctx.fillText(getLines(ctx, this.game.getArmorStats(), 350), 425, 165);
}

function getLines(ctx, text, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}


module.exports = DescriptionBox;

/***/ }),

/***/ "./src/preparationView/equipBox.js":
/*!*****************************************!*\
  !*** ./src/preparationView/equipBox.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function EquipBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "green";
  // ctx.fillRect(0,0,400,300);
  // ctx.clearRect(10, 10, 380, 280)

  weaponSelectText();
  armorSelectText();
  aiSelectText();
  weaponSelect();
  armorSelect();
  aiSelect();
  weaponSelectLeft();
  weaponSelectRight();
  armorSelectLeft();
  armorSelectRight();
  aiSelectLeft();
  aiSelectRight();
}

weaponSelectText = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("Weapon: ", 20, 55);
}

armorSelectText = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("Armor: ", 20, 150);
}

aiSelectText = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("AI: ", 20, 245);
}

weaponSelect = function() {
  ctx.fillRect(130, 20, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 25, 240, 40);
  // ctx.clearRect(135, 25, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getWeapons()[0].name, 180, 52);
}

armorSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 115, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 120, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getArmors()[0].name, 180, 146);
}

aiSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 210, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 215, 240, 40);
  // ctx.clearRect(135, 215, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getBehavior(), 180, 240);
}

weaponSelectLeft = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(135, 25, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(165, 39);
  ctx.lineTo(145, 46);
  ctx.lineTo(165, 53);
  ctx.closePath();
  ctx.fill();
}

weaponSelectRight = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(335, 25, 40, 40)
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(345, 39);
  ctx.lineTo(365, 46);
  ctx.lineTo(345, 53);
  ctx.closePath();
  ctx.fill();;

}

armorSelectLeft = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(135, 120, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(165, 134);
  ctx.lineTo(145, 141);
  ctx.lineTo(165, 148);
  ctx.closePath();
  ctx.fill();
}

armorSelectRight = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(335, 120, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(345, 134);
  ctx.lineTo(365, 141);
  ctx.lineTo(345, 148);
  ctx.closePath();
  ctx.fill();
}

aiSelectLeft = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(135, 215, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(165, 229);
  ctx.lineTo(145, 236);
  ctx.lineTo(165, 243);
  ctx.closePath();
  ctx.fill();
}

aiSelectRight = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(335, 215, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(345, 229);
  ctx.lineTo(365, 236);
  ctx.lineTo(345, 243);
  ctx.closePath();
  ctx.fill();
}

module.exports = EquipBox;

/***/ }),

/***/ "./src/preparationView/equipment.js":
/*!******************************************!*\
  !*** ./src/preparationView/equipment.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Weapon = __webpack_require__(/*! ./weapon */ "./src/preparationView/weapon.js");
const Armor = __webpack_require__(/*! ./armor */ "./src/preparationView/armor.js");

function Equipment() {
  this.weapons = [];
  this.armors = [];

  Equipment.prototype.getWeapons = () => {
    return this.weapons;
  }

  Equipment.prototype.addDefaultWeapon = function() {
    this.weapons = this.weapons.concat(new Weapon(4, 3, 3, "Default", "Your starting weapon"));
  }

  Equipment.prototype.addDefaultArmor = function() {
    this.armors = this.armors.concat(new Armor({str: 4, def: 3, agi: 3}, "Default", "Your starting armor"));
  }
  
  Equipment.prototype.addWeapon = function() {
    let closeDamage = Math.floor(Math.random() * 10);
    let farDamage = (Math.floor(Math.random() * (10 - closeDamage)));
    let midDamage = 10 - closeDamage - farDamage;
    this.weapons = this.weapons.concat(new Weapon(closeDamage, midDamage, farDamage));
  }

  Equipment.prototype.getArmors = () => {
    return this.armors;
  }

  Equipment.prototype.addArmor = function() {
    this.armors = this.armors.concat(new Armor());
  }

  Equipment.prototype.rotateWeapons = (direction) => {
    if (direction === "left") {
      this.weapons.push(this.weapons.shift());
    } else {
      this.weapons.unshift(this.weapons.pop());
    }
  }

  Equipment.prototype.rotateArmors = (direction) => {
    if (direction === "left") {
      this.armors.push(this.armors.shift());
    } else {
      this.armors.unshift(this.armors.pop());
    }
  }

  Equipment.prototype.weaponDescription = () => {
    return this.weapons[0].description;
  }

  Equipment.prototype.armorDescription = () => {
    return this.armors[0].description;
  }

  Equipment.prototype.getWeaponDamages = () => {
    return {attackClose: weapons[0].attackClose,
            attackMid: weapons[0].attackMid,
            attackFar: weapons[0].attackFar}
  }
}

module.exports = Equipment;

/***/ }),

/***/ "./src/preparationView/preparationView.js":
/*!************************************************!*\
  !*** ./src/preparationView/preparationView.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EquipBox = __webpack_require__(/*! ./equipBox */ "./src/preparationView/equipBox.js");
const CreatureBox = __webpack_require__(/*! ./creatureBox */ "./src/preparationView/creatureBox.js");
const DescriptionBox = __webpack_require__(/*! ./descriptionBox */ "./src/preparationView/descriptionBox.js");

function PreparationView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;

  this.handleClick = this.handleClick.bind(this);
}

PreparationView.prototype.start = function start() {
  this.lastTime = 0;

  document.addEventListener('click', this.handleClick, false);
  requestAnimationFrame(this.animate.bind(this));
};

PreparationView.prototype.handleClick = function(e) {
  let clickX = e.pageX - this.canvas.offsetLeft;
  // let clickY = e.pageY - 87 - this.canvas.offsetTop;
  let clickY = e.pageY - (document.getElementById('height-test').offsetTop);
  // console.log('-----')
  // console.log(document.getElementById('height-test').offsetTop)
  // console.log(this.ctx);
  // console.log(this.canvas.pageY);
  // console.log(this.canvas.layerY);
  // console.log(this.canvas.offsetTop);
  // console.log('-----)
  console.log(`${clickX}, ${clickY}`)

  // If the user clicks on the "left" arrow
  if (clickX > 139 && clickX < 178) {
    // of the weapons select
    if (clickY > 27 && clickY < 66) {
      this.game.rotateWeapons("left");
    // of the armors select
    } else if (clickY > 122 && clickY < 159) {
      this.game.rotateArmors("left");
    } else if (clickY > 221 && clickY < 262) {
      this.game.rotateBehavior("left");
    }
  }

  // If the user clicks on the "right" arrow
  if (clickX > 338 && clickX < 378) {
    // of the weapons select
    if (clickY > 27 && clickY < 66) {
      this.game.rotateWeapons("right");
    // of the armors select
    } else if (clickY > 122 && clickY < 162) {
      this.game.rotateArmors("right");
    } else if (clickY > 221 && clickY < 262) {
      this.game.rotateBehavior("right");
    }
  }

  // If the user clicks the "Next Battle" button
  if (clickX > 604 && clickX < 778
      && clickY > 377 && clickY < 402) {
        document.removeEventListener("click", this.handleClick);
        cancelAnimationFrame(this.animationId);
        this.finishPreparation();
  }    
}

PreparationView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  this.animationId = requestAnimationFrame(this.animate.bind(this)); 
}

PreparationView.prototype.step = function step(timeDelta) {
  if (this.game.getGameSpeed() % 4 === 0) {
    EquipBox(this.game, this.ctx, this.canvas);
    CreatureBox(this.game, this.ctx, this.canvas);
    DescriptionBox(this.game, this.ctx, this.canvas);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

PreparationView.prototype.finishPreparation = function() {
  this.textFadeIn("Get Ready!");
}

PreparationView.prototype.textFadeIn = function(text) {
  this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
  this.ctx.font = "italic 40pt Arial";
  let xloc = 300;
  this.ctx.fillText(text, xloc, 250);
  setTimeout(this.textFadeOut(text, xloc), 5000);
}

PreparationView.prototype.textFadeOut = function(text, xloc) {
  let alpha = 1.0,   // full opacity
  interval = setInterval(() => {
    // this.canvas.width = this.canvas.width; // Clears the canvas
    this.ctx.clearRect(0, 200, this.canvas.width, 70);
    this.ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
    this.ctx.font = "italic 40pt Arial";
    this.ctx.fillText(text, xloc, 250);
    alpha = alpha - 0.05; // decrease opacity (fade out)
    if (alpha < 0) {
      this.ctx.clearRect(0, 200, this.canvas.width, 70);
      clearInterval(interval);
    }
  }, 50);

  setTimeout(() => this.gameView.switchScreen(this.gameView), 1000);
};

module.exports = PreparationView;

/***/ }),

/***/ "./src/preparationView/weapon.js":
/*!***************************************!*\
  !*** ./src/preparationView/weapon.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Weapon(
    attackClose,
    attackMid,
    attackFar,
    name = generateWeaponName(),
    description = generateWeaponDescription()) {
  this.attackClose = attackClose;
  this.attackMid = attackMid;
  this.attackFar = attackFar;
  this.name = name;
  this.description = description;
}

close = function() {
  return this.attackClose.damage;
}

mid = function() {
  return this.attackMid.damage;
}

far = function() {
  return this.attackFar.damage;
}

generateWeaponName = function() {
  const prefix = [
    "sword",
    "torch",
    "gauntlet",
    "dagger",
    "tentacle",
    "tooth",
    "claw",
    "eye"
   ]
   const suffix = [
     "fire",
     "ice",
     "frenzy",
     "fury",
    //  "protection",
     "decay",
    //  "destruction",
     "bravado",
     "grit",
     "pizzaz"
   ]
   weaponName = prefix[Math.floor(Math.random() * 8)]
                + " of " + suffix[Math.floor(Math.random() * 8)];

   return weaponName;
}

generateWeaponDescription = function() {
  const possibilities = [
    "Lorem ipsum",
    "Ipsum lorem",
    "Placeholder",
    "This ancient tool was once used as currency",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Weapon;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map