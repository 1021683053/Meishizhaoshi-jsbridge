
    //JS Bridge 桥梁构建
    var UA = navigator.userAgent,
        client = new Client('Meishizhaoshi', UA);


    var Bridge = function(){
        this.inapp = client.version || false;
        this.handler = null;
        if( this.inapp ){
            this.handler = function(callback) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
            };
        }else{
            
        }
    };

    Bridge.prototype.on = function(){
        var args = [].slice.call(arguments);
        this.handler(function(bridge){
            bridge.registerHandler.apply(this.handler, args);
        });
    };

    Bridge.prototype.trigger = function(){
        var args = [].slice.call(arguments);
        this.handler(function(bridge){
            bridge.callHandler.apply(this.handler, args);
        });
    };
