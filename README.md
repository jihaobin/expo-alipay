# Expo Alipay

将支付宝支付功能集成到您的 Expo 应用中的模块。

暂时不支持IOS

## 安装

```bash
npx expo install native-expo-alipay
```

## 配置

### Expo 插件

将插件添加到您的 `app.json` 或 `app.config.js` 中：

```json
{
  "expo": {
    "plugins": [
      [
        "native-expo-alipay",
        {
          "appId": "YOUR_ALIPAY_APP_ID"
        }
      ]
    ]
  }
}
```

### iOS 配置

对于 iOS，您需要在 `app.json` 或 `app.config.js` 中配置 URL scheme：

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "LSApplicationQueriesSchemes": ["alipay"]
      }
    }
  }
}
```

### Android 配置

对于 Android，插件会自动添加所需的权限和配置。

## API

### `alipay(orderString: string): Promise<OrderResult>`

使用提供的订单字符串发起支付宝支付。

```javascript
import { alipay } from 'native-expo-alipay';

const result = await alipay("your_order_string_here");
```

### `authInfo(infoStr: string): Promise<AuthResult>`

发起支付宝认证/授权。

```javascript
import { authInfo } from 'native-expo-alipay';

const result = await authInfo("your_auth_info_string_here");
```

### `getVersion(): Promise<string>`

返回当前支付宝 SDK 版本。

```javascript
import { getVersion } from 'native-expo-alipay';

const version = await getVersion();
```

### `setAlipaySandbox(isSandbox: boolean): void`

设置支付宝环境为沙箱模式（仅 Android）。

```javascript
import { setAlipaySandbox } from 'native-expo-alipay';

setAlipaySandbox(true); // 启用沙箱模式
```

### `setAlipayScheme(scheme: string): void`

设置支付宝重定向 scheme（仅 iOS）。

```javascript
import { setAlipayScheme } from 'native-expo-alipay';

setAlipayScheme("your_scheme");
```

## 类型定义

### OrderResult

```typescript
interface OrderResult {
  result?: string;
  resultStatus?: '9000' | '8000' | '4000' | '5000' | '6001' | '6002' | '6004' | string;
  memo: string;
}
```

### AuthResult

```typescript
interface AuthResult {
  result: string;
  resultStatus: '9000' | '4000' | '6001' | '6002';
  memo: string;
}
```

## 结果状态码

### 支付结果状态

- `9000`: 订单支付成功
- `8000`: 正在处理中，支付结果未知
- `4000`: 订单支付失败
- `5000`: 重复请求
- `6001`: 用户中途取消
- `6002`: 网络连接出错
- `6004`: 支付结果未知
- 其它: 其它支付错误

### 认证结果状态

- `9000`: 请求处理成功
- `4000`: 系统异常
- `6001`: 用户中途取消
- `6002`: 网络连接出错

## 使用示例

```javascript
import { alipay, setAlipaySandbox } from 'native-expo-alipay';
import { Button } from 'react-native';

export default function App() {
  const handlePayment = async () => {
    setAlipaySandbox(true); // 启用沙箱模式进行测试
    const result = await alipay("your_order_string_here");
    console.log(result);
  };

  return (
    <Button title="使用支付宝支付" onPress={handlePayment} />
  );
}
```

## 许可证

[MIT](LICENSE)
