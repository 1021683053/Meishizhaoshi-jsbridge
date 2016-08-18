    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function() {
            return new M();
        });

    // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = null;

    // Bowser
    } else {
        this.M = new M();
    }
})();
