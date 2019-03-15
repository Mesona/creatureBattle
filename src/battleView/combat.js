function Combat(game) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature()

  // Calculates distance between the two
  creatureDistance = aiCreature.pos - playerCreature.pos - 100;
  // console.log(creatureDistance)
  if (creatureDistance < 151) {
    aiCreature.currentHP -= playerCreature.attack('close');
    playerCreature.currentHP -= aiCreature.attack('close');
  } else if (creatureDistance < 401) {
    aiCreature.currentHP -= playerCreature.attack('mid');
    playerCreature.currentHP -= aiCreature.attack('mid');
  } else {
    aiCreature.currentHP -= playerCreature.attack('far');
    playerCreature.currentHP -= aiCreature.attack('far');
  }

  playerCreature.currentHP = Math.min(Math.max(playerCreature.currentHP, 0));
  aiCreature.currentHP = Math.min(Math.max(aiCreature.currentHP, 0));
}



module.exports = Combat;