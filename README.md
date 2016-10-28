# jsbridge

IOS 参考SDK [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)

Android 参考SDK [WebViewJavascriptBridge](https://github.com/gzsll/WebViewJavascriptBridge)



** 相关文章 **

- [Hybrid 模块本地化解决方案](https://github.com/90Team/jsbridge/blob/master/HybridAPI.md)


- [Hybrid 开发文档](http://johnwong.github.io/mobile/2015/04/20/cross-platform-and-hybrid.html)
- [HTML/Android/Chrome-WebViewJavascriptBridge](https://github.com/fangj/WebViewJavascriptBridge)

## user-agent
Android&IOS

`[系统user-agent][空格]Meishizhaoshi/[M/C 商家版/学生版]_[版本号]`

example

Android: `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 Meishizhaoshi/C_3.4.1`

IOS: `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Meishizhaoshi/M_3.4.1`

_*注：向后追加版本号*_


## package

```
npm install
npm run bulid
.
.
.
`dist/jsbridge.js`
`dist/jsbridge.min.js`
```
## useage
    global variable is `M`
    - require.js, seajs
    - window.M

## client
M.client
```
/*
 * return
 * version [!0][app version / [0]not in Meishizhaoshi app
 * name Meishizhaoshi / 0
 * category M/C
 */
```
## cdn

upload Qiniu cdn server

```shell
npm run upload
```
use in html

```html
<script src="http://assets.meishizhaoshi.com/jsbridge.js" charset="utf-8" />
<script src="http://assets.meishizhaoshi.com/jsbridge.min.js" charset="utf-8" />
```
## JavaScript API
```javascript

/* 分享
 * param:{text:'', url: '', title: ''}, callback:分享跳回来的回调
 */
M.share(`param`, `callback`);


/* 打开城市列表API
 * callback
 */
M.cityview(`callback`);


/* 直接获取城市详情
 * callback
 */
M.city(`callback`);


/* 刷新webview
 */
M.reload();


/* 获取Token
 * callback
 */
M.token(callback);


/* 加载进度条
 */
M.inloader();


/* 卸载进度条
 */
M.unloader();


/* 打开一个页面
 * url 仅支持绝对路径
 */
M.link(`url`);


/* confirm弹窗
 * text, callback_ok, callback_pass
 */
M.confirm(`text`, `callback_ok`, `callback_pass`);
M.confirm(`text`, `callback_ok`);


/* alert弹窗
 * text, callback_ok
 */
M.alert(`text`, `callback_ok`);


/* GET请求
 * server:[B|C|S], api, callback
 */
M.GET(`server`, `api`, `callback`);


/* POST请求
 * server:[B|C|S], api, callback
 */
M.POST(`server`, `api`, `callback`);


/* 打开下拉刷新功能
 */
M.EnablePull();


/* 完成下拉来刷新
 */
M.stopull();


/* message提示框
 * text
 */
M.message(`text`);


/* 打开系统浏览器
 * url
 */
M.oslink(`url`);


/* 关闭窗口
 */
M.close();


/* 右侧按钮设置
 * text
 */
M.EnableRight(`text`);

/* 调用复层注册的 childenClose方法
 * object
 */
M.parent(`object`);
```
--- 注：其他例子请看源码或者例子！ ---


## 功能需求

**没事找事APP `WebView`与`UIView` `jsbridge`**

*   城市
    *   得到城市地点和城市ID
    *   打开城市页面选择后回调
*   分享
    *   `js`打开`app`分享`app`分享后回调

**WebView功能实现**

1.  浏览器`user-agent`的规范
-   打开浏览器判断域名是否属于允许的域名 如果允许种 `Cookie`
-   浏览器关闭按钮（参考微信）
-   下拉刷新（`WebView`与`app`导航分层）
    *   下拉刷新整个`WebView`
    *   下拉回调`js`进行局部刷新
-   导航选项菜单（参考天猫）
-   `alert`弹窗，`confirm`弹出， `loading`
-   **`js`进行各个页面的调用包括参数和回调**

*最后一个功能比较重要，需要整体规划页面，和页面跳转，每个页面需要有传参*

***



## Native API
原生注入后直接调用方式
```javascript
//此回调属于异步
function setupWebViewJavascriptBridge(callback) {

      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//注册bridge
setupWebViewJavascriptBridge(function(bridge){

    //注册事件
    bridge.registerHandler('refreshTriggered', {}, function(response){
        console.log(response);
    });

    //调用接口
    bridge.callHandler('getCityNameAndId', {}, function(response){
        console.log(response);
    });

});

```



#### 1. 获取城市地点和城市ID

接口：`getCityNameAndId`

参数：param {}

返回值：

| 参数名称     | 参数类型   | 参数描述 |
| -------- | ------ | ---- |
| cityName | String | 城市名称 |
| cityId   | String | 城市ID |

返回示例：

``` javascript
    {
        cityId: '2910',
        cityName: '广州'
    }
```



#### 2. 打开城市选择界面

接口：`openCityChooseView`

参数：param {}

返回值：

| 参数名称     | 参数类型   | 参数描述 |
| -------- | ------ | ---- |
| cityName | String | 城市名称 |
| cityId   | String | 城市ID |



#### 3. 打开分享界面

接口：`showShareView`

参数: param

| 参数名称  | 参数类型       | 参数描述    |
| ----- | ---------- | ------- |
| text  | string<必须> | 分享的文字内容 |
| url   | String<必须> | 分享的链接网址 |
| title | String<必须> | 分享的标题   |

返回值: response

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| statu | bool   | 是否分享成功  |
| data  | Object | 友盟返回的数据 |

返回示例：
``` javascript
    {
        statu: '1',
        data: {
            qq:""
        }
    }
```


#### 4. 主动刷新当前webView

接口：`refreshWebView`

参数：param {}

返回值：response null



#### 5. 主动触发下拉刷新

接口：`pullRefreshWebView`

参数：param {}

返回值：response null

>调用下拉刷新后, 会在触发动作之后调用 `refreshTriggered` 方法, JS需要提前注册该方法, 以备接受下拉刷新动作



#### 6. 停止下拉刷新

接口：`stopPullRefreshWebView`

参数：param {}

返回值：response null



#### 7. 添加下拉刷新

接口：`addPullRefreshWebView`

参数：param {}

返回值：response null
>此接口是开启Webview功能，可以下拉刷新，刷新事件触发于`refreshTriggered`中，也就是需要先注册此事件方法！



#### 8. 获取用户token

接口：`getUserToken`

参数：param {}

返回值：response

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| token | String | token字串 |
返回示例：
``` javascript
    {
        token: "u5***************"
    }
```



#### 9. 显示Alert, confirm

接口：`showAlert`, `showConfirm`

参数：param

| 参数名称                    | 参数类型   | 参数描述                 |
| ----------------------- | ------ | -------------------- |
| type                    | String | 'alert'或者'confirm'   |
| confirmMethodName       | String | 确认按钮的回调方法<必须>        |
| confirmMethodIdentifier | String | 确认按钮回调的标识<必须>        |
| cancelMethodName        | String | 取消按钮的回调方法<confirm必须> |
| cancelMethodIdentifier  | String | 取消按钮回调的标识<confirm必须> |
| confirmTitle            | String | 确认按钮标题               |
| cancelTitle             | String | 取消按钮标题<confirm必须>    |
| title                   | String | 弹窗标题<必须>             |
| message                 | String | 消息内容<必须>             |

>`confirmMethodName`与`confirmMethodIdentifier`这样的字符用于回调, JS需要先注册方法名称, 供OC点击按钮后回调。

返回值：response

| 参数名称       | 参数类型   | 参数描述 |
| ---------- | ------ | ---- |
| identifier | String | 标识   |



#### 9.1 显示提示框（提示文字以及确认按钮, 无回调操作）

接口名：showMessage

参数：param

| 参数名称        | 参数类型   |        |
| ----------- | ------ | ------ |
| message     | String | 消息内容   |
| buttonTitle | String | 确认按钮标题 |



#### 10. 显示Loading, 隐藏Loading

接口：`showLoading`, `hideLoading`

参数：param

| 参数名称 | 参数类型   | 参数描述        |
| ---- | ------ | ----------- |
| text | String | Loading提示文字 |

返回值：response

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| token | String | token字串 |



#### 10.打开窗口(WebView)

接口：`openURL`

参数：param

| 参数名称 | 参数类型       | 参数描述  |
| ---- | ---------- | ----- |
| url  | String<必须> | 目标URL |

返回值：response {}



#### [10.1打开窗口(Native)](#openWindow)

接口: `openWindow`

参数: param

| 参数名称       | 参数类型       | 参数描述             |
| ---------- | ---------- | ---------------- |
| identifier | String<必须> | 约定好的Native界面唯一标识 |
| param      | Object<必须> | 约定好的Native界面所需参数 |

identifier: 先去写死的Map中查询对应关系, 如果 map[identifier] 不存在, 如果 identifier为Activity名称就直接使用反射进行跳转。

Map

| identifier | param |
| ------- | ------|
| item | {id:"3232123232123"}|


#### 10.2关闭窗口

接口: `closeWindow`



#### 11. 网络请求

接口：`sendApi`

参数：param

| 参数名称   | 参数类型      | 参数描述                        |
| ------ | --------- | --------------------------- |
| path   | String    | 网络请求的Path                   |
| param  | Object {} | 网络请求的键值对参数                  |
| method | String    | 网络请求的方式 `GET` OR `POST`     |
| host   | String    | Busi User Static 不传 默认为Busi |

返回值：response

**直接调用callBack进行值的返回, 如果callBack不存在或者被释放, 本次网络请求结果无着陆点**



#### 12. 打开系统级别URL(safari, message, tel ...)

接口：`openSysURL`

参数：param

| 参数名称 | 参数类型       | 参数描述  |
| ---- | ---------- | ----- |
| URL  | String<必须> | 打开的地址 |

iOS目前支持： tel:// http:// ….系统支持的这里都行, 包括跳转到AppStore等。

#### 13. WebView brige CallHandler

描述：让前一个WebView的bridge去callHandler：WithParam：, 完成webView之间消息的流通。

接口：prevBridgeCall

参数：param

| 参数名称        | 参数类型   | 参数描述               |
| ----------- | ------ | ------------------ |
| handlerName | String | 前一个WebView已注册的方法名称 |
| param       | Object | 需要传递到该函数中的参数值      |

#### 14. setRightItem

描述：设置右上角按钮的操作 （iOS, Android）

接口：setRightItem

参数：param

| 参数名称          | 参数类型       | 参数描述               |
| ------------- | ---------- | ------------------ |
| title         | String<必须> | 按钮的标题              |
| titleHexColor | String<必须> | 按钮标题文字颜色 比如：34A3FF |
| font          | String<必须> | 按钮标题文字字体大小         |

注：回调直接使用 Web端注册的 rightItemOnClick方法, 参数为nil

#### 15. popToRoot

描述：返回到学生端首页（Android）; 返回到顶级视图控制器（iOS）

接口：popToRoot

参数：空

#### 16. canBounced

描述：是否可以回弹（iOS）

接口：canBounced

参数：param

| 参数名称    | 参数类型       | 参数描述                                 |
| ------- | ---------- | ------------------------------------ |
| bounced | String<必须> | 是否可以回弹 值： yes, no 字串, webView默认为可以回弹 |
