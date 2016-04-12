/*globals console*/

/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: ScreenWidget.js
 * 
 * Description: Defines a time dependent class for use in the game.
 */

// Time dependent interface/class.
// Adds a tick() to the caller.
// Once tick() has been called tickInterval times,
// action() is performed.
// Typical use would be to call tick() in an update function.
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