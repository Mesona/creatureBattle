function Combat(game) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

  // Calculates distance between the two
  creatureDistance = aiCreature.pos - playerCreature.pos - 100;
  playerCreatureDamageModifier = (playerCreature.str / 100) + 1;
  playerCreatureDefenseModifier = (playerCreature.def / 100) + 1;
  aiCreatureDamageModifier = (aiCreature.str / 100) + 1;
  aiCreatureDefenseModifier = (aiCreature.def / 100) + 1;

  playerCreature.attackTimer = playerCreature.attackTimer - playerCreature.agi;
  aiCreature.attackTimer = aiCreature.attackTimer - aiCreature.agi;
  
  if (playerCreature.attackTimer < 0) {
    playerCreature.attackTimer += 25;
    if (creatureDistance < 201) {
      aiCreature.currentHP -= (playerCreature.attack('close') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
    } else if (creatureDistance < 401) {
      aiCreature.currentHP -= (playerCreature.attack('mid') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
    } else {
      aiCreature.currentHP -= (playerCreature.attack('far')  * playerCreatureDamageModifier / aiCreatureDefenseModifier);
    }
  }


  if(aiCreature.attackTimer < 0) {
    aiCreature.attackTimer += 25;
    if (creatureDistance < 151) {
      playerCreature.currentHP -= aiCreature.attack('close') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
    } else if (creatureDistance < 401) {
      playerCreature.currentHP -= aiCreature.attack('mid') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
    } else {
      playerCreature.currentHP -= aiCreature.attack('far') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
    }
  }

  // if (creatureDistance < 151) {
  //   aiCreature.currentHP -= (playerCreature.attack('close') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
  //   playerCreature.currentHP -= aiCreature.attack('close') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
  // } else if (creatureDistance < 401) {
  //   aiCreature.currentHP -= (playerCreature.attack('mid') * playerCreatureDamageModifier / aiCreatureDefenseModifier);
  //   playerCreature.currentHP -= aiCreature.attack('mid') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
  // } else {
  //   aiCreature.currentHP -= (playerCreature.attack('far')  * playerCreatureDamageModifier / aiCreatureDefenseModifier);
  //   playerCreature.currentHP -= aiCreature.attack('far') * aiCreatureDamageModifier / playerCreatureDefenseModifier;
  // }

  playerCreature.currentHP = Math.min(Math.max(playerCreature.currentHP, 0));
  aiCreature.currentHP = Math.min(Math.max(aiCreature.currentHP, 0));
}



module.exports = Combat;