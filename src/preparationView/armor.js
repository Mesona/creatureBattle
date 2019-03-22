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
  // let statTotal = 10;
  let str = Math.floor(Math.random() * 10);
  let def = Math.floor(Math.random() * (10 - str))
  let agi = 10 - str - def;
  return {str: str, def: def, agi: agi}

}

generateArmorName = function() {
  const prefix = [
    "collar",
    "pendant",
    "greaves",
    "gauntlet",
    "shield",
    "helm",
    "cloak",
    // "spectacles"
    "ring",
  ]
  const suffix = [
    "protection",
    "evasion",
    "fortitude",
    "moxy",
    "resiliance",
    "enervation",
    "awe",
    "fancy feet"
  ]
  let armorName = prefix[Math.floor(Math.random() * 8)]
              + " of " + suffix[Math.floor(Math.random() * 8)];

  return armorName;
}

generateArmorDescription = function() {
  const possibilities = [
    "Placeholder Text",
    "Lorem Ipsum",
    "To be expanded upon later",
    "Filler text!",
    // "This armor was once worn by . . .",
    // "This rusty bucket offers . . .",
    // "This is a placebo",
    // "I guess you can use this?",
  ]

  return possibilities[Math.floor(Math.random() * 4)];
}



module.exports = Armor;