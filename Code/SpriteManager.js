//gSpriteEngine
var gSpriteEngine =
    {
        //dictionary of sprite sheets. Key: sprite sheet name. Value: sprite sheet image.
        spriteSheets: {},
        //dictionary of sprites. Key: sprite name. Value: sprite.
        sprites: {},

        init: function () {
            this.spriteSheets = {};
            this.sprites = {};
        },

        //loads a sprite sheet. It mustn't be called outside gSpriteEngine.
        //if a sprite sheet is needed the method getSpriteSheet must be called.
        __loadSpriteSheetInternal: function (imgSrc) {
            var img = null;
            if (!this.spriteSheets[imgSrc]) {
                img = new Image();
                img.src = imgSrc;
                this.spriteSheets[imgSrc] = img;
            }
            else {
                console.log("Image '" + imgSrc + "' is already loaded.");
            }

            return null;
        },

        //returns a sprite sheet image. If the sprite sheet doesn't exist it is loaded.
        getSpriteSheet: function (imgSrc) {
            var img = this.spriteSheets[imgSrc];
            if (!img) {
                img = this.__loadSpriteSheetInternal(imgSrc);
                if (!img) {
                    console.log("Image '" + imgSrc + "' couldn't be loaded.");
                }
            }

            return img;
        },
        //loads sprites. It receives a json file which describes each sprite.
        /*format of JSON is:
        spriteName:{
                       spriteSheet:name of the spriteSheet file,
                       x: x position in sprite sheet,
                       y: y position in sprite sheet,
                       w: width in sprite sheet,
                       h: height in sprite sheet
                    },
        ...
        */
        loadSprites: function (spriteJSON) {
            var parsed = JSON.parse(spriteJSON);
            for (var key in parsed) {
                var srpite = parsed[key];
                var spriteSheet = this.getSpriteSheet(sprite.spriteSheet);
                if (spriteSheet) {
                    var spt = {
                        name: key,
                        img: spriteSheet,
                        x: sprite.x,
                        y: sprite.y,
                        w: sprite.w,
                        h: sprite.h,
                        cx: -sprite.w * 0.5,
                        cy: -sprite.h * 0.5,
                    };

                    if (!this.sprites[key]) {
                        this.sprites[key] = spt;
                    }
                    else {
                        console.log("Sprite '" + key + "' already exists.");
                    }
                }
            }
        },
        drawsprite: function (sprite, posX, posY) {
            var img = null;
            var spt = null;
            if (typeof (sprite) == 'object') {
                spt = sprite;
                img = sprite.img;
            }
            else if (typeof (sprite) == 'string') {
                spt = this.sprites[sprite];
                if (!spt) {
                    console.log("There isn't a sprite named '" + sprite + "'.");
                    return;
                }
                img = spt.img;
            }
            else {
                console.log("sprite parameter must be a sprite object or a string representing the sprite name.");
                return;
            }

            var hlf = {
                x: spt.cx,
                y: spt.cy
            };

            gGameEngine.ctx.draw(img, spt.x, spt.y, spt.w, spt.h, posX+hlf.x, posY+hlf.y, spt.w, spt.h);
        }
    };