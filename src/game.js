const Creature = require('./creature');
const Equipment = require('./preparationView/equipment');

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