function CreatureBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;
  let playerCreature = this.game.playerCreature();

  // Box border to see where it lies on the canvas
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0, 300, canvas.width, 200);
  // ctx.clearRect(10, 310, (canvas.width - 20), 180);

  ctx.clearRect(350, 290, 200, 200);

  let timing = Math.floor(playerCreature.animationFrame / 4); 

  // WORKING< FOR TESTINGS SMALLER IDLE ANIMATION
  // let playerSpriteY = 512 * (Math.floor(timing / 9) % 2);
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

  ctx.drawImage(
    this.game.playerCreature().creatureImage,
    playerSpriteX, playerSpriteY, 512, 512,
    350, 290, 200, 200);

  playerCreature.animationFrameStep();

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText(`Victories: ${this.game.playerCreature().getVictories()}`, 95, 400);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText("Next battle: ", 600, 400);
}




module.exports = CreatureBox;