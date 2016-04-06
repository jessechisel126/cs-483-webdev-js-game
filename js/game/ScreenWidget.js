/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: ScreenWidget.js
 * 
 * Description: Defines a screen widget class for use in the game.
 */

// Define globals.
var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;
var numLargeStars = 0;
var numMediumStars = 0;
var numSmallStars = 0;
var numTinyStars = 0;

// Speed enum used to give magnitude to the velocity of moving objects
var Speed = { Slow: 1, Medium: 3, Fast: 5 };

// Direction enum used to give direction to the velocity of moving objects
var Direction = { Up: -1, Down: 1 };

var ScreenWidget = function(context) {
    var self = this;
    self.context = context;
    self.x = 0;
    self.y = 0;
    self.render = function() {};
    self.update = function() {};
}