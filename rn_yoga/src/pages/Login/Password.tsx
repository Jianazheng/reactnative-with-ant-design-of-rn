import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import {WingBlank,WhiteSpace,InputItem} from '@ant-design/react-native';
import { mainStyle } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';


interface Props {}
interface State {

}

class Password extends React.Component<Props,State> {
  static navigationOptions = {
    headerTitle:headerTitle('重置密码'),
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
      sending:false
    };
  }

  render(){
    let {mobile,password,code,imgcode,clicking} = this.state;
    return (
      <View style={[mainStyle.column,mainStyle.jcCenter,mainStyle.flex1]}>
        <WingBlank style={[mainStyle.mab30]}>
          <InputItem
            placeholder="18828838888"
            value={'18828838888'}
          >
            绑定手机
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
            placeholder="请输入图片验证码"
          >
            图片验证
          </InputItem>
          <WhiteSpace />
          <BxCodeInput mobile={mobile} codeView={(e)=>{
            console.log(e)
          }}/>
          <WhiteSpace />
          <View style={[mainStyle.mat30]}>
            <BxButton title="确认重置" disabled={clicking} onClick={()=>{
              this.props.navigation.pop(2)
            }}></BxButton>
          </View>
        </WingBlank>
      </View>
    )
  }
}

export default Password