
import React,{PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import {ActivityIndicator} from '@ant-design/react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';



interface Props {
  onClick:()=>void,
  btnstyle:any,
  textstyle:any,
  title:string,
  disabled:boolean
}

interface State {
  clicked:boolean
}

export default class BxButton extends PureComponent<Props,State>{
  
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      clicked:false,
    }
  }

  handleClick=()=>{
    let {clicked} = this.state;
    if(clicked){
      return false
    }
    this.setState({
      clicked:true
    },()=>{
      this.props.onClick();
      (()=>{
          console.log('ok')
          this.setState({
            clicked:false
          })
      })();
    })
  }

  render(){
    let {clicked} = this.state;
    let {title,disabled,btnstyle,textstyle} = this.props;
    if(!disabled&&!clicked){
      return(
        <TouchableOpacity
        onPressIn={()=>{
          this.handleClick();
        }}
        >
          <View style={[styles.btn,mainStyle.bgczt,btnstyle]}>
            <Text style={[mainStyle.cfff,mainStyle.fs14,textstyle]}>{title}</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      return(
        <View style={[mainStyle.bgccc,styles.btn,btnstyle]}>
          <ActivityIndicator />
          <Text style={[mainStyle.c666,mainStyle.fs14,mainStyle.mal10,textstyle]}>{title}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'#e2e2e2',
    height:setSize(80),
    borderRadius:setSize(10),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
})