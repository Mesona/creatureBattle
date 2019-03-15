const BattleView = require("./battleView/battleView");
const Creature = require('./creature');

function Game(ctx, canvas) {
    this.creature = [];
    this.weapon = [];
    this.armor = [];
    this.ctx = ctx;

    new BattleView(ctx, canvas).start();
    let playerCreature = new Creature();
    console.log("PLAYER CREATURE")
    console.log(playerCreature)
    let aiCreature = new Creature(pos = 700);
    localStorage.setItem('playerCreature', JSON.stringify(playerCreature));
    localStorage.setItem('aiCreature', JSON.stringify(aiCreature));
  }

module.exports = Game;