/*
 * Manages all changes to projectiles. 
 */
define(["object/PlayerProjectile"], function(PlayerProjectile) {
    var ProjectileManager = function() {
        this.fireProjectile = function(team) {
            return new PlayerProjectile(this.getPosition().x, this.getPosition().y - 39, 0, -600)  
        };
    };
    
    return new ProjectileManager();
});