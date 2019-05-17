
import React,{PureComponent} from 'react';
import { Text, StyleSheet,View, Alert } from 'react-native';
import {InputItem} from '@ant-design/react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';



interface Props {
  codeView:()=>void,
  mobile:string
}

interface State {
  
}

export default class BxCodeInput extends PureComponent<Props,State>{
  
  timer:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      sending:false,
      codeText:"获取验证码",
      codeSec:0,
      code:''
    }
  }

  codeClick(){
    let {mobile} = this.props;
    let {sending} = this.state;
    if(mobile==''){
      Alert.alert('请输入手机号码');
      return false
    }
    if(sending){
      
    }else{
      let Sec = 60;
      this.setState({
        sending:true
      });
      this.timer = setInterval(()=>{
        if(Sec<=0){
          Sec = 0;
          this.setState({
            sending:false
          });
          clearInterval(this.timer);
        }
        this.setState((prev:State)=>{
          let codeText = Sec>1?Sec+"秒后获取":"获取验证码"
          return {
            codeSec:Sec,
            codeText
          }
        })
        Sec--;
      },1000)
    }
  }

  handleCodeInput(val:string){
    this.setState({
      code:val
    })
    this.props.codeView(val)
  }

  render(){
    let {code,codeSec,codeText} = this.state;
    return(
      <View>
        <InputItem
          clear
          type="number"
          value={code}
          onChange={value => {
            this.handleCodeInput(value);
          }}
          extra={
            codeSec<=0
            ?<Text style={[mainStyle.czt,mainStyle.fs13,mainStyle.pa5_10]}>{codeText}</Text>
            :<Text style={[mainStyle.c999,mainStyle.fs13]}>{codeText}</Text>
          }
          onExtraClick={()=>{this.codeClick()}}
          placeholder="请输入验证码"
        >
          验证码
        </InputItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})