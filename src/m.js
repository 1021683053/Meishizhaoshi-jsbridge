    //M暴露对外接口
    var M = function(){};
    M.prototype = bridge;

    //类型判断
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }

    var isObject = isType("Object")
    var isString = isType("String")
    var isArray = Array.isArray || isType("Array")
    var isFunction = isType("Function")
    var isUndefined = isType("Undefined")


    //接口参数统一管理参数 ret Array: [ api, param, callback ]
    function build_args( args, conn ){
        var ret = [];
        if( !conn ){
            console.error("Native api is empty!");
        };
        var defaults = {
            name: conn,
            param: {},
            callback: function(){}
        };
        var args = isArray(args) ? args : [].slice.call(args);
        if( !args[1] && isFunction(args[0]) ){
            defaults.callback = args[0];
        };
        !isObject(args[0]) || ( defaults.param = args[0] );
        !isFunction(args[1]) || ( defaults.callback = args[1] );
        ret.push(defaults.name);
        ret.push(defaults.param);
        ret.push(defaults.callback);
        return ret;
    };

    //生成需要的链接 bulid_link (仅支持完整路径和绝对路径)
    function build_link(link){
        var ret = "",
            origin = window.location.origin,
            href = window.location.href;
            // reg_http= /^http[s]?\:\/\//g;

        //是完整的URL
        if( /^http[s]?\:\/\//.test(link) ){
            return link;
        };

        //绝对路径
        if( /^\//.test(link) ){
            return origin+link;
        };
    };

    //生成callback cid
    function cid(){
        var _s_random = genMixed(4);
        var _s_timenum = new Date().getTime();
        return _s_random+"_"+_s_timenum;
    };

    //随机大写字母
    function genMixed(n) {
        var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var ret = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*25);
            ret += chars[id];
        }
        return ret;
    }

    //继承
    function extend(to){
        var dest = to;
        [].slice.call(arguments, 1).forEach(function(from){
            var props = Object.getOwnPropertyNames(from);
            props.forEach(function(name) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            });
        })
        return dest;
    }

    //分享
    M.prototype.share = function(){
        var args = build_args(arguments, "showShareView" );
        this.emit.apply(bridge, args);
    };

    //打开城市列表
    M.prototype.cityview = function(){
        var args = build_args(arguments, "openCityChooseView" );
        this.emit.apply(bridge, args);
    };

    //获取当前城市
    M.prototype.city = function(){
        var args = build_args(arguments, "getCityNameAndId" );
        this.emit.apply(bridge, args);
    };

    //重新加载webview
    M.prototype.reload = function(){
        var args = build_args(arguments, "refreshWebView" );
        this.emit.apply(bridge, args);
    };

    //获取用户登录的Token
    M.prototype.token = function(){
        var args = build_args(arguments, "getUserToken" );
        this.emit.apply(bridge, args);
    };

    //进度条开启
    M.prototype.inloader = function(){
        var args = build_args(arguments, "showLoading" );
        this.emit.apply(bridge, args);
    };

    //关闭进度条
    M.prototype.unloader = function(){
        var args = build_args(arguments, "hideLoading" );
        this.emit.apply(bridge, args);
    };

    //打开新的浏览器窗口
    M.prototype.link = function(){
        var intro = [].slice.call(arguments),
            link = intro[0] || "",
            outro = [];
        var param = {};
            param.url = build_link(link);
        outro.push(param);
        var args = build_args(outro, "openURL" );
        this.emit.apply(bridge, args);
    };

    //打开系统浏览器
    M.prototype.oslink = function(){
        var intro = [].slice.call(arguments),
            link = intro[0] || "",
            outro = [];
        var param = {};
            param.URL = build_link(link);
        outro.push(param);
        var args = build_args(outro, "openSysURL" );
        this.emit.apply(bridge, args);
    };

    //弹出提示 alert
    M.prototype.alert = function(){
        var intro = [].slice.call(arguments),
            outro = [],
            param = {
                type: 'alert',
                confirmTitle: '确定',
                confirmMethodName: '',
                confirmMethodIdentifier: '',
                title: '消息',
                message: '点击确定'
            },
            _cid = cid(),
            _callback;
        var settings = {
            confirmTitle: "确定",
            title: '消息',
            message: '提示确定'
        };

        //全功能对象
        if( isObject( intro[0] ) ){
            settings = extend(settings, intro[0]);
        }
        if( isString( intro[0] ) ){
            settings.message = intro[0];
        }
        if( isString( intro[1] ) ){
            settings.title = intro[1];
        }
        if(isFunction( intro[ intro.length-1 ] )){
            _callback = intro[intro.length-1];
        }

        param = extend(param, settings);
        param.confirmMethodName = _cid;
        param.confirmMethodIdentifier = _cid;
        this.on(_cid, function(response){
            _callback(response.identifier);
        });

        var outro = [];
            outro.push(param);
        var args = build_args(outro, "showAlert" );
        this.emit.apply(bridge, args);
    };

    //弹出提示 confirm
    M.prototype.confirm = function(){
        var intro = [].slice.call(arguments),
            outro = [],
            param = {
                type: 'confirm',
                confirmTitle: '确定',
                confirmMethodName: '',
                confirmMethodIdentifier: '',
                cancelMethodName: '',
                cancelMethodIdentifier: '',
                cancelTitle: '取消',
                title: '消息',
                message: '点击确定'
            },
            _cid_cancel = cid(),
            _cid_confirm = cid(),
            _callback_cancel = function(){},
            _callback_confirm = function(){};
        var settings = {
            confirmTitle: '确定',
            cancelTitle: '取消',
            message: '点击确定',
            title: '消息'
        }

        //全功能对象
        if( isObject( intro[0] ) ){
            settings = extend(settings, intro[0]);
        }
        if( isString( intro[0] ) ){
            settings.message = intro[0];
        }
        if( isString( intro[1] ) ){
            settings.title = intro[1];
        }
        if(isFunction( intro[ intro.length-1 ] ) && isFunction( intro[ intro.length-2 ] ) ){
            _callback_cancel = intro[intro.length-1];
            _callback_confirm = intro[intro.length-2];
        }
        if( isFunction( intro[ intro.length-1 ] ) && !isFunction( intro[ intro.length-2 ] ) ){
            _callback_confirm = intro[intro.length-1];
        }
        param = extend(param, settings);
        param.confirmMethodName = _cid_confirm;
        param.confirmMethodIdentifier = _cid_confirm;
        param.cancelMethodName = _cid_cancel;
        param.cancelMethodIdentifier = _cid_cancel;
        this.on(_cid_confirm, function(response){
            _callback_confirm(response.identifier);
        });
        this.on(_cid_cancel, function(response){
            _callback_cancel(response.identifier);
        });
        var outro = [];
            outro.push(param);
        var args = build_args(outro, "showAlert" );
        this.emit.apply(bridge, args);
    };
