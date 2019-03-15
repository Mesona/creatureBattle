const HealthBar = require('./healthBar');
const DistanceBar = require('./distanceBar');
const MoveCreatures = require('./moveCreature');

function BattleView(game, ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  // this.animationId = '';
  this.game = game;
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  console.log(this.game.playerCreature().pos)
  requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  this.animationId = requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.step = function step(timeDelta) {
  DistanceBar(this.game, this.ctx, this.canvas);
  HealthBar(this.game, this.ctx);
  MoveCreatures(this.game, this.ctx, this.canvas, timeDelta);
}


module.exports = BattleView;