function WeaponPopUp(ctx) {
  ctx.fillStyle = "rgba(77, 77, 77, 1)";
  ctx.fillRect(50, 50, 700, 400);
  ctx.fillStyle = "rgba(246, 241, 198, 1)";
  ctx.fillRect(55, 55, 690, 390);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("~~ Weapons ~~", 315, 100);

  ctx.font = "italic 14pt Arial";
  ctx.fillText(" * Weapons deal a range of damage, from 1 to their value.", 75, 140);
  ctx.fillText(" * Range is decided by the distance between your creature and your opponent.", 75, 180);
  ctx.fillText(" * Close Range: If the creatures are within 200 pixels of each other.", 75, 220);
  ctx.fillText(" * Medium Range: If the creatures are between 201 and 400 pixels of each other.", 75, 260);
  ctx.fillText(" * Far Range: If the creatures are over 400 pixels from each other.", 75, 300);
}

module.exports = WeaponPopUp;