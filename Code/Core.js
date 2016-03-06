Function.prototype.method = function (name, func) {
    if (!this.prototype[name])
        this.prototype[name] = func;
    return this;
};

Number.method('integer', function () {
    return this < 0.0 ? Math.ceil(this) : Math.floor(this);
});