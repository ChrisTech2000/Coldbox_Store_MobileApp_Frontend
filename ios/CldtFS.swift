import Foundation
import React

@objc(CldtFS)
class CldtFS: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool { false }

  // Export constants similar to Android
  @objc func constantsToExport() -> [AnyHashable : Any]! {
    let docs = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first ?? ""
    // iOS doesn't have "ExternalStorageDirectoryPath"; return empty string to keep API shape
    return [
      "DocumentDirectoryPath": docs,
      "ExternalStorageDirectoryPath": ""
    ]
  }

  @objc func exists(_ path: String,
                    resolve: RCTPromiseResolveBlock,
                    reject: RCTPromiseRejectBlock) {
    resolve(FileManager.default.fileExists(atPath: path))
  }

  @objc func writeFile(_ path: String, data: String, encoding: String?,
                       resolve: RCTPromiseResolveBlock,
                       reject: RCTPromiseRejectBlock) {
    do {
      let url = URL(fileURLWithPath: path)
      try FileManager.default.createDirectory(at: url.deletingLastPathComponent(),
                                              withIntermediateDirectories: true)
      let bytes = (encoding == "base64") ? Data(base64Encoded: data) ?? Data() : Data(data.utf8)
      try bytes.write(to: url)
      resolve(nil)
    } catch { reject("E_WRITE", error.localizedDescription, error) }
  }

  @objc func unlink(_ path: String,
                    resolve: RCTPromiseResolveBlock,
                    reject: RCTPromiseRejectBlock) {
    do { try FileManager.default.removeItem(atPath: path); resolve(nil) }
    catch { reject("E_UNLINK", error.localizedDescription, error) }
  }

  // Minimal download: fetch into memory, then write to dest
  @objc func downloadFile(_ urlStr: String, destPath: String, headers: NSDictionary?,
                          resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) {
    guard let url = URL(string: urlStr) else {
      reject("E_DOWNLOAD", "Invalid URL", nil); return
    }
    var req = URLRequest(url: url)
    headers?.forEach { key, value in req.addValue(String(describing: value), forHTTPHeaderField: String(describing: key)) }
    let task = URLSession.shared.dataTask(with: req) { data, resp, err in
      if let err = err { reject("E_DOWNLOAD", err.localizedDescription, err); return }
      guard let http = resp as? HTTPURLResponse, let data = data else {
        reject("E_DOWNLOAD", "No response", nil); return
      }
      do {
        let dst = URL(fileURLWithPath: destPath)
        try FileManager.default.createDirectory(at: dst.deletingLastPathComponent(),
                                                withIntermediateDirectories: true)
        try data.write(to: dst)
        resolve(["status": http.statusCode])
      } catch { reject("E_DOWNLOAD", error.localizedDescription, error) }
    }
    task.resume()
  }
}