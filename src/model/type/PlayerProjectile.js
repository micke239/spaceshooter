define(["type/abstract/Projectile"], function(Projectile) {

	var PlayerProjectile = function(x, y, xv, yv) {
		Projectile.prototype.constructor.call(this, 500, 5);
		this.setSprite("player_laser");
		this.setSize({
			x: 39,
			y: 25
		});
		this.setVelocity({
			y: yv,
			x: xv
		});
		this.setPosition({
			x: x,
			y: y
		});
	};

	PlayerProjectile.prototype = Object.create(Projectile.prototype);
	PlayerProjectile.prototype.constructor = PlayerProjectile;

	return PlayerProjectile;
});