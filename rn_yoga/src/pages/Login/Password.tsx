import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import {WingBlank,WhiteSpace,InputItem} from '@ant-design/react-native';
import { mainStyle,setSize } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';
import NavTop from '../../router/navTop';

interface Props {}
interface State {

}

class Password extends React.Component<Props,State> {
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
      code:'',
      password:'',
      clicking:false,
      sending:false
    };
  }

  render(){
    let {mobile,password,code,imgcode,clicking} = this.state;
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
              placeholder="18828838888"
              value={'18828838888'}
              style={[mainStyle.fs14]}
            >
              <Text style={[mainStyle.c333,mainStyle.fs14]}>绑定手机</Text>
            </InputItem>
            <WhiteSpace />
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
            <WhiteSpace />
            <BxCodeInput mobile={mobile} codeView={(e)=>{
              console.log(e)
            }}/>
            <WhiteSpace />
            <View style={[mainStyle.mat30,mainStyle.palr15]}>
              <BxButton 
              title="确认重置" 
              disabled={clicking}
              colors={[mainStyle.czt.color,mainStyle.cztc.color]}
              onClick={()=>{
                this.props.navigation.pop(2)
              }}></BxButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Password