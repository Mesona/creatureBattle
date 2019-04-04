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