    //柯理化
    function currying(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var _args = args.concat([].slice.call(arguments));
            return fn.apply(_args, _args);
        };
    };
