
function MoveCreatures(ctx, canvas, timeDelta) {
  let playerCreature = JSON.parse(localStorage.getItem('playerCreature'));
  let aiCreature = JSON.parse(localStorage.getItem('aiCreature'));
  let timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  // Draw player creature
  ctx.fillStyle = "green"; 
  ctx.fillRect(playerCreature.pos,250,100,200); 
  if (playerCreature.pos + 100 >= aiCreature.pos){
    playerCreature.pos+=(Math.floor((Math.random() * 10) -10) * timeScale); 
  } else {
    playerCreature.pos+=(Math.floor((Math.random() * 10) -4) * timeScale); 
  }

  // Draw opposing creature
  ctx.fillStyle = "blue"; 
  ctx.fillRect(aiCreature.pos, 250, 100, 200);
  if (aiCreature.pos <= playerCreature.pos + 100) {
    aiCreature.pos-=(Math.floor((Math.random() * 10) -10) * timeScale);
  } else {
    aiCreature.pos-=(Math.floor((Math.random() * 10) -4) * timeScale);
  }

  // Save new creature state
  localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
  localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MoveCreatures;