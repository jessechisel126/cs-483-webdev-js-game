/*globals
console, alert, deleteWidgetWithID,
ShipType, Speed, Direction, Color, TickInterval, Allegiance,
TimeDependent, RectangleCollider,
ScreenWidget, EnemyBullet, PlayerBullet,
widgets, enemyShips, playerShip
*/

/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: SpaceShip.js
 * 
 * Dependencies: ScreenWidget.js, Globals.js
 * 
 * Description: Defines ship classes for use in the game.
 */

function Ship(context, image, imageIndex, imageOffset, width, height, hitbox) {
    'use strict';
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
    
    // All ships are rectangular colliders.
    RectangleCollider.call(this, 0.75);
    
    // All ships will use the same image at different offsets.
    self.render = function () {
        self.context.drawImage(
            self.image,                          // Source image
            self.imageIndex * self.imageOffset,  // Sprite x offset
            0,                                   // Sprite y offset
            self.width,                          // Sprite width
            self.height,                         // Sprite height
            self.x,                              // Destination x
            self.y,                              // Destination y
            self.width,                          // Destination width (for scaling)
            self.height                          // Destination height (for scaling)
        );
    };
}

function PlayerShip(context, image, imageIndex, imageOffset, width, height) {
    'use strict';
    Ship.call(this, context, image, imageIndex, imageOffset, width, height);
    var self = this;
    self.allegiance = Allegiance.Player;
    self.health = 3;

    self.update = function () {
        var i;
        self.checkCollisions();
    };
    
    // Player ship responds to mouse movement.
    self.mouseMoved = function (evt) {
        self.x = evt.clientX - self.width / 2;
        self.y = evt.clientY - self.height / 2;
    };
}

function EnemyShip(context, image, imageIndex, imageOffset, width, height) {
    'use strict';
    Ship.call(this, context, image, imageIndex, imageOffset, width, height);
    var self = this;
    self.shotSpeed = TickInterval.Slow;
    self.allegiance = Allegiance.Enemy;
    self.health = 1;

    // Enemy ships fire a bullet periodically.
    TimeDependent.call(this, self.shotSpeed, function () {
        
        var enemyBullet = new EnemyBullet(self.context, self, Speed.Slow);
        
        // Subscribe player ship to collisions with the enemy bullet.
        playerShip.subscribeCollider(
            enemyBullet,
            // The player's ship will lose one health.
            function () {
                console.log("Player hit by enemy bullet: losing one health!");
                var self = this;
                self.health -= 1;
                self.unsubscribeCollider(enemyBullet);
            }.bind(playerShip)
        );

        // Subscribe enemy bullet to collisions with the player ship.
        enemyBullet.subscribeCollider(
            playerShip,
            // The bullet will kill itself.
            function () {
                console.log("Enemy bullet hit player: killing self!");
                var self = this;
                self.unsubscribeCollider(playerShip);
                deleteWidgetWithID(self.id);
            }.bind(enemyBullet)
        );
        
        widgets.push(enemyBullet);
    });
    
    // Tick on every update.
    self.update = function () {
        self.tick();
        self.checkCollisions();
    };
}
