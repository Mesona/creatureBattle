function Creature(
  position = 200,
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
    {damage: 1},
    {damage: 1},
    {damage: 5},
    ]
  ) {
  
  this.pos = position;
  this.str = strength;
  this.spd = speed;
  this.def = defense;
  this.maxHP = healthPoints;
  this.currentHP = healthPoints;
  this.weapon = weapon;
  this.armor = armor;
  this.attacks = attacks;

  Creature.prototype.attack = (range) => {
    // console.log(this.attacks)
    if (range === "close") {
      return this.attacks[0].damage;
    } else if (range === "mid") {
      // console.log('here')
      return this.attacks[1].damage;
    } else {
      return this.attacks[2].damage;
    }
  }
}


  // switch(range) {
  //   case 'close':
  //     // console.log("Smash");
  //     return this.attacks[0].damage;
  //   case 'mid':
  //     // console.log("Smack");
  //     return this.attacks;
  //   case 'far':
  //     // console.log("pew pew");
  //     return this.attacks[2].damage;
  //   default:
  //     return null;
  // }
// }

// Creature.prototype.attack = (range) => {
// // attack = range => {
//   if (range === "close") {
//     console.log("Smash");
//     console.log(this.pos)
// } else if (range === "mid") {
//     console.log("boom");
//     console.log(this.pos)
//   } else {
//     console.log("pew pew");
//   }
// }

module.exports  = Creature;