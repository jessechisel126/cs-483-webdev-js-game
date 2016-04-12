/*globals
ScreenWidget,
RectangleCollider,
Speed, Direction, Allegiance, BulletColor,
maxX, maxY, minY, deleteWidgetWithID
*/

/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: Bullet.js
 * 
 * Dependencies: ScreenWidget.js
 * 
 * Description: Defines a bullet class for use in the game.
 */

function Bullet(context) {
    'use strict';
    ScreenWidget.call(this, context);
    var self = this;
    self.width = 4;
    self.height = 12;
    
    RectangleCollider.call(this, 1);

    self.render = function () {
        // Rectangle Bullet
        self.context.fillStyle = self.color.outerColor;
        self.context.fillRect(self.x, self.y, self.width, self.height);
        self.context.fillStyle = self.color.innerColor;
        self.context.fillRect(self.x + 1, self.y + 1, self.width - 2, self.height - 2);
    };

    self.update = function () {
        self.y += self.speed * self.direction;
        self.checkBoundary();
        self.checkCollisions();
    };

    self.checkBoundary = function () {
        if (self.y > maxY || self.y < minY) {
            deleteWidgetWithID(self.id);
        }
    };
}

function EnemyBullet(context, enemyShip, speed) {
    'use strict';
    Bullet.call(this, context);
    var self = this;
    
    self.direction = Direction.Down;
    self.color = BulletColor.Enemy;
    
    self.x = enemyShip.x + enemyShip.width / 2;
    self.y = enemyShip.y + enemyShip.height;
    
    self.speed = speed;
}

function PlayerBullet(context, playerShip, speed) {
    'use strict';
    Bullet.call(this, context);
    var self = this;
    
    self.direction = Direction.Up;
    self.color = BulletColor.Player;

    self.x = playerShip.x + playerShip.width / 2;
    self.y = playerShip.y;
    
    self.speed = speed;
}
