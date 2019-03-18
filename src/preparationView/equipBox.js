// const Weapons = require('./weapon');

function EquipBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "green";
  ctx.fillRect(0,0,400,300);
  ctx.clearRect(10, 10, 380, 280)
}



module.exports = EquipBox;