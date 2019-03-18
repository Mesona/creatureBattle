function CreatureBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  // Box border to see where it lies on the canvas
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0, 300, canvas.width, 200);
  // ctx.clearRect(10, 310, (canvas.width - 20), 180);

  ctx.fillStyle = "green"; 
  ctx.fillRect(350,290,100,200);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 26pt Arial";
  ctx.fillText("Next battle: ", 600, 400);
}




module.exports = CreatureBox;