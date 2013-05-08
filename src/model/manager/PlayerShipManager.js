define(["enum/PlayerSprite"], function(PlayerSprite) {
    
    var standardXV = 150,
        standardYV = 50;
   
    this.toggleRight = function(ship) {
        if (!ship.isMovingRight()) {
            ship.setMovingRight(true);

            ship.setVelocity({x : standardXV});
            ship.alterSprite(SHIP_TILT, RIGHT);
        } else {
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

    this.toggleLeft = function(ship) {
        if (!ship.isMovingLeft()) {
            ship.setMovingLeft(true);

            ship.setVelocity({ x : -1 * standardXV });
            ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.LEFT);
        } else {
            ship.setMovingLeft(false);

             if (ship.isMovingRight()) {
                 ship.setVelocity({ x : standardXV });
                 ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.RIGHT);
             } else {
                 ship.getVelocity( { x : 0 } );
                 ship.alterSprite(PlayerSprite.SHIP_TILT, PlayerSprite.NONE);
             }            
        }
    };

    this.toggleBackward = function(ship) {
        if (!ship.isMovingBackward()) {
            ship.setMovingBackward(true);

            ship.setVelocity({ y : standardYV });
            ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.NO_ENGINE);
        } else {
            ship.setMovingBackard(false);
            
            if (ship.isMovingForward()) {
                ship.setVelocity({ y : -1 * standardYV });
                ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.FULL_ENGINE);
            } else {
                ship.setVelocity({ y : 0 });
                ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.HALF_ENGINE);
            }            
        }
    };
    
    this.toggleForward = function(ship) {
        if (!ship.isMovingForward()) {
            ship.setMovingForward(true);
            
            ship.setVelocity({ y : -1 * standardYV });
            ship.alterSprite(PlayerSprite.ENGINE_POWER, PlayerSprite.FULL_ENGINE);
        } else {
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
});