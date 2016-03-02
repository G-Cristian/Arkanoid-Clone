//gInputEngine
var gInputEngine =
    {
        //dictionary where the key is a string value representing an action 
        //and the value is a boolean indicating whether it is currently being performed
        actions: {},
        //maps keycode values to string values representing actions
        bindings: {},

        mouse: {
            x: 0,
            y: 0
        },

        init: function (domElement) {
            this.actions = {};
            this.bindings = {};
            this.mouse = {
                x: 0,
                y: 0
            };

            var element = document.getElementById(domElement);
            element.addEventListener('mousemove', this.onMouseMove);
            element.addEventListener('keyup', this.onKeyUp);
            element.addEventListener('keydown', this.onKeyDown);
        },

        bind: function (key, action) {
            this.bindings[key] = action;
        },
        onMouseMove: function (event) {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        },
        onKeyUp: function (event) {
            var code = event.keyCode || event.which;
            var action = this.bindings[code];

            if (action) {
                this.actions[action] = false;
            }
        },
        onKeyDown: function (event) {
            var code = event.keyCode || event.which;;
            var action = this.bindings[code];

            if (action) {
                this.actions[action] = true;
            }
        }
    };