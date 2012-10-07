define(["util/logger", "ui/spaceShooterCanvas", "shim/requestAnimationFrame"], function(logger, spaceShooterCanvas) {
	"use strict";
	var ssCanvas, fps = 0, lastFPSSnapshot = new Date(), model = [];
	
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
		handleEvents();
		draw();
		
		requestAnimationFrame(loop);
	};
	
	var draw = function() {
		var i;
		
		ssCanvas.clear();
		ssCanvas.drawBackground();
		ssCanvas.drawTiles(model);
		ssCanvas.drawFPS();
	};
	
	var handleEvents = function() {
		
	};
	
	var handleMessage = {
		"model": function(updatedModel) {
			model = updatedModel;
		},
		"log": function(string) {
			logger.info(string);
		}
	};
	
	var init = function(gameWorker, canvas) {
		gameWorker.onmessage = function(ev) {
			handleMessage[ev.data.type](ev.data.data);
		};
		ssCanvas = spaceShooterCanvas.init(canvas);
		requestAnimationFrame(loop);
	};

    return {
    	init: init
    };
});
