const Game = require("./game");
const BattleView = require('./battleView/battleView');
const PreparationView = require('./preparationView/preparationView');
const GameView = require('./gameView');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  let gameView = new GameView(game, ctx, canvas);
  // new BattleView(game, ctx, canvas, gameView).start();
  new PreparationView(game, ctx, canvas, gameView).start();
});