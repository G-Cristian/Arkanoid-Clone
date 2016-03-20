///<reference path = PhysicsEngine.js />
//Base Block
var createBlock = function (spec, my) {
    var that;
    var entityDef = null;
    my = my || {};

    my.physBody = null;

    that = createEntity(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superDraw = that.superior('draw');
    var superKill = that.superior('kill');

    my.currSprite = null;

    if (spec) {
        my.currSprite = spec.sprite || null;

        entityDef = {
            x: spec.pos.x,
            y: spec.pos.y,
            halfWidth: spec.size.x * 0.5,
            halfHeight: spec.size.y * 0.5,
            type:'static',
            userData: {
                ent:that
            }
        };

//        my.physBody = gPhysicsEngine.addBody(entityDef);
    }

    that.init = function (args) {
        superInit(args);
        if (args) {
            var entityDef = {
                x: args.pos.x,
                y: args.pos.y,
                halfWidth: args.size.x * 0.5,
                halfHeight: args.size.y * 0.5,
                type: 'static',
                userData: {
                    ent: that
                }
            };
            
//            my.physBody = gPhysicsEngine.addBody(entityDef);
            //TODO replace for animation instead of sprite
           // my.currSprite = args.sprite || my.currSprite;
        }
    };

    that.draw = function () {
        console.log("draw block");
        superDraw();
    };

    that.onTouch = function (otherBody, point, impulse) {

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

//greenBlock
var createGreenBlock = function (spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    spec.sprite = 'greenblock_1';
    that = createBlock(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superKill = that.superior('kill');

    that.init = function (args) {
        args = args || {};
        args.sprite = args.sprite || 'greenblock_1';
        superInit(args);
    };

    return that;
};

//blueBlock
var createBlueBlock = function (spec, my) {
    var that;
    my = my || {};
    spec = spec || {};

    spec.sprite = 'blueblock_1';
    that = createBlock(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superKill = that.superior('kill');

    that.init = function (args) {
        args = args || {};
        args.sprite = args.sprite || 'blueblock_1';
        superInit(args);
    };

    return that;
};

gGameEngine.factory["redBlock"] = createRedBlock;
gGameEngine.factory["greenBlock"] = createGreenBlock;
gGameEngine.factory["blueBlock"] = createBlueBlock;