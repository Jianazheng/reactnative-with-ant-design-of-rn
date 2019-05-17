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
  tabsSlide:any
  currentIndex:number
}

class BxTabbars extends PureComponent<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      currentIndex:0,
      tabsSlide:new Animated.Value(setSize(5))
    }
  }

  handleTabClick(i:number):void{
    let ref = this.refs['tabsItem'+i];
    let {tabsSlide} = this.state;
    let speed = 100;
    this.setState({
      currentIndex:i
    })
    layout(ref).then(res=>{
      //判断进度条位移
      Animated.timing(tabsSlide, {
        toValue: i>0?(res.pageX+(res.width-scrollbarWidth)/2-setSize(20)):setSize(5),
        easing: Easing.bezier(1,0.8,0.6,0.4),
        duration: speed
      }).start();
      if(this.props.ontabChange){
        this.props.ontabChange(i);
      }
      this.refs.tab.scrollTo({x: res.pageX, y: 0, duration: speed});
    }).catch(err=>{
      console.log(err);
      console.warn('Tab切换报错了')
    })
  }

  render(){
    let {tabs} = this.props;
    let {tabsSlide,currentIndex} = this.state;
    return (
      <View style={[mainStyle.flex1]}>
        <ScrollView ref="tab" horizontal={true} contentContainerStyle={[mainStyle.column,mainStyle.jcBetween,mainStyle.h80]}>
          <View style={[styles.scrollmain,mainStyle.row]}>
          {
            tabs.map((val,i)=>{
              return (
                <TouchableOpacity ref={'tabsItem'+i}  key={i} style={[styles.scrollItem,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}
                onPressIn={this.handleTabClick.bind(this,i)}>
                  <Text style={[mainStyle.fs12,i==currentIndex?mainStyle.czt:mainStyle.c333]}>{val.title}</Text>
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
    height:setSize(60),
    paddingTop:setSize(20),
    marginRight:setSize(40),
  },
  scrollbar:{
    backgroundColor:mainStyle.czt.color,
    height:setSize(6),
    width:scrollbarWidth
  }
})

export default BxTabbars