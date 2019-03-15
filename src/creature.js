function Creature(
  position = 200,
  strength = 10,
  speed = 5,
  defense = 10,
  healthPoints = 100,
  weapon = null,
  armor = null
  ) {
  
  this.pos = position;
  this.str = strength;
  this.spd = speed;
  this.def = defense;
  this.maxHP = healthPoints;
  this.currentHP = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  

}

module.exports  = Creature;