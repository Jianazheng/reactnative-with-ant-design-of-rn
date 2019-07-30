import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { WingBlank, WhiteSpace, InputItem, Toast } from '@ant-design/react-native';
import { mainStyle, setSize } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {

}

@inject('userStore')
@observer
class Password extends React.Component<Props, State> {
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
      password: '',
      rpassword: '',
      clicking: false,
      sending: false
    };
  }

  componentDidMount() {
    let { params } = this.props.navigation.state;
    this.setState({
      mobile: params.mobiles
    })
  }

  async handleChangePassword() {
    let { userStore, navigation } = this.props;
    let { mobile, password, rpassword } = this.state;
    if (password == '' || rpassword == '') {
      Toast.info('请输入密码')
      return false
    }
    let res = await userStore.ChangePassword({ mobile, password, rpassword })
    console.log(navigation);
    if (res != null) {
      // let resetActiom = navigation.reset({
      //   index: 0,//默认打开actions中的第几个页面
      //   actions: [
      //     navigation.navigate({ routeName: 'Login'mobile: mobile)//这里有几个就保留几个，点击完成后就会重构导航器
      //   ]
      // })
      // navigation.dispatch(resetActiom)
      navigation.replace('Login', { mobile: mobile, form: 'Password' });
    }
  }

  render() {
    let { mobile, password, rpassword, clicking } = this.state;
    return (
      <View style={[mainStyle.flex1]}>
        <NavTop
          navType="normal"
          title="修改密码"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1]}>
          <View style={[mainStyle.mab30, { marginTop: setSize(120) }]}>
            <InputItem
              placeholder={mobile}
              value={mobile}
              style={[mainStyle.fs14]}
            >
              <Text style={[mainStyle.c333, mainStyle.fs14]}>绑定手机</Text>
            </InputItem>
            <InputItem
              placeholder="请输入新的密码"
              type="password"
              value={password}
              style={[mainStyle.fs14]}
              onChange={value => {
                this.setState({
                  password: value
                })
              }}
            >
              <Text style={[mainStyle.c333, mainStyle.fs14]}>新的密码</Text>
            </InputItem>
            <InputItem
              placeholder="再次输入密码"
              type="password"
              value={rpassword}
              style={[mainStyle.fs14]}
              onChange={value => {
                this.setState({
                  rpassword: value
                })
              }}
            >
              <Text style={[mainStyle.c333, mainStyle.fs14]}>确认密码</Text>
            </InputItem>
            {/* <WhiteSpace />
            <InputItem
              clear
              value={imgcode}
              onChange={value => {
                this.setState({
                  imgcode:value
                });
              }}
              style={[mainStyle.fs14]}
              placeholder="请输入图片验证码"
            >
              <Text style={[mainStyle.c333,mainStyle.fs14]}>图片验证码</Text>
            </InputItem>
            <WhiteSpace /> */}
            <WhiteSpace />
            <View style={[mainStyle.mat30, mainStyle.palr15]}>
              <BxButton
                title="确认重置"
                disabled={clicking}
                colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                onClick={() => {
                  //this.props.navigation.pop(2)
                  this.handleChangePassword()
                }}></BxButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Password