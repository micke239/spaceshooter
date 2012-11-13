define(["underscore","object/abstract/Projectile"], function(_, Projectile) {
	var PlayerProjectile = function(x, y, xv, yv) {
		_.extend(this, new Projectile(500, 5));

		this.setSprite("player_laser");
		this.setSize({x: 39, y: 25});
		this.setVelocity({y: yv, x: xv});
		this.setPosition({x: x, y: y});
	};

	return PlayerProjectile;
});