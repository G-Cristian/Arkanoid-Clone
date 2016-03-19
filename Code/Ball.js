///<reference path = PhysicsEngine.js />
//Base Block
var createBall = function (spec, my) {
    var that;
    var entityDef = null;
    my = my || {};

    my.physBody = null;
    
    var speed = 5;
    var dir = {
        x:1,
        y:1
    };

    that = createEntity(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superKill = that.superior('kill');

    my.currSprite = "ball";

    if (spec) {
        my.currSprite = spec.sprite || my.currSprite;

        entityDef = {
            x: spec.pos.x,
            y: spec.pos.y,
            halfWidth: spec.size.x * 0.5,
            halfHeight: spec.size.y * 0.5,
            type: 'dynamic',
            shape:'circle',
            radius:spec.radius,
            userData: {
                ent:that
            }
        };

        my.physBody = gPhysicsEngine.addBody(entityDef);
    }

    that.getPhysBody = function () {
        return my.physBody;
    };

    that.init = function (args) {
        superInit(args);
        if (args) {
            var entityDef = {
                x: args.pos.x,
                y: args.pos.y,
                halfWidth: args.size.x * 0.5,
                halfHeight: args.size.y * 0.5,
                type: 'dynamic',
                shape: 'circle',
                useBouncyFixture: true,
                radius: spec.radius,
                userData: {
                    ent: that
                }
            };

            my.physBody = gPhysicsEngine.addBody(entityDef);
        }
    };

    that.onTouch = function (otherBody, point, impulse) {

    };

    that.update = function () {
        var physPos = null;
        superUpdate();
        if (my.physBody) {
            physPos = my.physBody.GetPosition();
            my.pos.x = physPos.x;
            my.pos.y = physPos.y;
            my.physBody.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(dir.x * speed,
                                                                       dir.y * speed));
        }
            
        //TODO
        //update pos
    };

    that.kill = function () {
        superKill();
    };

    return that;
};

gGameEngine.factory["ball"] = createBall;