const HealthBar = require('./healthBar');
const DistanceBar = require('./distanceBar');
const MoveCreatures = require('./moveCreature');
const Combat= require('./combat');

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
  if (this.game.gameSpeed() % 4 === 0) {
    DistanceBar(this.game, this.ctx, this.canvas);
    HealthBar(this.game, this.ctx, this.canvas);
    MoveCreatures(this.game, this.ctx, this.canvas, timeDelta);
    Combat(this.game);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}


module.exports = BattleView;