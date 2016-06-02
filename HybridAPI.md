总控配置参数
=============

## 协议对应


http://tpl.zhaogeshi.me/{bname}/{tplid}.tpl?{param}

变量    | 说明
--------|---------
{bname} | 模块名称
{tplid} | 模板ID（模块下的urls.key）
{param} | 数据参数

遇到以上规则的地址调用本地化HTML5,问号后面的参数作为业务参数,需要在页面加载时注入模块的config和{param}业务参数到html页面的<head>标签的开头

js注入参考 for ios

```javascript
/**===========================JS  注入====================================*/
	[self.webView stringByEvaluatingJavaScriptFromString:@"var script = document.createElement('script');"
	 "script.type = 'text/javascript';"
	 "script.text = \"var Config= {key:\"val\",key1:222};"   // 模块中config的相关参数
	 "var Param = {key:\"val\",key1:222};\";" // 业务中的相关参数
	 "document.getElementsByTagName('head')[0].appendChild(script);"];  //添加到head标签中
```

js注入参考 for android

```javascript
/**===========================JS  注入====================================*/
    String jsstr="var script = document.createElement('script');\n";
    jsstr += "script.type = 'text/javascript';\n";
    jsstr += "script.text = \"var Config= {key:\"val\",key1:222};\n"   // 模块中config的相关参数
    jsstr += "var Param={key:\"val\",key1:222};\";\n" // 业务中的相关参数
    jsstr += "document.getElementsByTagName('head')[0].appendChild(script);";" // 业务中的相关参数
	webView.loadUrl("javascript:"+jsstr)
```

以上 Config或者Param的中双引号一定用\\引用一下，或者使用英文单引号

## 总控制配置

```json
{
    "bizUri": "server.zhaogeshi.com",
    "imageUri": "static.zhaogeshi.com",
    "userUri": "user.zhaogeshi.com",
    "hotFixJS": "var a = 1;",
    "imageURL": "http://bbs.feng.com/data/attachment/forum/201509/01/125251v9xkyyyhyaod99ye.png",
    "imageTimeout": 2,
    "version": 1,
    "domains": [
        "tpl.zhaogeshi.me",
        "server.zhaogeshi.com",
        "user.zhaogeshi.com",
        "static.zhaogeshi.me",
        "10.0.0.125"
    ],
    "apiVersion": [
        {
            "api": "logon.json",
            "method": "GET",
            "version": "v2.0"
        },
        {
            "api": "regist.json",
            "method": "POST",
            "version": "v3.1"
        }
    ],
    "module": [
        {
            "mid": "bootstrap",
            "urls": {},
            "version": "c901",
            "opt": "N",
            "packageurl": "http://um.devdylan.cn/bootstrap.zip",
            "config": {
                "key": "value"
            }
        },
        {
            "mid": "LeafModules",
            "version": "ib42",
            "opt": "N",
            "packageurl": "http://um.devdylan.cn/LeafModules.zip",
            "urls": {
                "enter.tpl": "index.html",
                "classPayment.tpl": "classPayment.html",
                "detail.tpl": "detail/detail.html"
            },
            "config": {
                "key": "value"
            }
        }
    ]
}

```
> 获取配置文件后主动对比与本地文件的差异

> 一旦一个目录里面的文件数据为空时，就将目录也删除掉

## html5 前端文件加载

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document test</title>
    <!-- //加载公共资源css -->
    <link rel="stylesheet" type="text/css" href="../../bootstrap/css/bootstrap.css">
</head>
<body>
	
	<form class="form-search">
	  	<input type="text" class="input-medium search-query">
  		<button type="submit" class="btn btn-info">Search</button>
	</form>
	
	<button class="btn btn-large btn-block btn-primary" type="button">Block level button</button>
	<button class="btn btn-large btn-block" type="button">Block level button</button>
	
</body>
</html>
```

## 更新版本 call.json

接口名：call.json

参数列表

参数名称 | 请求类型 | 请求方式 | 是否必须 | 说明
---------|----------|----------|----------|---------------------
version  | int      | POST     | 否       | 本地的最新版本号
moduleVersion  | json      | POST     | 否       | 本地的所有子模块的版本号列表 , 分隔

参数 version || moduleVersion 为空时，默认只会生成全新包

数据请求示例, Content-Type: application/json

```json
moduleVersion:[
	{"id":"模块名","ver":"版本号"},
	{"id":"huicuimain","ver":"332t5uc"}
]
```

©Dylan. mszs.tec