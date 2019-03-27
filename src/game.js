const Creature = require('./creature');
const Equipment = require('./preparationView/equipment');

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
  // let playerCreature = new Creature(pos = 200, character = './docs/creatures/BigFish.png');
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