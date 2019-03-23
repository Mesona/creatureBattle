const Game = require("./game");
const BattleView = require('./battleView/battleView');
const PreparationView = require('./preparationView/preparationView');
const GameView = require('./gameView');
const TutorialView = require('./tutorialView');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  let gameView = new GameView(game, ctx, canvas);
  // new BattleView(game, ctx, canvas, gameView).start();
  new TutorialView(game, ctx, canvas, gameView);
  // new PreparationView(game, ctx, canvas, gameView).start();
});

// Creature sprites from:
// https://aekashics.itch.io/aekashics-librarium-librarium-static-batch-megapack

// Backgrounds from:
// https://edermunizz.itch.io/

// TODO
// Fix creatures to use hashmap, so custom assignments and stat management are easier
// More involved animation, if possible
// Damage numbers
// Pause movement and attack animation while attacking
// projectile animation for mid/far ranged attacks