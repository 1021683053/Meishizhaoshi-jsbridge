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

|  参数名称   |  请求类型  |      | 是否必须 |             说明             |
| :-----: | :----: | :--: | :--: | :------------------------: |
|   app   | String |      |  是   | 区别产品类别(商户 MEC、学生STU、保险INS) |
| version | String |      |  是   |     本地Hybrid总控配置文件的版本号     |

>  如果version、moduleVersion任意一项为空, 默认只会生成全新包
>
>  客户端本地做模块的差异对比

数据请求示例, Content-Type: application/json

```json
app: "MEC",
version: "a4fc6"
```

#### 返回值

```json
{
    "version": "WebApp 配置文件版本号",
    "module": [
        {
            "mid": "子模块名称/ID/唯一标识",
            "version": "子模块版本号字串, 一般为Git短版本号",
            "packageurl": "http://um.devdylan.cn/bootstrap.zip", # 子模块下载地址
            "urls": {}, # 子模块URL映射表: `TPL标识：真实路径`
        },
        {
            "mid": "LeafModules",
            "version": "ib42",
            "packageurl": "http://um.devdylan.cn/LeafModules.zip",
            "urls": {
                "enter.tpl": "index.html",
                "classPayment.tpl": "classPayment.html",
                "detail.tpl": "detail/detail.html"
            },
        }
    ]
}
```
> 可选：主动做文件CRC校验, 请勿使用MD5校验, 计算文件md5耗费大量时间。

注： 

- 生成配置文件流程：客户端携带当前配置文件版本以及子模块版本号->发起请求->服务端处理请求：

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

#### 注：

- 所有的子模块解压到`统一级别目录下`，模块间调用使用相对路径。
- 打开新窗口可使用.tpl访问本地模块，如果本地模块不存在则访问线上模块。
- 保险类WebApp中web容器均需为全屏容器，并提供open方法以打开新的全屏容器。



#### 后台管理系统

###### 更新模块

接口名称：updateModule *提供新版本的模块版本号即可*

参数表单：param

| 参数名称       | 参数类型   | 参数描述      |
| ---------- | ------ | --------- |
| mid        | String | 模块ID      |
| version    | String | 新的Git短版本号 |
| packageurl | String | 模块下载地址    |
| urls       | Object | 对应规则      |

返回值：

```json
{
  "message": "更新成功!",
  "status" : "successful",
}
```

###### 增加模块

接口名称：createModule *增加完整的模块配置*

参数表单：param

| 参数名称       | 参数类型   | 参数描述    |
| ---------- | ------ | ------- |
| mid        | String | 子模块唯一标识 |
| version    | String | 子模块版本   |
|            |        |         |
| packageurl | String | 子模块下载地址 |
| urls       | Object | 映射表     |

返回值：

```json
{
  "message": "创建成功!",
  "status" : "successful",
  "data"   : {
            "mid": "子模块名称/ID/唯一标识",
            "version": "子模块版本号字串, 一般为Git短版本号",
            "packageurl": "http://um.devdylan.cn/bootstrap.zip", # 子模块下载地址
            "urls": {}, # 子模块URL映射表: `TPL标识：真实路径`
  }
}
```



$更新时间: 2016-8-25 