function ArmorPopUp(ctx) {
  ctx.fillStyle = "rgba(77, 77, 77, 1)";
  ctx.fillRect(50, 50, 700, 400);
  ctx.fillStyle = "rgba(246, 241, 198, 1)";
  ctx.fillRect(55, 55, 690, 390);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 20pt Arial";
  ctx.fillText("~~ Armors ~~", 315, 100);

  ctx.font = "italic 14pt Arial";
  ctx.fillText(" * Armors add to your creature's base stats.", 75, 140);
  ctx.fillText(" * Strength: Increases your damage dealt by 10% each.", 75, 180);
  ctx.fillText(" * Defense: Reduces your incoming damage by 10% each.", 75, 220);
  ctx.fillText(" * Agility: Reduces the cooldown between attacks.", 75, 260);
}

module.exports = ArmorPopUp;