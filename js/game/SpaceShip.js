/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: SpaceShip.js
 * 
 * Dependencies: ScreenWidget.js
 * 
 * Description: Defines a ship class for use in the game.
 */

var SpaceShip = function(context, image, imageIndex, imageOffset, width, height) {
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;

    self.render = function() {
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

    self.mouseMoved = function(evt) {
        self.x = evt.clientX - self.width / 2;
        self.y = evt.clientY - self.height / 2;
    }
}