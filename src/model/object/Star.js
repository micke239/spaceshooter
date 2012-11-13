define(["underscore", "object/abstract/MovingGameObject"], function(_, MovingGameObject) {
    return function() { 
        var parent = new MovingGameObject;
        _.extend(this, parent);
        
        this.setSprite("star");
        this.setVelocity({y: 50});
        this.setPosition({x: Math.random()*__worldwidth, y: -1*__worldheight + Math.random()*__worldheight*2});

        this.update = function(multiplier) {
            parent.update(multiplier);


            var position = this.getPosition();

            if (position.y - 5 > __worldheight) {
                position.y = 0 - Math.random()*__worldheight;
            }
        };
    };
});