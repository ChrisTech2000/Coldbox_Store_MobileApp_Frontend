#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CldtFS, NSObject)

+ (BOOL)requiresMainQueueSetup { return NO; }

RCT_EXTERN_METHOD(exists:(NSString *)path
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(writeFile:(NSString *)path
                  data:(NSString *)data
                  encoding:(NSString *)encoding
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(unlink:(NSString *)path
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(downloadFile:(NSString *)url
                  destPath:(NSString *)destPath
                  headers:(NSDictionary *)headers
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end