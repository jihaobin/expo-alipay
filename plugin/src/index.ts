import {
  withAndroidManifest,
  AndroidConfig,
  ConfigPlugin,
} from 'expo/config-plugins';

const { getMainApplicationOrThrow } = AndroidConfig.Manifest

interface QqLocationPluginProps {
  appId: string;
}

const withQqLocationApiKey: ConfigPlugin<QqLocationPluginProps> = (config, { appId }) => {
  // Configure Android
  config = withAndroidManifest(config, config => {
    const androidManifest = config.modResults
    const mainApplication = getMainApplicationOrThrow(androidManifest)

    if (!androidManifest.manifest.$['xmlns:tools']) {
      androidManifest.manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }


    // Add Tencent Map API key
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
        'ALIPAY_APPID',
      appId
    );


    // Add required permissions for location
    const permissions = [
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.ACCESS_WIFI_STATE",
        "android.permission.READ_PHONE_STATE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
    ];

    for (const permission of permissions) {
      // Check if permission already exists to avoid duplicates
      if (!AndroidConfig.Permissions.ensurePermission(config.modResults, permission)) {
        AndroidConfig.Permissions.addPermission(config.modResults, permission);
      }
    }


        // 检查是否已经存在 queries 标签
        if (!config.modResults.manifest.queries) {
            config.modResults.manifest.queries = []
        }

        // 检查是否已经添加了微信包查询，避免重复添加
        const existingAlipayQuery = config.modResults.manifest.queries.find(
            (query) =>
                query.package &&
                query.package.some(
                    (pkg) =>
                        pkg.$ &&
                        pkg.$['android:name'] === 'com.eg.android.AlipayGphone'
                )
        )

        if (!existingAlipayQuery) {
            config.modResults.manifest.queries.push({
                package: [
                    {
                        $: {
                            'android:name': 'com.eg.android.AlipayGphone'
                        }
                    }
                ]
            })
        }


        // 确保 activity 数组存在
        if (!mainApplication.activity) {
            mainApplication.activity = []
        }

        // 检查是否已经添加了 H5PayActivity，避免重复添加
        const existingH5PayActivity = mainApplication.activity.find(
            (activity) =>
                activity.$ &&
                activity.$['android:name'] ===
                    'com.alipay.sdk.app.H5PayActivity'
        )

        if (!existingH5PayActivity) {
            mainApplication.activity.push({
                $: {
                    'android:name': 'com.alipay.sdk.app.H5PayActivity',
                    'android:configChanges':
                    'orientation|keyboardHidden|navigation',
                    'android:exported': 'false',
                    'android:screenOrientation': 'behind',
                    'tools:replace': 'android:configChanges'
                }
            })
        }

        // 检查是否已经添加了 H5AuthActivity，避免重复添加
        const existingH5AuthActivity = mainApplication.activity.find(
            (activity) =>
                activity.$ &&
                activity.$['android:name'] ===
                    'com.alipay.sdk.app.H5AuthActivity'
        )

        if (!existingH5AuthActivity) {
            mainApplication.activity.push({
                $: {
                    'android:name': 'com.alipay.sdk.app.H5AuthActivity',
                    'android:configChanges':
                        'orientation|keyboardHidden|navigation',
                    'android:exported': 'false',
                    'android:screenOrientation': 'behind',
                    'tools:replace': 'android:configChanges'
                }
            })
        }

    return config;
  });

  // // Configure iOS (if iOS API key is provided)
  // if (iosApiKey) {
  //   config = withInfoPlist(config, config => {
  //     config.modResults['TENCENT_MAP_API_KEY'] = iosApiKey;
  //     return config;
  //   });
  // }

  return config;
};

export default withQqLocationApiKey;