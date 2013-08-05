importScripts("../../config/globals.js");
importScripts(__basedir + "config/model-require.js");
importScripts(__basedir + "lib/require-2.0.6.js");

var workerSelf = self;

require([
  "manager/playerShipManager",
  "manager/projectileManager",
  "manager/collitionManager",
  "manager/signalManager",
  "manager/enemyShipManager",
  "type/abstract/AliveGameObject",
  "enum/AliveGameObjectStatus"
], function(
  playerShipManager,
  projectileManager,
  collitionManager,
  signalManager,
  enemyShipManager,
  AliveGameObject,
  AliveGameObjectStatus) {

  "use strict";

  var model = [];
  var i;
  var travelingPace = 1;
  var traveledDistance = 0;
  var updateIntervalMs = 17;
  var lastRun = new Date();
  var player = playerShipManager.createPlayerShip();
  var enemy = enemyShipManager.createEnemyShip();
  var playerProjectileLocked = false;

  enemy.setPosition({
    angle: 180,
    y: 100
  });

  //update the traveled distance each update
  signalManager.modelUpdate.add(function() {
    traveledDistance += travelingPace;
  });

  var run = function() {
    var start = new Date();
    var secondsSinceLastRun = (start - lastRun) / 1000;
    lastRun = start;

    signalManager.modelUpdate.dispatch(secondsSinceLastRun, start);
    collitionManager.detectCollitions(model);
    signalManager.modelCleanup.dispatch(model);

    var serializedModel = [];

    signalManager.modelSerialization.dispatch(serializedModel);

    self.postMessage({
      type: "model",
      data: {
        traveledDistance: traveledDistance,
        objects: serializedModel
      }
    });

    setTimeout(run, updateIntervalMs - (new Date() - start));
  };

  var firePlayerProjectile = function() {
    if (!playerProjectileLocked) {
      playerProjectileLocked = true;

      model.push(projectileManager.fireProjectile(player));
    }
  };

  signalManager.keydown.fire.add(function() {
    firePlayerProjectile();
  });

  signalManager.keyup.fire.add(function() {
    playerProjectileLocked = false;
  });

  self.addEventListener("message", function(ev) {
    signalManager[ev.data.type][ev.data.data].dispatch(player);
  });

  model.push(player);
  model.push(enemy);

  run();

  self.postMessage({
    type: "start"
  });
  self.postMessage({
    type: "log",
    data: "ModelWorker initialization complete."
  });
});