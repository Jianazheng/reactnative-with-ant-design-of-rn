import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image, DeviceEventEmitter, StyleSheet, Keyboard } from 'react-native';
import { WingBlank, WhiteSpace, InputItem, Toast, Picker } from '@ant-design/react-native';
import { mainStyle, setSize } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';
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
  country_code: array
}

@inject('userStore')
@observer
class WxBind extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('重置密码'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  timer: any;
  codeRef: any;
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      mobile: '',
      code: '',
      imgcode: '',
      password: '',
      clicking: false,
      sending: false,
      country_code: ['86']
    };
  }
  componentDidMount() {
    let { userStore } = this.props;
    userStore.getareacode();
  }
  async handleVerify() {
    let { userStore, navigation } = this.props
    let { params } = navigation.state
    let { mobile, code } = this.state
    if (mobile == '' || code == '') {
      Toast.info('请输入信息')
      return false
    }
    let mobiles = mobile.replace(/ /g, '');
    let res = await userStore.bindPhone({ mobile: mobiles, code, access_token: { ...params.wxdata } })
    if (res != null) {
      await userStore.setToken(res.data)
      await RNStorage.save({ key: 'token', data: res.data })
      DeviceEventEmitter.emit('TORELOAD', 'yes')//刷新需要刷新的接口
      // navigation.popToTop()
      navigation.replace('Info', { form: 'Home' })
    }
  }

  render() {
    let { mobile, imgcode, clicking, country_code } = this.state;
    let { userStore: { codeList } } = this.props
    return (
      <View style={[mainStyle.flex1]}>
        <NavTop
          navType="normal"
          title="绑定手机"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1]}>
          <View style={[mainStyle.mab30, { marginTop: setSize(120) }]}>
            <Picker
              value={country_code}
              data={codeList}
              cols={1}
              onChange={value => {
                this.setState({
                  country_code: value
                });
              }}
            >
              <PickerChildren>区号</PickerChildren>
            </Picker>
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
              style={[mainStyle.fs14]}
              placeholder="请输入手机号"
              onBlur={() => { Keyboard.dismiss(); }}
            >
              <Text style={[mainStyle.c333, mainStyle.fs14]}>手机号</Text>
            </InputItem>

            {/* <InputItem
              clear
              value={imgcode}
              onChange={value => {
                this.setState({
                  imgcode:value
                });
              }}
              placeholder="请输入图片验证"
              extra={
                <Image style={[{width:setSize(220)}]} source={require('../../../images/imgcode.png')}></Image>
              }
              style={[mainStyle.fs14]}
              onExtraClick={()=>{}}
            >
              <Text style={[mainStyle.c333,mainStyle.fs14]}>图片验证码</Text>
            </InputItem> */}

            <BxCodeInput
              mobile={mobile}
              sendType="bind"
              countrycode={country_code}
              codeView={(e) => {
                this.setState({
                  code: e
                })
              }} />
            <WhiteSpace />
            <View style={[mainStyle.mat30, mainStyle.palr15]}>
              <BxButton
                title="确认绑定"
                disabled={clicking}
                colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                onClick={() => {
                  this.handleVerify();
                }}></BxButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const PickerChildren = (props: any) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[styles.pickersty, mainStyle.row]}
    >
      <Text style={[mainStyle.c333, mainStyle.fs14, mainStyle.flex1]}>{props.children}</Text>
      <Text style={[mainStyle.fs14, mainStyle.c333]}>
        {props.extra}
      </Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  pickersty: {
    paddingTop: setSize(30),
    paddingBottom: setSize(30),
    marginLeft: setSize(30),
    paddingRight: setSize(30),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd',
  },
})
export default WxBind