
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Alert, Keyboard } from 'react-native';
import { InputItem, Toast } from '@ant-design/react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { Fetch } from './../../fetch/request';
import { observer, inject } from 'mobx-react';


interface Props {
  codeView: () => void,
  mobile: string,
  sendType: string,
  verify: boolean,
  verifyMsg: string
}

interface State {

}
@inject('userStore')

export default class BxCodeInput extends PureComponent<Props, State>{

  timer: any;
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      sending: false,
      codeText: "获取验证码",
      codeSec: 0,
      code: ''
    }
  }

  handleCodeClick() {
    let { mobile, sendType, verify, verifyMsg, userStore: { userInfo } } = this.props;
    // let { userInfo } = this.userStore;
    let { sending } = this.state;
    if (mobile == '') {
      Toast.info('请输入手机号', 1.8);
      return false
    }
    if (sending) {

    } else {
      let Sec = 60;
      this.setState({
        sending: true
      }, () => {
        if (mobile.indexOf(' ') > -1) {
          mobile = mobile.replace(/ /g, '');
        }
        let sendCode = new Fetch('/identity/send', 'POST', { mobile, type: sendType, country_code: this.props.countrycode != undefined ? this.props.countrycode.toString() : userInfo.phone_code || '' }, {}, 'v2');
        sendCode.then(res => {
          Toast.info('短信发送成功')
          this.timer = setInterval(() => {
            if (Sec <= 0) {
              Sec = 0;
              this.setState({
                sending: false
              });
              clearInterval(this.timer);
            }
            this.setState((prev: State) => {
              let codeText = Sec > 1 ? Sec + "秒后获取" : "获取验证码"
              return {
                codeSec: Sec,
                codeText
              }
            })
            Sec--;
          }, 1000)
        }).catch((err) => {
          this.setState({
            sending: false
          });
        });
      });

    }
  }

  handleCodeInput(val: string) {
    this.setState({
      code: val
    })
    this.props.codeView(val)
  }

  render() {
    let { code, codeSec, codeText } = this.state;
    return (
      <View>
        <InputItem
          clear
          type="number"
          value={code}
          onChange={value => {
            this.handleCodeInput(value);
          }}
          extra={
            codeSec <= 0
              ? <Text style={[mainStyle.czt, mainStyle.fs13, mainStyle.pa5_10]}>{codeText}</Text>
              : <Text style={[mainStyle.c999, mainStyle.fs13]}>{codeText}</Text>
          }
          onExtraClick={() => { this.handleCodeClick() }}
          placeholder="请输入验证码"
          style={[mainStyle.fs14]}
          onBlur={() => { Keyboard.dismiss(); }}
        >
          <Text style={[mainStyle.c333, mainStyle.fs14]}>验证码</Text>
        </InputItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})