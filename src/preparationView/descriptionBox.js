function DescriptionBox(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  ctx.clearRect(410, 10, 380, 280);

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.font = "italic 12pt Arial";
  ctx.fillText(getLines(ctx, this.game.weaponDescription(), 350), 425, 52);
  ctx.fillText(getLines(ctx, this.game.getWeaponDamages(), 350), 425, 71);
  ctx.fillText(getLines(ctx, this.game.armorDescription(), 350), 425, 146);
  ctx.fillText(getLines(ctx, this.game.getArmorStats(), 350), 425, 165);
  ctx.fillText(getLines(ctx, this.game.getBehaviorDescription(), 350), 425, 240);
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