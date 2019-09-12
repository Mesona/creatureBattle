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
// const DistanceBar = require('./distanceBar');
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
    // DistanceBar(this.game, this.ctx, this.canvas);
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
    this.game.playerCreature().addVictory();
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

  this.game.randomizeAI();

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
    if (creatureDistance < 201) {
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

  // ctx.clearRect(0, 0, canvas.width, 280);
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("HP", 20, 68);
  ctx.fillText("HP", 530, 68);

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


  let playerCreatureBehavior = this.game.getBehavior();
  let playerCreatureMovePattern = '';
  switch (playerCreatureBehavior) {
    case "Random":
      playerCreatureMovePattern =
        (Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10);
        break;
    case "Aggressive":
      playerCreatureMovePattern =
      ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10) + (playerCreature.spd * 2));
        break;
    case "Lazy":
      playerCreatureMovePattern = 0;
        break;
    case "Timid":
      playerCreatureMovePattern =
        ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10) - (playerCreature.spd * 2));
        break;
  }

  if (
    playerCreature.pos === playerCreature.nextPosition ||
    playerCreature.pos + 110 >= aiCreature.pos
    ) {
    playerCreature.nextPosition = playerCreature.pos + playerCreatureMovePattern;

    // Prevents the creature from "falling off" the screen
    playerCreature.nextPosition = Math.min(Math.max(playerCreature.nextPosition, 10), aiCreature.pos - 110);
  }

  if (playerCreatureBehavior === "Lazy") {
    playerCreature.pos += 0;
  } else if (playerCreature.pos < playerCreature.nextPosition) {
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
  character = this.randomizeImage(),
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
  this.behaviorList = ["Random", "Aggressive", "Lazy", "Timid"];
  this.victories = 0;

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
  }
}
  
Creature.prototype.resetPos = function(newPos) {
  this.pos = newPos;
}

Creature.prototype.randomizeImage = function() {
  let images = [
    "BigFish",
    "EarthD",
    "EldritchOvermind",
    "OceanosL",
    "Unibun1_1",
  ];

  let result = `./docs/creatures/${images[Math.floor(Math.random() * images.length)]}.png`
  return result;
}

Creature.prototype.newCreature = function() {
  this.character = this.randomizeImage();
  let str = Math.floor(Math.random() * 10);
  let def = Math.floor(Math.random() * (10 - str))
  let agi = 10 - str - def;
  this.str = 10 + str;
  this.def = 10 + def;
  this.agi = 10 + agi;
  this.attacks.attackClose = Math.floor(Math.random() * 8);
  this.attacks.attackFar = Math.max(Math.floor(Math.random() * (9 - this.attacks.attackClose)), 1);
  this.attacks.attackMid = Math.max(10 - this.attacks.attackClose - this.attacks.attackFar, 1);
};

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

Creature.prototype.addVictory = function() {
  this.victories++;
}

