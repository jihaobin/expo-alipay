package expo.modules.alipay

import android.app.Activity
import android.content.pm.PackageManager
import com.alipay.sdk.app.AlipayApi
import com.alipay.sdk.app.AuthTask
import com.alipay.sdk.app.PayTask
import com.alipay.sdk.app.EnvUtils
import expo.modules.core.logging.Logger
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.core.logging.LogHandlers

class ExpoAlipayModule : Module() {

  companion object {
    private val logger = Logger(listOf(LogHandlers.createOSLogHandler("ExpoAlipayModule")))
  }
  override fun definition() = ModuleDefinition {

    Name("ExpoAlipay")

    OnCreate {
      val applicationInfo = appContext.reactContext?.packageManager?.getApplicationInfo(
        appContext.reactContext?.packageName.toString(),
        PackageManager.GET_META_DATA
      )

      val appId = applicationInfo?.metaData?.getString("ALIPAY_APPID") ?: "NOT_FOUND"
      if(appId != "NOT_FOUND"){
        AlipayApi.registerApp(appContext.reactContext,appId)
      }
    }

    AsyncFunction("pay") { orderString: String, promise: Promise ->
      val activity = appContext.currentActivity
      if (activity == null) {
        promise.reject("NO_ACTIVITY", "No current activity", null)
        return@AsyncFunction
      }
      Thread {
        val alipay = PayTask(activity)
        val result = alipay.payV2(orderString, true)
        promise.resolve(result)
      }.start()
    }

    AsyncFunction("setAlipaySandbox") { isSandbox: Boolean, promise: Promise ->
      if (isSandbox) {
        EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX)
      } else {
        EnvUtils.setEnv(EnvUtils.EnvEnum.ONLINE)
      }
      promise.resolve(isSandbox)
    }

    AsyncFunction("authInfo") { infoStr: String, promise: Promise ->
      val activity = appContext.currentActivity
      if (activity == null) {
        promise.reject("NO_ACTIVITY", "No current activity", null)
        return@AsyncFunction
      }
      Thread {
        val authTask = AuthTask(activity)
        val result = authTask.authV2(infoStr, true)
        promise.resolve(result)
      }.start()
    }

    AsyncFunction("getVersion") { promise: Promise ->
      val activity = appContext.currentActivity
      if (activity == null) {
        promise.reject("NO_ACTIVITY", "No current activity", null)
        return@AsyncFunction
      }
      val payTask = PayTask(activity)
      promise.resolve(payTask.version)
    }
  }
}
