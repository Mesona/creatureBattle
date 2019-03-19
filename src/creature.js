function Creature(
  position = 200,
  nextPosition = position,
  strength = 10,
  defense = 10,
  agi = 10,
  speed = 5,
  healthPoints = 100,
  weapon = null,
  armor = null,
  attacks = {
    // {rangeMin: 0, rangeMax: 150, damage: 10},
    // {rangeMin: 151, rangeMax: 400, damage: 10},
    // {rangeMid: 401, rangeMax: 700, damage: 5},
    attackClose: 10,
    attackMid: 10,
    attackFar: 50,
    }
  ) {
  
  this.pos = position;
  this.nextPosition = nextPosition;
  this.str = strength;
  this.def = defense;
  this.agi = agi;
  this.spd = speed;
  this.maxHP = healthPoints;
  this.currentHP = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  this.attacks = attacks;

  Creature.prototype.attack = (range) => {
    if (range === "close") {
      return (Math.random() * this.attacks.attackClose) + 1;
    } else if (range === "mid") {
      return (Math.random() * this.attacks.attackMid) + 1;
    } else {
      return (Math.random() * this.attacks.attackFar) + 1;
    }
  }

  // Creature.prototype.updateAttacks = (weapon) => {
    // attacks = {attackClose: weapon.attackClose,
    //            attackMid: weapon.attackMid,
    //            attackFar: weapon.attackFar}
    // this.attacks = {
    //   attackClose: 5,
    //   attackMid: 8,
    //   attackFar: 1239}
    // attacks.attackClose = weapon.attackClose;
    // attacks.attackMid = weapon.attackMid;
    // attacks.attackFar = weapon.attackFar;
    // console.log(weapon.attackClose)
    // this.attacks = weapon.attacks;
    // console.log(weapon.attacks);
  // }
  
  Creature.prototype.restoreHP = function() {
    this.currentHP = this.maxHP;
  }
}
  
  Creature.prototype.resetPos = function(newPos) {
    this.pos = newPos;
  }

module.exports  = Creature;