function EquipBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.fillStyle = "green";
  ctx.fillRect(0,0,400,300);
  ctx.clearRect(10, 10, 380, 280)

  weaponSelectText();
  armorSelectText();
  weaponSelect();
  armorSelect();
  weaponSelectLeft();
  weaponSelectRight();
  armorSelectLeft();
  armorSelectRight();
  console.log(game.showWeapons());
  console.log(game.showArmors());
  // console.log(Equipment.showWeapons());
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
  ctx.fillRect(130, 20, 220, 50);
  ctx.clearRect(135, 25, 210, 40);

}

armorSelect = function() {
  ctx.fillRect(130, 115, 220, 50);
  ctx.clearRect(135, 120, 210, 40);
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
  ctx.fillRect(305, 25, 40, 40)
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(315, 39);
  ctx.lineTo(335, 46);
  ctx.lineTo(315, 53);
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
  ctx.fillRect(305, 120, 40, 40);
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.moveTo(315, 134);
  ctx.lineTo(335, 141);
  ctx.lineTo(315, 148);
  ctx.closePath();
  ctx.fill();
}

module.exports = EquipBox;