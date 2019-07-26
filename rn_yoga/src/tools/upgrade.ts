import { Platform, Alert, NativeModules, ToastAndroid } from 'react-native';
import { Toast } from '@ant-design/react-native';
export function checkUpdata(res, from) {
  //console.log(res)
  if (res.errorCode != 1001) {
    Toast.info('请重试', 1.2, undefined, false);
    return false
  }
  if (Platform.OS == 'android') {
    if (res.data && res.data.is_update != 0) {
      Alert.alert('有新的版本' + ' v' + res.data.version_code, res.data.update_content,
        [
          { text: '不了' },
          {
            text: '是', onPress: () => {
              NativeModules.upgrade.upgrade(res.data.apk_url);
              let title = '正在下载最新版本';
              if (Platform.OS == 'android') ToastAndroid.show(title, ToastAndroid.SHORT);
            }
          }
        ]
      );
    } else {
      if (from == 'setting') Toast.info('当前为最新版本', 1.2, undefined, false);
    }
  } else {
    let appid = '1442063962';
    NativeModules.upgrade.upgrade(appid, (msg) => {
      switch (msg) {
        case '-1':
          Toast.info('你可能没有连接网络哦', 1.2, undefined, false);
          break;
        case '0':
          Toast.info('你可能没有连接网络哦', 1.2, undefined, false);
          break;
        case '1':
          Alert.alert('有新的版本' + ' v' + res.data.version, res.data.update_content,
            [
              { text: '不了' },
              {
                text: '是', onPress: () => {
                  NativeModules.upgrade.openAPPStore(appid);
                }
              }

            ]
          );
          break;
        case '2':
          Toast.info('此APP为未上架的APP或者查询不到', 1.2, undefined, false);
          break;
      }
    })
  }
}