/*
 * Programmer: Jesse Chisholm | 11278684
 * Program: Shooter Game (Homework 5)
 * Class: CptS 483 - Web Dev
 * File: ShooterGame.js
 * 
 * Dependencies: ScreenWidget.js
 *               Star.js
 *               SpaceShip.js
 * 
 * Description: Main file for the Shooter Game
 */

function StarGame(canvas, shipImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.widgets = Array();

    // Hide the mouse.
    self.canvas.style.cursor = "none";

    // Set up the player ship.
    self.playerShip = new SpaceShip(
        self.context,   // Ship Context
        self.shipImage, // Ship Image
        8,              // Ship Image Index
        66,             // Ship Image Offset
        64,             // Ship Width
        64              // Ship Height
    );

    // Set up globals.
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;
    numLargeStars = 10;
    numMediumStars = 20;
    numSmallStars = 100;
    numTinyStars = 200;

    // Begins the game.
    self.begin = function()
    {
        self.init();
        self.renderLoop();
    };

    // Resets game state
    self.init = function()
    {
        // Generate large stars.
        for (var i = 0; i < numLargeStars; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var newStar = Star.makeStar(self.context, 5, speed);
            self.widgets.push(newStar);
        }

        // Generate medium stars.
        for (var i = 0; i < numMediumStars; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var newStar = Star.makeStar(self.context, 3, speed);
            self.widgets.push(newStar);
        }

        // Generate small stars.
        for (var i = 0; i < numSmallStars; i++) {

            // Make it so most stars are in the far background.
            var howFast = Math.random() * 100;
            var speed = 5;

            if (howFast > 60) {
                speed = 2;
            } else if (howFast > 20) {
                speed = 1;
            }

            var newStar = Star.makeStar(self.context, 2, speed);
            self.widgets.push(newStar);
        }

        // Generate tiny stars.
        for (var i = 0; i < numTinyStars; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var newStar = Star.makeStar(self.context, 1, speed);
            self.widgets.push(newStar);
        }

        // Placing ship last puts it on top of the stars.
        self.widgets.push(self.playerShip);

        // Begin game.
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function()
    {
        // Clear canvas.
        self.context.clearRect(0, 0, maxX, maxY);

        // Paint canvas black.
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        // Render all widgets.
        for(var i = 0; i < self.widgets.length; i++)
        {
            self.widgets[i].render();
            self.widgets[i].update();
        }

        // Animate.
        window.requestAnimationFrame(self.renderLoop);
    };

    //
    // Canvas Event Handlers
    //

    self.canvasMouseMoved = function(evt) {
        self.playerShip.mouseMoved(evt);
    };

    self.canvasMouseClicked = function(evt) {
        console.log("Bullet fired from player ship!");
        var newBullet = Bullet.makeBullet(self.context, self.playerShip, Speed.Fast, Direction.Up);
        self.widgets.push(newBullet);
    };

    // Set up event listeners.
    canvas.addEventListener("mousemove", self.canvasMouseMoved);
    canvas.addEventListener("click", self.canvasMouseClicked);

    // Hide the cursor.
    $('#canvas').css('cursor', 'none');
}
