function CreatureBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;
  let playerCreature = this.game.playerCreature();

  // Box border to see where it lies on the canvas
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0, 300, canvas.width, 200);
  // ctx.clearRect(10, 310, (canvas.width - 20), 180);

  // ctx.fillStyle = "green"; 
  // ctx.fillRect(350,290,100,200);

  ctx.clearRect(350, 290, 200, 200);

  let playerSpriteX = playerCreature.animationFrame * 1;
  let playerSpriteY = 512;
  ctx.drawImage(
    this.game.playerCreature().creatureImage,
    // testImage,
    playerSpriteX, playerSpriteY, 512, 512,
    // 0, 0, 512, 512,
    350, 290, 200, 200);

  playerCreature.animationFrameStep();

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText("Next battle: ", 600, 400);
}




module.exports = CreatureBox;