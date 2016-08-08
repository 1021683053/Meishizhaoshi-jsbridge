    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function() {
            return bridge;
        });

    // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = null;
        
    // Bowser
    } else {
        this.bridge = bridge;
    }
})();
