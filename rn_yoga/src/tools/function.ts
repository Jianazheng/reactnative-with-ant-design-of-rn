import { Text, Linking, Alert, Clipboard, Platform } from "react-native";
import { Toast, ActionSheet } from '@ant-design/react-native';
import { mainStyle } from "../public/style/style";

export function getTime(str) {
  str = Number(str) * 1000;
  let nt = new Date(str);
  let mm = nt.getMonth() + 1 >= 10 ? (nt.getMonth() + 1) : '0' + (nt.getMonth() + 1);
  let dd = nt.getDate() >= 10 ? nt.getDate() : '0' + nt.getDate();
  let h = nt.getHours() >= 10 ? nt.getHours() : '0' + nt.getHours();
  let m = nt.getMinutes() >= 10 ? nt.getMinutes() : '0' + nt.getMinutes();
  if (str == undefined || isNaN(str) || str.length == 0) {
    return ''
  } else {
    return nt.getFullYear() + '-' + mm + '-' + dd + ' ' + h + ':' + m
  }
}
export function getMin(str) {
  str = Number(str) * 1000;
  let nt = new Date(str);
  let mm = nt.getMonth() + 1 >= 10 ? (nt.getMonth() + 1) : '0' + (nt.getMonth() + 1);
  let dd = nt.getDate() >= 10 ? nt.getDate() : '0' + nt.getDate();
  let h = nt.getHours() >= 10 ? nt.getHours() : '0' + nt.getHours();
  let m = nt.getMinutes() >= 10 ? nt.getMinutes() : '0' + nt.getMinutes();
  if (str == undefined || isNaN(str) || str.length == 0) {
    return ''
  } else {
    return mm + '-' + dd + ' ' + h + ':' + m
  }
}

export function getDate(str) {
  str = Number(str) * 1000;
  let nt = new Date(str);
  let mm = nt.getMonth() + 1 >= 10 ? (nt.getMonth() + 1) : '0' + (nt.getMonth() + 1);
  let dd = nt.getDate() >= 10 ? nt.getDate() : '0' + nt.getDate();
  if (str == undefined || isNaN(str) || str.length == 0) {
    return ''
  } else {
    return nt.getFullYear() + '-' + mm + '-' + dd;
  }
}

export function obj2str(params: object) {
  let str = '';
  for (let i in params) {
    str += i + '=' + params[i] + '&'
  }
  return str
}

export function randomCode(length: number) {
  let num = '';
  for (let i = 0; i < length; i++) {
    let im = Math.floor(Math.random() * 10).toString();
    num += im
  }
  return num
}

export function splitStr(str: string, sp: string) {
  let newstr
  if (typeof str == 'string') {
    newstr = str.split(sp)[0]
  }
  return newstr
}
export function consult() {
  const BUTTONS = [
    '微信咨询',
    '电话咨询',
    '取消',
  ];
  ActionSheet.showActionSheetWithOptions(
    {
      // title: '咨询',
      // message: 'Description',
      options: BUTTONS,
      cancelButtonIndex: 2,
    },
    (buttonIndex: any) => {
      if (buttonIndex == 1) {
        const url = `tel:13998111600`;
        Linking.canOpenURL(url)
          .then(supported => {
            if (!supported) {
              return Alert.alert('提示', '您的设备不支持该功能，请手动拨打 13998111600', [
                { text: '确定' }
              ]);
            }
            return Linking.openURL(url);
          })
          .catch(err => Toast.info(`出错了：${err}`, 1.5));
      } else if (buttonIndex == 0) {
        Clipboard.setString('13998111600');
        Alert.alert("提示", "已复制微信号，请前往微信添加好友",
          [
            { text: '取消' },
            {
              text: '确定'
              // , onPress: () => {
              //   Linking.canOpenURL('@weixin://').then(supported => { // weixin://  alipay://
              //     console.log(supported);
              //     if (supported) {
              //       Linking.openURL('@weixin://');
              //     } else {
              //       Toast.info('麻烦您手动进入微信')
              //     }
              //   });
              // }
            }

          ]
        );
      }
    },
  );
}
export function isios() {
  let isios = false;
  switch (Platform.OS) {
    case "ios":
      isios = true;
      break;
    case "android":
      isios = false;
      break;
  }
  return isios;
}