import React from 'react';
import { Text, View, ScrollView, DeviceEventEmitter, StyleSheet, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, InputItem, Toast, Picker } from '@ant-design/react-native';
import { mainStyle, screenH, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import RNStorage from './../../public/js/storage';


interface Props { }
interface State {
  codeText: string,
  mobile: string,
  code: string,
  password: string,
  codeSec: number,
  clicking: boolean
}

@inject('userStore')
@observer
class Login extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('登录'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  timer: any;
  codeRef: any;
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      clicking: false,
      sending: false
    };
  }



  async handleLogin() {
    let { userStore, navigation } = this.props;
    let { mobile, password } = this.state;
    if (mobile == '' || password == '') {
      Toast.info('请输入登录信息', 1.4);
      return false
    }
    let response = await userStore.Login({ mobile: mobile.replace(/ /g, ''), password });
    if (response != null) {
      Toast.info(response.message, 1.4, undefined, false)
      let userinfo = await userStore.GetUserInfo()
      if (userinfo) {
        DeviceEventEmitter.emit('TORELOAD', 'yes')//刷新需要刷新的接口
        DeviceEventEmitter.emit('TORELOADMINE', 'yes')
        DeviceEventEmitter.emit('TORELOADMYCOURSE', 'yes')
        if (navigation.state.params != undefined && (navigation.state.params.form == 'Password' || navigation.state.params.form == 'Register')) {
          navigation.navigate('Home');
        } else {
          navigation.goBack()
        }
      }
    }
  }

  async handleWxLogin() {
    try {
      let { userStore, navigation } = this.props
      let response = await userStore.WxLogin()
      if (response != null) {
        if (response.errorCode == 1056) {
          //未绑定手机
        } else {
          await userStore.setToken(response.data.token)
          await RNStorage.save({ key: 'token', data: response.data.token })
          // await userStore.GetUserInfo();
          DeviceEventEmitter.emit('TORELOADMINE', 'yes');
          navigation.goBack()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { mobile, password, clicking } = this.state
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="登录"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1]} keyboardShouldPersistTaps="handled">
          <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1, { height: screenH - setSize(200) }]}>
            <View style={[mainStyle.column]}>
              <WhiteSpace style={[{ height: setSize(120) }]} />
              <InputItem
                clear
                type="phone"
                ref={el => (this.codeRef = el)}
                value={mobile}
                onChange={value => {
                  this.setState({
                    mobile: value
                  });
                }}
                placeholder="请输入手机号"
                style={[mainStyle.fs14]}
                onFocus={() => {

                }}
              >
                <Text style={[mainStyle.c333, mainStyle.fs14]}>手机号</Text>
              </InputItem>
              <InputItem
                clear
                value={password}
                type="password"
                onChange={value => {
                  this.setState({
                    password: value
                  });
                }}
                placeholder="请输入密码"
                style={[mainStyle.fs14]}
                extra={
                  <Text style={[mainStyle.czt, mainStyle.fs13, mainStyle.pa5_10]}>忘记密码?</Text>
                }
                onExtraClick={() => { this.props.navigation.navigate('Forget') }}
                onVirtualKeyboardConfirm={() => { }}
              >
                <Text style={[mainStyle.c333, mainStyle.fs14]}>密码</Text>
              </InputItem>
              <WhiteSpace />
              <View style={[mainStyle.mat30, mainStyle.palr15]}>
                <BxButton
                  title="登录"
                  colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                  btnstyle={[]}
                  disabled={clicking}
                  onClick={() => { this.handleLogin() }}
                ></BxButton>
              </View>
              <View style={[mainStyle.mat20, mainStyle.palr15]}>
                <BxButton
                  color={mainStyle.czt.color}
                  plain
                  title="注册"
                  btnstyle={[mainStyle.bgcfff]}
                  onClick={() => {
                    this.props.navigation.navigate('Register')
                  }}></BxButton>
              </View>
              <View style={[mainStyle.mat20, mainStyle.palr15]}>
                <BxButton
                  color={mainStyle.cjin.color}
                  plain
                  title="微信授权登录"
                  btnstyle={[mainStyle.bgcfff]}
                  onClick={() => { this.handleWxLogin() }}
                ></BxButton>
              </View>
            </View>
            {/* <View style={[mainStyle.mat20, mainStyle.row, mainStyle.jcCenter, mainStyle.h100]}>
              <Text style={[mainStyle.czt, mainStyle.pa5_10, mainStyle.fs13]}>《用户注册协议》</Text>
            </View> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Login