Creature.prototype.getVictories = function() {
  return this.victories;
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

  Game.prototype.randomizeAI = () => {
    aiCreature = new Creature(pos = 500);
  }

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

  Game.prototype.getBehaviorDescription = function() {
    switch (this.getBehavior()) {
      case "Random":
        return "Your creature will go anywhere it wants!"
      case "Aggressive":
        return "Your creature likes to fight up close."
      case "Lazy":
        return "Your creature tries to not move too much."
      case "Timid":
        return "Your creature tries to stay far away."
    }
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
    this.game.aiCreature().newCreature();
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
const TutorialView = __webpack_require__(/*! ./tutorialView */ "./src/tutorialView.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  new TutorialView(game, ctx, canvas);
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
  let str = Math.floor(Math.random() * 10);
  let def = Math.floor(Math.random() * (10 - str))
  let agi = 10 - str - def;
  return {str: str, def: def, agi: agi}

}

generateArmorName = function() {
  const prefix = [
    "Collar",
    "Mask",
    "Shoes",
    "Glove",
    "Shield",
    "Helm",
    "Cloak",
    "Ring",
  ]
  const suffix = [
    "Defense",
    "Evasion",
    "Strength",
    "Moxy",
    "Vigor",
    "Vim",
    "Awe",
    "Pluck"
  ]
  let armorName = prefix[Math.floor(Math.random() * 8)]
              + " of " + suffix[Math.floor(Math.random() * 8)];

  return armorName;
}

generateArmorDescription = function() {
  const possibilities = [
    "This shifts sizes to adjust to its wearer",
    "Provides a modicrum of protection",
    "Stylish AND functional!",
    "Smells faintly of apples",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Armor;

/***/ }),

/***/ "./src/preparationView/armorPopUp.js":
/*!*******************************************!*\
  !*** ./src/preparationView/armorPopUp.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ArmorPopUp(ctx) {
  ctx.fillStyle = "rgba(77, 77, 77, 1)";
  ctx.fillRect(50, 50, 700, 400);
  ctx.fillStyle = "rgba(246, 241, 198, 1)";
  ctx.fillRect(55, 55, 690, 390);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("~~ Armors ~~", 315, 100);

  ctx.font = "italic 14pt Arial";
  ctx.fillText(" * Armors add to your creature's base stats.", 75, 140);
  ctx.fillText(" * Strength: Increases your damage dealt by 10% each.", 75, 180);
  ctx.fillText(" * Defense: Reduces your incoming damage by 10% each.", 75, 220);
  ctx.fillText(" * Agility: Reduces the cooldown between attacks.", 75, 260);

  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.font = "italic 14pt Arial";
  ctx.fillText("X", 718, 84); 
}

module.exports = ArmorPopUp;

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

  ctx.clearRect(350, 290, 200, 200);

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

  ctx.drawImage(
    this.game.playerCreature().creatureImage,
    playerSpriteX, playerSpriteY, 512, 512,
    350, 290, 200, 200);

  playerCreature.animationFrameStep();

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText(`Victories: ${this.game.playerCreature().getVictories()}`, 95, 400);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText("Next battle: ", 600, 400);

  ctx.fillStyle = "rgb(255, 0, 50)";
  ctx.font = "italic 18pt Arial";
  ctx.fillText("View opponent", 600, 475);
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

  ctx.clearRect(410, 10, 380, 280);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(getLines(ctx, this.game.weaponDescription(), 350), 425, 52);
  ctx.fillText(getLines(ctx, this.game.getWeaponDamages(), 350), 425, 71);
  ctx.fillText(getLines(ctx, this.game.armorDescription(), 350), 425, 146);
  ctx.fillText(getLines(ctx, this.game.getArmorStats(), 350), 425, 165);
  ctx.fillText(getLines(ctx, this.game.getBehaviorDescription(), 350), 425, 240);
  
  ctx.beginPath();
  ctx.arc(771, 53, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(771, 147, 15, 0, 2 * Math.PI, false);
  ctx.fill();

  ctx.fillStyle = "rgb(241, 242, 216)";
  ctx.font = "italic 16pt Arial";
  ctx.fillText(getLines(ctx, '?', 350), 765, 60);
  ctx.fillText(getLines(ctx, '?', 350), 765, 154);
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

  ctx.fillStyle = "black";
  ctx.font = "italic 14pt Arial";
  ctx.fillText(this.game.getWeapons()[0].name, 180, 53);
}

armorSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 115, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 120, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 14pt Arial";
  ctx.fillText(this.game.getArmors()[0].name, 180, 147);
}

aiSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 210, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 215, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 14pt Arial";
  ctx.fillText(this.game.getBehavior(), 180, 242);
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
    let closeDamage = Math.floor(Math.random() * 8);
    let farDamage = Math.max(Math.floor(Math.random() * (9 - closeDamage)), 1);
    let midDamage = Math.max(10 - closeDamage - farDamage, 1);
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

/***/ "./src/preparationView/opponentPopUp.js":
/*!**********************************************!*\
  !*** ./src/preparationView/opponentPopUp.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function OpponentPopUp(game, ctx) {
  let aiCreature = game.aiCreature();
  ctx.fillStyle = "rgba(77, 77, 77, 1)";
  ctx.fillRect(50, 50, 700, 400);
  ctx.fillStyle = "rgba(246, 241, 198, 1)";
  ctx.fillRect(55, 55, 690, 390);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("~~ Next Opponent ~~", 285, 100);

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
    75, 100, 200, 200
  );

  aiCreature.animationFrameStep();

  ctx.font = "italic 14pt Arial";
  ctx.fillText(" * Attacks:", 275, 180);
  ctx.fillText(`Close: ${aiCreature.attacks.attackClose},
                Medium: ${aiCreature.attacks.attackMid},
                Far: ${aiCreature.attacks.attackFar}`, 275, 220);
  ctx.fillText(" * Stats:", 275, 260);
  ctx.fillText(`Str: ${aiCreature.str},
                Def: ${aiCreature.def},
                Agi: ${aiCreature.agi}`, 275, 300);

  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.font = "italic 14pt Arial";
  ctx.fillText("X", 718, 84); 
}

module.exports = OpponentPopUp;

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
const WeaponPopUp = __webpack_require__(/*! ./weaponPopUp */ "./src/preparationView/weaponPopUp.js");
const ArmorPopUp = __webpack_require__(/*! ./armorPopUp */ "./src/preparationView/armorPopUp.js");
const OpponentPopUp = __webpack_require__(/*! ./opponentPopUp */ "./src/preparationView/opponentPopUp.js");

function PreparationView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;
  this.weaponPopUp = false;
  this.armorPopUp = false;
  this.opponentPopUp = false;

  this.prepClick = this.prepClick.bind(this);
  this.prepCursor = this.prepCursor.bind(this);
  this.popupClick = this.popupClick.bind(this);
  this.popupCursor = this.popupCursor.bind(this);
  this.xClick = this.xClick.bind(this);
  this.xCursor = this.xCursor.bind(this);
  this.restoreEvents = this.restoreEvents.bind(this);
}

