function DescriptionBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "orange";
  ctx.fillRect(400, 0, 400, 300);
  ctx.clearRect(410, 10, 380, 280);
}



module.exports = DescriptionBox;