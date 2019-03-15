const BattleView = require("./battleView/battleView");
// const HealthBar = require('./battleView/healthBar');
// const DistanceBar = require('./battleView/distanceBar');

function Game(ctx, canvas) {
    this.creature = [];
    this.weapon = [];
    this.armor = [];
    this.ctx = ctx;

    // this.start();
    // this.draw(ctx);
    // new BattleView().drawHealth(ctx);
    new BattleView(ctx, canvas).start();
    let playerCreature = {pos: 0, currentHealth: 100, maxHealth: 100}
    let aiCreature = {pos: 700, currentHealth: 100, maxHealth: 100}
    localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
    localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
  }



  // Game.prototype.step = function step(delta) {

  // }
  
  // displayHealth() {
  //   // HealthBar.draw(this.ctx);
  //   // if (creature.owner === "AI") {
  //     this.ctx.strokeStyle = "red";
  //     this.ctx.strokeRect(530, 70, 250, 30);
  //     this.ctx.fillStyle = "red";
  //     this.ctx.fillRect(530, 70, (250 - (250 * this.percentHealth)), 30);
  //   // } else {
  //     pos = 20 + (250 - (250 * this.percentHealth));
  //     this.ctx.strokeStyle = "red";
  //     this.ctx.strokeRect(20, 70, 250, 30);
  //     this.ctx.fillStyle = "red";
  //     this.ctx.fillRect(pos, 70, (270 - pos), 30);
  //   // }
  // }

  // Game.prototype.draw = function draw() {
  // draw = function draw() {
  //    // player's creature's health
  //   ctx.strokeStyle = "red";
  //   ctx.strokeRect(20, 70, 250, 30);
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(20, 70, 250, 30);

  //   // opposing creature's health
  //   ctx.strokeStyle = "red";
  //   ctx.strokeRect(530, 70, 250, 30);
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(530, 70, 250, 30);

  // };

module.exports = Game;
  // window.requestAnimFrame = (function(){ 
  //   return  window.requestAnimationFrame       ||  
  //           window.webkitRequestAnimationFrame ||  
  //           window.mozRequestAnimationFrame    ||  
  //           window.oRequestAnimationFrame      ||  
  //           window.msRequestAnimationFrame     ||  
  //           function( callback ){ 
  //             window.setTimeout(callback, 1000 / 60); 
  //           }; 
  // })(); 

  // let x = 0; 
  // let y = 700;
  // function drawIt() { 
  //   window.requestAnimFrame(drawIt);
  //   // new BattleView(game, ctx).start();

  //   // player's creature's health
  //   ctx.strokeStyle = "red";
  //   ctx.strokeRect(20, 70, 250, 30);
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(20, 70, 250, 30);

  //   // opposing creature's health
  //   ctx.strokeStyle = "red";
  //   ctx.strokeRect(530, 70, 250, 30);
  //   ctx.fillStyle = "red";
  //   ctx.fillRect(530, 70, 250, 30);

    // GRADIENT HEALTH LEVELS
    // var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    // gradient.addColorStop("0", "#2A4D14");
    // gradient.addColorStop("0.3", "#3E505B");
    // gradient.addColorStop("0.8", "#8AB0AB");
    // gradient.addColorStop("0.8", "#F45B69");

    // // Fill with gradient
    // ctx.strokeStyle = gradient;
    // ctx.lineWidth = 5;
    // ctx.strokeRect(20, 20, 150, 100);
    // END GRADIENT HEALTH LEVELS


  //   ctx.clearRect(0,100,canvas.width,canvas.height);  
  //   ctx.fillStyle = "green"; 
  //   ctx.fillRect(x,250,100,200); 
  //   if (x + 100 >= y) {
  //     x+=Math.floor((Math.random() * 10) -10); 
  //   } else {
  //     x+=Math.floor((Math.random() * 10) -4); 
  //   }
  //   ctx.fillStyle = "blue"; 
  //   ctx.fillRect(y, 250, 100, 200);
  //   if (y <= x + 100) {
  //     y-=Math.floor((Math.random() * 10) -10);
  //   } else {
  //     y-=Math.floor((Math.random() * 10) -4);
  //   }
  // } 
  // window.requestAnimFrame(drawIt); 