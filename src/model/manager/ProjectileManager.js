/*
 * Manages all changes to projectiles. 
 */
define(["object/PlayerProjectile"], function(PlayerProjectile) {
    var ProjectileManager = function() {
        this.fireProjectile = function(gameObject, team) {
            return new PlayerProjectile(gameObject.getPosition().x, gameObject.getPosition().y - 39, 0, -600)  
        };
    };
    
    return new ProjectileManager();
});