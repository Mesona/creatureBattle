const Game = require("./game");
const TutorialView = require('./tutorialView');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  let game = new Game();
  new TutorialView(game, ctx, canvas);
});

// Creature sprites from:
// https://aekashics.itch.io/aekashics-librarium-librarium-static-batch-megapack

// Backgrounds from:
// https://edermunizz.itch.io/

// TODO: IMMEDIATE

// TODO: NICE TO HAVE
// Fix creatures to use hashmap, so custom assignments and stat management are easier
// More involved animation, by moving the animation process to the creature itself
// Damage numbers
// Pause movement and attack animation while attacking
// projectile animation for mid/far ranged attacks