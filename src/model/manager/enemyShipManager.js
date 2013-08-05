define(
  ["manager/signalManager", "manager/playerShipManager", "type/PlayerShip"],
  function(signalManager, playerShipManager, PlayerShip) {
    var enemyShip;

    var update = function(secondsSinceLastUpdate, curentTime) {
      var position = this.getPosition();
      // TODO: somekind of AI
      // var closestPlayer = playerShipManager.getClosestPlayer(position);

      if (position.y > __worldheight - 1) {
        this.shouldDestroy(true);
      } else if (position.x > __worldwidth - 1) {
        this.setVelocity({
          x: -80,
          angle: -0.4
        });
      } else if (position.x < 1) {
        this.setVelocity({
          x: 80,
          angle: 0.4
        });
      }


      this.update(secondsSinceLastUpdate, curentTime);
    };

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

    return {
      createEnemyShip: function() {
        var enemyShip = new PlayerShip();
        enemyShip.setVelocity({
          x: 80,
          y: 5,
          angle: 0.4
        });

        signalManager.modelUpdate.add(update, enemyShip);
        signalManager.modelSerialization.add(serialize, enemyShip);
        signalManager.modelCleanup.add(cleanup, enemyShip);

        return enemyShip;
      }
    };
  });