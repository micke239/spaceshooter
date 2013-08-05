define(["object/abstract/MovingGameObject", "object/abstract/AliveGameObject"], function(MovingGameObject, AliveGameObject) {
	"use strict";

	var Projectile = function(ttl, power) {
	    MovingGameObject.prototype.constructor.call(this);
		this._deathTime = new Date().getTime() + ttl;
		this._destroy = false;
		this._dead = false;
		this._ttl = ttl;
		this._power = power;
 	};
 	
 	Projectile.prototype = Object.create(MovingGameObject.prototype);
 	Projectile.prototype.constructor = Projectile;
 	
 	Projectile.prototype.shouldDestroy = function(destroy) {
		if (destroy) {
			this._destroy = destroy;
		} else {
			return this._destroy;
		}
	};
	
	Projectile.prototype.update = function(multiplier, date) {
	    //super call
		MovingGameObject.prototype.update.call(this, multiplier);
		
		if (this._deathTime < new Date().getTime()) {
			this.shouldDestroy(true);
		}
	};

	Projectile.prototype.getPower = function() {
		return this._power;
	};

	Projectile.prototype.setPower = function(power) {
		this._power = power;
	};

	Projectile.prototype.getTTL = function() {
		return this._ttl;
	};

	Projectile.prototype.isDead = function() {
		return this._dead;
	};
	
	Projectile.prototype.onCollition = function(object) {
	    if (object instanceof AliveGameObject) {
	        workerSelf.postMessage({type:"log", data: "Collition check with AliveGameObject."});
	        this.shouldDestroy(true);
	    }
	};

 	return Projectile;
});