/*globals console*/
/*jslint continue:true*/

/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: JS Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: Collider.js
 * 
 * Description: Defines a RectangleCollider class for use in the game.
 */

// Rectangle collider class.
// Makes the caller a rectanglular collider.
// Uses subscription system similar to events for handling collisions.
// Expects the caller to have properties x, y, width, and height.
// Typical use would be to call checkCollision() in an update function.
function RectangularCollider(ratio) {
    'use strict';
    var self = this;
    self.hitbox = {};
    self.hitbox.ratio = ratio;
    self.colliders = [];
    
    // Sanity checking, can't create collider without x, y, width, or height properties.
    if (self.x === undefined) {
        console.log("ERROR: cannot give object collider; x is undefined!");
    } else if (self.y === undefined) {
        console.log("ERROR: cannot give object collider; y is undefined!");
    } else if (self.width === undefined) {
        console.log("ERROR: cannot give object collider; width is undefined!");
    } else if (self.height === undefined) {
        console.log("ERROR: cannot give object collider; height is undefined!");
    }
    
    // One way collider subscription.
    // NOTE: Must subscribe both ways for collision to take place.
    // collider = other collider
    // action = action we should take upon collision
    self.subscribeCollider = function (collider, action) {
        
        // Check if collider is a collider
        if (!collider instanceof RectangularCollider) {
            console.error("ERROR: Subscribing collider with a non-collider.");
            return;
        }
        
        self.colliders.push({colliding: false, collider: collider, action: action});
    };
    
    // One way collider unsubscription.
    // NOTE: Must unsubscribe both ways for collision to stop taking place.
    // other = collider to unsubscribe.
    self.unsubscribeCollider = function (other) {
        var i;
        
        // Check if other is a collider
        if (!other instanceof RectangularCollider) {
            console.error("ERROR: Unsubscribing non-collider from collider.");
            return;
        }
        
        for (i = 0; i < self.colliders.length; i += 1) {
            if (self.colliders[i].collider.id === other.id) {
                self.colliders.splice(i, 1);
                return;
            }
        }
    };
    
    // Updates values for the hitbox based on position.
    self.updateHitbox = function () {
        
        /* Hitbox Diagram

            If ratio is 0.5:
                                  caller
                                  width
                                  = 24
                         |----------------------|

                                (caller)                        
                    -    +----------------------+
                    |    |......................|
                    |    |.......(hitbox).......|
                    |    |.....+----------+.....|    -  
                    |    |.....|0000000000|.....|    |
            caller  |    |.....|0000000000|.....|    |  hitbox
            height  |    |.....|0000000000|.....|    |  height
            = 12    |    |.....|0000000000|.....|    |   = 6
                    |    |.....+----------+.....|    -
                    |    |......................|
                    |    |......................|                           
                    -    +----------------------+                       


                               |----------|
                                   hitbox
                                   width
                                   = 12

            Therefore,
                hitbox x start = caller x + ((half of ratio) * caller width)
                hitbox y start = caller y + ((half of ratio) * caller height)
                hitbox x end   = hitbox x start + (ratio * caller width)
                hitbox y end   = hitbox y start + (ratio * caller height)
        */
        
        self.hitbox.xStart = self.x + ((self.hitbox.ratio / 2) * self.width);
        self.hitbox.yStart = self.y + ((self.hitbox.ratio / 2) * self.height);
        self.hitbox.xEnd   = self.hitbox.xStart + (self.hitbox.ratio * self.width);
        self.hitbox.yEnd   = self.hitbox.yStart + (self.hitbox.ratio * self.height);
    };
    
    // Checks with each collider for a collision, and performs the collision
    // action for both ourselves and the other collider.
    self.checkCollisions = function () {
        
        // Update our hitbox
        self.updateHitbox();
        
        var i,              // Loop variable
            collider,       // Other object we're potentially colliding with
            colliding,      // Whether we are already colliding with an object in question
            action,         // Action to take upon colliding with an object in question
            xOverlap,       // Whether we are overlapping in the x dimension with an object in question
            yOverlap,       // Whether we are overlapping in the y dimension with an object in question
            collided,       // Whether we've now collided with an object in question
            colliderName,   // Name of the collider
            // Our name
            selfName = self.constructor.name;
        
        // Loop through colliders...
        for (i = 0; i < self.colliders.length; i += 1) {
            
            collider     = self.colliders[i].collider;
            colliding    = self.colliders[i].colliding;
            action       = self.colliders[i].action;
            colliderName = collider.constructor.name;
            
            // Check if other object is in fact a collider
            if (!collider instanceof RectangularCollider) {
                console.error("ERROR: Subscribing collider with a non-collider.");
                continue;
            }
            
            // Update other collider's hitboxes.
            collider.updateHitbox();
            
            // Check for overlap with other collider
            xOverlap = self.hitbox.xStart <= collider.hitbox.xEnd && self.hitbox.xEnd >= collider.hitbox.xStart;
            yOverlap = self.hitbox.yStart <= collider.hitbox.yEnd && self.hitbox.yEnd >= collider.hitbox.yStart;
            collided = xOverlap && yOverlap;
            
            // If objects have started colliding, then call our action.
            if (!colliding && collided) {
                console.log(selfName + " started colliding with " + colliderName);
                self.colliders[i].colliding = true;
                action(self);
            } else if (colliding && !collided) {
                console.log(selfName + " stopped colliding with " + colliderName);
                self.colliders[i].colliding = false;
            }
        }
    };
}
