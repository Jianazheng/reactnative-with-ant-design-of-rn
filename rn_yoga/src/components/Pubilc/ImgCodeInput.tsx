
import React,{PureComponent} from 'react';
import { Text, StyleSheet,View, Alert, Image } from 'react-native';
import {InputItem} from '@ant-design/react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';
import { Fetch } from './../../fetch/request';



interface Props {
  codeView:()=>void,
  code:string,
  onClick:()=>void,
}

interface State {
  
}

export default class BxImgCodeInput extends PureComponent<Props,State>{
  
  imgCodeOption:object;

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      sending:false,
      codeval:'',
      img:''
    }
    this.imgCodeOption = {
      length:4,
      height:40,
      width:100,
      fontSize:14,
      id:1
    }
  }

  componentDidMount(){
    //this.getImgCode(this.imgCodeOption)
  }

  handleCodeClick(){
    this.props.onClick();
  }

  async getImgCode(params:object){
    try{
      let response = await new Fetch('/login/create_verify','get',params,{})
      console.log(response)
    }catch(e){
      console.log(e)
    }
  }

  handleCodeInput(val:string){
    this.setState({
      codeval:val
    })
    this.props.codeView(val)
  }

  render(){
    let {code} = this.props;
    let {codeval} = this.state;
    return(
      <View>
        <InputItem
          clear
          type="number"
          value={codeval}
          maxLength={code.length}
          onChange={value => {
            this.handleCodeInput(value);
          }}
          extra={
            <ImgCode str={code}></ImgCode>
          }
          onExtraClick={()=>{this.handleCodeClick()}}
          placeholder="请输入图片验证码"
          style={[mainStyle.fs14]}
        >
          <Text style={[mainStyle.c333,mainStyle.fs14]}>图片验证码</Text>
        </InputItem>
      </View>
    )
  }
}

interface ImgProps {
  str:string
}

class ImgCode extends React.Component<ImgProps>{

  color:Array<string>;

  constructor(props:ImgProps){
    super(props)
    this.color = [
      '#191970',
      '#3CB371',
      '#00BFFF',
      '#D2691E',
      '#BA55D3',
      "#FF4560",
      '#FA5439',
      '#C59743',
      '#CE2A2A',
      '#8D002F',
      ]
  }
  render(){
    let {str} = this.props;
    let arr = [];
    for(let i=0;i<str.length;i++){
      arr.push(str[i])
    }
    return(
      <View style={[styles.imgcode,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,mainStyle.bgcf2]}>
        {
          arr.map((val,i)=>
          <Text
          key={i} 
          style={[{
            paddingLeft:setSize(4),
            paddingRight:setSize(4),
            color:this.color[val],
            fontSize:val%2==0?setSize(36):setSize(42),
            transform:[
              {
                translateY:val%2==0?setSize(4):setSize(-2),
              },
              {
                scaleY:val%2==0?setSize(1.8):setSize(1.4),
              },
              {
                rotateZ:val%2==0?'35deg':'5deg',
              },
              {
                skewY:val%2==0?'25deg':'-25deg'
              }
            ]
            
          }]}>{val}</Text>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgcode:{
    height:setSize(80),
    width:setSize(200)
  }
})