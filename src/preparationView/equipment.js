const Weapon = require('./weapon');
const Armor = require('./armor');

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
}

module.exports = Equipment;