PreparationView.prototype.restoreEvents = function() {
  document.addEventListener("click", this.prepClick);
  document.addEventListener("mousemove", this.prepCursor);
  document.removeEventListener("click", this.xClick);
  document.removeEventListener("mousemove", this.xCursor);
  document.addEventListener("click", this.popupClick);
  document.addEventListener("mousemove", this.popupCursor);
}

PreparationView.prototype.swapValue = function(value) {
  switch (value) {
    case 'weapon':
      if (this.weaponPopUp === true) {
        this.weaponPopUp = false;
        this.canvas.width = this.canvas.width; // Clears the canvas
        this.restoreEvents();
      } else {
        document.addEventListener("click", this.xClick);
        document.addEventListener("mousemove", this.xCursor);
        this.armorPopUp = false;
        this.opponentPopUp = false;
        this.weaponPopUp = true;
      }
      break;
    case 'armor':
      if (this.armorPopUp === true) {
        this.armorPopUp = false;
        this.canvas.width = this.canvas.width; // Clears the canvas
        this.restoreEvents();
      } else {
        document.addEventListener("click", this.xClick);
        document.addEventListener("mousemove", this.xCursor);
        this.weaponPopUp = false;
        this.opponentPopUp = false;
        this.armorPopUp = true;
      }
      break;
    case 'opponent':
      if (this.opponentPopUp === true) {
        this.opponentPopUp = false;
        this.canvas.width = this.canvas.width; // Clears the canvas
        this.restoreEvents();
      } else {
        document.addEventListener("click", this.xClick);
        document.addEventListener("mousemove", this.xCursor);
        this.weaponPopUp = false;
        this.armorPopUp = false;
        this.opponentPopUp = true;
      }
      break;
    default:
      this.restoreEvents();
      this.canvas.width = this.canvas.width; // Clears the canvas
      this.weaponPopUp = false;
      this.armorPopUp = false;
      this.opponentPopUp = false;
  }
}


