/*globals ScreenWidget, ShipType, TimeDependent, console, Bullet, Speed, Direction, Color, TickInterval*/

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
    self.shipType = ShipType.Friend;
    
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
    self.shipType = ShipType.Enemy;
    self.widgets = widgets;
    
    // Enemy ships fire a bullet every 100 ticks.
    TimeDependent.call(this, TickInterval.Fast, function () {
        var newBullet;
        console.log("Bullet fired from enemy ship!");
        newBullet = Bullet.makeBullet(
            self.context,
            self,
            Speed.Medium,
            Direction.Down,
            Color.Red
        );
        self.widgets.push(newBullet);
    });
    
    // Tick on every update.
    self.update = function () {
        self.tick();
    };
}

