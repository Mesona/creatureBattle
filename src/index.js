// import _ from 'lodash';

// function component() {
//   // let element = document.createElement('div');
//   // element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   // return element;


  
// }

const Game = require("./game");
// const GameView = require('./gameView');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  new Game(ctx, canvas);
  // new GameView(game, ctx).start();


  // // shim layer with setTimeout fallback 
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
  // let y = 800;
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

  //   ctx.clearRect(0,100,canvas.width,canvas.height);  
  //   ctx.fillStyle = "green"; 
  //   ctx.fillRect(x,250,100,200); 
  //   if (x + 100 >= y) { // If the blocks are touching
  //     x+=Math.floor((Math.random() * 10) -10); 
  //   } else if (x + 210 >= 800) {
  //     x+=Math.floor((Math.random() * 10) -10); 
  //   } else {
  //     x+=Math.floor((Math.random() * 10) -4); 
  //   }
  //   ctx.fillStyle = "blue"; 
  //   ctx.fillRect(y, 250, 100, 200);
  //   if (y <= x + 100) { // If the blocks are touching
  //     y-=Math.floor((Math.random() * 10) -10);
  //   } else if (y - 210 <= 0) {
  //     y-=Math.floor((Math.random() * 10) -10);
  //   } else {
  //     y-=Math.floor((Math.random() * 10) -4);
  //   }
  //   // distance bar
  //   ctx.clearRect(0, 0, canvas.width, 50);
  //   ctx.strokeStyle = "purple";
  //   ctx.beginPath();
  //   ctx.moveTo(20,20);
  //   ctx.lineTo(780,20);
  //   ctx.stroke();
  
  //   // animate creature spot on distance bar
  //   ctx.beginPath();
  //   ctx.arc(x + 30, 20, 10, 0, 2*Math.PI, true);
  //   ctx.fill();
  
  //   ctx.beginPath();
  //   ctx.arc(y - 30, 20, 10, 0, 2*Math.PI, true);
  //   ctx.fill();
  // } 


  // window.requestAnimFrame(drawIt); 

});

// document.body.appendChild(component());
