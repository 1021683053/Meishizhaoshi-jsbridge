//
//  MSApp.m
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import "MSApp.h"
#import "MSAPI.h"
#import "MSWebViewUtil.h"
#import "MSWebViewController.h"

@interface MSApp ()

@property ( nonatomic, strong ) NSString * appKey;
@property ( nonatomic, strong ) NSString * appSec;
@property ( nonatomic, assign, readonly ) BOOL disablelogged;

@end

@implementation MSApp

+ (void) startAppWithKey: (NSString *) appKey sec: (NSString *) appSec {

    assert(appKey != nil);
    assert(appSec != nil);

    [MSApp application].appKey = appKey;
    [MSApp application].appSec = appSec;
    [[MSApp application] launch];
}

- (void) launch {
    [MSAPI
     verifyAppKey:_appKey
     sec:_appSec
     completeBlock:^(NSURLResponse * response, id responseObject, NSError * error) {
         if ( !error && responseObject && [responseObject isKindOfClass:[NSDictionary class]] ) {
             [self startWithOptions:responseObject];
         } else {
             [MSWebViewUtil log:@"Application start with error, key or sec is incorrect, please restart it."];
         }
    }];
}

- (void) startWithOptions: (NSDictionary *) options {
    [MSWebViewUtil MakeUpWebViewMemoryLeak];
    [MSWebViewUtil AppendCustomUserAgent:@" Meishizhaoshi/M_3.6.1"];
}

+ (void) disableLog {
    [MSApp application]->_disablelogged = YES;
}

+ (BOOL) isDisableLog {
    return [MSApp application].disablelogged;
}

+ (UIViewController *) appWithURLString: (NSString *) URLString {
    MSWebViewController * mswvc = [[MSWebViewController alloc] initWithURLString:URLString];
    return (UIViewController *)mswvc;
}

//------------------------------------------------------------------------------
#pragma mark - Application Share Instance.
//------------------------------------------------------------------------------

static MSApp * app = nil;

/*!
 *  @brief Get MSApplication instance.
 *
 *  @return MSApp *
 */
+ (MSApp *) application {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if ( app == nil ) {
            app = [[MSApp alloc] init];
        }
    });
    return app;
}

@end
