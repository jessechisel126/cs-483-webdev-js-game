/*
Main file for Star Game
Requires: ScreenWidget.js
          Star.js
          SpaceShip.js
 */
function StarGame(canvas, shipImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.widgets = Array();

    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
    self.playerShip = new SpaceShip(self.context, self.shipImage, 8, 66, 64, 64);

    //set up globals
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;



    self.begin = function()
    {
        self.init();
        self.renderLoop();
    };

    //resets game state
    self.init = function()
    {
        //set up starfield
        //generate 100 small stars
        for (var i = 0; i < 100; i++)
        {
            //make it so most stars are in the far background
            var howFast = Math.random() * 100;
            var speed = 5;
            if (howFast > 60)
            {
                speed = 2;
            }
            else if (howFast > 20)
            {
                speed = 1;
            }
            //var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 2, speed);
            self.widgets.push(someStar);
        }

        //generate 10 large stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 5, speed);
            self.widgets.push(someStar);
        }

        //generate 20 medium stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 3, speed);
            self.widgets.push(someStar);
        }

        //and 200 tiny stars
        for (var i = 0; i < 200; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 1, speed);
            self.widgets.push(someStar);
        }

        //placing ship last puts it on top of the stars
        self.widgets.push(self.playerShip);

        //begin game
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function()
    {
        //clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        //paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        //render widgets
        for(var i = 0; i < self.widgets.length; i++)
        {
            self.widgets[i].render();
            self.widgets[i].update();
        }
        window.requestAnimationFrame(self.renderLoop);
    };

    self.canvasMouseMoved = function(evt)
    {
        //update interested parties
        self.playerShip.mouseMoved(evt);
    };

    //set up event listeners
    canvas.addEventListener("mousemove", self.canvasMouseMoved, false);
}
