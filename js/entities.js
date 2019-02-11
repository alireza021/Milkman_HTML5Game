var Entities = {
    init: function (data) {
        var background = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        var background2 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 635, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        var background3 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 1235, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        var background4 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 768, 1235, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        var background5 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 768, 635, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };
        var background6 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 768, 35, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };
        var background7 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 1835, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };
        var background8 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 768, 1835, 768, 600),
            x: 0,
            y: 0,
            w: 768,
            h: 600
        };

        var backgroundEnd = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 2433, 217, 309),
            x: 245,
            y: 136,
            w: 217,
            h: 309
        };

        var backgroundEnd2 = {
            sprite: new Entities.helpers.Sprite(data.spriteSheet, 217, 2433, 217, 309),
            x: 245,
            y: 136,
            w: 217,
            h: 309
        };


        var jack = new Entities.helpers.Jack(data.spriteSheet, 60, 0, 64, 64);

        //var exitPipe = new Entities.helpers.ExitPipe(624, 432, 144, 168);

        var score = new Entities.helpers.Score(600, 35);



        var timer = new Entities.helpers.Score(620, 70);
        var levelUp = new Entities.helpers.nextLevel(768, 0, 5, 600);
        var levelDown = new Entities.helpers.nextLevel(0, 0, 5, 600);

        var dead = new Entities.helpers.dead(0, 570, 765, 5);
        var milkMap = new Entities.helpers.nextLevel(653, 30, 5, 45);
        var end = new Entities.helpers.end(255, 517, 500, 15);

        var deadCheck = false;


        var wallLocations = [[0, 568, 768, 72],
                             [192, 384, 336, 30]];

        var coinLocations = [[249, 150], [297, 150], [345, 150], [393, 150], [441, 150],
                             [201, 200], [249, 200], [297, 200], [345, 200], [393, 200], [441, 200], [489, 200],
                             [201, 150], [489, 150], [537, 150], [537, 200], [153, 200],[153, 150]];


        data.entities = {};

        data.entities.deadCheck = deadCheck;
        data.entities.background = background;
        data.entities.background2 = background2;
        data.entities.background3 = background3;
        data.entities.background4 = background4;
        data.entities.background5 = background5;
        data.entities.background6 = background6;
        data.entities.background7 = background7;
        data.entities.background8 = background8;
        data.entities.backgroundEnd = backgroundEnd;
        data.entities.backgroundEnd2 = backgroundEnd2;
        data.entities.score = score;
        data.entities.jack = jack;

        data.entities.levelUp = levelUp;
        data.entities.levelDown = levelDown;
        data.entities.dead = dead;
        data.entities.end = end;
        data.entities.milkMap = milkMap;
        data.entities.wallsArray = [];
        data.entities.coinsArray = [];
        data.entities.level = 0;



        wallLocations.forEach(function (location) {
            data.entities.wallsArray.push(new Entities.helpers.Wall(location[0], location[1], location[2], location[3]));
        });

        coinLocations.forEach(function (location) {
            data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet, location[0], location[1], 30, 42));
        });

    },

    helpers: {
        Sprite: function (img, srcX, srcY, srcW, srcH) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcW = srcW;
            this.srcH = srcH;
        },

        Jack: function (img, x, y, w, h) {
          var self = this;
            this.jumpSound = new Audio("audio/lumberjack_jump.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 0, 0, 16, 16);
            this.spriteAnimations = {
                walkRight: {
                    frames: [new Entities.helpers.Sprite(img, 16, 0, 16, 16), new Entities.helpers.Sprite(img, 32, 0, 16, 16),
                            new Entities.helpers.Sprite(img, 48, 0, 16, 16)],
                    currentFrame: 0
                },
                walkLeft: {
                    frames: [new Entities.helpers.Sprite(img, 34, 18, 16, 16), new Entities.helpers.Sprite(img, 18, 18, 16, 16),
                            new Entities.helpers.Sprite(img, 2, 18, 16, 16)],
                    currentFrame: 0
                },
                standRight: new Entities.helpers.Sprite(img, 0, 0, 16, 16),
                standLeft: new Entities.helpers.Sprite(img, 50, 18, 16, 16),
                jumpLeft: new Entities.helpers.Sprite(img, 67, 18, 16, 16),
                jumpRight: new Entities.helpers.Sprite(img, 67, 0, 16, 16)
            };
            this.states = {
              jumping: {
                movement: function (data) {
                    if (self.velY === 0) {
                      var jumpSound = self.jumpSound.cloneNode();
                      jumpSound.play();
                      self.velY -= 23;
                    }
                },
                animation: function (data) {
                    if(self.direction === "right") {
                      self.sprite = self.spriteAnimations.jumpRight;
                    }
                    else {
                      self.sprite = self.spriteAnimations.jumpLeft;
                    }
                }
              },
              standing: {
                movement: function (data) {
                  return;
                },
                animation: function (data) {
                  if(self.direction === "right") {
                    self.sprite = self.spriteAnimations.standRight;
                  }
                  else {
                    self.sprite = self.spriteAnimations.standLeft;
                  }
                }
              },
              walking: {
                movement: function (data) {
                  if (self.direction === "right") {
                    self.x += self.velX
                  }
                  else {
                    self.x -= self.velX
                  }
                },
                animation: function (data) {
                  if (self.direction === "right") {
                    if (data.animationFrame % 5 === 0) {
                      self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame];
                      self.spriteAnimations.walkRight.currentFrame++;

                      if (self.spriteAnimations.walkRight.currentFrame > 2) {
                        self.spriteAnimations.walkRight.currentFrame = 0;
                      }
                    }
                  } else {
                    if (self.direction === "left") {
                      if (data.animationFrame % 5 === 0) {
                        self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame];
                        self.spriteAnimations.walkLeft.currentFrame++;

                        if (self.spriteAnimations.walkLeft.currentFrame > 2) {
                          self.spriteAnimations.walkLeft.currentFrame = 0;
                        }
                      }

                  }
                }
              }

            }
          }
            this.currentState = self.states.standing;
            this.direction = "right";

            this.velY = 0;
            this.velX = 3.8;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Coin: function (img, x, y, w, h) {
            var self = this;
            this.type = "coin";
            this.sound = new Audio("audio/lumberjack_coin.mp3");
            this.sprite = new Entities.helpers.Sprite(img, 99, 0, 10, 14);
            this.spriteAnimations = {
                spin: {
                    frames: [new Entities.helpers.Sprite(img, 97, 0, 14, 16), new Entities.helpers.Sprite(img, 113, 0, 14, 16),
                             new Entities.helpers.Sprite(img, 129, 0, 14, 16), new Entities.helpers.Sprite(img, 145, 0, 14, 16)],
                    currentFrame: 0
                }
            };
            this.states = {
                spinning: {
                    animation: function (data) {
                        if (data.animationFrame % 13 === 0) {
                            self.sprite = self.spriteAnimations.spin.frames[self.spriteAnimations.spin.currentFrame];
                            self.spriteAnimations.spin.currentFrame++;

                            if (self.spriteAnimations.spin.currentFrame > 3) {
                                self.spriteAnimations.spin.currentFrame = 0;
                            }
                        }
                    }
                }
            };
            this.currentState = self.states.spinning;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        Wall: function (x, y, w, h) {
            this.type = "wall";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
        nextLevel: function (x, y, w, h) {
            this.type = "level";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
        end: function (x, y, w, h) {
            this.type = "end";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },

        dead: function (x, y, w, h) {
            this.type = "dead";
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
        Score: function(x, y) {
          this.value = 0;
          this.x = x;
          this.y = y;
          this.size = "25px";
          this.font = "PixelEmulator";
          this.color = "white";
        },



    }
};
