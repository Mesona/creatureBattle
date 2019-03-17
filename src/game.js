const Creature = require('./creature');

function Game() {
  let playerCreature = new Creature();
  let aiCreature = new Creature(pos = 500);
  let gameSpeed = 0;
  let gameScreen = "battle";

  Game.prototype.playerCreature = () => {
    return playerCreature;
  }
    
  Game.prototype.aiCreature= () => {
    return aiCreature;
  }

  Game.prototype.resetGameSpeed = () => {
    this.gameSpeed = 0;
  }

  Game.prototype.getGameSpeed = () => {
    return gameSpeed;
  }

  Game.prototype.gameSpeedStep = () => {
    gameSpeed++;
  }

  Game.prototype.screen = () => {
    return gameScreen;
  }

  Game.prototype.setScreen = (newScreen) => {
    gameScreen = newScreen;
  }

}

module.exports = Game;