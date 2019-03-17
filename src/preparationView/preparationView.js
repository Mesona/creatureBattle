function PreparationView(game, ctx, canvas) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
}

PreparationView.prototype.start = function start() {
  console.log('yeah')
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

PreparationView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  this.animationId = requestAnimationFrame(this.animate.bind(this)); 
}

// PreparationView.prototype.step = (timeDelta) => {
PreparationView.prototype.step = function step(timeDelta) {
  // console.log(this.game.playerCreature());
  console.log(this.game.getGameSpeed())
  if (this.game.getGameSpeed() % 4 === 0) {
    EquipBox(this.game, this.ctx, this.canvas);
    // CreatureBox(this.game, this.ctx, this.canvas);
    // DescriptionBox(this.game, this.ctx, this.canvas);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

module.exports = PreparationView;