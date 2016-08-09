//
//  MSWebViewController.h
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MSPrecompile.h"

@interface MSWebViewController : UIViewController

/**
 The MSWebViewController. web container object.
 */
@property ( nonatomic, strong, readonly ) UIWebView * webView;
/**
 webView load State.
 */
@property ( nonatomic, assign, readonly ) MSWebViewControllerLoadState loadState;

/**
 Initialized method!.
 */
- (instancetype) initWithURLString: (NSString *) urlString;

/**
 Cancel current webView loading. call `stopLoading` method with webView.
 */
- (void) cancelLoading;

@end
