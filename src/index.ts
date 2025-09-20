// Reexport the native module. On web, it will be resolved to ExpoNativeAlipayModule.web.ts
// and on native platforms to ExpoNativeAlipayModule.ts
export * from './ExpoAlipay.types';
export { authInfo, default, getVersion, alipay, setAlipaySandbox, setAlipayScheme } from './ExpoAlipayModule';