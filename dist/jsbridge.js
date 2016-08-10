/*!
 * Name: jsbridge - bridge for IOS&Android
 * Repository: https://github.com/90Team/jsbridge
 * Author: Liweifeng
 */
!(function () {

    //返回浏览器信息
    var UA = navigator.userAgent;
    var Client = function( APP, UA){
        if( this == window ){
            return new Client(APP, UA);
        };
        var match = null,
            reg = makereg(APP, '(<%flg%>)\/([M|C])_(\\d+(?:.\\d+(?:.\\d+)?)?)');

        match = UA.match(reg);
        this.version = (!match ? null : match[3]) || 0;
        this.category = (!match ? null : match[2]) || 0;
        this.name = (!match ? null : match[1]) || 'Browser';

        function makereg(flg, str){
            var regstr = str.replace(/<\%flg\%>/, flg);
            return new RegExp(regstr);
        };
    };
    var client = new Client('Meishizhaoshi', UA);

    //JS Bridge 桥梁构建
    var bridge = {};

    var handler = setNativeBridge;

    bridge.native = null;

    bridge.onload = function(){
        handler(function(native){
            bridge.native = native;
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

    bridge.onload();

    //柯理化
    function currying(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var _args = args.concat([].slice.call(arguments));
            return fn.apply(_args, _args);
        };
    };

    //暴露接口
    bridge.client = client;
    bridge.isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
    bridge.isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

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
