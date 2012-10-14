define(["underscore", "object/abstract/GameObject", "status/AliveGameObjectStatus"], 
    function(_, GameObject, AliveGameObjectStatus) {
    
    var AliveGameObject = function() {
        _.extend(this, new GameObject);

        var health = 100,
            currentHealth = health,
            status = AliveGameObjectStatus.ALIVE;

        this.getMaxHealth = function() {
            return health;
        };

        this.getCurrentHealth = function() {
            return currentHealth;
        };

        this.damage = function(amount) {
            health -= amount;
        };

        this.repair = function(amount) {
            health += amount;
        };

        this.update = function() {
            if (health <= 0) {
                status = AliveGameObjectStatus.DEAD;
                health = 0;
            }
        };
    };

    return AliveGameObject;
});