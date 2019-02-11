var Physics = {
    update: function (data) {
        Physics.helpers.gravity(data.entities.jack);
        Physics.collisionDetection(data);
    },

    collisionDetection: function (data) {
        var jack = data.entities.jack;

        var entityCollisionCheck = function (entity) {
            if (jack.x < entity.x + entity.w &&
                jack.x + jack.w > entity.x &&
                jack.y < entity.y + entity.h &&
                jack.h + jack.y > entity.y) {
                //Collision Occured
                Physics.handleCollision(data, entity);
            }
        };

        data.entities.wallsArray.forEach(function (wall) {
            entityCollisionCheck(wall);
        });
        data.entities.coinsArray.forEach(function (coin){
          entityCollisionCheck(coin);
        });



        entityCollisionCheck(data.entities.levelUp);
        entityCollisionCheck(data.entities.levelDown);


        if(data.entities.level === 2 || data.entities.level === 3 || data.entities.level === 4 ||data.entities.level === 5){
        entityCollisionCheck(data.entities.dead);
      }

        if(data.entities.level === 4){
        entityCollisionCheck(data.entities.milkMap);
      }

      if(data.entities.level === 6) {
      entityCollisionCheck(data.entities.end);
    }

    },

    handleCollision: function (data, entity) {
        var jack = data.entities.jack;

        if (entity.type === "wall") {
            //Left Side Wall Collision
            if (jack.x < entity.x && jack.y >= entity.y) {
                jack.x = entity.x - jack.w;
            }

            //Right Side Wall Collision
            if (jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;
            }


            //Top of Wall Collision
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0) {
                jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }
        if (entity.type === "coin") {
          var coinsArray = data.entities.coinsArray
          var coinSound = entity.sound.cloneNode();
          var index = coinsArray.indexOf(entity);

          data.entities.score.value += 1;

          coinSound.play();
          coinsArray.splice(index, 1);
        }

        if (entity.type === "dead") {

            data.entities.deadCheck = true;
            Render.helpers.drawEntity(data.entities.backgroundEnd, data.canvas.bgCtx);


        }

        if (entity.type === "end") {
            data.entities.deadCheck = true;
            Render.helpers.drawEntity(data.entities.backgroundEnd2, data.canvas.bgCtx);


        }

          //Right side pipe collision


        if (entity.type === "level") {
            //Left Side Wall Collision
            if (jack.x < entity.x && jack.y >= entity.y) {

                data.canvas.bgCtx.clearRect(0, 0, data.canvas.bgCanvas.width, data.canvas.bgCanvas.height);
              data.entities.level++;
              jack.x = 10;
              data.entities.coinsArray.splice(0, data.entities.coinsArray.length );
              data.entities.wallsArray.splice(0, data.entities.wallsArray.length );
            }
            if (jack.x > entity.x && jack.y >= entity.y) {
              data.canvas.bgCtx.clearRect(0, 0, data.canvas.bgCanvas.width, data.canvas.bgCanvas.height);
              data.entities.level--;
              jack.x = 680;
          data.entities.coinsArray.splice(0, data.entities.coinsArray.length );
              data.entities.wallsArray.splice(0, data.entities.wallsArray.length );
            }

            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0) {
                  data.entities.level = 0;
                  jack.y = 500;
                  data.entities.coinsArray.splice(0, data.entities.coinsArray.length );
                      data.entities.wallsArray.splice(0, data.entities.wallsArray.length );
                      data.entities.score.value = 0;
                }





            if (data.entities.level === 0) {
              Render.helpers.drawEntity(data.entities.jack, data.canvas.fgCtx);
              Render.helpers.drawEntity(data.entities.background, data.canvas.bgCtx);

              var wallLocations = [[0, 568, 768, 72],
                                   [192, 384, 336, 30]];

              var coinLocations = [[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                                  [201, 200], [249, 200], [297, 200], [345, 200], [393, 200], [441, 200], [489, 200],
                                  [201, 150], [489, 150], [537, 150], [537, 200], [153, 200],[153, 150]];



             wallLocations.forEach(function (location) {
             data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));
                       });

                       coinLocations.forEach(function (location) {
                           data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
                       });

            }

        if (data.entities.level === -1) {
          Render.helpers.drawEntity(data.entities.background2, data.canvas.bgCtx);

          var coinLocations2 = [[405, 470],[358, 470], [305, 470], [305, 395], [255, 335], [200, 330], [140, 330], [80, 330], [85, 165], [49, 165],  [9, 165]];

          var wallLocations2 = [[0, 0, 10, 600], [0, 528, 768, 72],
                               [0, 390, 275, 216], [0, 215, 100, 5]];

         coinLocations2.forEach(function (location) {
         data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
                 });

         wallLocations2.forEach(function (location) {
         data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));
                   });


        }

      if (data.entities.level === 1) {
        Render.helpers.drawEntity(data.entities.background3, data.canvas.bgCtx);

        var wallLocations3 = [[0, 568, 768, 72], [100, 415, 73, 20], [300, 315, 137, 20], [550, 265, 73, 20], [700, 215, 73, 20]];

          var coinLocations3 = [[115, 367], [325, 266], [400, 266], [580, 215], [717, 165]];

          coinLocations3.forEach(function (location) {
          data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
                  });
              wallLocations3.forEach(function (location) {
             data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));
      });
    }

    if (data.entities.level === 2) {

      Render.helpers.drawEntity(data.entities.background4, data.canvas.bgCtx);

      var wallLocations4 = [[0, 215, 200, 20], [410, 215, 450, 20], [310, 275, 65, 20], [250, 345, 65, 20], [135, 397, 65, 20],
      [20, 449, 65, 20], [0, 235, 5, 400]];

        var coinLocations4 = [[290, 120], [290, 50], [335, 230], [248, 298], [158, 349], [60, 400]];

        coinLocations4.forEach(function (location) {
        data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
                });
            wallLocations4.forEach(function (location) {
           data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));

    });
  }
  if (data.entities.level === 3) {
    Render.helpers.drawEntity(data.entities.background5, data.canvas.bgCtx);

    var wallLocations5 = [[0, 215, 100, 20], [77, 357, 90, 20],[290, 357, 90, 20], [500, 357, 90, 20], [635, 284, 130, 20]];

      var coinLocations5 = [[110, 304],[315, 304],[530, 304]];

      coinLocations5.forEach(function (location) {
      data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
              });
          wallLocations5.forEach(function (location) {
         data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));

  });
}

