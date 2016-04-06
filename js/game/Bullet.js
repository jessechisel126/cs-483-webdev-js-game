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

var Bullet = function(context) {
    ScreenWidget.call(this, context);
    var self = this;
    self.width = 4;
    self.height = 10;
    self.color = "rgb(255,255,255);";
    self.direction = Direction.Up;

    self.render = function() {
        // // Round Bullet
        // self.context.fillStyle = self.color;
        // self.context.beginPath();
        // self.context.arc(
        //     self.x,         // Arc x location
        //     self.y,         // Arc y location
        //     self.width,     // Arc width
        //     0,              // ??????
        //     Math.PI * 2,    // Arc angle
        //     true            // ??????
        // );
        // self.context.fill();

        // Rectangle Bullet
        self.context.fillStyle = self.color;
        self.context.fillRect(self.x, self.y, self.width, self.height);
    };

    self.update = function() {
        self.y += self.speed * self.direction;
        self.checkBoundary();
    };

    self.checkBoundary = function() {
        if (self.y > maxY) {
            self.speed = 0;
        }
    };
}

Bullet.makeBullet = function(context, ship, speed, direction) {
    var newBullet = new Bullet(context);
    newBullet.x = ship.x + ship.width / 2;
    newBullet.y = ship.y;
    newBullet.speed = speed;
    newBullet.direction = direction;
    return newBullet;
};