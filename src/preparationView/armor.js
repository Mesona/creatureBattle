function Armor(
    stats = generateStats(),
    name = generateArmorName(),
    description = generateArmorDescription()) {
  this.str = stats.str;
  this.def = stats.def;
  this.agi = stats.agi;
  this.name = name;
  this.description = description;
}

generateStats = function() {
  let str = Math.floor(Math.random() * 10);
  let def = Math.floor(Math.random() * (10 - str))
  let agi = 10 - str - def;
  return {str: str, def: def, agi: agi}

}

generateArmorName = function() {
  const prefix = [
    "Collar",
    "Mask",
    "Shoes",
    "Glove",
    "Shield",
    "Helm",
    "Cloak",
    "Ring",
  ]
  const suffix = [
    "Defense",
    "Evasion",
    "Strength",
    "Moxy",
    "Vigor",
    "Vim",
    "Awe",
    "Pluck"
  ]
  let armorName = prefix[Math.floor(Math.random() * 8)]
              + " of " + suffix[Math.floor(Math.random() * 8)];

  return armorName;
}

generateArmorDescription = function() {
  const possibilities = [
    "This shifts sizes to adjust to its wearer",
    "Provides a modicrum of protection",
    "Stylish AND functional!",
    "Smells faintly of apples",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Armor;