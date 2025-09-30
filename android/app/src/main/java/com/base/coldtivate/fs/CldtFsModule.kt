package com.base.coldtivate.fs

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import java.io.File
import java.io.BufferedInputStream
import java.io.BufferedOutputStream
import java.net.HttpURLConnection
import java.net.URL
import android.content.Context
import android.os.Environment

@ReactModule(name = "CldtFS")
class CldtFsModule(private val reactCtx: ReactApplicationContext)
  : ReactContextBaseJavaModule(reactCtx) {

  override fun getName() = "CldtFS"

  // Export constants so JS can destructure them
  override fun getConstants(): MutableMap<String, Any> {
    val map = HashMap<String, Any>()
    // App-internal files dir (no permissions required)
    val doc = reactCtx.filesDir.absolutePath
    map["DocumentDirectoryPath"] = doc
    // Public external storage root (like original react-native-fs)
    val ext = Environment.getExternalStorageDirectory().absolutePath
    map["ExternalStorageDirectoryPath"] = ext
    return map
  }

  private fun toBase64(bytes: ByteArray): String =
    android.util.Base64.encodeToString(bytes, android.util.Base64.NO_WRAP)

  private fun fromBase64(s: String): ByteArray =
    android.util.Base64.decode(s, android.util.Base64.DEFAULT)

  @ReactMethod
  fun exists(path: String, promise: Promise) {
    try { promise.resolve(File(path).exists()) } catch (e: Exception) { promise.reject("E_EXISTS", e) }
  }

  @ReactMethod
  fun writeFile(path: String, data: String, encoding: String?, promise: Promise) {
    try {
      val bytes = if (encoding == "base64") fromBase64(data) else data.toByteArray(Charsets.UTF_8)
      val f = File(path)
      f.parentFile?.mkdirs()
      f.outputStream().use { it.write(bytes) }
      promise.resolve(null)
    } catch (e: Exception) { promise.reject("E_WRITE", e) }
  }

  @ReactMethod
  fun unlink(path: String, promise: Promise) {
    try {
      val f = File(path)
      if (f.exists() && !f.delete()) throw RuntimeException("unlink failed: $path")
      promise.resolve(null)
    } catch (e: Exception) { promise.reject("E_UNLINK", e) }
  }

  // Simple download without progress/resume; writes to destPath
  @ReactMethod
  fun downloadFile(url: String, destPath: String, headers: ReadableMap?, promise: Promise) {
    var conn: HttpURLConnection? = null
    try {
      val target = File(destPath)
      target.parentFile?.mkdirs()

      val u = URL(url)
      conn = (u.openConnection() as HttpURLConnection).apply {
        requestMethod = "GET"
        connectTimeout = 30000
        readTimeout = 30000
        headers?.entryIterator?.forEach { addRequestProperty(it.key, it.value.toString()) }
      }

      conn.connect()
      val code = conn.responseCode

      val input = if (code in 200..299) BufferedInputStream(conn.inputStream)
                  else BufferedInputStream(conn.errorStream)
      val output = BufferedOutputStream(target.outputStream())

      input.use { inp -> output.use { out -> inp.copyTo(out) } }

      val res = Arguments.createMap().apply { putInt("status", code) }
      promise.resolve(res)
    } catch (e: Exception) {
      promise.reject("E_DOWNLOAD", e)
    } finally {
      conn?.disconnect()
    }
  }
}