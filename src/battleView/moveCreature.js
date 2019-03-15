function MoveCreatures(game, ctx, canvas, timeDelta) {
  let playerCreature = game.playerCreature();
  let aiCreature = game.aiCreature();

  let timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

  ctx.clearRect(0,100,canvas.width,canvas.height);  

  // Draw player creature
  ctx.fillStyle = "green"; 
  ctx.fillRect(playerCreature.pos,250,100,200); 

  // Agressive movement pattern, randomizes but favors moving towards enemy
  // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1) -(playerCreature.spd / 2) * timeScale))); 

  // If the player's creature is touching the opposing creature
  if (playerCreature.pos + 100 >= aiCreature.pos){
    playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -(playerCreature.spd * 2)) * timeScale); 
  } else {
    // Default movement pattern, randomizes completely and has no directional "preference"
    playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -playerCreature.spd) * timeScale); 
  }

  // Prevents the creature from "falling off" the screen
  playerCreature.pos = Math.min(Math.max(playerCreature.pos, 0));


  // Draw opposing creature
  ctx.fillStyle = "blue"; 
  ctx.fillRect(aiCreature.pos, 250, 100, 200);

  // If aiCreature is touching playerCreature
  if (aiCreature.pos <= playerCreature.pos + 110) {
    aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -(aiCreature.spd * 2)) * timeScale);
  } else {
    // Default movement pattern, completely random with no directional preference
    aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -aiCreature.spd) * timeScale);
  }
  
  // Prevents the creature from "falling off" the screen
  aiCreature.pos = Math.min(Math.max(aiCreature.pos, 0), 700);
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MoveCreatures;