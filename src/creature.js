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