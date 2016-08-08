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
    function( appname, UA){
        var _client = {},
            _isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1,
            _isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            _version_reg = make_reg( appname, '/(<%flg%>)\/(\d+(?:.\d+(?:.\d+)?)?)/'),
            _match = UA.match(_version_reg);

        _client.version = version(UA) || 0;
        _client.name = name(UA) || 'Browser';
        _client.isAndroid = _isAndroid;
        _client.isiOS = _isiOS;
        function version(){
            return !_match ? null : match[2];
        }

        function name(){
            return !_match ? null : match[1];
        }

        function make_reg( flg, str){
            var reg_str = str.replace(/<\%flg\%>/, flg);
            return new RegExp(reg_str);
        }
        return _client;
    };

    //柯理化
    function currying(fn) {
        var args = [].slice.call(arguments, 1);
        return function() {
            var _args = args.concat([].slice.call(arguments));
            return fn.apply(_args, _args);
        };
    };

    bridge.client = client('Meishizhaoshi', navigator.userAgent);

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