if (data.entities.level === 4) {
  Render.helpers.drawEntity(data.entities.background6, data.canvas.bgCtx);

  var wallLocations6 = [[0, 284, 130, 20], [134, 484, 90, 20], [267, 372, 80, 20], [393, 308, 70, 20],
                        [492, 228, 70, 20], [582, 160, 70, 20], [492, 108, 70, 20],[391, 160, 70, 20]];

    var coinLocations6 = [[162, 435],[289, 316],[404, 260], [500, 182], [593, 113], [407, 113], [503, 60]];

    coinLocations6.forEach(function (location) {
    data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
            });
        wallLocations6.forEach(function (location) {
       data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));

});
}
if (data.entities.level === 5) {
  Render.helpers.drawEntity(data.entities.background7, data.canvas.bgCtx);

    jack.y = 11;
    jack.x = 137

  var wallLocations7 = [[102, 189, 100, 20], [271, 210, 100, 20], [492, 225, 100, 20], [643, 259, 100, 20]];

    var coinLocations7 = [[316, 183],[529, 189],[684, 225]];

    coinLocations7.forEach(function (location) {
    data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
            });
        wallLocations7.forEach(function (location) {
       data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));

});
}
if (data.entities.level === 6) {
  Render.helpers.drawEntity(data.entities.background8, data.canvas.bgCtx);

  var wallLocations8 = [[0, 470, 270, 72]];

    var coinLocations8 = [];

    coinLocations8.forEach(function (location) {
    data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
            });
        wallLocations8.forEach(function (location) {
       data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));

});
}
}
},




    helpers: {
        gravity: function (entity) {
            entity.velY += 1.2;
            entity.y += entity.velY;
        }
    }
};
