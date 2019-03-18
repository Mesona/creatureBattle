const Weapon = require('./weapon');

function Equipment(attackClose, attackMid, attackFar) {
  this.attackClose = attackClose;
  this.attackMid = attackMid;
  this.attackFar = attackFar;
}

module.exports = Equipment;