PreparationView.prototype.start = function start() {
  this.lastTime = 0;

  this.restoreEvents();
  requestAnimationFrame(this.animate.bind(this));
};

PreparationView.prototype.xClick = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);

  if (mouseX > 719 && mouseX < 736 && mouseY > 70 && mouseY < 89) {
    this.swapValue('');
  }
}

PreparationView.prototype.xCursor = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);

  if (mouseX > 719 && mouseX < 736 && mouseY > 70 && mouseY < 89) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    }
  }
}


PreparationView.prototype.prepClick = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);
  // X-Y value modifiers in case I need to update things in the future
  // console.log(this.ctx);
  // console.log(this.canvas.pageY);
  // console.log(this.canvas.layerY);
  // console.log(this.canvas.offsetTop);

  // If the user clicks on the "left" arrow
  if (mouseX > 139 && mouseX < 178) {
    // of the weapons select
    if (mouseY > 27 && mouseY < 66) {
      this.game.rotateWeapons("left");
    // of the armors select
    } else if (mouseY > 122 && mouseY < 159) {
      this.game.rotateArmors("left");
    // of the behavior select
    } else if (mouseY > 219 && mouseY < 262) {
      this.game.rotateBehavior("left");
    }
  }

  // If the user clicks on the "right" arrow
  if (mouseX > 338 && mouseX < 378) {
    // of the weapons select
    if (mouseY > 27 && mouseY < 66) {
      this.game.rotateWeapons("right");
    // of the armors select
    } else if (mouseY > 122 && mouseY < 162) {
      this.game.rotateArmors("right");
    // of the behavior select
    } else if (mouseY > 219 && mouseY < 262) {
      this.game.rotateBehavior("right");
    }
  }

  // If the user clicks the "Next Battle" button
  if (mouseX > 599 && mouseX < 786
      && mouseY > 369 && mouseY < 411) {
        document.removeEventListener("click", this.prepClick);
        document.removeEventListener("mousemove", this.prepCursor);
        cancelAnimationFrame(this.animationId);
        this.finishPreparation();
  }    
}

PreparationView.prototype.popupClick = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);

   // If the user clicks on the "?" near Weapon
   if (mouseX > 757 && mouseX <  791 && mouseY > 39 && mouseY < 72) {
    this.swapValue('weapon');
  // If the user clicks on the "?" near Armor
  } else if (mouseX > 757 && mouseX <  791 && mouseY > 134 && mouseY < 169) {
    this.swapValue('armor');
  // If the user clicks the "View Opponent" button
  } else if (mouseX > 599 && mouseX < 770 && mouseY > 457 && mouseY < 491) {
      this.swapValue('opponent');
  }
};

PreparationView.prototype.prepCursor = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);

  // If the user hovers over the X axis of the left arrow buttons 
  if (mouseX > 139 && mouseX < 178) {
    // Of the weapon select 
    if (mouseY > 27 && mouseY < 66) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the armor select
    } else if (mouseY > 122 && mouseY < 162) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the behavior select
    } else if (mouseY > 219 && mouseY < 262) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    } else {
      this.canvas.classList.remove('cursor-pointer');
    }
  // If the user hovers over the X axis of the right arrow butons
  } else if (mouseX > 338 && mouseX < 379) {
    // Of the weapon select 
    if (mouseY > 27 && mouseY < 66) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the armor select
    } else if (mouseY > 122 && mouseY < 162) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the behavior select
    } else if (mouseY > 219 && mouseY < 262) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    } else {
      this.canvas.classList.remove('cursor-pointer');
    }
  // If the user hovers over the "Next Battle" button
  } else if (mouseX > 599 && mouseX < 786 && mouseY > 369 && mouseY < 411) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  } else {
    this.canvas.classList.remove('cursor-pointer');
  }
}

