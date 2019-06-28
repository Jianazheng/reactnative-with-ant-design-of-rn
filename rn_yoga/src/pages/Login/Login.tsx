import React from 'react';
import { Text, View, ScrollView, Animated } from 'react-native';
import { WingBlank, WhiteSpace, InputItem, Toast } from '@ant-design/react-native';
import { mainStyle,screenH,setSize, screenW } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';


interface Props {}
interface State {
  codeText:string,
  mobile:string,
  code:string,
  password:string,
  codeSec:number,
  clicking:boolean
}

@inject('userStore')
@observer
class Login extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('登录'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  timer:any;
  codeRef:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      mobile:'',
      password:'',
      clicking:false,
      sending:false,
    };
  }

  componentDidMount(){
    
  }

  async handleLogin(){
    let {userStore,navigation} = this.props;
    let {mobile,password} = this.state;
    if(mobile==''||password==''){
      Toast.info('请输入登录信息',1.8);
      return false
    }
    let response = await userStore.Login({mobile:mobile.replace(/ /g,''),password});
    if(response!=null){
      Toast.info(response.msg,2);
      userStore.GetUserInfo().then(res=>{});
      navigation.goBack();
    }

  }

  render(){
    let {mobile,password,clicking} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="登录"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1]}>
          <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,{height:screenH-setSize(200)}]}>
            <View style={[mainStyle.column]}>
              <WhiteSpace style={[{height:setSize(120)}]}/>
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
                style={[mainStyle.fs14]}
                onFocus={()=>{

                }}
              >
                <Text style={[mainStyle.c333,mainStyle.fs14]}>手机号</Text>
              </InputItem>
              <InputItem
                clear
                value={password}
                type="password"
                onChange={value => {
                  this.setState({
                    password:value
                  });
                }}
                placeholder="请输入密码"
                style={[mainStyle.fs14]}
                extra={
                  <Text style={[mainStyle.czt,mainStyle.fs13,mainStyle.pa5_10]}>忘记密码?</Text>
                }
                onExtraClick={()=>{this.props.navigation.navigate('Forget')}}
                onVirtualKeyboardConfirm={()=>{}}
              >
                <Text style={[mainStyle.c333,mainStyle.fs14]}>密码</Text>
              </InputItem>
              <WhiteSpace />
              <View style={[mainStyle.mat30,mainStyle.palr15]}>
                <BxButton 
                title="登录" 
                colors={[mainStyle.czt.color,mainStyle.cztc.color]}
                btnstyle={[]}
                disabled={clicking} 
                onClick={()=>{this.handleLogin()}}
                ></BxButton>
              </View>
              <View style={[mainStyle.mat20,mainStyle.palr15]}>
                <BxButton
                color={mainStyle.czt.color}
                plain
                title="注册" 
                btnstyle={[mainStyle.bgcfff]}
                onClick={()=>{
                  this.props.navigation.navigate('Register')
                }}></BxButton>
              </View>
            </View>
            <View style={[mainStyle.mat20,mainStyle.row,mainStyle.jcCenter,mainStyle.h100]}>
              <Text style={[mainStyle.czt,mainStyle.pa5_10,mainStyle.fs13]}>《用户注册协议》</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Login