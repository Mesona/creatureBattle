function CreatureBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "purple";
  ctx.fillRect(0, 300, canvas.width, 200);
  ctx.clearRect(10, 310, (canvas.width - 20), 180);

  // Need to animate creature
}



module.exports = CreatureBox;