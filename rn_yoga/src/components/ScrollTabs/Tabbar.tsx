import React,{PureComponent} from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ScrollView,Animated,
  Easing } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';
import {layout} from '../../public/js/dom'

const scrollbarWidth = setSize(60);

interface Props {
  tabs:any[],
  ontabChange?:(i:number)=>void
}
type State = {
  tabsSlide:number
}

class BxTabbars extends PureComponent<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabsSlide:new Animated.Value(setSize(0))
    }
  }

  handleTabClick(i){
    let ref = this.refs['tabsItem'+i];
    let {tabsSlide} = this.state;
    let speed = 100;
    layout(ref).then(res=>{
      //
      this.refs.tab.scrollTo({x: res.pageX, y: 0, duration: speed});
      //判断进度条位移
      Animated.timing(tabsSlide, {
        toValue: i>0?(res.pageX+(res.width-scrollbarWidth)/2-setSize(20)):setSize(10),
        easing: Easing.bezier(1,0.8,0.6,0.4),
        duration: speed
      }).start();
      this.props.ontabChange(i);
    })
    
  }

  render(){
    let {tabs} = this.props;
    let {tabsSlide} = this.state;
    return (
      <View style={[mainStyle.flex1]}>
        <ScrollView ref="tab" horizontal={true} contentContainerStyle={[mainStyle.column,mainStyle.jcBetween,mainStyle.h80]}>
          <View style={[styles.scrollmain,mainStyle.row]}>
          {
            tabs.map((val,i)=>{
              return (
                <TouchableOpacity ref={'tabsItem'+i}  key={i} style={[styles.scrollItem,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}
                onPress={this.handleTabClick.bind(this,i)}>
                  <Text style={[mainStyle.fs12,mainStyle.c333]}>{val.title}</Text>
                </TouchableOpacity>
              )
            })
          }
          </View>
          <Animated.Text style={[styles.scrollbar,{
            transform:[
              {
                translateX:tabsSlide
              }
            ]
          }]}></Animated.Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollmain:{},
  scrollItem:{
    paddingLeft:setSize(5),
    paddingRight:setSize(5),
    height:setSize(70),
    paddingTop:setSize(10),
    marginRight:setSize(40),
  },
  scrollbar:{
    backgroundColor:mainStyle.czt.color,
    height:setSize(8),
    width:scrollbarWidth
  }
})

export default BxTabbars