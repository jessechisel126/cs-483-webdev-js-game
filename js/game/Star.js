/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: Bullet.js
 * 
 * Dependencies: ScreenWidget.js
 * 
 * Description: Defines a Star class for use in the game.
 */

var Star = function(context) {
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = 1;
    self.width = 2;

    self.render = function() {
        self.context.fillStyle = self.color;
        self.context.beginPath();
        self.context.arc(
            self.x,         // Arc x location
            self.y,         // Arc y location
            self.width,     // Arc width
            0,              // ??????
            Math.PI * 2,    // Arc angle
            true            // ??????
        );
        self.context.fill();
    };

    self.update = function() {
        self.y += self.speed;
        self.checkBoundary();
    };

    self.checkBoundary = function() {
        if (self.y > maxY) {
            // Reset location.
            self.y = 0;

            // Change color for next go around.
            self.changeColor();

            // Go somewhere else on the star field.
            if (maxX != undefined) {
                self.x = Math.floor(Math.random() * maxX) + 1;
            }
        }
    };

    // Sets star to new random color.
    self.changeColor = function() {
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);
        self.color = "rgb(" + red + ", " + green + ", " + blue + ")";
    };

    self.changeColor();
}

Star.makeStar = function(context, width, speed) {
    var newStar = new Star(context);
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    newStar.color = "rgb(" + red + ", " + green + ", " + blue + ")";
    newStar.speed = speed;
    newStar.width = width;
    newStar.x = Math.floor(Math.random() * maxX);
    newStar.y = Math.floor(Math.random() * maxY);
    return newStar;
};
