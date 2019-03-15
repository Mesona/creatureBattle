function Creature(
  position = 0,
  strength = 10,
  speed = 10,
  defense = 10,
  healthPoints = 100,
  weapon = null,
  armor = null
  ) {
  
  this.pos = position;
  this.str = strength;
  this.spd = speed;
  this.def = defense;
  this.hp = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  

}

module.exports  = Creature;