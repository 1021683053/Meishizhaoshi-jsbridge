/*!
 * Name: jsbridge - bridge for IOS&Android
 * Repository: https://github.com/90Team/jsbridge
 * Author: Liweifeng
 */
!(function () {

    var bridge = function(){

    };

    //返回浏览器信息
    var client =
    function(){
        var client = {};
        var UA = navigator.userAgent;
        var isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
        var isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        client.version = version(UA) || 0;
        client.name = name(UA) || 'Browser';
        client.isAndroid = isAndroid;
        client.isiOS = isiOS;

        function version(UA){
            var match = UA.match(/(Meishizhaoshi)\/(\d+(?:.\d+(?:.\d+)?)?)/);
            return !match ? null : match[2];
        }
        function name(UA){
            var match = UA.match(/(Meishizhaoshi)\/(\d+(?:.\d+(?:.\d+)?)?)/);
            return !match ? null : match[1];
        }
        return client;
    };

    bridge.client = client();

    //柯理化
    function currying(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var _args = args.concat([].slice.call(arguments));
            return fn.apply(_args, _args);
        };
    };

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
