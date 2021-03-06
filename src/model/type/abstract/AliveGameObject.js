define([
  "type/abstract/MovingGameObject",
  "enum/AliveGameObjectStatus"
], function(MovingGameObject, AliveGameObjectStatus) {

  var AliveGameObject = function() {
    MovingGameObject.prototype.constructor.call(this);
    this._health = 100;
    this._currentHealth = this._health;
    this._status = AliveGameObjectStatus.ALIVE;
    this._shouldDestroy = false;
  };

  AliveGameObject.prototype = Object.create(MovingGameObject.prototype);
  AliveGameObject.prototype.constructor = AliveGameObject;

  AliveGameObject.prototype.shouldDestroy = function(shouldDestroy) {
    if (shouldDestroy !== undefined) {
      this._shouldDestroy = shouldDestroy;
    } else {
      return shouldDestroy || this._status === AliveGameObjectStatus.DEAD;
    }
  };

  AliveGameObject.prototype.getMaxHealth = function() {
    return this._health;
  };

  AliveGameObject.prototype.getCurrentHealth = function() {
    return this._currentHealth;
  };

  AliveGameObject.prototype.getStatus = function() {
    return this._status;
  };

  AliveGameObject.prototype.damage = function(amount) {
    this._health -= amount;
  };

  AliveGameObject.prototype.repair = function(amount) {
    this._health += amount;
  };

  AliveGameObject.prototype.update = function(multiplier) {
    //super call
    MovingGameObject.prototype.update.call(this, multiplier);

    if (this._health <= 0) {
      this._status = AliveGameObjectStatus.DEAD;
      this._health = 0;
    }
  };

  return AliveGameObject;
});