const PreparationView = require('./preparationView/preparationView');

function TutorialView(game, ctx, canvas, gameView) {
  this.game = game;
  this.ctx = ctx;
  this.canvas = canvas;
  this.gameVeiw = gameView;
  this.offsetLeft = this.canvas.offsetLeft;
  this.offsetTop = document.getElementById('height-test').offsetTop; 

  this.handleClick = this.handleClick.bind(this);
  this.handleCursor = this.handleCursor.bind(this);
  this.handleNext = this.handleNext.bind(this);
  this.handleSkip = this.handleSkip.bind(this);

  document.addEventListener('click', this.handleClick, false);
  document.addEventListener('mousemove', this.handleCursor, false);
  this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  this.ctx.fillRect(0, 0, 800, 500)

  this.ctx.clearRect(340, 280, 220, 200);
  // ctx.fillStyle = "rgba(0, 0, 0, 0.8";
  // ctx.fillRect(25, 425, 145, 45);
  ctx.fillStyle = "rgba(255, 91, 1, 1)";

  ctx.font = "italic 18pt Arial";
  let lines = "Next";
  ctx.fillText(getLines(ctx, lines, 50), 225, 450);

  lines = "Skip Tutorial";
  ctx.fillText(getLines(ctx, lines, 200), 25, 450);

  ctx.font = "italic 25pt Arial";
  lines = "This is your creature"
  ctx.fillText(getLines(ctx, lines, 350), 20, 350);


}

TutorialView.prototype.handleClick = function(e) {
  // let clickX = e.pageX - this.canvas.offsetLeft;
  // let clickY = e.pageY - (document.getElementById('height-test').offsetTop);
  let clickX = e.pageX - this.offsetLeft;
  let clickY = e.pageY - this.offsetTop;
  console.log(`${clickX}, ${clickY}`)

  // If the user clicks the Y axis of the buttons
  if (clickY > 424 && clickY < 471) {
    // If the user clicks the Skip button
    if (clickX > 24 && clickX < 171) {
      this.handleSkip();      
    } else if (clickX > 224 && clickX < 296) {
      console.log('correctNext')
    }
  }

  // call handleNext
  // call handleSkip
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

  // document.removeEventListener("click", this.handleClick);
}

TutorialView.prototype.handleSkip = function(e) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  document.removeEventListener("click", this.handleClick);
  document.removeEventListener("mousemove", this.handleCursor);
  // new PreparationView(this.game, this.ctx, this.canvas, this.gameView).start();
  new PreparationView(this.game, this.ctx, this.canvas, this.gameView).start(); 
};

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