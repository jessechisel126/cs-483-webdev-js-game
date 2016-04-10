/*globals
$, console,
Speed, Direction, Color,
Bullet, PlayerShip, EnemyShip, Star,
playerShip, enemyShips, maxX, maxY
*/

/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: Shooter Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: ShooterGame.js
 * 
 * Dependencies: ScreenWidget.js
 *               Star.js
 *               SpaceShip.js
 *               Globals.js
 * 
 * Description: Main file for the Shooter Game
 */

function Game(canvas, shipImageSrc) {
    'use strict';
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.widgets = [];
    self.numLargeStars = 10;
    self.numMediumStars = 20;
    self.numSmallStars = 100;
    self.numTinyStars = 200;
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.numEnemyShips = 5;
    
    // NOTE: Linting shows clientWidth and clientHeight as readonly, 
    // don't know why that would be a problem if we aren't assigning to them.
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;

    // Set up the player ship.
    playerShip = new PlayerShip(
        self.context,   // Ship Context
        self.shipImage, // Ship Image
        0,              // Ship Image Index
        66,             // Ship Image Offset
        64,             // Ship Width
        64              // Ship Height
    );

    playerShip.x = 100;
    playerShip.y = 100;

    // Begins the game.
    self.begin = function () {
        self.init();
        self.renderLoop();
    };

    // Resets game state
    self.init = function () {
        var i,
            speed,
            newStar,
            howFast,
            enemyShip,
            doNothing = function () {
                var self = this;
                console.log("Collision: doing nothing to self");
                console.log(self);
            },
            loseAllHealth = function () {
                var self = this;
                console.log("Collision: killing self");
                self.health = 0;
                console.log(self);
            };
//        
//        // Generate large stars.
//        for (i = 0; i < self.numLargeStars; i += 1) {
//            speed = (Math.floor(Math.random() * 3) + 1);
//            newStar = Star.makeStar(self.context, 5, speed);
//            self.widgets.push(newStar);
//        }
//
//        // Generate medium stars.
//        for (i = 0; i < self.numMediumStars; i += 1) {
//            speed = (Math.floor(Math.random() * 3) + 1);
//            newStar = Star.makeStar(self.context, 3, speed);
//            self.widgets.push(newStar);
//        }
//
//        // Generate small stars.
//        for (i = 0; i < self.numSmallStars; i += 1) {
//
//            // Make it so most stars are in the far background.
//            howFast = Math.random() * 100;
//            speed = 5;
//
//            if (howFast > 60) {
//                speed = 2;
//            } else if (howFast > 20) {
//                speed = 1;
//            }
//
//            newStar = Star.makeStar(self.context, 2, speed);
//            self.widgets.push(newStar);
//        }
//
//        // Generate tiny stars.
//        for (i = 0; i < self.numTinyStars; i += 1) {
//            speed = (Math.floor(Math.random() * 3) + 1);
//            newStar = Star.makeStar(self.context, 1, speed);
//            self.widgets.push(newStar);
//        }

        // Generate enemy ships.
        for (i = 0; i < self.numEnemyShips; i += 1) {
            enemyShip = new EnemyShip(
                self.context,   // Context
                self.shipImage, // Ship Image
                i + 1,          // Ship Image Index
                66,             // Ship Image Offset
                64,             // Ship Width
                64,             // Ship Height
                self.widgets    // Global widgets
            );
            enemyShip.x = 100 * i;
            self.widgets.push(enemyShip);
            enemyShips.push(enemyShip);
        }
        
        // Generate player ship.
        self.widgets.push(playerShip);
        
        // Subscribe collisions for all enemy ships with the player ship.
        for (i = 0; i < enemyShips.length; i += 1) {
            enemyShip = enemyShips[i];
            
            // We lose all health upon collision with enemy
            // Nothing happens to the enemy when we collide with them
            playerShip.subscribeCollider(
                enemyShips[i],
                loseAllHealth.bind(playerShip),
                doNothing.bind(enemyShip)
            );
                                              
        }

        // Begin game.
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function () {
        var i;
        
        // Clear canvas.
        self.context.clearRect(0, 0, maxX, maxY);

        // Paint canvas black.
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        // Render all widgets.
        for (i = 0; i < self.widgets.length; i += 1) {
            self.widgets[i].render();
            self.widgets[i].update();
        }

        // Animate.
        window.requestAnimationFrame(self.renderLoop);
    };

    //
    // Canvas Event Handlers
    //

    self.canvasMouseMoved = function (evt) {
        playerShip.mouseMoved(evt);
    };

    self.canvasMouseClicked = function (evt) {
        var i,
            newBullet,
            enemyShip,
            doNothing = function () {
                var self = this;
                console.log("Our bullet hit an enemy ship");
                console.log(self);
            };
        
        console.log("Bullet fired from player ship!");
        newBullet = Bullet.makeBullet(
            self.context,
            playerShip,
            Speed.Fast
        );
        
        for (i = 0; i < self.numEnemyShips; i += 1) {
            
            enemyShip = enemyShips[i];
            
            // Subscribe enemy ship to collisions with 
            enemyShip.subscribeCollider(
                newBullet,
                doNothing.bind(enemyShip),
                doNothing.bind(newBullet)
            );
        }
        
        self.widgets.push(newBullet);
    };

    // Set up event listeners.
    canvas.addEventListener("mousemove", self.canvasMouseMoved);
    canvas.addEventListener("click", self.canvasMouseClicked);

    // Hide the cursor.
    $('#canvas').css('cursor', 'none');
}
