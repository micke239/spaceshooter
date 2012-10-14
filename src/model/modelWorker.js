importScripts("../../config/globals.js");
importScripts(__basedir + "config/model-require.js");
importScripts(__basedir + "lib/require-2.0.6.js");

require(["object/Star", "object/PlayerShip"], function(Star, PlayerShip) {
    
    var model = [], i, updateIntervalMs = 17, lastRun = new Date(), player = new PlayerShip();
    
    var updateModel = function(multiplier) {
        var i;
        
        for (i = 0; i < model.length; i++) {
            model[i].update(multiplier);
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

        updateModel(updateMultiplier);
        
        self.postMessage({type:"model", data: serializedModel()});
        
        setTimeout(run, updateIntervalMs - (new Date() - start));
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
                break;
            }            
        }
    };

    self.addEventListener("message", function(ev) {
        handleMessage[ev.data.type](ev.data.data);
    });
    
    for (i = 0; i < 100; i++) {
        model.push(new Star());
    }

    model.push(player);
    
    run();

    self.postMessage({type:"start"});
    self.postMessage({type:"log", data: "ModelWorker initialization complete."});
});

