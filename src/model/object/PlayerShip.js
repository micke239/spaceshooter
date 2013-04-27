define(["object/abstract/AliveGameObject", "object/PlayerProjectile", "object/abstract/Projectile"],
    function(AliveGameObject, PlayerProjectile, Projectile) {
        "use strict";
        
    var ENGINE_POWER = 1,
        FULL_ENGINE = "fullengine",
        NO_ENGINE = "noengine",
        HALF_ENGINE = "halfengine",
        SHIP_TILT = 2,
        LEFT = "left",
        RIGHT = "right",
        NONE = "forward";
    
    var PlayerShip = function() {
        AliveGameObject.prototype.constructor.call(this);
        
        this._goRight = false,
        this._goLeft = false,
        this._goForward = false,
        this._goBackwards = false;

        this.setSprite("ship_halfengine_forward");
        this.setSize({width: 39, height: 36});
        this.setPosition({x: __worldwidth / 2, y: __worldheight - 100});
    };
    
    PlayerShip.prototype = new AliveGameObject();
    PlayerShip.prototype.constructor = PlayerShip;
    
    PlayerShip.prototype.alterSprite = function(alterationType, value) {
        var spriteSplit = this.getSprite().split("_");

        spriteSplit[alterationType] = value;

        this.setSprite(spriteSplit.join("_"));
    };

    PlayerShip.prototype.update = function(multiplier) {
        //super call
        AliveGameObject.prototype.update.call(this, multiplier);

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

    PlayerShip.prototype.goRight = function() {
        if (!this._goRight) {
            this._goRight = true;

            this.getVelocity().x = 150;
            this.alterSprite(SHIP_TILT, RIGHT);
        }
    };

    PlayerShip.prototype.stopRight = function() {
        this._goRight = false;

        if (this._goLeft) {
            this.getVelocity().x = -150;
            this.alterSprite(SHIP_TILT, LEFT);
        } else {
            this.getVelocity().x = 0;
            this.alterSprite(SHIP_TILT, NONE);
        }
    };

    PlayerShip.prototype.goLeft = function() {
        if (!this._goLeft) {
            this._goLeft = true;

            this.getVelocity().x = -150;
            this.alterSprite(SHIP_TILT, LEFT);
        }
    };

    PlayerShip.prototype.stopLeft = function() {
       this._goLeft = false;

        if (this._goRight) {
            this.getVelocity().x = 150;
            this.alterSprite(SHIP_TILT, RIGHT);
        } else {
            this.getVelocity().x = 0;
            this.alterSprite(SHIP_TILT, NONE);
        }
    };

    PlayerShip.prototype.goBackwards = function() {
        if (!this._goBackwards) {
            this._goBackwards = true;

            this.getVelocity().y = 50;
            this.alterSprite(ENGINE_POWER, NO_ENGINE);
        }
    };

    PlayerShip.prototype.stopBackwards = function() {
        this._goBackwards = false;

        if (this._goForward) {
            this.getVelocity().y = -50;
            this.alterSprite(ENGINE_POWER, FULL_ENGINE);
        } else {
            this.getVelocity().y = 0;
            this.alterSprite(ENGINE_POWER, HALF_ENGINE);
        }
    };

    PlayerShip.prototype.goForward = function() {
        if (!this._goForward) {
            this._goForward = true;

            this.getVelocity().y = -50;
            this.alterSprite(ENGINE_POWER, FULL_ENGINE);
        }
    };

    PlayerShip.prototype.stopForward = function() {
        this._goForward = false;

        if (this._goBackwards) {
            this.getVelocity().y = 50;
            this.alterSprite(ENGINE_POWER, NO_ENGINE);
        } else {
            this.getVelocity().y = 0;
            this.alterSprite(ENGINE_POWER, HALF_ENGINE);
        }
    };
    
    PlayerShip.prototype.fireProjectile = function() {
        return new PlayerProjectile(this.getPosition().x, this.getPosition().y - 20, 0, -600)  
    };
    
    PlayerShip.prototype.onCollition = function(object) {
        workerSelf.postMessage({type:"logObject", data: typeof object});
        if (object instanceof Projectile) {
            this.damage(object.getPower());
            workerSelf.postMessage({type:"log", data: "Collition with projectile."});
        } else if (object instanceof AliveGameObject) {
            this.damage(this.getMaxHealth());
            workerSelf.postMessage({type:"log", data: "Collition with alive game obejct."});
        }
    };

    return PlayerShip;
});