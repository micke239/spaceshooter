define(function() {
    "use strict";
    var GameObject = function() {
        this._sprite = "default";
        this._size = {
            width: 32,
            height: 32
        };
        this._position = {
            x: 0,
            y: 0,
            angle: 0
        };
    };
    
    GameObject.prototype.getPosition = function() {
        return this._position;
    };

    GameObject.prototype.setPosition = function(position) {
        this._position.x = position.x || this._position.x;
        this._position.y = position.y || this._position.y;
        this._position.angle = position.angle || this._position.angle;   
    };

    GameObject.prototype.getSprite = function() {
        return this._sprite;
    };

    GameObject.prototype.setSprite = function(sprite) {
        this._sprite = sprite;
    };

    GameObject.prototype.serialize = function() {
        return {
            x: this._position.x, 
            y: this._position.y, 
            angle: this._position.angle,
            width: this._size.width, 
            height: this._size.height,
            sprite: this._sprite
        };           
    };

    GameObject.prototype.setSize = function(size) {
        this._size.width = size.width || this._size.width;
        this._size.height = size.height || this._size.height;
    };

    GameObject.prototype.getSize = function() {
        return this._size;
    };
    
    return GameObject;
}); 