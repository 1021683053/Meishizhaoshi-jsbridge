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
