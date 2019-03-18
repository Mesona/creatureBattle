function DescriptionBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  // Box border for testing UI bounds
  // ctx.fillStyle = "orange";
  // ctx.fillRect(400, 0, 400, 300);
  ctx.clearRect(410, 10, 380, 280);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(getLines(ctx, this.game.weaponDescription(), 350), 425, 52);
  ctx.fillText(getLines(ctx, this.game.getWeaponDamages(), 350), 425, 71);
  ctx.fillText(getLines(ctx, this.game.armorDescription(), 350), 425, 146);
  // getLines(ctx, this.game.weaponDescription(), 350);
}

function getLines(ctx, text, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}


module.exports = DescriptionBox;