function Armor() {
  this.name = generateArmorName();
  this.description = generateArmorDescription();
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
      "spectacles"
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
      "Lorem ipsum",
      "Ipsum lorem",
      "Placeholder",
      "This ancient tool was once used as currency",
    ]

    return possibilities[Math.floor(Math.random() * 4)];
  }



module.exports = Armor;