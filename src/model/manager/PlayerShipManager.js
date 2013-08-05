define(
  ["enum/PlayerSprite", "manager/signalManager", "type/PlayerShip"],
  function(PlayerSprite, signalManager, PlayerShip) {
    "use strict";

    var standardXV = 150;
    var standardYV = 50;

    signalManager.keydown.right.add(function(ship) {
      if (!ship.isMovingRight()) {
        ship.setMovingRight(true);

        ship.setVelocity({
          x: standardXV
        });
        ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.RIGHT);
      }
    });

    signalManager.keyup.right.add(function(ship) {
      if (ship.isMovingRight()) {
        ship.setMovingRight(false);

        if (ship.isMovingLeft()) {
          ship.setVelocity({
            x: standardXV * -1
          });
          ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.LEFT);
        } else {
          ship.setVelocity({
            x: 0
          });
          ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.NONE);
        }
      }
    });

    signalManager.keydown.left.add(function(ship) {
      if (!ship.isMovingLeft()) {
        ship.setMovingLeft(true);

        ship.setVelocity({
          x: -1 * standardXV
        });
        ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.LEFT);
      }
    });

    signalManager.keyup.left.add(function(ship) {
      if (ship.isMovingLeft()) {
        ship.setMovingLeft(false);

        if (ship.isMovingRight()) {
          ship.setVelocity({
            x: standardXV
          });
          ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.RIGHT);
        } else {
          ship.setVelocity({
            x: 0
          });
          ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.NONE);
        }
      }
    });

    signalManager.keydown.back.add(function(ship) {
      if (!ship.isMovingBackward()) {
        ship.setMovingBackward(true);

        ship.setVelocity({
          y: standardYV
        });
        ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.NO_ENGINE);
      }
    });

    signalManager.keyup.back.add(function(ship) {
      if (ship.isMovingBackward()) {
        ship.setMovingBackward(false);

        if (ship.isMovingForward()) {
          ship.setVelocity({
            y: -1 * standardYV
          });
          ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.FULL_ENGINE);
        } else {
          ship.setVelocity({
            y: 0
          });
          ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.HALF_ENGINE);
        }
      }
    });

    signalManager.keydown.forward.add(function(ship) {
      if (!ship.isMovingForward()) {
        ship.setMovingForward(true);

        ship.setVelocity({
          y: -1 * standardYV
        });
        ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.FULL_ENGINE);
      }
    });

    signalManager.keyup.forward.add(function(ship) {
      if (ship.isMovingForward()) {
        ship.setMovingForward(false);

        if (ship.isMovingBackward()) {
          ship.setVelocity({
            y: standardYV
          });
          ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.NO_ENGINE);
        } else {
          ship.setVelocity({
            y: 0
          });
          ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.HALF_ENGINE);
        }
      }
    });

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

    var PlayerShipManager = function() {
      this.createPlayerShip = function() {
        var playerShip = new PlayerShip();

        signalManager.modelUpdate.add(playerShip.update, playerShip);
        signalManager.modelSerialization.add(serialize, playerShip);
        signalManager.modelCleanup.add(cleanup, playerShip);

        return playerShip;
      };
    };

    return new PlayerShipManager();
  });