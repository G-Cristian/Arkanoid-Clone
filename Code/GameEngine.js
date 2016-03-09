
//gGameEngine
var gGameEngine =
    {
        ctx: null,
        currLevel:null,
        factory: {},
        entities: [],
        _deferredKill:[],
        spawnEntity:function(type,spec){
            var entity = factory[type](spec);
            this.entities.push(entity);
            return entity;
        },
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
                var level = gFilesManager.levelsJSONs[0].json;
                gGameEngine.currLevel = gFilesManager.loadLevel(level);
                gGameEngine.start();
            });
            
        },
        start: function () {
          
            setTimeout(function () {
                for (var i = 0; i < gGameEngine.entities.length; i++) {
                    var entity = gGameEngine.entities[i];
                    entity.draw();
                }
            }, 1500);
            
        },
        update: function () {
            var i = 0;
            var ent;
            for (i = 0; i < this.entities.length; i++) {
                ent = this.entities[i];
                if (!ent.killed) {
                    ent.update();
                }
                else {
                    this._deferredKill.push(ent);
                }
            }

            for (i = 0; i < this._deferredKill.length; i++) {
                ent = this._deferredKill[i];
                this.entities.erase(ent);
            }

            this._deferredKill = [];
        }
    };