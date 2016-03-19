///<reference path = PhysicsEngine.js />
///<reference path="LevelManager.js"/>

//gGameEngine
var gGameEngine =
    {
        commonLevelConfig:null,
        ctx: null,
        currLevel:null,
        factory: {},
        entities: [],
        _deferredKill:[],
        spawnEntity: function (type, spec) {
            console.log("spawn type " + type + " spec " + spec);
            var entity = this.factory[type](spec);
            this.entities.push(entity);
            console.log("entity " + entity);
            return entity;

        },
        removeEntity: function (ent) {
            var physBody = null;
            this.entities.erase(ent);
            if (ent.getPhysBody) {
                physBody = ent.getPhysBody();
                if (physBody) {
                    gPhysicsEngine.removeBody(physBody);
                }
            }
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
                gPhysicsEngine.create();
                //debug
                gPhysicsEngine.setDebug();
                gPhysicsEngine.addContactListener({
                    PostSolve: function (bodyA, bodyB, impulse) {
                        var uA = bodyA ? bodyA.GetUserData() : null;
                        var uB = bodyB ? bodyB.GetUserData() : null;

                        if (uA !== null) {
                            if(uA.ent !== null && uA.ent.onTouch)
                                uA.ent.onTouch(bodyB, null, impulse);
                        }
                        if (uB !== null) {
                            if (uB.ent !== null && uB.ent.onTouch)
                                uB.ent.onTouch(bodyA, null, impulse);
                        }
                    }
                });

                gGameEngine.commonLevelConfig = JSON.parse(gFilesManager.levelsConfigJSON);
                var level = gFilesManager.levelsJSONs[0].json;
                console.log("level " + level);
                gGameEngine.currLevel = gLevelManager.loadLevel(level);
                gGameEngine.start();
            });
            
        },
        start: function () {
            gGameEngine.setBallInitialLocation();

            setInterval(function () {
                gGameEngine.gameLoop();
            }, 33);
            
        },
        gameLoop:function(){
            gGameEngine.update();
            gGameEngine.draw();
        },
        setBallInitialLocation:function(){
            var common = JSON.parse(gFilesManager.levelsConfigJSON);
            var entitySpec = {};
            entitySpec.pos = common.ball.pos;
            entitySpec.radius = common.ball.radius;
            gGameEngine.spawnEntity(ball.type, entitySpec);
        },
        update: function () {
            var i = 0;
            var ent;
            for (i = 0; i < this.entities.length; i++) {
                ent = this.entities[i];
                if (!ent.killed()) {
                    ent.update();
                }
                else {
                    this._deferredKill.push(ent);
                }
            }

            for (i = 0; i < this._deferredKill.length; i++) {
                ent = this._deferredKill[i];
                gGameEngine.removeEntity(ent);
            }

            this._deferredKill = [];

            gPhysicsEngine.update();
        },
        draw: function () {
            var ent = null;
            for (var i = 0; i < this.entities.length; i++) {
                ent = this.entities[i];
                if (!ent.killed()) {
                    ent.draw();
                }
            }
        }
    };