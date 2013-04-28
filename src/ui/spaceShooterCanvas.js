define(["../img/spritemap.js"], function(spritemapRaw) {
    "use strict";

    var ctx, width, height, fps = 60, spritemap = {};
    
    var init = function(canvas) {
        ctx = canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;
        
        var field;
        for(field in spritemapRaw) {
            var raw = spritemapRaw[field];
            var img = new Image();

            img.src = "data:" + raw.mimeType + ";base64," + raw.data;
            
            spritemap[field] = img;
        }
                
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
    
    var drawBackground = function(traveledDistance) {
        var pixelDiff = traveledDistance % 500;
        
        ctx.drawImage(spritemap["bg"], 0, pixelDiff);
        ctx.drawImage(spritemap["bg"], 0, pixelDiff - 500);
        
        return this;
    };
    
    var drawTiles = function(tiles) {
        var i, tile;
        for (i = 0; i < tiles.length; i++) {
            tile = tiles[i];
            ctx.drawImage(spritemap[tile.sprite], tile.x - tile.width/2, tile.y - tile.height/2);
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
