define(["object/abstract/AliveGameObject", "object/PlayerProjectile", "object/abstract/Projectile"],
    function(AliveGameObject, PlayerProjectile, Projectile) {
        "use strict";
    
    var PlayerShip = function() {
        AliveGameObject.prototype.constructor.call(this);
        
        this._movingRight = false,
        this._movingLeft = false,
        this._movingForward = false,
        this._movingBackward = false;

        this.setSprite("ship_halfengine_forward");
        this.setSize({width: 39, height: 36});
        this.setPosition({x: __worldwidth / 2, y: __worldheight - 100});
    };
    
    PlayerShip.prototype = Object.create(AliveGameObject.prototype);
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
        
    PlayerShip.prototype.isMovingRight = function() {
        return this._movingRight;
    };
    
    PlayerShip.prototype.setMovingRight = function(movingRight) {
        this._movingRight = movingRight;
    };

    PlayerShip.prototype.isMovingLeft = function() {
        return this._movingLeft;
    };
    
    PlayerShip.prototype.setMovingLeft = function(movingLeft) {
        this._movingLeft = movingLeft;
    };
    
    PlayerShip.prototype.isMovingForward = function() {
        return this._movingForward;
    };
    
    PlayerShip.prototype.setMovingForward = function(movingForward) {
        this._movingForward = movingForward;
    };
    
    PlayerShip.prototype.isMovingBackward = function() {
        return this._movingBackward;
    };
    
    PlayerShip.prototype.setMovingBackward = function(movingBackward) {
        this._movingBackward = movingBackward;
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