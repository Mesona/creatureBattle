function EquipBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "green";
  // ctx.fillRect(0,0,400,300);
  // ctx.clearRect(10, 10, 380, 280)

  weaponSelectText();
  armorSelectText();
  weaponSelect();
  armorSelect();
  weaponSelectLeft();
  weaponSelectRight();
  armorSelectLeft();
  armorSelectRight();
}

weaponSelectText = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("Weapon: ", 20, 55);
}

armorSelectText = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("Armor: ", 20, 150);
}

weaponSelect = function() {
  ctx.fillRect(130, 20, 250, 50);
  ctx.clearRect(135, 25, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getWeapons()[0].name, 180, 52);
}

armorSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 115, 250, 50);
  ctx.clearRect(135, 120, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getArmors()[0].name, 180, 146);
}

weaponSelectLeft = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(135, 25, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(165, 39);
  ctx.lineTo(145, 46);
  ctx.lineTo(165, 53);
  ctx.closePath();
  ctx.fill();
}

weaponSelectRight = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(335, 25, 40, 40)
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(345, 39);
  ctx.lineTo(365, 46);
  ctx.lineTo(345, 53);
  ctx.closePath();
  ctx.fill();;

}

armorSelectLeft = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(135, 120, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(165, 134);
  ctx.lineTo(145, 141);
  ctx.lineTo(165, 148);
  ctx.closePath();
  ctx.fill();
}

armorSelectRight = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(335, 120, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(345, 134);
  ctx.lineTo(365, 141);
  ctx.lineTo(345, 148);
  ctx.closePath();
  ctx.fill();
}

module.exports = EquipBox;