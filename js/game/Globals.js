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
var Speed = { Stopped: 0, Slow: 1, Medium: 3, Fast: 5 };

// Direction enum used to give direction to the velocity of moving objects
var Direction = { Up: -1, Down: 1 };

// Friend or enemy ship
var ShipType = { Friend: 'friend', Enemy: 'enemy' };
