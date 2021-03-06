    //M暴露对外接口
    var M = function(){};
    M.prototype = bridge;

    // API请求map
    var amap = {
        B : "Busi", //商家服务器
        U : "User", //用户服务器
        S : "Static" //静态文件服务器
    };

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
    };

    //增添配置表
    function configure( config ){

    };

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
    };

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

    //message 消息框
    M.prototype.message = function(message){
        var intro = [].slice.call(arguments),
            outro = [];
            outro.push({message:intro[0]});
        var args = build_args(outro, "showMessage" );
        this.emit.apply(bridge, args);
    };

    //停止刷新
    M.prototype.stoppull = function(){
        var args = build_args(arguments, "stopPullRefreshWebView" );
        this.emit.apply(bridge, args);
    };

    //关闭窗口
    M.prototype.close = function(){
        var args = build_args(arguments, "closeWindow" );
        this.emit.apply(bridge, args);
    };

    //通过native get请求数据
    M.prototype.GET = function(){
        var intro = [].slice.call(arguments),
            outro = [],
            param = {
                path: '/',
                param: {},
                method: "GET",
                host: amap['B']
            },
            callback;

        if( isFunction( intro[ intro.length-1 ] ) ){
            callback = intro[intro.length-1];
        };
        if( isString( intro[1] ) ){
            param.path = intro[1];
        };
        if( isObject( intro[2] ) ){
            param.param = intro[2];
        };
        param.host = amap[intro[0]];
        outro.push(param, callback);
        var args = build_args(outro, "sendApi" );
        this.emit.apply(bridge, args);
    };

    //通过native post请求数据
    M.prototype.POST = function(){
        var intro = [].slice.call(arguments),
            outro = [],
            param = {
                path: '/',
                param: {},
                method: "POST",
                host: amap['B']
            },
            callback;

        if( isFunction( intro[ intro.length-1 ] ) ){
            callback = intro[intro.length-1];
        };
        if( isString( intro[1] ) ){
            param.path = intro[1];
        };
        if( isObject( intro[2] ) ){
            param.param = intro[2];
        };
        param.host = amap[intro[0]];
        outro.push(param, callback);
        var args = build_args(outro, "sendApi" );
        this.emit.apply(bridge, args);
    };

    //打开原生组件
    M.prototype.sys = function(identifier, param){
        var outro = {identifier:identifier, param: isObject(param) ? param : {}};
        var args = build_args([outro], "openWindow" );
        this.emit.apply(bridge, args);
    };

    //调用上一层注册
    M.prototype.parent = function(){
        var intro = [].slice.call(arguments);
        var handlerName = intro[1] ? intro[0] :'childenClose';
        var param = intro[intro.length-1];
        var outro = {handlerName:handlerName, param: param || {}};
        var args = build_args([outro], "prevBridgeCall" );
        this.emit.apply(bridge, args);
    };

    //开启导航按钮
    M.prototype.enright = function(text){
        var param = {
            title: "确定",
            titleHexColor: "#000000",
            font: "16"
        };
        param.title = text ? text: "确定";
        var args = build_args([param], "setRightItem" );
        this.emit.apply(bridge, args);
    };

    //下拉功能开启
    M.prototype.enpull = function(){
        var args = build_args(arguments, "addPullRefreshWebView" );
        this.emit.apply(bridge, args);
    };

    //关闭橡皮筋
    M.prototype.disbomb= function(){
        var param = {};
        param.bounced = "no";
        this.emit('canBounced', param, function(){});
    };

    // 默认configure
    var settings = {
        bomb: true,
        text: false,
        textcb: false,
        pullcb: false,
        soncb: false,
    };

    // 开启配置
    M.prototype.configure = function(options){
        console.log(options);
        for( key in  options){
            settings[key] = options[key]
        }
        return this;
    };

    //加载完成
    M.prototype.onload = function(){
        var cb = ([].slice.call(arguments))[0],
            self = this;
        this.init(function(){

            // 启动配置

            // 右键按钮文字
            if( settings.text && isString(settings.text) ){
                self.enright( settings.text );
            };

            // 右键回调
            if( settings.textcb && isFunction(settings.textcb) ){
                self.on('rightItemOnClick', settings.textcb);
            };

            // 开启下拉刷新功能
            if( settings.pullcb && isFunction( settings.pullcb ) ){
                self.enpull();
                self.on('refreshTriggered', function(){
                    settings.pullcb(function(){
                        self.stoppull();
                    });
                });
            };

            // 开启子层回调
            if( settings.soncb && isFunction( settings.soncb ) ){
                self.on("childenClose", soncb );
            }

            // 开启／关闭橡皮筋
            if( !settings.bomb ){
                self.disbomb();
            }

            cb();
        });
    };
