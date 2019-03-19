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
    
    // Remove the battle background -- WILL REENABLE WHEN I HAVE A REPLACEMENT
    // const backgroundLayerFront = document.getElementById("bg-front");
    // backgroundLayerFront.classList.remove("front-image-layer");
    // this.canvas.classList.remove("back-image-layers");
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new PreparationView(this.game, this.ctx, this.canvas, gameView).start();
  } else {
    this.game.setScreen("battle");
    this.game.resetGameSpeed();

    // Restore the battle background
    // const backgroundLayerFront = document.getElementById("bg-front");
    // backgroundLayerFront.classList.add("front-image-layer");
    // this.canvas.classList.add("back-image-layers");
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    new BattleView(this.game, this.ctx, this.canvas, gameView).start();
  }
}

module.exports = GameView;