define(["object/abstract/MovingGameObject"], function(MovingGameObject) {
    "use strict";
    
    
    var Star = function() { 
        MovingGameObject.prototype.constructor.call(this);
        this.setSprite("star");
        this.setVelocity({y: 50});
        this.setPosition({x: Math.random()*__worldwidth, y: -1*__worldheight + Math.random()*__worldheight*2});
    };
    
    Star.prototype = Object.create(MovingGameObject.prototype);
    Star.prototype.constructor = Star;
    
    Star.prototype.update = function(multiplier) {
        //super call
        MovingGameObject.prototype.update.call(this, multiplier);
        
        var position = this.getPosition();

        if (position.y - 5 > __worldheight) {
            position.y = 0 - Math.random()*__worldheight;
        }
    };
    
    return Star;
});