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
