
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import { mainStyle, setSize,screenW } from '../../public/style/style';



interface Props {
  onChange:(selected:boolean)=>void,
  size:number,
  data:object,
  color:string,
  checked:boolean
}

interface State {
  onselect:false
}

export default class BxRadio extends React.Component<Props,State>{

  constructor(props:Props,state:State){
    super(props);
    this.state = {
      onselect:false
    }
  }

  handleOnChange(selected:boolean){
    let {onChange,data} = this.props;
    this.setState({
      onselect:selected
    })
    if(onChange){
      onChange({selected,data});
    }
  }
  render(){
    let {size,color} = this.props;
    let {onselect} = this.state;
    if(onselect){
      return (
        <TouchableOpacity onPress={()=>{
          this.handleOnChange(!onselect)
        }}>
          <Text style={[
            mainStyle.icon,
            mainStyle.cfff,
            styles.selectTap,
            size==undefined?mainStyle.fs22:{fontSize:size},
            color==undefined?mainStyle.bgczt:{backgroundColor:color},
            ]}>&#xe64e;
          </Text>
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity onPress={()=>{
          this.handleOnChange(!onselect)
        }}>
          <Text style={[
            mainStyle.icon,
            mainStyle.cfff,
            styles.selectTap,
            styles.noselectTap,
            size==undefined?mainStyle.fs22:{fontSize:size},
            mainStyle.bgcfff
            ]}>&#xe64e;
          </Text>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  selectTap:{
    borderRadius:setSize(40),
    padding:setSize(1)
  },
  noselectTap:{
    borderWidth:setSize(1),
    padding:0,
    borderColor:mainStyle.c666.color
  }
})