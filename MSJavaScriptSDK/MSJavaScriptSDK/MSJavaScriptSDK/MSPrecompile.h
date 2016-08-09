//
//  MSPrecompile.h
//  MSJavaScriptSDK
//
//  Created by Dylan on 2016/8/9.
//  Copyright © 2016年 Dylan. All rights reserved.
//

#undef  MSAppVersion
#define MSAppVersion @"1.0.0"

#undef  MSAppDebug
#define MSAppDebug YES

/*!
 *  @brief MSWebView Load state. 
 *  `MSWebVCLoadState_Ready` state will be used when web container initizlied and load failure;
 *  `MSWebVCLoadState_Loading` state will be used when webView delegate method `start loading`;
 *  `MSWebVCLoadState_Finished` state will be used when webView delegate method `finished loading`;
 *  `MSWebVCLoadState_FinishedWithError` means this webView load with failure, same as ready for load.
 */
typedef NS_OPTIONS(NSInteger, MSWebViewControllerLoadState) {
    /**
     `MSWebVCLoadState_Ready`, the `load method` can be called.
     */
    MSWebVCLoadState_Ready = 1,
    /**
     `MSWebVCLoadState_Loading`, the `cancel load` method only you can call.
     */
    MSWebVCLoadState_Loading = 2,
    /**
     MSWebVCLoadState_Finished, the `load method` can be called.
     */
    MSWebVCLoadState_Finished = MSWebVCLoadState_Ready,
    /**
     `MSWebVCLoadState_FinishedWithError`, the `load method` can be called.
     */
    MSWebVCLoadState_FinishedWithError = MSWebVCLoadState_Finished
};
