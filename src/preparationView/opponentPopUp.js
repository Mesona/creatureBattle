function OpponentPopUp(game, ctx) {
  let aiCreature = game.aiCreature();
  ctx.fillStyle = "rgba(77, 77, 77, 1)";
  ctx.fillRect(50, 50, 700, 400);
  ctx.fillStyle = "rgba(246, 241, 198, 1)";
  ctx.fillRect(55, 55, 690, 390);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("~~ Next Opponent ~~", 285, 100);

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
    75, 100, 200, 200
  );

  aiCreature.animationFrameStep();

  ctx.font = "italic 14pt Arial";
  ctx.fillText(" * Attacks:", 275, 180);
  ctx.fillText(`Close: ${aiCreature.attacks.attackClose},
                Medium: ${aiCreature.attacks.attackMid},
                Far: ${aiCreature.attacks.attackFar}`, 275, 220);
  ctx.fillText(" * Stats:", 275, 260);
  ctx.fillText(`Str: ${aiCreature.str},
                Def: ${aiCreature.def},
                Agi: ${aiCreature.agi}`, 275, 300);
}

module.exports = OpponentPopUp;