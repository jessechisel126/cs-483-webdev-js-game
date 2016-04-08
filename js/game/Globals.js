/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: Globals.js
 * 
 * Description: Defines globals and enums for use in the game.
 */


//
// Globals
//

// Canvas globals
var minX = 0;
var minY = 0;
var maxX = 0;
var maxY = 0;


// Ship globals
var playerShip;
var enemyShips = [];


//
// Enums
//


// Speed enum used to give magnitude to the velocity of moving objects
var Speed = {
    Stopped: 0,
    Slow: 1,
    Medium: 3,
    Fast: 5
};

// Direction enum used to give direction to the velocity of moving objects
var Direction = {
    Up: -1,
    Down: 1
};

// Friend or enemy ship
var ShipType = {
    Friend: 'friend',
    Enemy: 'enemy'
};

// Mostly just because I'm infatuated with enums in JS now...
var Color = {
    Cyan: 'cyan',
    Red: 'red'
};

// This love is getting out of control...
var TickInterval = {
    Seldom:     1000,
    UltraSlow:   500,
    SuperSlow:   250,
    Slow:        100,
    Medium:       50,
    Fast:         30,
    SuperFast:    20,
    UltraFast:    10,
    Instant:       1
};

// Time dependent interface/class
// Adds a tick() to the caller.
// Once tick() has been called tickInterval times,
// action() is performed.
function TimeDependent(tickInterval, action) {
    'use strict';
    var self = this;
    self.tickCount = 0;
    
    self.tick = function () {
        self.tickCount += 1;
        self.tickCount %= tickInterval;
        
        if (self.tickCount === 0) {
            action();
        }
    };
}