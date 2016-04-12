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
var numObjects = 0;
var shipsToSpawn = 10;
var widgets = [];

// Ship globals
var playerShip;
var enemyShips = [];

//
// Enums
//


// Speed enum used to give magnitude to the velocity of moving objects
var Speed = {
    Stopped: 0,
    Slower:  1,
    Slow:    2,
    Medium:  3,
    Fast:    4,
    Faster:  5
};

// Direction enum used to give direction to the velocity of moving objects
var Direction = {
    Up:  -1,
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

// Given a widget id, deletes the widget from the game.
// NOTE: This function is pretty expensive because of all of the references kept to objects.
//       This could be improved by cutting down on references. The drawback would be that
//       not having some of these references could either slow down other, more frequent operations,
//       and/or greatly increase the logical difficulty of solving some problems, like collisions.
function deleteWidgetWithID(id) {
    'use strict';
    var i, j;

    // If any widget has colliders, we should check here for the id.
    for (i = 0; i < widgets.length; i += 1) {
        if (widgets[i].colliders !== undefined) {
            for (j = 0; j < widgets[i].colliders.length; j += 1) {
                if (widgets[i].colliders[j].collider.id === id) {
                    widgets[i].colliders.splice(j, 1);
                    break;
                }
            }
        }
    }
    
    // Delete from widgets
    for (i = 0; i < widgets.length; i += 1) {
        if (widgets[i].id === id) {
            widgets.splice(i, 1);
            break;
        }
    }
    
    // Delete from globals
    for (i = 0; i < enemyShips.length; i += 1) {
        if (enemyShips[i].id === id) {
            enemyShips.splice(i, 1);
            break;
        }
    }
}
