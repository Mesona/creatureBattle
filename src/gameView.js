function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;