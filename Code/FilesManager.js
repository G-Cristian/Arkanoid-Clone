var gTypesOfFileToLoad = {
    "scripts": function (script, callback) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.addEventListener('onload', function (e) {
            callback();
        }, false);
        fileref.setAttribute("src", script);
        document.getElementsByTagName('head')[0].appendChild(fileref);
    },
    "sprites": function (sprite, callback) {
        callback();
    },
    "sounds": function (sounds, callback) {
        callback();
    }
}

//gFileManager
var gFilesManager =
    {
        readFile:function(fileName, callback, responceType){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", fileName, true);
            if(responceType)
                xhr.responseType = responceType;
            xhr.onload = function () {
                callback(this.responseText);
            }
            /*xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 0) {
                        callback(xhr.responseText);
                        alert("status = 200 or 0");
                    }
                    alert("readystate = 4");
                }
            }*/
            xhr.send(null);
        },
        loadConfigurationFile: function (fileName, callback) {
            this.readFile(fileName, function (responseText) {
                var parsed = JSON.parse(responseText);
                var loadBatch = {
                    total:0,
                    count:0,
                    callback:callback
                };

                for (var elem in parsed)
                    loadBatch.total++;

                for (var e in parsed) {
                    gFilesManager.loadAssets(parsed[e], e, function () {
                        gFilesManager.onLoadedCallback(e, loadBatch);
                    });
                }
            });
        },
        loadAssets:function(assetList, typeOfData, callback){
            var batch = {
                total: scripts.length,
                count: 0,
                cb: callback
            };

            for (var i = 0; i < assetList.length; i++) {
                gTypesOfFileToLoad[typeOfData](assetList[i], function(){
                    gFilesManager.onLoadedCallback(assetList[i], batch);
                });
            }
                
            

            
        },
        onLoadedCallback:function(asset, batch)
        {
            batch.count++;
            console.log("Asset '" + asset + "' loaded.");
            if (batch.count >= batch.total)
                batch.callback();
        }
    };