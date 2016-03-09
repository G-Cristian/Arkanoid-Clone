//Base Block
var createBlock = function (spec, my) {
    var that;
    my = my || {};

    that = createEntity(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superKill = that.superior('kill');

    my.currSprite = null;

    if (spec)
        my.currSprite = spec.sprite || null;

    that.init = function (args) {
        superInit(args);
        if (args) {
            //TODO replace for animation instead of sprite
           // my.currSprite = args.sprite || null;
        }
    };

    that.update = function () {
        superUpdate();
        //TODO
        //update animation and set currSprite to the current sprite in the animation
    };

    that.kill = function () {
        superKill();
    };

    return that;
};
//redBlock
var createRedBlock = function (spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    spec.sprite = 'redblock_1';
    that = createBlock(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superKill = that.superior('kill');

    that.init = function (args) {
        args = args || {};
        args.sprite = args.sprite || 'redblock_1';
        superInit(args);
    };

    return that;
};

gGameEngine.factory["redBlock"] = createRedBlock;