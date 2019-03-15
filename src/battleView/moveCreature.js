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

// OLD RANDOMIZED MOVEMENT SYSTEM //
  // If the player's creature is touching the opposing creature
  if (playerCreature.pos + 100 >= aiCreature.pos){
    // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -(playerCreature.spd * 2)) * timeScale); 
    playerCreature.pos+=Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -(playerCreature.spd * 2)); 
  } else {
    // Default movement pattern, randomizes completely and has no directional "preference"
    // playerCreature.pos+=(Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -playerCreature.spd) * timeScale); 
    playerCreature.pos+=Math.floor((Math.random() * ((playerCreature.spd * 2) + 1)) -playerCreature.spd); 
  }

  // Prevents the creature from "falling off" the screen
  playerCreature.pos = Math.min(Math.max(playerCreature.pos, 0));

// END OLD RANDOMIZED MOVEMENT SYSTEM

// NEW MOVEMENT SYSTEM
  if (
    playerCreature.pos === playerCreature.nextPosition ||
    playerCreature.pos + 110 >= aiCreature.pos
    ) {
    playerCreature.nextPosition = playerCreature.pos + ((Math.random() < 0.5 ? -1 : 1) * (playerCreature.spd * 10));

    // Prevents the creature from "falling off" the screen
    playerCreature.nextPosition = Math.min(Math.max(playerCreature.nextPosition, 10), aiCreature.pos - 110);
  }

  if (playerCreature.pos < playerCreature.nextPosition) {
    playerCreature.pos += playerCreature.spd;
  } else {
    playerCreature.pos -= playerCreature.spd;
  }



// END NEW MOVEMENT SYSTEM

// Draw opposing creature
ctx.fillStyle = "blue"; 
ctx.fillRect(aiCreature.pos, 250, 100, 200);

// START OLD MOVEMENT SYSTEM
//   // If aiCreature is touching playerCreature
//   if (aiCreature.pos <= playerCreature.pos + 110) {
//     // aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -(aiCreature.spd * 2)) * timeScale);
//     aiCreature.pos-=Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -(aiCreature.spd * 2));
//   } else {
//     // Default movement pattern, completely random with no directional preference
//     // aiCreature.pos-=(Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -aiCreature.spd) * timeScale);
//     aiCreature.pos-=Math.floor((Math.random() * ((aiCreature.spd * 2) + 1)) -aiCreature.spd);
//   }
  
//   // Prevents the creature from "falling off" the screen
//   aiCreature.pos = Math.min(Math.max(aiCreature.pos, 0), 700);
// END OLD MOVEMENT SYSTEM

  // NEW MOVEMENT SYSTEM
  if (
    aiCreature.pos === aiCreature.nextPosition ||
    aiCreature.pos <= playerCreature.pos + 110
    ) {
    aiCreature.nextPosition = aiCreature.pos + ((Math.random() < 0.5 ? -1 : 1) * (aiCreature.spd * 10));

    // Prevents the creature from "falling off" the screen
    aiCreature.nextPosition = Math.min(Math.max(aiCreature.nextPosition, playerCreature.pos + 110), 690);
  }

  if (aiCreature.pos < aiCreature.nextPosition) {
    aiCreature.pos += aiCreature.spd;
  } else {
    aiCreature.pos -= aiCreature.spd;
  }

}



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MoveCreatures;