importScripts("../../config/globals.js");
importScripts(__basedir + "config/model-require.js");
importScripts(__basedir + "lib/require-2.0.6.js");

var workerSelf = self;

require(["object/Star", "object/PlayerShip"], function(Star, PlayerShip) {
    "use strict";
    var model = [], 
        i, 
        travelingPace = 1,
        traveledDistance = 0,
        updateIntervalMs = 17, 
        lastRun = new Date(), 
        player = new PlayerShip(), 
        playerProjectileLocked = false;
    
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


        workerSelf.postMessage({type : "log", data : topA + ", " + rightA + ", " + bottomA + ", " + leftA})
        workerSelf.postMessage({type : "log", data : topB + ", " + rightB + ", " + bottomB + ", " + leftB})

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
            serializedModel.push(model[i].serialize())
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
        
            model.push(player.fireProjectile());
        }
    };

    var handleMessage = {
        "keydown": function(type) {
            switch(type) {
                case "right":
                player.goRight();
                break;
                case "left":
                player.goLeft();
                break;
                case "up":
                player.goForward();
                break;
                case "down":
                player.goBackwards();
                break;
                case "fire":
                firePlayerProjectile();
                break;
            }
        },
        "keyup": function(type) {
            switch(type) {
                case "right":
                player.stopRight();
                break;
                case "left":
                player.stopLeft();
                break;
                case "up":
                player.stopForward();
                break;
                case "down":
                player.stopBackwards();
                case "fire":
                playerProjectileLocked = false;
                break;
            }            
        }
    };

    self.addEventListener("message", function(ev) {
        handleMessage[ev.data.type](ev.data.data);
    });
    
    /*
    for (i = 0; i < 100; i++) {
        model.push(new Star());
    }
    */

    model.push(player);
    
    run();

    self.postMessage({type:"start"});
    self.postMessage({type:"log", data: "ModelWorker initialization complete."});
});

