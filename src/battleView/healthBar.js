function HealthBar(game, ctx) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();


  let playerPercentHealth = playerCreature.maxHP / playerCreature.currentHP;
  let aiPercentHealth = aiCreature.maxHP / aiCreature.currentHP;

  // Player creature's health 
  pos = 20 + (250 - (250 * playerPercentHealth));
  ctx.strokeStyle = "red";
  ctx.strokeRect(20, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(pos, 70, (270 - pos), 30);
  
  // AI creature's health
  ctx.strokeStyle = "red";
  ctx.strokeRect(530, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(530, 70, (250 / aiPercentHealth), 30);
}

module.exports = HealthBar;