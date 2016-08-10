    //JS Bridge 桥梁构建
    var bridge = {};

    var handler = setNativeBridge;

    bridge.native = window.WebViewJavascriptBridge || null;

    bridge.init = function(){
        console.log(arguments);
        var cb = ([].slice.call(arguments))[0];
        if( bridge.native ){
            if( cb ){cb()};
            return;
        }
        handler(function(native){
            bridge.native = native;
            if( cb ){cb()};
        });
    };

    bridge.on = function(){
        var args = [].slice.call(arguments);
        bridge.native.registerHandler.apply(handler, args);;
    };

    bridge.emit = function(){
        var args = [].slice.call(arguments);
        bridge.native.callHandler.apply(handler, args);
    };
