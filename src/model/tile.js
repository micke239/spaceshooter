define(function() {
    "use strict";
    var tile = function() {
	    var sprite = 0, 
	    position = {
	        x: 0,
	        y: 0,
	        angle: 0
	    }, 
		velocity = {
			x: 0,
			y: 0,
			angle: 0
		},
		lastUpdate = new Date();
	
	    return {
	    	getPosition: function() {
	    		return position;
	    	},
	    	setPosition: function(newPosition) {
	    		position.x = newPosition.x || position.x;
	    		position.y = newPosition.y || position.y;
	    		position.angle = newPosition.angle || position.angle;	
	    	},
	    	getVelocity: function() {
				return velocity;
	    	},
	    	setVelocity: function(newVelocity) {
	    		velocity.x = newVelocity.x || velocity.x;
	    		velocity.y = newVelocity.y || velocity.y;
	    		velocity.angle = newVelocity.angle || velocity.angle;    		
	    	},
	    	getSprite: function() {
	    		return sprite;
	    	},
	    	setSprite: function(newSprite) {
	    		sprite = newSprite;
	    	},
	    	serialize: function() {
	    		return {x: position.x, y: position.y, angle: position.angle, sprite: sprite};
	    	},
	    	update: function(multiplier) {
				position.x += velocity.x * multiplier;
				position.y += velocity.y * multiplier;
				position.angle += velocity.angle * multiplier;
			}
	    };
	};
	
    return tile;
}); 