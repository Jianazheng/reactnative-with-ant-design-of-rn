import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import {WingBlank,WhiteSpace,InputItem, Toast} from '@ant-design/react-native';
import { mainStyle, setSize } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props {}
interface State {
  codeText:string,
  mobile:string,
  mobileCode:string,
  password:string,
  codeSec:number
}

@inject('userStore')
@observer
class Forget extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('重置密码'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  timer:any;
  codeRef:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      mobile:'',
      mobileCode:'',
      imgcode:'',
      password:'',
      clicking:false,
      sending:false
    };
  }

  async handleVerify(){
    let {userStore,navigation} = this.props;
    let {mobile,mobileCode} = this.state;
    if(mobile==''||mobileCode==''){
      Toast.info('请输入信息')
      return false
    }
    let mobiles = mobile.replace(/ /g,'');
    let res = await userStore.PasswordVerify({mobile:mobiles,mobileCode,type:'pwd'})
    if(res!=null){
      navigation.navigate('Password',{mobiles})
    }
  }

  render(){
    let {mobile,imgcode,clicking} = this.state;
    return (
      <View style={[mainStyle.flex1]}>
        <NavTop
        navType="normal"
        title="修改密码"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1]}>
          <View style={[mainStyle.mab30,{marginTop:setSize(120)}]}>
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
              style={[mainStyle.fs14]}
              placeholder="请输入手机号"
            >
              <Text style={[mainStyle.c333,mainStyle.fs14]}>手机号</Text>
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
            sendType="pwd"
            codeView={(e)=>{
              this.setState({
                mobileCode:e
              })
            }}/>
            <WhiteSpace />
            <View style={[mainStyle.mat30,mainStyle.palr15]}>
              <BxButton 
              title="下一步" 
              disabled={clicking} 
              colors={[mainStyle.czt.color,mainStyle.cztc.color]}
              onClick={()=>{
                this.handleVerify();
              }}></BxButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Forget