
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.marketingtotal.BuildConfig;
import com.marketingtotal.R;

// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// @react-native-community/google-signin
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// react-native-android-location-enabler
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
// react-native-dialogs
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
// react-native-fbsdk
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-maps
import com.airbnb.android.react.maps.MapsPackage;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-sqlite-storage
import org.pgsqlite.SQLitePluginPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new RNDateTimePickerPackage(),
      new GeolocationPackage(),
      new RNGoogleSigninPackage(),
      new RNCMaskedViewPackage(),
      new RNAndroidLocationEnablerPackage(),
      new ReactNativeDialogsPackage(),
      new FBSDKPackage(),
      new RNGestureHandlerPackage(),
      new MapsPackage(),
      new RNPermissionsPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new SQLitePluginPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
