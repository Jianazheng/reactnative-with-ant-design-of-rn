import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import {WingBlank,WhiteSpace,InputItem} from '@ant-design/react-native';
import { mainStyle } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import BxCodeInput from '../../components/Pubilc/CodeInput';
import { ScrollView } from 'react-native-gesture-handler';


interface Props {}
interface State {
  codeText:string,
  mobile:string,
  code:string,
  password:string,
  codeSec:number
}

class Forget extends React.Component<Props,State> {
  static navigationOptions = {
    headerTitle:headerTitle('忘记密码'),
    headerRight:headerRight(<Text></Text>),
  }
  timer:any;
  codeRef:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      mobile:'',
      code:'',
      imgcode:'',
      password:'',
      clicking:false,
      sending:false
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
    let {mobile,password,code,imgcode,clicking} = this.state;
    return (
      <View style={[mainStyle.column,mainStyle.jcCenter,mainStyle.flex1]}>
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
          >
            手机号
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
            extra={
              <Image source={require('../../../images/imgcode.png')}></Image>
            }
            onExtraClick={()=>{}}
          >
            图片验证
          </InputItem>
          <WhiteSpace />
          <BxCodeInput mobile={mobile} codeView={(e)=>{
            console.log(e)
          }}/>
          <WhiteSpace />
          <View style={[mainStyle.mat30]}>
            <BxButton title="下一步" disabled={clicking} onClick={()=>{
              this.props.navigation.navigate('Password');
            }}></BxButton>
          </View>
        </WingBlank>
      </View>
    )
  }
}

export default Forget