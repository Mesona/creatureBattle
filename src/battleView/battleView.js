const HealthBar = require('./healthBar');
const DistanceBar = require('./distanceBar');
const MoveCreatures = require('./moveCreature');
const Combat= require('./combat');

function BattleView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;
  this.animationId = 0;
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this)); 
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  
  if (this.game.playerCreature().currentHP === 0 || this.game.aiCreature().currentHP === 0) {
    this.step(timeDelta);
    this.step(timeDelta);
    this.step(timeDelta);
    this.step(timeDelta);
    cancelAnimationFrame(this.animationId);
    this.finishCombat();
    
  } else {
    this.animationId = requestAnimationFrame(this.animate.bind(this)); 
  }
};

BattleView.prototype.step = function step(timeDelta) {
  if (this.game.getGameSpeed() % 4 === 0) {
    DistanceBar(this.game, this.ctx, this.canvas);
    HealthBar(this.game, this.ctx, this.canvas);
    MoveCreatures(this.game, this.ctx, this.canvas, timeDelta);
    Combat(this.game, this.animationId);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

BattleView.prototype.finishCombat = function() {
  let text;
  if (this.game.playerCreature().currentHP === 0 && this.game.aiCreature().currentHP === 0) {
    text = "You tie!";
  } else if (this.game.playerCreature().currentHP === 0) {
    text = "Opponent wins!";
  } else {
    text = "You win!";
    this.game.playerCreature().addVictory();
  }

  this.game.aiCreature().restoreHP();
  this.game.playerCreature().restoreHP();
  this.game.aiCreature().resetPos(500);
  this.game.playerCreature().resetPos(200);
  this.textFadeIn(text);
}

BattleView.prototype.textFadeIn = function(text) {
  this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
  this.ctx.font = "italic 40pt Arial";
  let xloc;
  if (text === "Opponent wins!") {
    xloc = 200;
  } else {
    xloc = 300;
  }
  this.ctx.fillText(text, xloc, 250);
  setTimeout(this.textFadeOut(text, xloc), 5000);
}

BattleView.prototype.textFadeOut = function(text, xloc) {
  let alpha = 1.0,   // full opacity
  interval = setInterval(() => {
      // this.canvas.width = this.canvas.width; // Clears the canvas
      this.ctx.clearRect(0, 200, this.canvas.width, 70);
      this.ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
      this.ctx.font = "italic 40pt Arial";
      this.ctx.fillText(text, xloc, 250);
      alpha = alpha - 0.05; // decrease opacity (fade out)
      if (alpha < 0) {
        this.ctx.clearRect(0, 200, this.canvas.width, 70);
        clearInterval(interval);
      }
  }, 50);

  setTimeout(() => this.gameView.switchScreen(this.gameView), 1000);
};



module.exports = BattleView;