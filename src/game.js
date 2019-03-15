const BattleView = require("./battleView/battleView");

function Game(ctx, canvas) {
    this.creature = [];
    this.weapon = [];
    this.armor = [];
    this.ctx = ctx;

    new BattleView(ctx, canvas).start();
    let playerCreature = {pos: 0, currentHealth: 100, maxHealth: 100}
    let aiCreature = {pos: 700, currentHealth: 100, maxHealth: 100}
    localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
    localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
  }

module.exports = Game;