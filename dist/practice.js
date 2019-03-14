document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'purple';
  ctx.fillRect(0, 0, 800, 500);

  ctx.beginPath();
  ctx.arc(100, 100, 20, 0, 2*Math.PI, true);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "blue";
  ctx.fill();

  ctx.fillStyle = 'black';
  // ctx.font = "italix "+196+"px Arial ";
  ctx.font = "italic "+96+"pt Arial ";
  ctx.fillText("this is text", 20, 250);
});