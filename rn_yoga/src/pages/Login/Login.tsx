import React from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';
import {WingBlank,WhiteSpace,InputItem} from '@ant-design/react-native';
import { mainStyle,screenH } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';


interface Props {}
interface State {
  codeText:string,
  mobile:string,
  code:string,
  password:string,
  codeSec:number
}

class Login extends React.Component<Props,State> {
  static navigationOptions = {
    headerTitle:headerTitle('登录'),
    headerRight:headerRight(<Text></Text>),
  }
  timer:any;
  codeRef:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      mobile:'',
      code:'',
      password:'',
      clicking:false,
      sending:false,
    };
  }

  handleLogin(){
    this.setState({
      clicking:true
    })
    setTimeout(()=>{
      this.setState({
        clicking:false
      })
    },100)
  }

  render(){
    let {mobile,password,clicking} = this.state;
    return (
      <ScrollView>
        <View style={[mainStyle.column,mainStyle.jcCenter,mainStyle.flex1,{height:screenH}]}>
          <WingBlank style={[mainStyle.mab30]}>
            <InputItem
              clear
              type="phone"
              ref={el => (this.codeRef = el)}
              value={mobile}
              onChange={value => {
                this.setState({
                  mobile:value
                });
              }}
              placeholder="请输入手机号"
              onFocus={()=>{

              }}
            >
              手机号
            </InputItem>
            <WhiteSpace />
            <BxCodeInput mobile={mobile} codeView={(e)=>{
              console.log(e)
            }}/>
            <WhiteSpace />
            <InputItem
              clear
              value={password}
              onChange={value => {
                this.setState({
                  password:value
                });
              }}
              placeholder="请输入密码"
              extra={
                <Text style={[mainStyle.czt,mainStyle.fs13,mainStyle.pa5_10]}>忘记密码</Text>
              }
              onExtraClick={()=>{this.props.navigation.navigate('Forget')}}
              onVirtualKeyboardConfirm={()=>{}}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <View style={[mainStyle.mat30]}>
              <BxButton title="登录" disabled={clicking} onClick={()=>{this.handleLogin()}}></BxButton>
            </View>
            <View style={[mainStyle.mat20]}>
              <BxButton title="注册" textstyle={[mainStyle.c333]} btnstyle={[mainStyle.bgcf7]} disabled={false} onClick={()=>{
                this.props.navigation.navigate('Register')
              }}></BxButton>
            </View>
            <View style={[mainStyle.mat20,mainStyle.row,mainStyle.jcCenter]}>
              <Text style={[mainStyle.czt,mainStyle.pa5_10,mainStyle.fs13]}>《用户注册协议》</Text>
            </View>
          </WingBlank>
        </View>
      </ScrollView>
    )
  }
}

export default Login