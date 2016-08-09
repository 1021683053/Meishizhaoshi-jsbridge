//
//  MSWebViewUtil.h
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

extern NSString * const kMSWebViewLocalVersionStr;
extern NSString * const kMSWebViewLocalModulesVersionStr;

@interface MSWebViewUtil : NSObject

/*!
 *  @brief Fix webView memory leak.
 *  Set `WebKitCacheModelPreferenceKey`, `WebKitDiskImageCacheEnabled`,
 *  `WebKitOfflineWebApplicationCacheEnabled` with NSUserDefault.
 */
+ (void) MakeUpWebViewMemoryLeak;

/*!
 *  @brief Clean the dealloced webView,
 *  ... looks like useless.
 */
+ (void) CleanWebView: (UIWebView *) webView;

/*!
 *  @brief Append the system user-agent with custom string.
 *
 *  @param userAgent Custom string will be appened to system webView user-agent.
 */
+ (void) AppendCustomUserAgent: (NSString *) userAgent;

/*!
 *  @brief Get webapp local version.
 *  Save in `Current NSUserDefaults`, remove the NSUserDefault will case localVersion reset.
 *  If need do this, remove or reset `kMSWebViewLocalVersionStr` will reset the MSApp.
 *  @return Local version string.
 */
+ (NSString *) localVersion;

/*!
 *  @brief Get webapp local Module version string.
 *  Save in `Current NSUserDefaults`, remove the NSUserDefault will case localVersion reset.
 *  If need do this, remove or reset `kMSWebViewLocalVersionStr` will reset the MSApp.
 *  Format like: `ModuleName=moduleVersion&ModuleName=ModuleVersion`.
 *  @return Local version string.
 */
+ (NSString *) localModuleVersion;

/*!
 *  @brief Log info with `NSLog`.
 *
 *  @param logStr Log info string.
 */
+ (void) log: (NSString *) logStr;

@end
