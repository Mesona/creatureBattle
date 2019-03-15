const Game = require("./game");
const BattleView = require('./battleView/battleView');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  let game = new Game();
  new BattleView(game, ctx, canvas).start();
});

// MISC TODO LIST
// Damage ranges (8-10, 7-13 eg. instead of static)
// Figure out how to slow everything down