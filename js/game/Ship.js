/*globals ScreenWidget, ShipType*/

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

function Ship(context, image, imageIndex, imageOffset, width, height) {
    'use strict';
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
    self.bullets = [];

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
    self.shipType = ShipType.Friend;
    
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
    self.shipType = ShipType.Enemy;
}

