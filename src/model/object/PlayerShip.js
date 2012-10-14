define(["underscore","object/abstract/MovingGameObject", "object/abstract/AliveGameObject"],
    function(_, MovingGameObject, AliveGameObject) {
        "use strict";

    var PlayerShip = function() {
        var self = this;

        var movingGameObject = new MovingGameObject;
        var aliveGameObject = new AliveGameObject;

        _.extend(this, aliveGameObject);
        _.extend(this, movingGameObject);

        var ENGINE_POWER = 1,
            FULL_ENGINE = "fullengine",
            NO_ENGINE = "noengine",
            HALF_ENGINE = "halfengine",
            SHIP_TILT = 2,
            LEFT = "left",
            RIGHT = "right",
            NONE = "forward";

        var goRight = false,
            goLeft = false,
            goForward = false,
            goBackwards = false;


        this.setSprite("ship_halfengine_forward");
        this.setSize({width: 39, height: 36});
        this.setPosition({x: __worldwidth / 2, y: __worldheight - 100});

        var alterSprite = function(alterationType, value) {
            var spriteSplit = self.getSprite().split("_");
            
            spriteSplit[alterationType] = value;

            self.setSprite(spriteSplit.join("_"));
        };

        this.update = function(multiplier) {
            movingGameObject.update(multiplier);
            aliveGameObject.update();


            var position = this.getPosition();
            if (position.y > __worldheight) {
                position.y = __worldheight;
            } else if (position.y < 0) {
                position.y = 0;
            }

            if (position.x > __worldwidth) {
                position.x = __worldwidth;
            } else if (position.x < 0) {
                position.x = 0;
            }
        };

        this.goRight = function() {
            if (!goRight) {
                goRight = true;

                this.getVelocity().x = 150;
                alterSprite(SHIP_TILT, RIGHT);
            }
        };

        this.stopRight = function() {
            goRight = false;

            if (goLeft) {
                this.getVelocity().x = -150;
                alterSprite(SHIP_TILT, LEFT);
            } else {
                this.getVelocity().x = 0;
                alterSprite(SHIP_TILT, NONE);
            }
        };

        this.goLeft = function() {
            if (!goLeft) {
                goLeft = true;

                this.getVelocity().x = -150;
                alterSprite(SHIP_TILT, LEFT);
            }
        };

        this.stopLeft = function() {
            goLeft = false;

            if (goRight) {
                this.getVelocity().x = 150;
                alterSprite(SHIP_TILT, RIGHT);
            } else {
                this.getVelocity().x = 0;
                alterSprite(SHIP_TILT, NONE);
            }
        };

        this.goBackwards = function() {
            if (!goBackwards) {
                goBackwards = true;

                this.getVelocity().y = 50;
                alterSprite(ENGINE_POWER, NO_ENGINE);
            }
        };

        this.stopBackwards = function() {
            goBackwards = false;

            if (goForward) {
                this.getVelocity().y = -50;
                alterSprite(ENGINE_POWER, FULL_ENGINE);
            } else {
                this.getVelocity().y = 0;
                alterSprite(ENGINE_POWER, HALF_ENGINE);
            }
        };

        this.goForward = function() {
            if (!goForward) {
                goForward = true;

                this.getVelocity().y = -50;
                alterSprite(ENGINE_POWER, FULL_ENGINE);
            }
        };

        this.stopForward = function() {
            goForward = false;

            if (goBackwards) {
                this.getVelocity().y = 50;
                alterSprite(ENGINE_POWER, NO_ENGINE);
            } else {
                this.getVelocity().y = 0;
                alterSprite(ENGINE_POWER, HALF_ENGINE);
            }
        };
    }

    return PlayerShip;
});