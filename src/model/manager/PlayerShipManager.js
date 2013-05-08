define(["enum/PlayerSprite"], function(PlayerSprite) {
    
    var PlayerShipManager = function() {

        var standardXV = 150,
            standardYV = 50;
       
        this.startMovingRight = function(ship) {
            if (!ship.isMovingRight()) {
                ship.setMovingRight(true);

                ship.setVelocity({x : standardXV});
                ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.RIGHT);
            }
        };   

        this.stopMovingRight = function(ship) {
            if (ship.isMovingRight()) {
                ship.setMovingRight(false);
                
                if (ship.isMovingLeft()) {
                    ship.setVelocity({ x : standardXV * -1 });
                    ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.LEFT);
                } else {
                    ship.setVelocity({ x : 0 });
                    ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.NONE);
                }            
            }
        };

        this.startMovingLeft = function(ship) {
            if (!ship.isMovingLeft()) {
                ship.setMovingLeft(true);

                ship.setVelocity({ x : -1 * standardXV });
                ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.LEFT);
            } 
        };

        this.stopMovingLeft = function(ship) {
            if (ship.isMovingLeft()) {
                ship.setMovingLeft(false);

                 if (ship.isMovingRight()) {
                     ship.setVelocity({ x : standardXV });
                     ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.RIGHT);
                 } else {
                     ship.setVelocity( { x : 0 } );
                     ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.NONE);
                 }            
            }
        };

        this.startMovingBackward = function(ship) {
            if (!ship.isMovingBackward()) {
                ship.setMovingBackward(true);

                ship.setVelocity({ y : standardYV });
                ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.NO_ENGINE);
            }
        };

        this.stopMovingBackward = function(ship) {
            if (ship.isMovingBackward()) {
                ship.setMovingBackward(false);
                
                if (ship.isMovingForward()) {
                    ship.setVelocity({ y : -1 * standardYV });
                    ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.FULL_ENGINE);
                } else {
                    ship.setVelocity({ y : 0 });
                    ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.HALF_ENGINE);
                }            
            }
        };
        
        this.startMovingForward = function(ship) {
            if (!ship.isMovingForward()) {
                ship.setMovingForward(true);
                
                ship.setVelocity({ y : -1 * standardYV });
                ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.FULL_ENGINE);
            }
        }; 

        this.stopMovingForward = function(ship) {
            if (ship.isMovingForward()) {
                ship.setMovingForward(false);

                if (ship.isMovingBackward()) {
                    ship.setVelocity({ y : standardYV });
                    ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.NO_ENGINE);
                } else {
                    ship.setVelocity({ y : 0});
                    ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.HALF_ENGINE);
                }            
            }
        };
    };

    return new PlayerShipManager();
});