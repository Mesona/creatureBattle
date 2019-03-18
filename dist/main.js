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

  setTimeout(() => this.gameView.switchScreen(), 1000);
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
  let aiCreature = game.aiCreature()

  // Calculates distance between the two
  creatureDistance = aiCreature.pos - playerCreature.pos - 100;
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

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  // Draw player creature
  ctx.fillStyle = "green"; 
  ctx.fillRect(playerCreature.pos,290,100,200); 

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




  // Draw opposing creature
  ctx.fillStyle = "blue"; 
  ctx.fillRect(aiCreature.pos, 290, 100, 200);

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
    {damage: 10},
    {damage: 10},
    {damage: 50},
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
    if (range === "close") {
      return (Math.random() * this.attacks[0].damage) + 1;
    } else if (range === "mid") {
      return (Math.random() * this.attacks[1].damage) + 1;
    } else {
      return (Math.random() * this.attacks[2].damage) + 1;
    }
  }
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
  let playerCreature = new Creature();
  let aiCreature = new Creature(pos = 500);
  let equipment = new Equipment();
  equipment.addWeapon();
  equipment.addWeapon();
  equipment.addWeapon();
  equipment.addArmor();
  equipment.addArmor();
  equipment.addArmor();
  let gameSpeed = 0;
  let gameScreen = "battle";


  Game.prototype.playerCreature = () => {
    return playerCreature;
  }
    
  Game.prototype.aiCreature= () => {
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

  Game.prototype.showWeapons = () => {
    return equipment.showWeapons();
  }

  Game.prototype.showArmors = () => {
    return equipment.showArmors();
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

GameView.prototype.switchScreen = function switchScreen() {
  if (this.game.screen() === "battle") {
    this.game.setScreen("prep");
    this.game.resetGameSpeed();
    
    // Remove the battle background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.remove("front-image-layer");
    this.canvas.classList.remove("back-image-layers");
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new PreparationView(this.game, this.ctx, this.canvas).start();
  } else {
    this.game.setScreen("battle");
    this.game.resetGameSpeed();

    // Restore the battle background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.add("front-image-layer");
    this.canvas.classList.add("back-image-layers");
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new BattleView(this.game, this.ctx, this.canvas).start();
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

/***/ }),

/***/ "./src/preparationView/armor.js":
/*!**************************************!*\
  !*** ./src/preparationView/armor.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Armor() {
  this.name = generateArmorName();
  this.description = generateArmorDescription();
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
      "spectacles"
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
      "Lorem ipsum",
      "Ipsum lorem",
      "Placeholder",
      "This ancient tool was once used as currency",
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

  ctx.fillStyle = "purple";
  ctx.fillRect(0, 300, canvas.width, 200);
  ctx.clearRect(10, 310, (canvas.width - 20), 180);

  // Need to animate creature
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

  ctx.fillStyle = "orange";
  ctx.fillRect(400, 0, 400, 300);
  ctx.clearRect(410, 10, 380, 280);
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
  ctx.fillRect(0,0,400,300);
  ctx.clearRect(10, 10, 380, 280)

  weaponSelectText();
  armorSelectText();
  weaponSelect();
  armorSelect();
  weaponSelectLeft();
  weaponSelectRight();
  armorSelectLeft();
  armorSelectRight();
  console.log(game.showWeapons());
  console.log(game.showArmors());
  // console.log(Equipment.showWeapons());
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

weaponSelect = function() {
  ctx.fillRect(130, 20, 220, 50);
  ctx.clearRect(135, 25, 210, 40);

}

armorSelect = function() {
  ctx.fillRect(130, 115, 220, 50);
  ctx.clearRect(135, 120, 210, 40);
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
  ctx.fillRect(305, 25, 40, 40)
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(315, 39);
  ctx.lineTo(335, 46);
  ctx.lineTo(315, 53);
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
  ctx.fillRect(305, 120, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(315, 134);
  ctx.lineTo(335, 141);
  ctx.lineTo(315, 148);
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

  Equipment.prototype.showWeapons = () => {
    return this.weapons;
  }
  
  Equipment.prototype.addWeapon = function() {
    let closeDamage = Math.floor(Math.random() * 10);
    let farDamage = (Math.floor(Math.random() * (10 - closeDamage)));
    let midDamage = 10 - closeDamage - farDamage;
    this.weapons = this.weapons.concat(new Weapon(closeDamage, midDamage, farDamage));
  }

  Equipment.prototype.showArmors = () => {
    return this.armors;
  }

  Equipment.prototype.addArmor = function() {
    this.armors = this.armors.concat(new Armor());
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

function PreparationView(game, ctx, canvas) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
}

PreparationView.prototype.start = function start() {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

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

module.exports = PreparationView;

/***/ }),

/***/ "./src/preparationView/weapon.js":
/*!***************************************!*\
  !*** ./src/preparationView/weapon.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Weapon(attackClose, attackMid, attackFar) {
  this.attackClose = attackClose;
  this.attackMid = attackMid;
  this.attackFar = attackFar;
  this.name = generateWeaponName();
  this.description = generateWeaponDescription();
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
     "protection",
     "decay",
     "destruction",
     "bravado"
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