package com.rntemplate

import android.content.res.Configuration
import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import java.util.List

import com.exitapp.RNExitAppPackage
import com.clipboard.ClipboardPackage
import com.microsoft.codepush.react.CodePush
import com.shortcut.ShortcutPackage

import com.umeng.analytics.MobclickAgent
import com.umeng.commonsdk.UMConfigure

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      ReactNativeHostWrapper(this, object : DefaultReactNativeHost(this) {

        override fun getPackages(): MutableList<ReactPackage>? =
          PackageList(this).packages.apply {
            // Packages that cannot be autolinked yet can be added manually here, for example:
            add(RNExitAppPackage()) // Changed to Kotlin syntax
            add(ClipboardPackage())  // Changed to Kotlin syntax
            add(ShortcutPackage())    // Changed to Kotlin syntax
          }

        override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

        override fun getJSBundleFile(): String? {
            return CodePush.getJSBundleFile()
        }

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      })

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
    ApplicationLifecycleDispatcher.onApplicationCreate(this)

    // 初始化友盟统计
    UMConfigure.init(this, "678da6749a16fe6dcd324c29", "测试app", UMConfigure.DEVICE_TYPE_PHONE, null)
    // 设置日志开关（仅限调试模式）
    UMConfigure.setLogEnabled(true)
    // 设置页面采集模式
    MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.AUTO)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}
