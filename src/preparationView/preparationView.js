const EquipBox = require('./equipBox');
const CreatureBox = require('./creatureBox');
const DescriptionBox = require('./descriptionBox');

function PreparationView(game, ctx, canvas) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
}

PreparationView.prototype.start = function start() {
  this.lastTime = 0;

  document.addEventListener('click', (e) => {
    let clickX = e.pageX - this.canvas.offsetLeft;
    let clickY = e.pageY - 87 - this.canvas.offsetTop;
    // there are: pageX/Y, layerX/Y
    console.log(`${clickX}, ${clickY}`)

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
          console.log(this.game.showWeapons())
        }    

  });

  requestAnimationFrame(this.animate.bind(this));
};

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

module.exports = PreparationView;