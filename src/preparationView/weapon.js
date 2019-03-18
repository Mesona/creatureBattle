function Weapon(attackClose, attackMid, attackFar) {
  this.attackClose = attackClose;
  this.attackMid = attackMid;
  this.attackFar = attackFar;
}

Weapon.prototype.close = function() {
  return this.attackClose.damage;
}

Weapon.prototype.mid = function() {
  return this.attackMid.damage;
}

Weapon.prototype.far = function() {
  return this.attackFar.damage;
}

module.exports = Weapon;