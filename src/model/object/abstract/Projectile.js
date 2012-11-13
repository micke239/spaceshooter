define(["underscore", "object/abstract/MovingGameObject"], function(_, MovingGameObject) {
	"use strict";

	var Projectile = function(ttl, power) {
		var self = this,
			deathTime = new Date().getTime() + ttl,
			parent = new MovingGameObject,
			destroy = false;
			

		_.extend(self, parent);

		this.shouldDestroy = function(newDestroy) {
			if (newDestroy !== undefined) {
				destroy = newDestroy;
			} else {
				return destroy;
			}
		};
		this.update = function(multiplier) {
			parent.update(multiplier);
			
			if (deathTime < new Date().getTime()) {
				self.shouldDestroy(true);
			}
		};

		this.getPower = function() {
			return power;
		};

		this.setPower = function(newPower) {
			power = newPower;
		};

		this.getTTL = function() {
			return ttl;
		};

		this.getDead = function() {
			return dead;
		};
 	};

 	return Projectile;
});