/*globals
ScreenWidget,
RectangleCollider,
Speed, Direction, Allegiance, BulletColor,
maxX, maxY
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
        if (self.y > maxY) {
            self.speed = Speed.Stopped;
        }
    };
}

Bullet.makeBullet = function (context, ship, speed) {
    'use strict';
    var newBullet = new Bullet(context);
    
    if (ship.allegiance === Allegiance.Enemy) {
        newBullet.direction = Direction.Down;
        newBullet.color = BulletColor.Enemy;
    } else if (ship.allegiance === Allegiance.Player) {
        newBullet.direction = Direction.Up;
        newBullet.color = BulletColor.Player;
    }
    
    newBullet.x = ship.x + ship.width / 2;
    if (newBullet.direction === Direction.Down) {
        newBullet.y = ship.y + ship.height;
    } else if (newBullet.direction === Direction.Up) {
        newBullet.y = ship.y;
    }
    
    newBullet.speed = speed;
    return newBullet;
};