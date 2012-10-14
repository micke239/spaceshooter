define(["underscore", "object/abstract/MovingGameObject"], function(_, MovingGameObject) {
    return function() { 
        var parent = new MovingGameObject;
        _.extend(this, parent);
        
        this.setSprite("star");
        this.setVelocity({y: 50});
        this.setPosition({x: Math.random()*__worldwidth, y: Math.random()*__worldheight});

        this.update = function(multiplier) {
            parent.update(multiplier);


            var position = this.getPosition();

            if (position.y - 5 > __worldheight) {
                position.y = 0 - Math.random()*10;
                position.x = Math.random() * __worldwidth;
            }
        };
    };
});