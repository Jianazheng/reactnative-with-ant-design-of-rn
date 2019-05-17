import React from 'react';
import { Text, View, Alert,TouchableOpacity,StyleSheet,Animated,Easing } from 'react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import {mainStyle,setSize,screenW} from "../../public/style/style";

interface Props {
  
}
interface State {
  list?:any[],
  fadeAnim:number
}

class HomeSearchBar extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      list:['你好','谢谢'],
      fadeAnim:new Animated.Value(0)
    };
    this.sildeItem = screenW-setSize(80);
  }

  componentDidMount(){
    this.broadshow();
  }

  broadshow(){
    let {fadeAnim,list} = this.state;
    let currentIndex = 0;
    setInterval(()=>{
      if(currentIndex>=list.length){
        currentIndex = 0;
      }
      Animated.timing(fadeAnim, {
        toValue: -(currentIndex*this.sildeItem),
        easing: Easing.bezier(1,0,0,1),
        duration: 600
      }).start();
      currentIndex++;
    },2000)
  }

  gotoBroadcast(){

  }

  render(){
    let {list,fadeAnim} = this.state;
    return (
      <View>
        <View style={[mainStyle.palr15,mainStyle.bgcf7,mainStyle.h80,mainStyle.dflex,mainStyle.row,mainStyle.aiCenter]}>
          <View style={[styles.broadicon,mainStyle.row,mainStyle.aiCenter]}>
            <IconFill name="sound" size={20} color={mainStyle.czt.color}></IconFill>
          </View>
          <View style={[mainStyle.flex1,mainStyle.column,styles.broadmain]}>
            <Animated.View style={[mainStyle.flex1,mainStyle.row,mainStyle.aiCenter,styles.broadinfo,{
              width:list.length*this.sildeItem,
              transform:[
                {
                  translateX:fadeAnim
                }
              ]
            }]}>
              {
                list.map((val,i)=>{
                  return(
                    <TouchableOpacity key={i} style={[styles.broaditem,mainStyle.aiCenter,mainStyle.row,mainStyle.flex1]} onPress={this.gotoBroadcast}>
                      <Text style={[mainStyle.c333,mainStyle.fs14,mainStyle.pal10]}>{val}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  broadicon:{
    height:setSize(60),
    width:setSize(60)
  },
  broadmain:{
    overflow:'hidden',
    height:setSize(60),
  },
  broadinfo:{
    
  },
  broaditem:{
    height:setSize(60)
  }
})

export default HomeSearchBar