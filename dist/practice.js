// document.addEventListener("DOMContentLoaded", function(){
//   const canvas = document.getElementById("myCanvas");
//   canvas.width = 800;
//   canvas.height = 500;

//   const ctx = canvas.getContext("2d");
//   // ctx.fillStyle = 'purple';
//   // ctx.fillRect(0, 0, 800, 500);

//   // ctx.beginPath();
//   // ctx.arc(100, 100, 20, 0, 2*Math.PI, true);
//   // ctx.strokeStyle = "green";
//   // ctx.lineWidth = 5;
//   // ctx.stroke();
//   // ctx.fillStyle = "blue";
//   // ctx.fill();

//   // ctx.fillStyle = 'black';
//   // ctx.font = "italix "+196+"px Arial ";
//   // ctx.font = "italic "+96+"pt Arial ";
//   // ctx.fillText("this is text", 20, 250);


//   // ATTEMP AT GETTING A PLAYER SHIP
//   // player.width = 46;
//   // player.height = 46;

//   // let shipImage;

//   // loadResources();

//   // function loadResources() {
//   //   shipImage = new Image();
//   //   shipImage.src = "../docs/images/Hunter1.png";
//   // }

//   // ctx.fillStyle = "red";
//   //   ctx.fillRect(player.x, player.y, player.width, player.height);

//   // ctx.drawImage(ship_image,
//   //   25, 1, 23, 23, // src coords
//   //   player.x, player.y, player.width, player.height //dst coors
//   // );
//   // END ATTEMPT

//   // shim layer with setTimeout fallback 
//   window.requestAnimFrame = (function(){ 
//     return  window.requestAnimationFrame       ||  
//             window.webkitRequestAnimationFrame ||  
//             window.mozRequestAnimationFrame    ||  
//             window.oRequestAnimationFrame      ||  
//             window.msRequestAnimationFrame     ||  
//             function( callback ){ 
//               window.setTimeout(callback, 1000 / 60); 
//             }; 
//   })(); 

//   let x = 0; 
//   let y = 700;
//   function drawIt() { 
//     window.requestAnimFrame(drawIt);


//     // distance bar
//     ctx.clearRect(0, 0, 800, 50);
//     ctx.strokeStyle = "purple";
//     ctx.beginPath();
//     ctx.moveTo(20,20);
//     ctx.lineTo(780,20);
//     ctx.stroke();
  
//     // animate creature spot on distance bar
//     ctx.beginPath();
//     // ctx.arc(this.playerCreature.position + 30, 20, 10, 0, 2*Math.PI, true);
//     ctx.arc(x, 20, 10, 0, 2*Math.PI, true);
//     ctx.fill();
  
//     ctx.beginPath();
//     // ctx.arc(this.aiCreature.position - 30, 20, 10, 0, 2*Math.PI, true);
//     ctx.arc(y, 20, 10, 0, 2*Math.PI, true);
//     ctx.fill()

//     // player's creature's health
//     ctx.strokeStyle = "red";
//     ctx.strokeRect(20, 70, 250, 30);
//     ctx.fillStyle = "red";
//     ctx.fillRect(20, 70, 250, 30);

//     // opposing creature's health
//     ctx.strokeStyle = "red";
//     ctx.strokeRect(530, 70, 250, 30);
//     ctx.fillStyle = "red";
//     ctx.fillRect(530, 70, 250, 30);

//     // GRADIENT HEALTH LEVELS
//     // var gradient = ctx.createLinearGradient(0, 0, 170, 0);
//     // gradient.addColorStop("0", "#2A4D14");
//     // gradient.addColorStop("0.3", "#3E505B");
//     // gradient.addColorStop("0.8", "#8AB0AB");
//     // gradient.addColorStop("0.8", "#F45B69");

//     // // Fill with gradient
//     // ctx.strokeStyle = gradient;
//     // ctx.lineWidth = 5;
//     // ctx.strokeRect(20, 20, 150, 100);
//     // END GRADIENT HEALTH LEVELS


//     ctx.clearRect(0,100,canvas.width,canvas.height);  
//     ctx.fillStyle = "green"; 
//     ctx.fillRect(x,250,100,200); 
//     if (x + 100 >= y) {
//       x+=Math.floor((Math.random() * 10) -10); 
//     } else {
//       x+=Math.floor((Math.random() * 10) -4); 
//     }
//     ctx.fillStyle = "blue"; 
//     ctx.fillRect(y, 250, 100, 200);
//     if (y <= x + 100) {
//       y-=Math.floor((Math.random() * 10) -10);
//     } else {
//       y-=Math.floor((Math.random() * 10) -4);
//     }
//   } 
//   window.requestAnimFrame(drawIt); 

// });