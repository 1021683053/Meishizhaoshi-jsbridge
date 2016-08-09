//
//  MSWebViewUtil.m
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import "MSWebViewUtil.h"
#import "MSApp.h"

NSString * const kMSWebViewLocalVersionStr = @"kMSWebViewLocalVersionStr";
NSString * const kMSWebViewLocalModulesVersionStr = @"kMSWebViewLocalModulesVersionStr";

@implementation MSWebViewUtil

+ (void) MakeUpWebViewMemoryLeak {
    [[NSUserDefaults standardUserDefaults] setInteger:0 forKey:@"WebKitCacheModelPreferenceKey"];
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"WebKitDiskImageCacheEnabled"];
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"WebKitOfflineWebApplicationCacheEnabled"];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

+ (void) CleanWebView: (UIWebView *) webView {
    [webView loadHTMLString:@"" baseURL:nil];
    [webView stopLoading];
    webView.delegate = nil;
    [webView removeFromSuperview];
}

+ (void) AppendCustomUserAgent: (NSString *) userA {
    @autoreleasepool {
        UIWebView* tempWebView = [[UIWebView alloc] initWithFrame:CGRectZero];
        NSString* userAgent = [tempWebView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
        NSString *ua = [NSString stringWithFormat:@"%@%@",
                        userAgent, userA];
        [[NSUserDefaults standardUserDefaults] registerDefaults:@{@"UserAgent" : ua, @"User-Agent" : ua}];
    }
}

+ (NSString *) localVersion {
    return [[NSUserDefaults standardUserDefaults] objectForKey:kMSWebViewLocalVersionStr];
}

+ (NSString *) localModuleVersion {
    return [[NSUserDefaults standardUserDefaults] objectForKey:kMSWebViewLocalModulesVersionStr];
}

+ (void) log: (NSString *) logStr {
    if ( ![MSApp isDisableLog] ) {
        NSLog(@"%@", logStr);
    }
}

@end
