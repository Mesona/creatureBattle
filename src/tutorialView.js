const PreparationView = require('./preparationView/preparationView');
const GameView = require('./gameView');

function TutorialView(game, ctx, canvas) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;

  this.gameView = new GameView(game, ctx, canvas);

  this.offsetLeft = this.canvas.offsetLeft;
  this.offsetTop = document.getElementById('height-test').offsetTop; 
  this.currentHighlight = ["creature", "showWeapon", "showArmor", "showBehavior", "showNext"];

  this.handleClick = this.handleClick.bind(this);
  this.handleCursor = this.handleCursor.bind(this);
  this.handleNext = this.handleNext.bind(this);
  this.handleSkip = this.handleSkip.bind(this);
  this.showCreature = this.showCreature.bind(this);
  this.showWeapon = this.showWeapon.bind(this);
  this.showArmor = this.showArmor.bind(this);
  this.showBehavior = this.showBehavior.bind(this);
  this.showNext = this.showNext.bind(this);
  this.clearView = this.clearView.bind(this);
  this.writeTutorialNext = this.writeTutorialNext.bind(this);
  this.writeTutorialSkip = this.writeTutorialSkip.bind(this);

  document.addEventListener('click', this.handleClick, false);
  document.addEventListener('mousemove', this.handleCursor, false);

  this.showCreature();
}

TutorialView.prototype.handleClick = function(e) {
  let clickX = e.pageX - this.offsetLeft;
  let clickY = e.pageY - this.offsetTop;

  // If the user clicks the Y axis of the buttons
  if (clickY > 424 && clickY < 471) {
    // If the user clicks the Skip button
    if (clickX > 24 && clickX < 171) {
      this.handleSkip();      
    // If the user clicks the Next button
    } else if (clickX > 224 && clickX < 296) {
      this.handleNext();
    }
  }

}

TutorialView.prototype.handleCursor = function(e) {
  let mouseX = e.pageX - this.offsetLeft;
  let mouseY = e.pageY - this.offsetTop;

  // If the user hovers over the Y axis of the buttons
  if (mouseY > 424 && mouseY < 471) {
    // If the user hovers over the Skip button
    if (mouseX > 24 && mouseX < 171) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer')
      }
    // If the user hovers over the Next button
    } else if (mouseX > 224 && mouseX < 296) {
      if (!this.canvas.classList.contains('cursor-pointer')) {
        this.canvas.classList.add('cursor-pointer')
      }
    } else {
      this.canvas.classList.remove('cursor-pointer');
    }
  } else {
    this.canvas.classList.remove('cursor-pointer');
  }
}

TutorialView.prototype.handleNext = function(e) {
  this.currentHighlight.shift();
  switch (this.currentHighlight[0]) {
    case "showWeapon":
      this.showWeapon();
      break;
    case "showArmor":
      this.showArmor();
      break;
    case "showBehavior":
      this.showBehavior();
      break;
    case "showNext":
      this.showNext();
      break;
    default:
      this.handleSkip();
      break;


  }
}

TutorialView.prototype.handleSkip = function(e) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  document.removeEventListener("click", this.handleClick);
  document.removeEventListener("mousemove", this.handleCursor);
  this.canvas.classList.remove("back-image-tutorial");
  this.canvas.classList.add("back-image-layers-hills");
  const backgroundLayerFront = document.getElementById("bg-front");
  backgroundLayerFront.classList.add("front-image-layers-hills");
  new PreparationView(this.game, this.ctx, this.canvas, this.gameView).start(); 

};

TutorialView.prototype.showCreature = function() {
  this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  this.ctx.fillRect(0, 0, 800, 500)

  this.ctx.clearRect(340, 280, 220, 200);
  this.ctx.fillStyle = "rgba(255, 91, 1, 1)";

  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines = "This is your creature"
  this.ctx.fillText(getLines(this.ctx, lines, 350), 20, 350);
}

TutorialView.prototype.showWeapon = function() {
  this.clearView(18, 17, 720, 60);

  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "This is where you";
  lines2 = "select your weapon.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);
}

TutorialView.prototype.showArmor = function() {
  this.clearView(18, 110, 720, 60);


  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "This is where you";
  lines2 = "select your armor.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);

}

TutorialView.prototype.showBehavior = function() {
  this.clearView(18, 205, 720, 60);


  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "This is where you";
  lines2 = "select your behavior.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);

}

TutorialView.prototype.showNext = function() {
  this.clearView(595, 368, 190, 40);


  this.writeTutorialNext();
  this.writeTutorialSkip();

  this.ctx.font = "italic 25pt Arial";
  lines1 = "When ready, send";
  lines2 = "your creature to battle.";
  this.ctx.fillText(getLines(this.ctx, lines1, 350), 20, 350);
  this.ctx.fillText(getLines(this.ctx, lines2, 350), 20, 380);

}

TutorialView.prototype.writeTutorialNext = function() {
  this.ctx.fillStyle = "rgba(255, 91, 1, 1)";

  this.ctx.font = "italic 18pt Arial";
  let lines = "Next";
  this.ctx.fillText(getLines(this.ctx, lines, 50), 225, 450);
}

TutorialView.prototype.writeTutorialSkip = function() {
  lines = "Skip Tutorial";
  this.ctx.fillText(getLines(this.ctx, lines, 200), 25, 450);
}

TutorialView.prototype.clearView = function(x, y, width, height) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  this.ctx.fillRect(0, 0, 800, 500)

  this.ctx.clearRect(x, y, width, height);
}

function getLines(ctx, text, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}

module.exports = TutorialView;