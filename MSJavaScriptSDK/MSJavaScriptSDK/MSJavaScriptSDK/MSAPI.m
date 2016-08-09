//
//  MSAPI.m
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import "MSAPI.h"
#import "MSPrecompile.h"
#import <AFNetworking.h>
#import "MSWebViewUtil.h"

@interface MSAPI ()

@property ( nonatomic, strong ) AFURLSessionManager * sessionManager;

@end

@implementation MSAPI

static MSAPI * netapi = nil;

+ (MSAPI *) api {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if ( netapi == nil ) {
            netapi = [[MSAPI alloc] init];
        }
    });
    return netapi;
}

+ (void) verifyAppKey: (NSString *) appKey
                  sec: (NSString *) appSec
        completeBlock: (void (^)(NSURLResponse *, id responseObject, NSError *)) completeBlock {
    assert(completeBlock != nil);

    NSString * requestURL = @"http://10.0.0.218:8080/webapp.json";
    NSError * requestBuildError = nil;
    NSMutableURLRequest * request =
    [[AFHTTPRequestSerializer serializer]
     requestWithMethod:@"POST"
     URLString:requestURL
     parameters:@{
                  @"appKey": appKey,
                  @"appSec": appSec,
                  @"appVer": MSAppVersion
                  }
     error:&requestBuildError];

    if ( [MSWebViewUtil localVersion] ) {
        [request setValue:[MSWebViewUtil localVersion] forHTTPHeaderField:@"localVersion"];
    }
    if ( [MSWebViewUtil localModuleVersion] ) {
        [request setValue:[MSWebViewUtil localModuleVersion] forHTTPHeaderField:@"localModuleVersion"];
    }

    NSURLSessionDataTask * dataTask =
    [[MSAPI api].sessionManager dataTaskWithRequest:request completionHandler:^(NSURLResponse * response, id responseObject, NSError * error) {
        completeBlock(response, responseObject, error);
    }];
    [dataTask resume];
}

- (AFURLSessionManager *)sessionManager {
    if ( !_sessionManager ) {
        /*[NSURLSessionConfiguration backgroundSessionConfiguration:@"app.ms"];*/
        NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
        configuration.requestCachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
        configuration.URLCache = nil;
        configuration.timeoutIntervalForRequest = 10.0;
        configuration.URLCredentialStorage = nil;
        _sessionManager = [[AFURLSessionManager alloc]
                           initWithSessionConfiguration:configuration];
        _sessionManager.responseSerializer = [AFJSONResponseSerializer serializer];
        configuration = nil;
    }
    return _sessionManager;
}

@end
