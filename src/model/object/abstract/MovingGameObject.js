define(["object/abstract/GameObject"], function(GameObject) {
    "use strict";
    
    var MovingGameObject = function() {
        GameObject.prototype.constructor.call(this);
        this._velocity = {
            x: 0,
            y: 0,
            angle: 0
        };
        this._count = 0;
    };
    
    MovingGameObject.prototype = Object.create(GameObject.prototype);
    MovingGameObject.prototype.constructor = MovingGameObject;
    
    MovingGameObject.prototype.getVelocity = function() {
        return this._velocity;
    };

    MovingGameObject.prototype.setVelocity = function(velocity) {
        this._velocity.x = velocity.x !== undefined ? velocity.x : this._velocity.x;
        this._velocity.y = velocity.y !== undefined ? velocity.y : this._velocity.y;
        this._velocity.angle = velocity.angle !== undefined ? velocity.angle : this._velocity.angle;        
    };



    MovingGameObject.prototype.update = function(multiplier) {
        var position = this.getPosition();

        position.x += this._velocity.x * multiplier;
        position.y += this._velocity.y * multiplier;
        position.angle += this._velocity.angle * multiplier;
    };

    return MovingGameObject;
});