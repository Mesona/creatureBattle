const HealthBar = require('./healthBar');
const DistanceBar = require('./distanceBar');
const MoveCreatures = require('./moveCreature');

function BattleView(ctx, canvas) {
  // function BattleView(game, ctx, playerCreature, enemyCreature) {
  this.ctx = ctx;
  this.canvas = canvas
  // this.game = game;
  // this.playerCreature = playerCreature;
  // this.enemyCreature = enemyCreature;
  // this.drawHealth(this.ctx);
  this.animationId = '';
}

BattleView.prototype.start = function start() {
  this.lastTime = 0;
  console.log("STARTED")
  requestAnimationFrame(this.animate.bind(this));
};

BattleView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  // console.log("ANIMATE")
  // console.log(timeDelta)
  // console.log(time)

  this.animationId = requestAnimationFrame(this.animate.bind(this));
};

// const body = document.getElementsByClassName('body');
// body.addEventListener('click', () => {
//   cancelAnimationFrame(this.animationId);
// });

BattleView.prototype.step = function step(timeDelta) {
  DistanceBar(this.ctx, this.canvas);
  HealthBar(this.ctx, this.canvas, timeDelta);
  MoveCreatures(this.ctx, this.canvas, timeDelta);
}


module.exports = BattleView;