# jsbridge

IOS 参考SDK [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)

Android 参考SDK [WebViewJavascriptBridge](https://github.com/gzsll/WebViewJavascriptBridge)




** 相关文章 **
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
    global variable is `bridge`
    - require.js, seajs
    - window.bridge

## client
    bridge.client
    ​```
        /*
         * return
         * version [!0][app version / [0]not in Meishizhaoshi app
         * name Meishizhaoshi / 0
         * category M/C
         */
    ​```


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

1.获取城市地点和城市ID

*getCityNameAndId*

参数

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

返回值

| 参数名称     | 参数类型   | 参数描述 |
| -------- | ------ | ---- |
| cityName | String | 城市名称 |
| cityId   | String | 城市ID |

***

2.打开城市选择界面

*openCityChooseView*

参数

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

返回值

| 参数名称     | 参数类型   | 参数描述 |
| -------- | ------ | ---- |
| cityName | String | 城市名称 |
| cityId   | String | 城市ID |

***

3.打开分享界面

*showShareView*

参数

| 参数名称 | 参数类型   | 参数描述    |
| ---- | ------ | ------- |
| text | string | 分享的文字内容 |

返回值

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| statu | bool   | 是否分享成功  |
| data  | Object | 友盟返回的数据 |

***

4.主动刷新当前webView

*refreshWebView*

参数

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

返回值

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

***

5.主动触发下拉刷新

*pullRefreshWebView*

参数

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

返回值

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

>调用下拉刷新后, 会在触发动作之后调用 `refreshTriggered` 方法, JS需要提前注册该方法, 以备接受下拉刷新动作

***

6.停止下拉刷新

*stopPullRefreshWebView*

参数

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

返回值

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||



添加下拉刷新

*addPullRefreshWebView*

参数

| 参数名称 | 参数类型 | 参数描述 |
| ---- | ---- | ---- |
|      |      |      |

***

7.获取用户token

*getUserToken*

参数

参数名称     |  参数类型  | 参数描述
------------|----------|------------
||

返回值

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| token | String | token字串 |

***

8.显示Alert, confirm

*showAlert*, *showConfirm*

参数

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

返回值

| 参数名称       | 参数类型   | 参数描述 |
| ---------- | ------ | ---- |
| identifier | String | 标识   |

***

9.显示Loading, 隐藏Loading

*showLoading*, *hideLoading*

参数

| 参数名称 | 参数类型   | 参数描述        |
| ---- | ------ | ----------- |
| text | String | Loading提示文字 |

返回值

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| token | String | token字串 |

***

10.打开窗口

*openURL*

参数

| 参数名称 | 参数类型   | 参数描述  |
| ---- | ------ | ----- |
| url  | String | 目标URL |

返回值

| 参数名称  | 参数类型   | 参数描述    |
| ----- | ------ | ------- |
| token | String | token字串 |



11.网络请求

sendApi

参数

| 参数名称   | 参数类型      | 参数描述                        |
| ------ | --------- | --------------------------- |
| path   | String    | 网络请求的Path                   |
| param  | Object {} | 网络请求的键值对参数                  |
| method | String    | 网络请求的方式 `GET` OR `POST`     |
| host   | String    | Busi User Static 不传 默认为Busi |

返回值

**直接调用callBack进行值的返回, 如果callBack不存在或者被释放, 本次网络请求结果无着陆点**
