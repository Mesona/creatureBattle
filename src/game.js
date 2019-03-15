const Creature = require('./creature');

function Game() {
  let playerCreature = new Creature();
  let aiCreature = new Creature(pos = 500);

  localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
  localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
  
  Game.prototype.playerCreature = () => {
      return playerCreature;
    }
    
  Game.prototype.aiCreature= () => {
    return aiCreature;
  }
}

module.exports = Game;