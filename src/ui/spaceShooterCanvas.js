define([], function() {
	"use strict";
	var ctx, width, height, fps = 60, spritemap = new Image(), SPRITE_SIZE = 32;
	
	spritemap.src = __basedir + "img/spritemap.png";
	
	var init = function(canvas) {
		ctx = canvas.getContext("2d");
		width = canvas.width;
		height = canvas.height;
		return this;
	};
	
	var clear = function() {
		ctx.clearRect(0,0,width,height);
		return this;
	};
	
	var drawFPS = function() {
		ctx.font = 'Bold 14px Helvetica';
		ctx.fillStyle = "Red";
		ctx.fillText("FPS: " + fps, width - 60, 15);
		
		return this;
	};
	
	var setFPS = function(newFPS) {
		fps = newFPS;
		
		return this;
	};
	
	var drawBackground = function() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0, width, height);
		
		return this;
	};
	
	var drawTiles = function(tiles) {
		var i;
		for (i = 0; i < tiles.length; i++) {
			ctx.drawImage(spritemap, tiles[i].sprite*SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, tiles[i].x, tiles[i].y, SPRITE_SIZE, SPRITE_SIZE);
		}
	};

    return {
    	init: init,
    	drawFPS : drawFPS,
    	clear : clear,
    	setFPS : setFPS,
    	drawBackground: drawBackground,
    	drawTiles: drawTiles
    };
});
