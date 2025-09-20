import { alipay, setAlipaySandbox } from 'native-expo-alipay';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaView>
      <Button title='支付' onPress={async () => {
        setAlipaySandbox(true)
        const result = await alipay("method=alipay.trade.app.pay&app_id=9021000153675106&charset=utf-8&version=1.0&sign_type=RSA2&timestamp=2025-09-20%2010%3A20%3A46&notify_url=%20http%3A%2F%2Fsfc9d8c6.natappfree.cc%2Fapi%2Fpay%2Fnotify&biz_content=%7B%22out_trade_no%22%3A%22vcbxxcewrpweouirpszcvbv%22%2C%22product_code%22%3A%22234dvbxvpugiouretpufgsp%22%2C%22subject%22%3A%22abc%22%2C%22body%22%3A%22234%22%2C%22total_amount%22%3A%220.01%22%7D&sign=AD0aIGIulFffbUrW1VsQcAYGjEyVx%2FTJycCg6BLvWQUyKYda9iCFubkRlSbfEhaSn31ER9icRf2v71OxSAkyowDOvgrheJgnfC75KDi%2Byi2EUgcQTyM0xeCoGvvChCU9Ldpybdbx4ubrcpRCchD3CGCp9N1CHYSYBFE5nkj8PZvDUrBOqOniHwtqRYzSSAhtgSvz2qGYHqtySlZKiQP9fIfsQCFa3SLp6MzuC2BRDypWdNuBbHLgqfkQ1t3xiMmo9kzswVNPgqRhTdbWZWgF%2F9DCe%2BJ%2F3bQiH0Y9BENY7rpU9zYSCN7GZ4UfpCnjdhaeXrWgPkh007XPPPYMBSzGvg%3D%3D")
        // console.log(result)
      }}></Button>
    </SafeAreaView>
  );
}