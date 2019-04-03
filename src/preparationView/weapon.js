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
    "Stick",
    "Torch",
    "Fist",
    "Dagger",
    "Blade",
    "Tooth",
    "Claw",
    "Eye"
   ]
   const suffix = [
     "fire",
     "ice",
     "frenzy",
     "fury",
     "decay",
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
    "More useful than a spoon",
    "This object always feels cold to the touch",
    "It hums with a strange energy",
    "This ancient tool was once used as currency",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Weapon;