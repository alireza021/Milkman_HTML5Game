var Game = {
    init: function () {
        var bgCanvas = document.getElementById("bg-canvas");
        var fgCanvas = document.getElementById("fg-canvas");


        var canvas = {
            bgCanvas: bgCanvas,
            fgCanvas: fgCanvas,
            bgCtx: bgCanvas.getContext("2d"),
            fgCtx: fgCanvas.getContext("2d"),

        };



        var spriteSheet = new Image();
        spriteSheet.src = "img/sprite_sheet.png";

        spriteSheet.addEventListener("load", function () {
            var spriteSheet = this;

            var data = {
                animationFrame: 0,
                spriteSheet: spriteSheet,
                canvas: canvas
            };

            

            Input.init(data);
            Entities.init(data);
            Render.init(data);
            Game.run(data);

        });
    },

    run: function (data) {

      var startTime;
      startTime=new Date();

      var ctx = document.getElementById('fg-canvas').getContext('2d');
              function drawElapsedTime(){

              var elapsed = parseInt((new Date() - startTime)/1000);

              ctx.color = "white";
              ctx.font = "PixelEmulator";

              ctx.fillText(elapsed, 698, 70);

          }


        var loop = function () {
            Game.input(data);
            Game.update(data);
            Game.render(data);
            drawElapsedTime();

            data.animationFrame++;

            window.requestAnimationFrame(loop);
        };

        loop();
    },

    input: function (data) {
        Input.update(data);
    },

    update: function (data) {
        Animation.update(data);
        Movement.update(data);
        Physics.update(data);

    },

    render: function (data) {
        Render.update(data);
    }
};

Game.init();
