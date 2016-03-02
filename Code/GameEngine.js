
//gGameEngine
var gGameEngine =
    {
        ctx: null,
        setup: function () {
            var body = document.getElementById("body");
            var canvas = document.createElement("canvas");
            /*gFilesManager.readFile("../JSON/CanvasConfig.json", function (responceText) {
                var parsed = JSON.parse(responceText);
                canvas.width = parsed.width;
                canvas.height = parsed.height;
                body.appendChild(canvas);
                gGameEngine.loadFiles();
            });*/
            console.log('var canvas = document.createElement("canvas");');
            var parsed = JSON.parse(CanvasConfig);
            console.log('var parsed = JSON.parse(CanvasConfig);');
            canvas.width = parsed.width;
            console.log('canvas.width = parsed.width;');
            canvas.height = parsed.height;
            body.appendChild(canvas);
            gGameEngine.loadFiles();
        },
        loadFiles:function()
        {
            /*gFilesManager.loadConfigurationFile("../JSON/FilesToLoad.json", function () {
                gGameEngine.start();
            });
            */
        },
        start: function () {

        }
    };