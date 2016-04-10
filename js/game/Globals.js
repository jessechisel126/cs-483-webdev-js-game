/*globals console*/

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

// Friend or enemy property
var Allegiance = {
    Player: 'player',
    Enemy: 'enemy'
};

// Mostly just because I'm infatuated with infusing type into JS now...
var BulletColor = {
    Player: {
        innerColor: 'blue',
        outerColor: 'cyan'
    },
    Enemy: {
        innerColor: 'red',
        outerColor: 'orange'
    }
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


// Given two ranges, checks if they overlap.
function rangesOverlap(minA, maxA, minB, maxB) {
    'use strict';
    return minA <= maxB && maxA >= minB;
}
