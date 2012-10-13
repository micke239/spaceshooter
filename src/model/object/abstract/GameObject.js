define(function() {
    "use strict";
    var GameObject = function() {
        var sprite = "default", 
        size = {
            width: 32,
            height: 32
        },
        position = {
            x: 0,
            y: 0,
            angle: 0
        };

        this.getPosition = function() {
            return position;
        };
    
        this.setPosition = function(newPosition) {
            position.x = newPosition.x || position.x;
            position.y = newPosition.y || position.y;
            position.angle = newPosition.angle || position.angle;   
        };

        this.getSprite = function() {
            return sprite;
        };

        this.setSprite = function(newSprite) {
            sprite = newSprite;
        };

        this.serialize = function() {
            return {
                x: position.x, 
                y: position.y, 
                angle: position.angle,
                width: size.width, 
                height: size.height,
                sprite: sprite
            };           
        };

        this.setSize = function(newSize) {
            size = newSize;
        };

        this.getSize = function() {
            return size;
        };
    };
    
    return GameObject;
}); 