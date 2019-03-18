function Armor(
    name = generateArmorName(),
    description = generateArmorDescription()) {
  this.name = name;
  this.description = description;
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
      "This armor was once worn by . . .",
      "This rusty bucket offers . . .",
      "This is a placebo",
      "I guess you can use this?",
    ]

    return possibilities[Math.floor(Math.random() * 4)];
  }



module.exports = Armor;