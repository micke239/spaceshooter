define(["util/logger", "ui/spaceShooterCanvas", "shim/requestAnimationFrame"], function(logger, spaceShooterCanvas) {
    "use strict";
    var ssCanvas, fps = 0, lastFPSSnapshot = new Date(), model = [], gameWorker;
    
    var updateFPS = function(timestamp) {
        if (new Date() - lastFPSSnapshot > 1000) {
            ssCanvas.setFPS(fps);
            fps = 0;
            lastFPSSnapshot.setTime(lastFPSSnapshot.getTime() + 1000);
        }
        fps++;
    };
    
    var loop = function() {     
        updateFPS();
        draw();
        requestAnimationFrame(loop);
    };
    
    var draw = function() {
        ssCanvas.clear();
        ssCanvas.drawBackground(model.traveledDistance);
        ssCanvas.drawTiles(model.objects);
        ssCanvas.drawFPS();
    };

    window.addEventListener("keydown", function(ev) {
        if (ev.keyCode === 39) {
            gameWorker.postMessage({type: "keydown", data: "right"});
            ev.preventDefault();
        } else if (ev.keyCode === 38) {
            gameWorker.postMessage({type: "keydown", data: "forward"});
            ev.preventDefault();
        } else if (ev.keyCode === 37) {
            gameWorker.postMessage({type: "keydown", data: "left"});
            ev.preventDefault();
        } else if (ev.keyCode === 40) {
            gameWorker.postMessage({type: "keydown", data: "back"});
            ev.preventDefault();
        } else if (ev.keyCode === 32) {
            gameWorker.postMessage({type: "keydown", data: "fire"});
            ev.preventDefault();
        }
    });
 
    window.addEventListener("keyup", function(ev) {
        if (ev.keyCode === 39) {
            gameWorker.postMessage({type: "keyup", data: "right"});
            ev.preventDefault();
        } else if (ev.keyCode === 38) {
            gameWorker.postMessage({type: "keyup", data: "forward"});
            ev.preventDefault();
        } else if (ev.keyCode === 37) {
            gameWorker.postMessage({type: "keyup", data: "left"});
            ev.preventDefault();
        } else if (ev.keyCode === 40) {
            gameWorker.postMessage({type: "keyup", data: "back"});
            ev.preventDefault();
        } else if (ev.keyCode === 32) {
            gameWorker.postMessage({type: "keyup", data: "fire"});
            ev.preventDefault();
        }
    });

    var handleMessage = {
        "model": function(updatedModel) {
            model = updatedModel;
        },
        "log": function(string) {
            logger.info(string);
        },
        "start": function() {
            requestAnimationFrame(loop);
        },
        "logObject": function(obj) {
            console.log(obj);
        }
    };
    
    var init = function(pGameWorker, canvas) {
        gameWorker = pGameWorker;
        gameWorker.onmessage = function(ev) {
            handleMessage[ev.data.type](ev.data.data);
        };
        ssCanvas = spaceShooterCanvas.init(canvas);
    };

    return {
        init: init
    };
});
