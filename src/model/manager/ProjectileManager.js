/*
 * Manages all changes to projectiles.
 */
define([
  "type/PlayerProjectile",
  "manager/signalManager"
], function(PlayerProjectile, signalManager) {
  "use strict";

  var serialize = function(serializedModel) {
    serializedModel.push(this.serialize());
  };

  var cleanup = function(model) {
    if (this.shouldDestroy()) {
      model.splice(model.indexOf(this), 1);
      signalManager.modelUpdate.remove(this.update, this);
      signalManager.modelSerialization.remove(serialize, this);
      signalManager.modelCleanup.remove(cleanup, this);
    }
  };

  var ProjectileManager = function() {
    this.fireProjectile = function(gameObject, team) {
      var projectile = new PlayerProjectile(gameObject.getPosition().x, gameObject.getPosition().y - 39, 0, -600);

      signalManager.modelUpdate.add(projectile.update, projectile);
      signalManager.modelSerialization.add(serialize, projectile);
      signalManager.modelCleanup.add(cleanup, projectile);

      return projectile;
    };
  };

  return new ProjectileManager();
});