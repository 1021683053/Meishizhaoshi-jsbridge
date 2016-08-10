    //暴露接口
    bridge.client = client;
    bridge.isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
    bridge.isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    //初始化
    bridge.init();
