const EquipBox = require('./equipBox');
const CreatureBox = require('./creatureBox');
const DescriptionBox = require('./descriptionBox');

function PreparationView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;

  this.handleClick = this.handleClick.bind(this);
}

PreparationView.prototype.start = function start() {
  this.lastTime = 0;

  document.addEventListener('click', this.handleClick, false);
  requestAnimationFrame(this.animate.bind(this));
};

PreparationView.prototype.handleClick = function(e) {
  let clickX = e.pageX - this.canvas.offsetLeft;
  let clickY = e.pageY - 87 - this.canvas.offsetTop;
  console.log(this.game.playerCreature());
  // console.log(`${clickX}, ${clickY}`)

  // If the user clicks on the "left" arrow
  if (clickX > 139 && clickX < 178) {
    // of the weapons select
    if (clickY > 27 && clickY < 66) {
      this.game.rotateWeapons("left");
    // of the armors select
    } else if (clickY > 122 && clickY < 159) {
      this.game.rotateArmors("left");
    }
  }

  // If the user clicks on the "right" arrow
  if (clickX > 338 && clickX < 378) {
    // of the weapons select
    if (clickY > 27 && clickY < 66) {
      this.game.rotateWeapons("right");
    // of the armors select
    } else if (clickY > 122 && clickY < 162) {
      this.game.rotateArmors("right");
    }
  }

  // If the user clicks the "Next Battle" button
  if (clickX > 604 && clickX < 778
      && clickY > 377 && clickY < 402) {
        document.removeEventListener("click", this.handleClick);
        cancelAnimationFrame(this.animationId);
        this.finishPreparation();
  }    
}

PreparationView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;
  

  this.step(timeDelta);
  this.lastTime = time;

  this.animationId = requestAnimationFrame(this.animate.bind(this)); 
}

PreparationView.prototype.step = function step(timeDelta) {
  if (this.game.getGameSpeed() % 4 === 0) {
    EquipBox(this.game, this.ctx, this.canvas);
    CreatureBox(this.game, this.ctx, this.canvas);
    DescriptionBox(this.game, this.ctx, this.canvas);
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

PreparationView.prototype.finishPreparation = function() {
  this.textFadeIn("Get Ready!");
}

PreparationView.prototype.textFadeIn = function(text) {
  this.ctx.fillStyle = "rgba(255, 0, 0, 1)";
  this.ctx.font = "italic 40pt Arial";
  let xloc = 300;
  this.ctx.fillText(text, xloc, 250);
  setTimeout(this.textFadeOut(text, xloc), 5000);
}

PreparationView.prototype.textFadeOut = function(text, xloc) {
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

module.exports = PreparationView;