function TutorialView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;

  this.handleClick = this.handleClick.bind(this);
}

module.exports = TutorialView;