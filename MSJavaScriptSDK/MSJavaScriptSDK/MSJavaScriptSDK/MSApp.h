//
//  MSApp.h
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import <Foundation/Foundation.h>

@class MSWebViewController, UIViewController;

@interface MSApp : NSObject

/*!
 *  @brief Start MSApp with app key which you can get in `our web site`.
 *
 *  @param appKey MSApp Key.
 *  @param appSec MSApp Sec.
 */
+ (void) startAppWithKey: (NSString *) appKey sec: (NSString *) appSec;

/*!
 *  @brief Disable the App log.
 */
+ (void) disableLog;

/*!
 *  @brief Is disable the App log.
 *
 *  @return BOOL flag.
 */
+ (BOOL) isDisableLog;

/*!
 *  @brief Open Web App with url string.
 *
 *  @param URLString URLString
 *
 *  @return `MSWebViewController *`
 */
+ (UIViewController *) appWithURLString: (NSString *) URLString;

/*!
 *  @brief Append custom user-agent to web container.
 *
 *  @param userAgent U custom user agent string.
 */
+ (void) AppendCustomUserAgent: (NSString *) userAgent;

@end