PreparationView.prototype.popupCursor = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);

  // If the user hovers over the "?" near Weapon
  if (mouseX > 757 && mouseX <  791 && mouseY > 39 && mouseY < 72) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  // If the user hovers over the "?" near Armor
  } else if (mouseX > 757 && mouseX <  791 && mouseY > 134 && mouseY < 169) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  // If the user hovers over the "View Opponent" button
  } else if (mouseX > 599 && mouseX < 770 && mouseY > 457 && mouseY < 491) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
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
    if (this.weaponPopUp === true) {
      WeaponPopUp(this.ctx);
    } else if (this.armorPopUp === true) {
      ArmorPopUp(this.ctx);
    } else if (this.opponentPopUp === true) {
      OpponentPopUp(this.game, this.ctx);
    } else {
      EquipBox(this.game, this.ctx, this.canvas);
      CreatureBox(this.game, this.ctx, this.canvas);
      DescriptionBox(this.game, this.ctx, this.canvas);
    }
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

PreparationView.prototype.finishPreparation = function() {
  this.textFadeIn("Get Ready!");
}

PreparationView.prototype.textFadeIn = function(text) {
  this.ctx.clearRect(0, 0, this.canvas.width, 280);
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
    "Stick",
    "Torch",
    "Fist",
    "Dagger",
    "Blade",
    "Tooth",
    "Claw",
    "Eye"
   ]
   const suffix = [
     "fire",
     "ice",
     "frenzy",
     "fury",
     "decay",
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
    "More useful than a spoon",
    "This object always feels cold to the touch",
    "It hums with a strange energy",
    "This ancient tool was once used as currency",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Weapon;

/***/ }),

/***/ "./src/preparationView/weaponPopUp.js":
/*!********************************************!*\
  !*** ./src/preparationView/weaponPopUp.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function WeaponPopUp(ctx) {
  ctx.fillStyle = "rgba(77, 77, 77, 1)";
  ctx.fillRect(50, 50, 700, 400);
  ctx.fillStyle = "rgba(246, 241, 198, 1)";
  ctx.fillRect(55, 55, 690, 390);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("~~ Weapons ~~", 315, 100);

  ctx.font = "italic 14pt Arial";
  ctx.fillText(" * Weapons deal a range of damage, from 1 to their value.", 75, 140);
  ctx.fillText(" * Range is decided by the distance between your creature and your opponent.", 75, 180);
  ctx.fillText(" * Close Range: If the creatures are within 200 pixels of each other.", 75, 220);
  ctx.fillText(" * Medium Range: If the creatures are between 201 and 400 pixels of each other.", 75, 260);
  ctx.fillText(" * Far Range: If the creatures are over 400 pixels from each other.", 75, 300);

  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.font = "italic 14pt Arial";
  ctx.fillText("X", 718, 84); 
}

module.exports = WeaponPopUp;

/***/ }),

/***/ "./src/tutorialView.js":
/*!*****************************!*\
  !*** ./src/tutorialView.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PreparationView = __webpack_require__(/*! ./preparationView/preparationView */ "./src/preparationView/preparationView.js");
const GameView = __webpack_require__(/*! ./gameView */ "./src/gameView.js");

function TutorialView(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  this.gameView = new GameView(game, ctx, canvas);

  this.offsetLeft = this.canvas.offsetLeft;
  this.offsetTop = document.getElementById('height-test').offsetTop; 
  this.currentHighlight = ["creature", "showWeapon", "showArmor", "showBehavior", "showNext"];

  this.handleClick = this.handleClick.bind(this);
  this.handleCursor = this.handleCursor.bind(this);
  this.handleNext = this.handleNext.bind(this);
  this.handleSkip = this.handleSkip.bind(this);
  this.showCreature = this.showCreature.bind(this);
  this.showWeapon = this.showWeapon.bind(this);
  this.showArmor = this.showArmor.bind(this);
  this.showBehavior = this.showBehavior.bind(this);
  this.showNext = this.showNext.bind(this);
  this.clearView = this.clearView.bind(this);
  this.writeTutorialNext = this.writeTutorialNext.bind(this);
  this.writeTutorialSkip = this.writeTutorialSkip.bind(this);

  document.addEventListener('click', this.handleClick, false);
  document.addEventListener('mousemove', this.handleCursor, false);

  this.showCreature();
}

