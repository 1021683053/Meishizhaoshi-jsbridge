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

@property ( nonatomic, strong, readonly ) UIWebView * webView;
@property ( nonatomic, assign, readonly ) MSWebViewControllerLoadState loadState;

- (instancetype) initWithURLString: (NSString *) urlString;

@end
