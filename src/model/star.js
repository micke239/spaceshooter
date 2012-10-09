define(["underscore", "tile"], function(_, tile) {
    return function() {        
        var star = _.extend({}, tile());
        
        star.setSprite("star");
        star.setVelocity({y: 30});
        star.setPosition({x: Math.random()*468, y: Math.random()*468});
        
        return star;
    };
});
