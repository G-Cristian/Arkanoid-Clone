
//gGameEngine
var gGameEngine =
    {
        ctx: null,
        setup: function () {
            var body = document.getElementById("body");
            var canvas = document.createElement("canvas");
            gFilesManager.init();
            gFilesManager.readFile("http://localhost/arkanoid-clone/JSON/CanvasConfig.json", function (responceText) {
                var parsed = JSON.parse(responceText);
                canvas.width = parsed.width;
                canvas.height = parsed.height;
                canvas.style.border = parsed.border || "";
                console.log(parsed.border);
                console.log('canvas.style.border = parsed.border || "";');
                body.appendChild(canvas);
                console.log("body.appendChild(canvas);");
                gGameEngine.ctx = canvas.getContext('2d');
                console.log("gGameEngine.ctx = canvas.getContext('2d');");
                gGameEngine.loadFiles();
                console.log("gGameEngine.loadFiles();");
            });
            /*console.log('var canvas = document.createElement("canvas");');
            var parsed = JSON.parse(CanvasConfig);
            console.log('var parsed = JSON.parse(CanvasConfig);');
            canvas.width = parsed.width;
            console.log('canvas.width = parsed.width;');
            canvas.height = parsed.height;
            body.appendChild(canvas);
            gGameEngine.loadFiles();
            */
        },
        loadFiles:function()
        {
            gFilesManager.loadConfigurationFile("http://localhost/arkanoid-clone/JSON/FilesToLoad.json", function () {
                var i = 0;
                console.log('gSpriteManager = ' + gSpriteManager);
                gSpriteManager.init();
                console.log('gSpriteManager.init();');
                for (i = 0; i < gFilesManager.spritesJSONs.length; i++) {
                    gSpriteManager.loadSprites(gFilesManager.spritesJSONs[i]);
                    console.log(gFilesManager.spritesJSONs[i]);
                }
                gGameEngine.start();
            });
            
        },
        start: function () {
            setTimeout(function () {
                gSpriteManager.drawSprite('greenblock_2', 20, 20);
                gSpriteManager.drawSprite('greenblock_3', 20, 20);
            }, 1500);
            
        }
    };