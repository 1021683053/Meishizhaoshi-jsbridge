
    //JS Bridge 桥梁构建
    var UA = navigator.userAgent,
        client = new Client('Meishizhaoshi', UA);

    var Bridge = function(){
        this.inapp = client.version || false;
    };

    Bridge.prototype.setup = function(){
        self = this;
        if( this.inapp ){
            WebViewJavascriptBridge(function( native ){

            });
        }else{

        }
    };

    
