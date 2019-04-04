const EquipBox = require('./equipBox');
const CreatureBox = require('./creatureBox');
const DescriptionBox = require('./descriptionBox');
const WeaponPopUp = require('./weaponPopUp');
const ArmorPopUp = require('./armorPopUp');
const OpponentPopUp = require('./opponentPopUp');

function PreparationView(game, ctx, canvas, gameView) {
  this.game = game;
  this.canvas = canvas;
  this.ctx = ctx;
  this.gameView = gameView;
  this.weaponPopUp = false;
  this.armorPopUp = false;
  this.opponentPopUp = false;

  this.handleClick = this.handleClick.bind(this);
  this.handleCursor = this.handleCursor.bind(this);
}

PreparationView.prototype.swapValue = function(value) {
  switch (value) {
    case 'weapon':
      if (this.weaponPopUp === true) {
        this.weaponPopUp = false;
        this.canvas.width = this.canvas.width; // Clears the canvas
      } else {
        this.armorPopUp = false;
        this.opponentPopUp = false;
        this.weaponPopUp = true;
      }
      break;
    case 'armor':
      if (this.armorPopUp === true) {
        this.armorPopUp = false;
        this.canvas.width = this.canvas.width; // Clears the canvas
      } else {
        this.weaponPopUp = false;
        this.opponentPopUp = false;
        this.armorPopUp = true;
      }
      break;
    case 'opponent':
      if (this.opponentPopUp === true) {
        this.opponentPopUp = false;
        this.canvas.width = this.canvas.width; // Clears the canvas
      } else {
        this.weaponPopUp = false;
        this.armorPopUp = false;
        this.opponentPopUp = true;
      }
      break;
    default:
      return null;
  }
}

PreparationView.prototype.start = function start() {
  this.lastTime = 0;

  document.addEventListener('click', this.handleClick, false);
  document.addEventListener('mousemove', this.handleCursor, false);
  requestAnimationFrame(this.animate.bind(this));
};

PreparationView.prototype.handleClick = function(e) {
  let clickX = e.pageX - this.canvas.offsetLeft;
  let clickY = e.pageY - (document.getElementById('height-test').offsetTop);
  // X-Y value modifiers in case I need to update things in the future
  // console.log(this.ctx);
  // console.log(this.canvas.pageY);
  // console.log(this.canvas.layerY);
  // console.log(this.canvas.offsetTop);

  console.log(`${clickX}, ${clickY}`)

  // If the user clicks on the "left" arrow
  if (clickX > 139 && clickX < 178) {
    // of the weapons select
    if (clickY > 27 && clickY < 66) {
      this.game.rotateWeapons("left");
    // of the armors select
    } else if (clickY > 122 && clickY < 159) {
      this.game.rotateArmors("left");
    // of the behavior select
    } else if (clickY > 219 && clickY < 262) {
      this.game.rotateBehavior("left");
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
    // of the behavior select
    } else if (clickY > 219 && clickY < 262) {
      this.game.rotateBehavior("right");
    }
  }

  // If the user clicks the "Next Battle" button
  if (clickX > 604 && clickX < 778
      && clickY > 377 && clickY < 402) {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("mousemove", this.handleCursor);
        cancelAnimationFrame(this.animationId);
        this.finishPreparation();
  }    

  // If the user clicks of the "?" near Weapon
  if (clickX > 757 && clickX <  791 && clickY > 39 && clickY < 72) {
    this.swapValue('weapon');
  // If the user clicks of the "?" near Armor
  } else if (clickX > 757 && clickX <  791 && clickY > 134 && clickY < 169) {
    this.swapValue('armor');
  }

  // If the user clicks the "View Opponent" button
  if (clickX > 599 && clickX < 770 && clickY > 457 && clickY < 491) {
    this.swapValue('opponent');
  }
}

PreparationView.prototype.handleCursor = function(e) {
  let mouseX = e.pageX - this.canvas.offsetLeft;
  let mouseY = e.pageY - (document.getElementById('height-test').offsetTop);

  // If the user hovers over the X axis of the left arrow buttons 
  if (mouseX > 139 && mouseX < 178) {
    // Of the weapon select 
    if (mouseY > 27 && mouseY < 66) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the armor select
    } else if (mouseY > 122 && mouseY < 162) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the behavior select
    } else if (mouseY > 219 && mouseY < 262) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    } else {
      this.canvas.classList.remove('cursor-pointer');
    }
  // If the user hovers over the X axis of the right arrow butons
  } else if (mouseX > 338 && mouseX < 379) {
    // Of the weapon select 
    if (mouseY > 27 && mouseY < 66) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the armor select
    } else if (mouseY > 122 && mouseY < 162) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    // Of the behavior select
    } else if (mouseY > 219 && mouseY < 262) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer');
      }
    } else {
      this.canvas.classList.remove('cursor-pointer');
    }
  // If the user hovers over the "Next Battle" button
  } else if (mouseX > 599 && mouseX < 786 && mouseY > 369 && mouseY < 411) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  // If the user hovers over the "?" near Weapon
  } else if (mouseX > 757 && mouseX <  791 && mouseY > 39 && mouseY < 72) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  // If the user hovers over the "?" near Armor
  } else if (mouseX > 757 && mouseX <  791 && mouseY > 134 && mouseY < 169) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  // If the user hovers over the "View Opponent" button
  } else if (mouseX > 599 && mouseX < 770 && mouseY > 457 && mouseY < 491) {
    if (!this.canvas.classList.contains('cursor-pointer')) {
      this.canvas.classList.add('cursor-pointer');
    } 
  } else {
    this.canvas.classList.remove('cursor-pointer');
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
    if (this.weaponPopUp === true) {
      WeaponPopUp(this.ctx);
    } else if (this.armorPopUp === true) {
      ArmorPopUp(this.ctx);
    } else if (this.opponentPopUp === true) {
      OpponentPopUp(this.game, this.ctx);
    } else {
      EquipBox(this.game, this.ctx, this.canvas);
      CreatureBox(this.game, this.ctx, this.canvas);
      DescriptionBox(this.game, this.ctx, this.canvas);
    }
    this.game.gameSpeedStep();
  } else {
    this.game.gameSpeedStep();
  }
}

PreparationView.prototype.finishPreparation = function() {
  this.textFadeIn("Get Ready!");
}

PreparationView.prototype.textFadeIn = function(text) {
  this.ctx.clearRect(0, 0, this.canvas.width, 280);
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