const Creature = require('./creature');

function Game() {
  let playerCreature = new Creature();
  let aiCreature = new Creature(pos = 500);
  let gameSpeed = 0

  Game.prototype.playerCreature = () => {
      return playerCreature;
    }
    
  Game.prototype.aiCreature= () => {
    return aiCreature;
  }

  Game.prototype.gameSpeed = () => {
    return gameSpeed;
  }

  Game.prototype.gameSpeedStep = () => {
    gameSpeed++;
  }
}

module.exports = Game;