const Weapon = require('./weapon');
const Armor = require('./armor');

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