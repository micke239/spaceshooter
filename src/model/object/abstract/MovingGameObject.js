define(["underscore","object/abstract/GameObject"], function(_, GameObject) {
    "use strict";
    
    var MovingGameObject = function() {
        _.extend(this, new GameObject());

        var velocity = {
            x: 0,
            y: 0,
            angle: 0
        },
        lastUpdate = new Date(),
        count = 0;

        this.getVelocity = function() {
            return velocity;
        };

        this.setVelocity = function(newVelocity) {
            velocity.x = newVelocity.x || velocity.x;
            velocity.y = newVelocity.y || velocity.y;
            velocity.angle = newVelocity.angle || velocity.angle;           
        };

        this.update = function(multiplier) {
            var position = this.getPosition();

            position.x += velocity.x * multiplier;
            position.y += velocity.y * multiplier;
            position.angle += velocity.angle * multiplier;
        };
    };

    return MovingGameObject;
});