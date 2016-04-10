/*globals
console, alert,
ShipType, Speed, Direction, Color, TickInterval, Allegiance,
TimeDependent, RectangleCollider,
ScreenWidget, Bullet,
enemyShips, playerShip
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
    self.health = 3;
    
    // All ships are rectangular colliders.
    RectangleCollider.call(this, 0.5);
    
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

// POSSIBLY FIX: Enemy ships need access to the widgets to fire bullets.
function EnemyShip(context, image, imageIndex, imageOffset, width, height, widgets) {
    'use strict';
    Ship.call(this, context, image, imageIndex, imageOffset, width, height);
    var self = this;
    self.widgets = widgets;
    self.shotSpeed = TickInterval.Medium;
    self.allegiance = Allegiance.Enemy;
    
    // Enemy ships fire a bullet periodically.
    TimeDependent.call(this, self.shotSpeed, function () {
        var newBullet = Bullet.makeBullet(self.context, self, Speed.Medium);
        
//        // Subscribe player ship to the new bullet for collision...
//        playerShip.subscribeCollider(newBullet, function () {
//            // ...the player's ship will lose one health...
//            self.health -= 1;
//        }.bind(playerShip), function () {
//            // ...the bullet will do nothing.
//        }.bind(newBullet));
        
        self.widgets.push(newBullet);
    });
    
    // Tick on every update.
    self.update = function () {
        self.tick();
        self.checkCollisions();
    };
}
