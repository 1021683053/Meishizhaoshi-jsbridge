    //JS Bridge 桥梁构建
    var bridge = {};

    var handler = setNativeBridge;

    bridge.native = window.WebViewJavascriptBridge || null;

    bridge.init = function(){
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

    //暴露接口
    bridge.client = client;
    bridge.isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
    bridge.isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);