
//entity
var createEntity = function (spec, my) {
    var that;
    my = my || {};
    my.pos = {
        x: 0,
        y: 0
    };
    my.size = {
        x: 0,
        y: 0
    };
    my.last = {
        x: 0,
        y: 0
    };

    my.type = "";

    my.angle = 0;

    my.killed = false;

    my.currSprite = null;

    if (spec) {
        my.pos = spec.pos || my.pos;
        my.size = spec.size || my.size;
        my.last = spec.last || my.last;
        my.type = spec.type || my.type;
        my.angle = spec.angle || my.angle;
        my.currSprite = spec.sprite || null;
    }

    that = {};

    that.getPos = function () {
        return {
            x: my.pos.x,
            y: my.pos.y
        };
    };

    that.getSize = function () {
        return {
            x: my.size.x,
            y: my.size.y
        };
    };

    that.getLast = function () {
        return {
            x: my.last.x,
            y: my.last.y
        };
    };

    that.getType = function () {
        return my.type;
    };

    that.getAngle = function () {
        return my.angle;
    };

    that.killed = function () {
        return my.killed;
    };

    that.init = function (args) {
        if (args) {
            my.pos = args.pos || my.pos;
            my.size = args.size || my.size;
            my.last = args.last || my.last;
            my.type = args.type || my.type;
            my.angle = args.angle || my.angle;
            my.currSprite = args.sprite || my.currSprite;
        }
    };

    that.update = function () { };

    that.draw = function () {
        if (my.currSprite) {
          //  console.log("sprite = " + my.currSprite);
          //  console.log("last.x = "+ my.last.x + " last.y = " + my.last.y + " pos.x = " + my.pos.x + " pos.y = " + my.pos.y);
            gSpriteManager.drawSprite(my.currSprite, my.pos.x, my.pos.y, my.angle);
        }
    };

    that.kill = function () {
        my.killed = true;
    };
    return that;
};