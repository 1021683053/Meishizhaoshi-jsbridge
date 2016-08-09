## MSWeb App

#### 协议规则


http://tpl.zhaogeshi.me/{moduleName}/{tplid}.tpl?{param}

| 变量           | 说明                 |
| ------------ | ------------------ |
| {moduleName} | 模块名称               |
| {tplid}      | 模板ID（模块下的urls.key） |
| {param}      | 数据参数               |

遇到以上规则的地址调用MSWeb App, 问号后面的参数作为业务参数, 需通过JS桥传给web。

**动态注入参数直接使用 JS端提供的方法来注入。不需要手动添加script对象, 如果任然需要手动, 注意在界面 onload() 延时 200毫秒后调用注入的对象, 稍有延时。**

------

### 总控制配置文件

#### - 配置加载 webapp.json

接口名：webapp.json

参数列表

|  参数名称  |  请求类型  |      | 是否必须 |       说明        |
| :----: | :----: | :--: | :--: | :-------------: |
| appKey | String |      |  是   |     appKey      |
| appSec | String |      |  是   |     appSec      |
| appVer | String |      |  是   | MSApp的Release版本 |

头部数据

|        参数名称        |  请求类型  |      | 是否必须 |         说明         |
| :----------------: | :----: | :--: | :--: | :----------------: |
|    localVersion    | String |      |  否   | 本地MSWebApp的配置文件版本号 |
| localModuleVersion | String |      |  否   |      本地模块的版本号      |

*localModuleVersion: moduleName=moduleVersion&m2=mv2*

>  如果localVersion、localModuleVersion任意一项为空, 默认只会生成全新包

数据请求示例, Content-Type: application/json

```json
appKey: "zTky32-87jvw",
appSec: "s87c0cat13ngvu4dvrjfr1iv982b3c4m",
appVer: "1.0.0"

#HTTP Header Fields.
localVersion: "3fc45g",
localModuleVersion: "commonModule=3fv5cd&detailModule=8vg3fc"
```

#### 返回值

```
{
    "version": "MSApp Version, User String. (Git short version)",
    "opt": "N", # App options. M: Cover local files. N: Nothing handler. D: Delete.
    "domains": [ 					
        "tpl.zhaogeshi.me",
        "server.zhaogeshi.com",
        "user.zhaogeshi.com",
        "static.zhaogeshi.me",
    ],							#White List, Should not be IPV4 Address. (iOS Review need IPV6).
    "module": [					 #Sub modules.
        {
            "mid": "bootstrap",    # Module id.
            "urls": {},			  # Module url maps. e.g: {"enter.tpl": "index.html"}. Should be An object.
            "version": "c901",     # Module short version. (Git short version)
            "opt": "N",            # Module options. M: Cover local files. N: Nothing handler. D: Delete
            "packageurl": "http://um.devdylan.cn/bootstrap.zip", # Module zip download url.
            "config": {
                "key": "value"     # Value needs inject to javascript dynamic.
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
> 使用前主动做文件CRC校验, 请勿使用MD5校验, 计算文件md5耗费大量时间。

## html5 前端文件加载

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document test</title>
    <!-- 加载公共资源css, 相对路径读取, 客户端会把所有的子模块解压到同一级文件夹下 -->
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
