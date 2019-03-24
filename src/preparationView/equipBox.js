function EquipBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "green";

  weaponSelectText();
  armorSelectText();
  aiSelectText();
  weaponSelect();
  armorSelect();
  aiSelect();
  weaponSelectLeft();
  weaponSelectRight();
  armorSelectLeft();
  armorSelectRight();
  aiSelectLeft();
  aiSelectRight();
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

aiSelectText = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("AI: ", 20, 245);
}

weaponSelect = function() {
  ctx.fillRect(130, 20, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 25, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getWeapons()[0].name, 180, 52);
}

armorSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 115, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 120, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getArmors()[0].name, 180, 146);
}

aiSelect = function() {
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.fillRect(130, 210, 250, 50);
  ctx.fillStyle = "rgba(244, 242, 206, 1)";
  ctx.fillRect(135, 215, 240, 40);

  ctx.fillStyle = "black";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(this.game.getBehavior(), 180, 240);
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

aiSelectLeft = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(135, 215, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(165, 229);
  ctx.lineTo(145, 236);
  ctx.lineTo(165, 243);
  ctx.closePath();
  ctx.fill();
}

aiSelectRight = function() {
  ctx.fillStyle = "black";
  ctx.fillRect(335, 215, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(345, 229);
  ctx.lineTo(365, 236);
  ctx.lineTo(345, 243);
  ctx.closePath();
  ctx.fill();
}

module.exports = EquipBox;