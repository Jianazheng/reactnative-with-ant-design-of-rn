import React from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { WingBlank, WhiteSpace, InputItem, Toast } from '@ant-design/react-native';
import { mainStyle, screenH, setSize } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';
import NavTop from '../../router/navTop';
import BxImgCodeInput from '../../components/Pubilc/ImgCodeInput';
import { randomCode } from '../../tools/function';
import { Fetch } from './../../fetch/request';
import { observer, inject } from 'mobx-react';
import userStore from './../../store/modules/userStore';


interface Props { }
interface State {
  codeText: string,
  mobile: string,
  code: string,
  mobileCode: string,
  imgcode: string,
  imgcode2: string,
  password: string,
  rpassword: string,
  codeSec: number,
  clicking: boolean
}

@inject('userStore')
@observer
class Register extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('注册'),
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
      mobileCode: '',
      rpassword: '',
      password: '',
      imgcode: '',
      imgcode2: '',
      imgVerify: false,
      imgVerifyMsg: '请输入图片验证码',
      clicking: false,
      sending: false
    };
  }

  componentDidMount() {

  }

  handleRegister() {
    let { userStore, navigation } = this.props;
    let { mobile, mobileCode, password, rpassword } = this.state;

    if (mobile == '' || mobileCode == '' || password == '' || rpassword == '') {
      Toast.info('请输入注册信息');
      return false
    }
    userStore.RegisterAndPassword({ mobile: mobile.replace(/ /g, ''), mobileCode, password, rpassword, type: 'reg' })
      .then(res => {
        this.setState({
          clicking: true
        }, () => {
          navigation.replace('Info', { form: 'Login' })
        })
        setTimeout(() => {
          this.setState({
            clicking: false
          })
        }, 100)
      })

  }

  handleChangeCode() { }

  render() {
    let { mobile, password, rpassword, clicking, imgcode2 } = this.state;
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="注册"
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
              >
                <Text style={[mainStyle.c333, mainStyle.fs14]}>手机号</Text>
              </InputItem>

              {/* <BxImgCodeInput
              code={imgcode2}
              onClick={()=>{
                this.handleChangeCode()
              }}
              codeView={(e)=>{
                this.setState({
                  imgcode:e
                });
              }}
              ></BxImgCodeInput> */}

              <BxCodeInput
                mobile={mobile}
                sendType="reg"
                codeView={(e) => {
                  this.setState({
                    mobileCode: e
                  });
                }} />

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
              >
                <Text style={[mainStyle.c333, mainStyle.fs14]}>密码</Text>
              </InputItem>
              <InputItem
                clear
                value={rpassword}
                type="password"
                onChange={value => {
                  this.setState({
                    rpassword: value
                  });
                }}
                placeholder="请再次输入密码"
                style={[mainStyle.fs14]}
              >
                <Text style={[mainStyle.c333, mainStyle.fs14]}>确认密码</Text>
              </InputItem>
              <WhiteSpace />
              <View style={[mainStyle.palr15]}>
                <View style={[mainStyle.mat20]}>
                  <BxButton
                    title="注册"
                    disabled={clicking}
                    colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                    onClick={() => { this.handleRegister() }}
                  ></BxButton>
                </View>
                <View style={[mainStyle.mat10]}>
                  <BxButton
                    title="返回登录"
                    plain
                    clear
                    color={mainStyle.c666.color}
                    textstyle={[mainStyle.c333]}
                    btnstyle={[mainStyle.bgcfff]}
                    disabled={false}
                    onClick={() => {
                      this.props.navigation.goBack();
                    }}></BxButton>
                </View>
              </View>
            </View>
            <View style={[mainStyle.mat20, mainStyle.row, mainStyle.jcCenter, mainStyle.h100]}>
              <Text style={[mainStyle.czt, mainStyle.pa5_10, mainStyle.fs13]}>《用户注册协议》</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Register