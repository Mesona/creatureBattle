function HealthBar(game, ctx, canvas) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

  let playerPercentHealth = playerCreature.currentHP / playerCreature.maxHP;
  let aiPercentHealth = aiCreature.currentHP / aiCreature.maxHP;

  ctx.clearRect(0,70,canvas.width,30);

  // ctx.clearRect(0, 0, canvas.width, 280);
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("HP", 20, 68);
  ctx.fillText("HP", 530, 68);

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
  ctx.fillRect(530, 70, (250 * aiPercentHealth), 30);
}

module.exports = HealthBar;