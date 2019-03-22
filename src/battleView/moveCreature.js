function MoveCreatures(game, ctx, canvas, timeDelta) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

  let timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
  let timing = Math.floor(playerCreature.animationFrame / 4); 

  let playerSpriteX = 512 * (timing % 6);
  let playerSpriteY = 0;
  switch (playerSpriteX) {
    case 1536:
      playerSpriteX = 1024;
      playerSpriteY = 512;
      break;
    case 2048:
      playerSpriteX = 512;
      playerSpriteY = 512;
      break;
    case 2560:
      playerSpriteX = 0;
      playerSpriteY = 512;
      break;
  }

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  ctx.drawImage(
    game.playerCreature().creatureImage,
    playerSpriteX, playerSpriteY, 512, 512,
    playerCreature.pos, 290, 200, 200);

  playerCreature.animationFrameStep();


  let playerCreatureBehavior = this.game.getBehavior();
  let playerCreatureMovePattern = '';
  switch (playerCreatureBehavior) {
    case "Random":
      playerCreatureMovePattern =
        (Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10);
        break;
    case "Aggressive":
      playerCreatureMovePattern =
      ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10) + (playerCreature.spd * 2));
        break;
    case "Lazy":
      playerCreatureMovePattern = 0;
        break;
    case "Timid":
      playerCreatureMovePattern =
        ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10) - (playerCreature.spd * 2));
        break;
  }
  // Agressive movement pattern, randomizes but favors moving towards enemy
  // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1) -(playerCreature.spd / 2) * timeScale))); 


  if (
    playerCreature.pos === playerCreature.nextPosition ||
    playerCreature.pos + 110 >= aiCreature.pos
    ) {
    playerCreature.nextPosition = playerCreature.pos + playerCreatureMovePattern;

    // Prevents the creature from "falling off" the screen
    playerCreature.nextPosition = Math.min(Math.max(playerCreature.nextPosition, 10), aiCreature.pos - 110);
  }

  if (playerCreatureBehavior === "Lazy") {
    playerCreature.pos += 0;
  } else if (playerCreature.pos < playerCreature.nextPosition) {
    playerCreature.pos += playerCreature.spd;
  } else {
    playerCreature.pos -= playerCreature.spd;
  }

  let aiTiming = Math.floor(aiCreature.animationFrame / 4); 

  let aiSpriteX = 512 * (aiTiming % 6);
  let aiSpriteY = 0;
  switch (aiSpriteX) {
    case 1536:
      aiSpriteX = 1024;
      aiSpriteY = 512;
      break;
    case 2048:
      aiSpriteX = 512;
      aiSpriteY = 512;
      break;
    case 2560:
      aiSpriteX = 0;
      aiSpriteY = 512;
      break;
  }
  
  ctx.drawImage(
    game.aiCreature().creatureImage,
    aiSpriteX, aiSpriteY, 512, 512,
    aiCreature.pos, 290, 200, 200);
    
  aiCreature.animationFrameStep();
    
  if (
    aiCreature.pos === aiCreature.nextPosition ||
    aiCreature.pos <= playerCreature.pos + 110
    ) {
    aiCreature.nextPosition = aiCreature.pos + ((Math.random() < 0.5 ? -1 : 1) * (aiCreature.spd * 10));

    // Prevents the creature from "falling off" the screen
    aiCreature.nextPosition = Math.min(Math.max(aiCreature.nextPosition, playerCreature.pos + 110), 690);
  }

  if (aiCreature.pos < aiCreature.nextPosition) {
    aiCreature.pos += aiCreature.spd;
  } else {
    aiCreature.pos -= aiCreature.spd;
  }

}



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MoveCreatures;