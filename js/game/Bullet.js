/*globals ScreenWidget, Speed, Direction, maxX, maxY*/

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
    self.height = 10;
    self.color = "cyan";
    self.direction = Direction.Up;

    self.render = function () {
        // Rectangle Bullet
        self.context.fillStyle = self.color;
        self.context.fillRect(self.x, self.y, self.width, self.height);
    };

    self.update = function () {
        self.y += self.speed * self.direction;
        self.checkBoundary();
    };

    self.checkBoundary = function () {
        if (self.y > maxY) {
            self.speed = Speed.Stopped;
        }
    };
}

Bullet.makeBullet = function (context, ship, speed, direction) {
    'use strict';
    var newBullet = new Bullet(context);
    newBullet.x = ship.x + ship.width / 2;
    newBullet.y = ship.y;
    newBullet.speed = speed;
    newBullet.direction = direction;
    ship.bullets.push(newBullet);
    return newBullet;
};