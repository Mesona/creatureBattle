
function HealthBar(ctx) {

  // draw(ctx) {
    // if (creature.owner === "AI") {
    //   this.ctx.strokeStyle = "red";
    //   this.ctx.strokeRect(530, 70, 250, 30);
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fillRect(530, 70, (250 - (250 * this.percentHealth)), 30);
    // } else {
    //   pos = 20 + (250 - (250 * this.percentHealth));
    //   this.ctx.strokeStyle = "red";
    //   this.ctx.strokeRect(20, 70, 250, 30);
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fillRect(pos, 70, (270 - pos), 30);
    // }
  // }

  ctx.strokeStyle = "red";
  ctx.strokeRect(20, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(20, 70, 250, 30);

  // opposing creature's health
  ctx.strokeStyle = "red";
  ctx.strokeRect(530, 70, 250, 30);
  ctx.fillStyle = "red";
  ctx.fillRect(530, 70, 250, 30);
}

module.exports = HealthBar;