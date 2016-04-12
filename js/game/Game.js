/*globals
$, console, alert, deleteWidgetWithID,
Speed, Direction, Color, TimeDependent, TickInterval,
PlayerBullet, PlayerShip, EnemyShip, Star,
widgets:true, maxX:true, maxY:true, playerShip:true, enemyShips, shipsToSpawn:true
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
    
    var self = this,
        killSelf = function () {
            var self = this;
            console.log(self.constructor.name + " collision: killing self next frame");
            self.health = 0;
        };
    
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.numLargeStars = 10;
    self.numMediumStars = 20;
    self.numSmallStars = 100;
    self.numTinyStars = 200;
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.numEnemyShips = 5;
    
    widgets = [];
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;

    TimeDependent.call(this, TickInterval.UltraSlow, function () {
        var enemyShip = new EnemyShip(
            self.context,           // Context
            self.shipImage,         // Ship Image
            enemyShips.length + 1,  // Ship Image Index
            66,                     // Ship Image Offset
            64,                     // Ship Width
            64                      // Ship Height
        );
        enemyShip.x = Math.floor(Math.random() * maxX);
        enemyShip.y = -100;
        widgets.push(enemyShip);
        enemyShips.push(enemyShip);

        // Kill the player
        playerShip.subscribeCollider(
            enemyShip,
            killSelf.bind(playerShip, enemyShip)
        );

        // Kill the enemy
        enemyShip.subscribeCollider(
            playerShip,
            killSelf.bind(enemyShip, playerShip)
        );
    });
    
    // Set up the player ship.
    playerShip = new PlayerShip(
        self.context,   // Ship Context
        self.shipImage, // Ship Image
        0,              // Ship Image Index
        66,             // Ship Image Offset
        64,             // Ship Width
        64              // Ship Height
    );

    playerShip.x = maxX;
    playerShip.y = maxY;

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
            enemyShip;
        
        // Generate large stars.
        for (i = 0; i < self.numLargeStars; i += 1) {
            speed = (Math.floor(Math.random() * 3) + 1);
            newStar = Star.makeStar(self.context, 5, speed);
            widgets.push(newStar);
        }

        // Generate medium stars.
        for (i = 0; i < self.numMediumStars; i += 1) {
            speed = (Math.floor(Math.random() * 3) + 1);
            newStar = Star.makeStar(self.context, 3, speed);
            widgets.push(newStar);
        }

        // Generate small stars.
        for (i = 0; i < self.numSmallStars; i += 1) {

            // Make it so most stars are in the far background.
            howFast = Math.random() * 100;
            speed = 5;

            if (howFast > 60) {
                speed = 2;
            } else if (howFast > 20) {
                speed = 1;
            }

            newStar = Star.makeStar(self.context, 2, speed);
            widgets.push(newStar);
        }

        // Generate tiny stars.
        for (i = 0; i < self.numTinyStars; i += 1) {
            speed = (Math.floor(Math.random() * 3) + 1);
            newStar = Star.makeStar(self.context, 1, speed);
            widgets.push(newStar);
        }

        // Generate player ship.
        widgets.push(playerShip);

        // Begin game.
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function () {
        var i;
        
        self.tick();
        
        if (playerShip.health === 0) {
            alert("Game over! Click OK to restart!");
            location.reload();
        }
        
        if (shipsToSpawn === 0) {
            alert("You won! Click OK to restart!");
            location.reload();
        }
        
        // Clear canvas.
        self.context.clearRect(0, 0, maxX, maxY);

        // Paint canvas black.
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        // Render all widgets.
        for (i = 0; i < widgets.length; i += 1) {
            if (widgets[i].health === 0) {
                // Delete self if dead from last frame
                deleteWidgetWithID(widgets[i].id);
            } else {
                widgets[i].render();
                widgets[i].update();
            }
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
            playerBullet,
            enemyShip,
            bulletKillSelf = function (other) {
                var self = this;
                console.log(self.constructor.name + " collision: killing self");
                self.health = 0;
            },
            shipKillSelf = function (other) {
                var self = this;
                console.log(self.constructor.name + " collision: killing self");
                shipsToSpawn -= 1;
                self.health = 0;
            };
        
        console.log("Bullet fired from player ship!");
        playerBullet = new PlayerBullet(
            self.context,
            playerShip,
            Speed.Fast
        );
        
        for (i = 0; i < enemyShips.length; i += 1) {
            
            enemyShip = enemyShips[i];
            
            // Subscribe enemy ship to collisions with bullet, both killing self when colliding 
            enemyShip.subscribeCollider(
                playerBullet,
                shipKillSelf.bind(enemyShip, playerBullet)
            );
            
            playerBullet.subscribeCollider(
                enemyShip,
                bulletKillSelf.bind(playerBullet, enemyShip)
            );
        }
        
        widgets.push(playerBullet);
    };

    // Set up event listeners.
    canvas.addEventListener("mousemove", self.canvasMouseMoved);
    canvas.addEventListener("click", self.canvasMouseClicked);

    // Hide the cursor.
    $('#canvas').css('cursor', 'none');
}
