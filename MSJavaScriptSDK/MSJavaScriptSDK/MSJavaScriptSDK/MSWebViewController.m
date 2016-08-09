//
//  MSWebViewController.m
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import "MSWebViewController.h"
#import "MSWebViewUtil.h"
#import "WebViewJavascriptBridge.h"

@interface MSWebViewController () <UIWebViewDelegate>

@property ( nonatomic, strong ) UIWebView * webView;
@property ( nonatomic, strong ) NSString  * originURLString;
@property ( nonatomic, strong ) WebViewJavascriptBridge * bridge;

@end

@implementation MSWebViewController

- (instancetype) initWithURLString: (NSString *) urlString {
    self = [super init];
    if ( self ) {
        _originURLString = urlString;
        _webView = [[UIWebView alloc] init];
        _bridge = [WebViewJavascriptBridge bridgeForWebView:_webView];
        self->_loadState = MSWebVCLoadState_Ready;
    }
    return self;
}

- (void) cancelLoading {
    // STOP loading.
    [self.webView stopLoading];
}

- (void) enableRightItem {
    UIBarButtonItem * refreshItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemRefresh target:self action:@selector(refreshAction)];
    self.navigationItem.rightBarButtonItems = @[refreshItem];
}

- (void) refreshAction {
    [_webView reload];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Add Web view.
    _webView.scalesPageToFit = YES;
    _webView.frame = self.view.bounds;
    [self.view addSubview:_webView];
    // Enable JavaScript Logging.
    if ( MSAppDebug ) {
        [WebViewJavascriptBridge enableLogging];
        [self enableRightItem];
    }
    // Set Web View Delegate.
    [_bridge setWebViewDelegate:self];
    // Register handler for JS-CALL-OC
    [self registerHandler];
    // Load Web html
    [self loadWebHTML];
}

- (void) loadWebHTML {
    // Load Request.
    NSURL *baseURL = [NSURL URLWithString:_originURLString];
    [_webView loadRequest:[NSURLRequest requestWithURL:baseURL]];
}

- (void) registerHandler {
    // Regist the basic handler
    [_bridge registerHandler:@"testObjcCallback" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"testObjcCallback called: %@", data);
        responseCallback(@{@"Hello": @"1"});
    }];
    [_bridge registerHandler:@"openRechargeList" handler:^(id data, WVJBResponseCallback responseCallback) {
        responseCallback(@"OK");
    }];

    [_bridge registerHandler:@"openPositionList" handler:^(id data, WVJBResponseCallback responseCallback) {
        responseCallback(@"OK");
    }];

    //! \abstract 获取城市地点, ID
    [_bridge registerHandler:@"getCityNameAndId" handler:^(id data, WVJBResponseCallback responseCallback) {

        // 当前城市地点, Id
        responseCallback(@{

                           @"cityName" : @"杭州",
                           @"cityId" : @"2016"

                           });
    }];

    //! \abstract 打开城市选择界面
    [_bridge registerHandler:@"openCityChooseView" handler:^(id data, WVJBResponseCallback responseCallback) {
        responseCallback(@{

                           @"cityName" : @"杭州",
                           @"cityId" : @"2016"
                           
                           });
    }];

    //! \abstract 打开分享界面
    [_bridge registerHandler:@"showShareView" handler:^(id data, WVJBResponseCallback responseCallback) {
        responseCallback(@"OK");
    }];

    //! \abstract 主动触发下拉刷新
    [_bridge registerHandler:@"pullRefreshWebView" handler:^(id data, WVJBResponseCallback responseCallback) {
        responseCallback(@"OK");
    }];

    //! \abstract 结束下拉刷新
    [_bridge registerHandler:@"stopPullRefreshWebView" handler:^(id data, WVJBResponseCallback responseCallback) {
        responseCallback(@"OK");
    }];

    //! \abstract 获取用户token
    [_bridge registerHandler:@"getUserToken" handler:^(id data, WVJBResponseCallback responseCallback) {
            responseCallback(@{
                               @"token" :  @"token-content"
                               });
    }];

    //! \abstract 显示弹窗
    [_bridge registerHandler:@"showAlert" handler:^(id data, WVJBResponseCallback responseCallback) {
    }];

    //! \abstract 显示带确认按钮的弹窗
    [_bridge registerHandler:@"showConfirm" handler:^(id data, WVJBResponseCallback responseCallback) {
    }];

    //! \abstract 显示加载
    [_bridge registerHandler:@"showLoading" handler:^(id data, WVJBResponseCallback responseCallback) {
    }];

    //! \abstract 隐藏加载
    [_bridge registerHandler:@"hideLoading" handler:^(id data, WVJBResponseCallback responseCallback) {
    }];

    [_bridge registerHandler:@"openURL" handler:^(id data, WVJBResponseCallback responseCallback) {
        MSWebViewController * msWeb = [[MSWebViewController alloc] initWithURLString:data[@"url"]];
        [self.navigationController pushViewController:msWeb animated:YES];
    }];
}

- (void) callHandler: (NSString *) handlerName data: (NSDictionary *) data {
    // OC-CALL-JS with data
    [_bridge callHandler:handlerName data:data ?: @{}];
}

//------------------------------------------------------------------------------
#pragma mark - Delegated
//------------------------------------------------------------------------------

- (BOOL) webView: (UIWebView *) webView shouldStartLoadWithRequest:(NSURLRequest *) request
  navigationType: (UIWebViewNavigationType) navigationType {
    // Default return `YES`, Means you can fire any WebView Request.
    return YES;
}

- (void) webViewDidStartLoad: (UIWebView *) webView {
    self->_loadState = MSWebVCLoadState_Loading;
}

- (void) webViewDidFinishLoad: (UIWebView *) webView {
    self->_loadState = MSWebVCLoadState_Finished;
    self.title = [webView stringByEvaluatingJavaScriptFromString:@"document.title"];
    NSLog(@"%@", [webView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"]);
}

- (void) webView: (UIWebView *) webView didFailLoadWithError: (NSError *) error {
    self->_loadState = MSWebVCLoadState_FinishedWithError;
}

//------------------------------------------------------------------------------
#pragma mark - Dealloced
//------------------------------------------------------------------------------

- (void) didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

- (void) dealloc {
    if ( _webView ) {
        [MSWebViewUtil CleanWebView:_webView];
    }
}

@end
