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
  let playerCreature = new Creature();
  let aiCreature = new Creature(pos = 500, str = 14, def = 13, agi = 13);
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

  Game.prototype.showWeapons = () => {
    return equipment.showWeapons();
  }

  Game.prototype.showArmors = () => {
    return equipment.showArmors();
  }

  Game.prototype.rotateWeapons = (direction) => {
    equipment.rotateWeapons(direction);

    // Should put this into a method on creature.js at some point
    playerCreature.attacks = {
      attackClose: equipment.weapons[0].attackClose,
      attackMid: equipment.weapons[0].attackMid,
      attackFar: equipment.weapons[0].attackFar
    }
  }

  Game.prototype.rotateArmors = (direction) => {
    equipment.rotateArmors(direction);

    // Should also be moved into a method at some point
    playerCreature.str = 10 + equipment.armors[0].stats.str;
    playerCreature.def = 10 + equipment.armors[0].stats.def;
    playerCreature.agi = 10 + equipment.armors[0].stats.agi;
  }

  Game.prototype.rotateArmors = (direction) => {
    equipment.rotateArmors(direction);
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

  // Game.prototype.updatePlayerWeapons = () => {
    // console.log('updating');
    // playerCreature.updateAttacks(equipment.weapons[0]);
  // }

}

module.exports = Game;