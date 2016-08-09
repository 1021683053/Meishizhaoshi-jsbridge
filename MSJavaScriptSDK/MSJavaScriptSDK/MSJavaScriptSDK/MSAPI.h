//
//  MSAPI.h
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MSAPI : NSObject

+ (void) verifyAppKey: (NSString *) appKey
                  sec: (NSString *) appSec
        completeBlock: (void (^)(NSURLResponse *, id responseObject, NSError *)) completeBlock;

@end