TutorialView.prototype.handleClick = function(e) {
  let clickX = e.pageX - this.offsetLeft;
  let clickY = e.pageY - this.offsetTop;

  // If the user clicks the Y axis of the buttons
  if (clickY > 424 && clickY < 471) {
    // If the user clicks the Skip button
    if (clickX > 24 && clickX < 171) {
      this.handleSkip();      
    // If the user clicks the Next button
    } else if (clickX > 224 && clickX < 296) {
      this.handleNext();
    }
  }

}

TutorialView.prototype.handleCursor = function(e) {
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  // If the user hovers over the Y axis of the buttons
  if (mouseY > 424 && mouseY < 471) {
    // If the user hovers over the Skip button
    if (mouseX > 24 && mouseX < 171) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer')
      }
    // If the user hovers over the Next button
    } else if (mouseX > 224 && mouseX < 296) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer')
      }
    } else {
      this.canvas.classList.remove('cursor-pointer');
    }
  } else {
    this.canvas.classList.remove('cursor-pointer');
  }
}

TutorialView.prototype.handleNext = function(e) {
  this.currentHighlight.shift();
  switch (this.currentHighlight[0]) {
    case "showWeapon":
      this.showWeapon();
      break;
    case "showArmor":
      this.showArmor();
      break;
    case "showBehavior":
      this.showBehavior();
      break;
    case "showNext":
      this.showNext();
      break;
    default:
      this.handleSkip();
      break;


  }
}

TutorialView.prototype.handleSkip = function(e) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  document.removeEventListener("click", this.handleClick);
  document.removeEventListener("mousemove", this.handleCursor);
  this.canvas.classList.remove("back-image-tutorial");
  this.canvas.classList.add("back-image-layers-hills");
  const backgroundLayerFront = document.getElementById("bg-front");
  backgroundLayerFront.classList.add("front-image-layers-hills");
  new PreparationView(this.game, this.ctx, this.canvas, this.gameView).start(); 

};

TutorialView.prototype.showCreature = function() {
  this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  this.ctx.fillRect(0, 0, 800, 500)

  this.ctx.clearRect(340, 280, 220, 200);
  this.ctx.fillStyle = "rgba(255, 91, 1, 1)";

  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines = "This is your creature"
  this.ctx.fillText(getLines(this.ctx, lines, 350), 20, 350);
}

TutorialView.prototype.showWeapon = function() {
  this.clearView(18, 17, 720, 60);

  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "This is where you";
  lines2 = "select your weapon.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);
}

TutorialView.prototype.showArmor = function() {
  this.clearView(18, 110, 720, 60);


  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "This is where you";
  lines2 = "select your armor.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);

}

TutorialView.prototype.showBehavior = function() {
  this.clearView(18, 205, 720, 60);


  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "This is where you";
  lines2 = "select your behavior.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);

}

TutorialView.prototype.showNext = function() {
  this.clearView(595, 368, 190, 40);


  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "When ready, send";
  lines2 = "your creature to battle.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);

}

TutorialView.prototype.writeTutorialNext = function() {
  this.ctx.fillStyle = "rgba(255, 91, 1, 1)";

  this.ctx.font = "italic 18pt Arial";
  let lines = "Next";
  this.ctx.fillText(getLines(this.ctx, lines, 50), 225, 450);
}

TutorialView.prototype.writeTutorialSkip = function() {
  lines = "Skip Tutorial";
  this.ctx.fillText(getLines(this.ctx, lines, 200), 25, 450);
}

TutorialView.prototype.clearView = function(x, y, width, height) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  this.ctx.fillRect(0, 0, 800, 500)

  this.ctx.clearRect(x, y, width, height);
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

module.exports = TutorialView;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map