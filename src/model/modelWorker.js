importScripts("../../config/globals.js");
importScripts(__basedir + "config/model-require.js");
importScripts(__basedir + "lib/require-2.0.6.js");

var workerSelf = self;

require(["manager/playerShipManager","manager/projectileManager", "object/abstract/AliveGameObject", "enum/AliveGameObjectStatus"], 
        function(playerShipManager, projectileManager, AliveGameObject, AliveGameObjectStatus) {
    
    "use strict";
    var model = [], 
        i, 
        travelingPace = 1,
        traveledDistance = 0,
        updateIntervalMs = 17, 
        lastRun = new Date(), 
        player = playerShipManager.createPlayerShip(), 
        enemy = playerShipManager.createPlayerShip(), 
        playerProjectileLocked = false;
    
    enemy.setPosition({angle : 180, y : 100});
    
    var detectCollitions = function() {
        var i, j;
        
        for (i = 0; i < model.length; i++) {
            for (j = i+1; j < model.length; j++) {
                if ("onCollition" in model[i] && "onCollition" in model[j]) {
                    if (collides(model[j], model[i])) {
                        workerSelf.postMessage({type:"log", data: "Time for collition."});
                        model[j].onCollition(model[i]);
                        model[i].onCollition(model[j]);
                    }
                }
            }
        };        
    };
    
    var collides = function(objectA, objectB) {
        //The sides of the rectangles
        var positionA = objectA.getPosition(),
            positionB = objectB.getPosition(),
            sizeA = objectA.getSize(),
            sizeB = objectB.getSize(),
            leftA = positionA.x, 
            leftB = positionB.x,
            rightA = positionA.x + sizeA.width, 
            rightB = positionB.x + sizeB.width,
            topA = positionA.y, 
            topB = positionB.y,
            bottomA = positionA.y + sizeA.height, 
            bottomB = positionB.y + sizeB.height;

        //If any of the sides from A are outside of B
        if( bottomA <= topB )
        {
            return false;
        }

        if( topA >= bottomB )
        {
            return false;
        }

        if( rightA <= leftB )
        {
            return false;
        }

        if( leftA >= rightB )
        {
            return false;
        }

        //If none of the sides from A are outside B
        return true;
    };
    
    var updateModel = function(multiplier, date) {
        var i;
        
        traveledDistance += travelingPace;
        
        for (i = 0; i < model.length; i++) {
            model[i].update(multiplier, date);

            if ("shouldDestroy" in model[i] && model[i].shouldDestroy()) {
                model.splice(i,1);
                i--;
            }
        };
    };
    
    var serializedModel = function() {
        var serializedModel = [], i;
        
        for(i = 0; i < model.length; i++) {
            var isAliveGameObject = model[i] instanceof AliveGameObject;
            if (!isAliveGameObject || model[i].getStatus() !== AliveGameObjectStatus.DEAD) {
                serializedModel.push(model[i].serialize())
            }
        }
        
        return serializedModel;
    };
    
    var run = function() {
        var start = new Date(),
            updateMultiplier = (start - lastRun) / 1000;
        lastRun = start;

        detectCollitions();   
        updateModel(updateMultiplier, new Date());
        
        self.postMessage({type:"model", data: {traveledDistance: traveledDistance, objects: serializedModel()}});
        
        setTimeout(run, updateIntervalMs - (new Date() - start));
    };

    var firePlayerProjectile = function() {
        if (!playerProjectileLocked) {
            playerProjectileLocked = true;
        
            model.push(projectileManager.fireProjectile(player));
        }
    };

    var handleMessage = {
        "keydown": function(type) {
            switch(type) {
                case "right":
                playerShipManager.startMovingRight(player);
                break;
                case "left":
                playerShipManager.startMovingLeft(player);
                break;
                case "up":
                playerShipManager.startMovingForward(player);
                break;
                case "down":
                playerShipManager.startMovingBackward(player);
                break;
                case "fire":
                firePlayerProjectile();
                break;
            }
        },
        "keyup": function(type) {
            switch(type) {
                case "right":
                playerShipManager.stopMovingRight(player);
                break;
                case "left":
                playerShipManager.stopMovingLeft(player);
                break;
                case "up":
                playerShipManager.stopMovingForward(player);
                break;
                case "down":
                playerShipManager.stopMovingBackward(player);
                break;
                case "fire":
                playerProjectileLocked = false;
                break;
            }            
        }
    };

    self.addEventListener("message", function(ev) {
        handleMessage[ev.data.type](ev.data.data);
    });

    model.push(player);
    model.push(enemy);
    
    run();

    self.postMessage({type:"start"});
    self.postMessage({type:"log", data: "ModelWorker initialization complete."});
});

