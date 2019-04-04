const PreparationView = require('./preparationView/preparationView');
const BattleView = require('./battleView/battleView');

function GameView(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;
}

GameView.prototype.switchScreen = function switchScreen(gameView) {
  if (this.game.screen() === "battle") {
    this.game.setScreen("prep");
    this.game.resetGameSpeed();
    
    // Remove the forest background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.remove("front-image-layers-forest");
    this.canvas.classList.remove("back-image-layers-forest");

    // Apply the hills background
    backgroundLayerFront.classList.add("front-image-layers-hills");
    this.canvas.classList.add("back-image-layers-hills");

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game.aiCreature().newCreature();
    new PreparationView(this.game, this.ctx, this.canvas, gameView).start();
  } else {
    this.game.setScreen("battle");
    this.game.resetGameSpeed();
    
    // Remove the hills background
    const backgroundLayerFront = document.getElementById("bg-front");
    backgroundLayerFront.classList.remove("front-image-layers-hills");
    this.canvas.classList.remove("back-image-layers-hills");

    // Apply the forest background
    backgroundLayerFront.classList.add("front-image-layers-forest");
    this.canvas.classList.add("back-image-layers-forest");
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new BattleView(this.game, this.ctx, this.canvas, gameView).start();
  }
}

module.exports = GameView;