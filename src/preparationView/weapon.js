function Weapon(
    attackClose,
    attackMid,
    attackFar,
    name = generateWeaponName(),
    description = generateWeaponDescription()) {
  this.attackClose = attackClose;
  this.attackMid = attackMid;
  this.attackFar = attackFar;
  this.name = name;
  this.description = description;
}

close = function() {
  return this.attackClose.damage;
}

mid = function() {
  return this.attackMid.damage;
}

far = function() {
  return this.attackFar.damage;
}

generateWeaponName = function() {
  const prefix = [
    "sword",
    "torch",
    "gauntlet",
    "dagger",
    "tentacle",
    "tooth",
    "claw",
    "eye"
   ]
   const suffix = [
     "fire",
     "ice",
     "frenzy",
     "fury",
    //  "protection",
     "decay",
    //  "destruction",
     "bravado",
     "grit",
     "pizzaz"
   ]
   weaponName = prefix[Math.floor(Math.random() * 8)]
                + " of " + suffix[Math.floor(Math.random() * 8)];

   return weaponName;
}

generateWeaponDescription = function() {
  const possibilities = [
    "Lorem ipsum",
    "Ipsum lorem",
    "Placeholder",
    "This ancient tool was once used as currency",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Weapon;