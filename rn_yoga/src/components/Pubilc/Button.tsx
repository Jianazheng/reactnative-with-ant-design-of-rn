
import React,{PureComponent} from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import {ActivityIndicator} from '@ant-design/react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';



interface Props {
  onClick:()=>void,
  btnstyle:any,
  textstyle:any,
  title:string,
  disabled:boolean,
  borderRadius:number,
  plain:boolean,
  color:string
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

  plainStyle(color:string){
    return {
      borderColor:color,
      borderWidth:setSize(2)
    }
  }

  fillStyle(color:string){
    return {
      backgroundColor:color,
    }
  }

  plainTextStyle(color:string){
    return {
      color:color
    }
  }

  render(){
    let {clicked} = this.state;
    let {title,disabled,btnstyle,textstyle,borderRadius,color,plain} = this.props;
    if(borderRadius==undefined)borderRadius = setSize(6);
    if(!disabled&&!clicked){
      return(
        <TouchableOpacity
        onPressIn={()=>{
          this.handleClick();
        }}
        >
          <View style={[
            styles.btn,mainStyle.bgczt,
            {
              borderRadius:borderRadius
            },
            plain?this.plainStyle(color):this.fillStyle(color),
            btnstyle]}>
            <Text style={[
              mainStyle.cfff,mainStyle.fs13,
              plain?this.plainTextStyle(color):{color:'#fff'},
              textstyle]}>{title}</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      return(
        <View style={[
          mainStyle.bgccc,styles.btn,
          {
            borderRadius:borderRadius
          },
          btnstyle]}>
          <ActivityIndicator />
          <Text style={[mainStyle.c666,mainStyle.fs13,mainStyle.mal10,textstyle]}>{title}</Text>
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