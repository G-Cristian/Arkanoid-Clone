///<reference path = PhysicsEngine.js />
//Base Block
var createBall = function (spec, my) {
    var that;
    var entityDef = null;
    my = my || {};

    my.physBody = null;
    
    var speed = 1;
    var dir = {
        x:1,
        y:1
    };

    that = createEntity(spec, my);

    var superInit = that.superior('init');
    var superUpdate = that.superior('update');
    var superDraw = that.superior('draw');
    var superKill = that.superior('kill');

    my.currSprite = "ball";
    my.radius = 3;

    if (spec) {
        my.currSprite = spec.sprite || my.currSprite;
        my.radius = spec.radius || my.radius;
        entityDef = {
            x: spec.pos.x,
            y: spec.pos.y,
            type: 'dynamic',
            shape:'circle',
            radius:spec.radius,
            userData: {
                ent:that
            }
        };

//        my.physBody = gPhysicsEngine.addBody(entityDef);
    }

    that.getPhysBody = function () {
        return my.physBody;
    };

    that.init = function (args) {
        superInit(args);
        if (args) {
            my.radius = args.radius || my.radius;

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
                    ent: that,
                    type:'ball'
                }
            };
            
//            my.physBody = gPhysicsEngine.addBody(entityDef);
        }
    };

    that.onTouch = function (otherBody, point, impulse) {
        var otherData = otherBody.GetUserData();
        var otherEntity = null;
        if (otherData) {
            if (otherData.type == 'border'); {
                otherEntity = otherData.ent;
                if (otherEntity.side == 'right' || otherEntity.side == 'left') {
                    dir.x *= -1;
                }
                else if (otherEntity.side == 'top' || otherEntity.side == 'down') {
                    dir.y *= -1;
                }
            }
        }
    };

    that.update = function () {
        console.log("update ball");
        var physPos = null;
        superUpdate();
        my.last.x = my.pos.x;
        my.last.y = my.pos.y;
        
        var worldSize = gGameEngine.commonLevelConfig.worldSize;
        

        if (my.pos.x + my.size.x >= worldSize.x) {
            my.pos.x = worldSize.x - my.size.x;
            dir.x *= -1;
        } else if (my.pos.x - my.size.x <= 0) {
            my.pos.x = my.size.x;
            dir.x *= -1;
        }

        if (my.pos.y + my.size.y >= worldSize.y) {
            my.pos.y = worldSize.y - my.size.y;
            dir.y *= -1;
        } else if (my.pos.y - my.size.y <= 0) {
            my.pos.y = my.size.x;
            dir.y *= -1;
        }

        my.pos.x += dir.x * speed;
        my.pos.y += dir.y * speed;
            
        //TODO
        //update pos
    };

    that.draw = function () {
        console.log("draw ball");
        superDraw();
    };

    that.kill = function () {
        superKill();
    };

    return that;
};

gGameEngine.factory["ball"] = createBall;