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

Bullet.makeBullet = function (context, ship, speed, direction, color) {
    'use strict';
    var newBullet = new Bullet(context);
    newBullet.x = ship.x + ship.width / 2;
    if (direction === Direction.Down) {
        newBullet.y = ship.y + ship.height;
    } else if (direction === Direction.Up) {
        newBullet.y = ship.y;
    }
    newBullet.width = 4;
    newBullet.height = 10;
    newBullet.speed = speed;
    newBullet.direction = direction;
    newBullet.color = color;
    ship.bullets.push(newBullet);
    return newBullet;
};