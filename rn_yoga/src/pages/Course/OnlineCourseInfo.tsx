import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image,Animated } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { Checkbox } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { CourseTeacherItem2 } from '../../components/Course/TeacherItem';
import BxButton from '../../components/Pubilc/Button';
import Video from 'react-native-video';

interface Props {}

let imgw = (screenW-setSize(120))*0.28;

class OnlineCourseInfo extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{},{},{},{},{},{}],
      checkbox:[{title:'座位',checked:true},{title:'餐点',checked:false},{title:'酒店',checked:false},{title:'大巴',checked:false}],
      scrollTop:new Animated.Value(0),
      scrollTopNum:0,
      hidefixedTop:new Animated.Value(0),
      showfixedTop:new Animated.Value(1),
    };
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  selectService(index:number){
    let {checkbox} = this.state;
    let newReason = checkbox;
    newReason[index].checked = !newReason[index].checked;
    this.setState({
      checkbox:newReason,
    })
  }

  handleFixedTop(e:number,tohide:boolean){
    Animated.timing(
      // timing方法使动画值随时间变化
      this.state.hidefixedTop, // 要变化的动画值
      {
        toValue: e<1?0:1, // 最终的动画值
        duration:300
      },
    ).start();

    Animated.timing(
      // timing方法使动画值随时间变化
      this.state.showfixedTop, // 要变化的动画值
      {
        toValue: e>1?0:1, // 最终的动画值
        duration:300
      },
    ).start();

    Animated.timing(
      // timing方法使动画值随时间变化
      this.state.scrollTop, // 要变化的动画值
      {
        toValue: e,
        duration:300
      },
    ).start(()=>{
      
    });
    
  }

  render(){
    let {arr,checkbox,scrollTop,hidefixedTop,showfixedTop} = this.state;
    let {navigation} = this.props;
    console.log(hidefixedTop)
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <Animated.View 
        style={[mainStyle.h100,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,styles.fixedTop,
          {
            opacity:hidefixedTop,
            width:screenW,
            backgroundColor:mainStyle.bgcfff.backgroundColor
          }
        ]}
          >
          <Text style={[mainStyle.icon,mainStyle.c333,styles.goback]} onPress={()=>{
            navigation.goBack()
          }}
          >&#xe64c;</Text>
          <Text style={[mainStyle.c333,mainStyle.fs14]}>课程详情</Text>
          <Text style={[styles.goback]}>&nbsp;</Text>
        </Animated.View>
        <Animated.View 
        style={[mainStyle.h100,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,styles.fixedTop,{opacity:showfixedTop,}]}>
          <Text style={[mainStyle.icon,mainStyle.cfff,styles.goback]} onPress={()=>{
            navigation.goBack()
          }}
          >&#xe64c;</Text>
        </Animated.View>
        <ScrollView 
        style={[mainStyle.flex1]}
        onMomentumScrollBegin={(e)=>{
          this.handleFixedTop(e.nativeEvent.contentOffset.y,true)
        }}
        onMomentumScrollEnd={(e)=>{
          this.handleFixedTop(e.nativeEvent.contentOffset.y,false)
        }}
        >
          <View style={[mainStyle.flex1]}>
            {/** 视频播放 */}
            <View style={[styles.videoVertical,mainStyle.bgc000,mainStyle.positonre]}>
              <Video 
              style={[styles.videoVertical]} 
              source={{uri:'http://tb-video.bdstatic.com/tieba-smallvideo-transcode-crf/2305668_8b4f5e9b97b0df169b82ad5d7fa3b180_1.mp4'}}
              resizeMode={'contain'}
              ></Video>
              
            </View>
            {/** 视频播放 */}
            <View style={[mainStyle.flex1,{marginBottom:setSize(150)}]}>
              <View style={[mainStyle.column,mainStyle.mat15,mainStyle.bgcfff]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>1、课程介绍</Text>
                  </View>
                </View>
                <View style={[mainStyle.column,mainStyle.flex1]}>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brb1f2]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mal30]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mal5]}>对中医的理论理解</Text>
                        <Text style={[styles.oncloseTap]}>已学完</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28,mainStyle.mar10]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brb1f2]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mal30]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28,mainStyle.mar10]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[mainStyle.column,mainStyle.mat15,mainStyle.bgcfff]}>
                <View style={[mainStyle.column,mainStyle.brb1f2]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13,mainStyle.c333]}>2、动作教学</Text>
                  </View>
                </View>
                <View style={[mainStyle.column,mainStyle.flex1]}>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,styles.oncheck]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mal30]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c8d0,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c8d0,mainStyle.fs28,mainStyle.mar10]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brb1f2]}>
                      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mal30]}>
                        <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe63d;</Text>
                        <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.mal5]}>对中医的理论理解</Text>
                      </View>
                      <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28,mainStyle.mar10]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  oncheck:{
    borderWidth:setSize(0.6),
    borderColor:mainStyle.c8d0.color,
    backgroundColor:mainStyle.bgcf6e.backgroundColor
  },
  oncloseTap:{
    borderWidth:setSize(0.6),
    borderColor:mainStyle.c8d0.color,
    backgroundColor:mainStyle.bgcf6e.backgroundColor,
    paddingLeft:setSize(12),
    paddingRight:setSize(12),
    paddingTop:setSize(3),
    paddingBottom:setSize(3),
    borderRadius:setSize(30),
    fontSize:setSize(22),
    color:mainStyle.c8d0.color,
    marginLeft:setSize(20)
  },
  videoVertical:{
    width:screenW,
    height:screenW
  },
  videoHorizontal:{
    width:screenH,
    height:screenW
  },
  goback:{
    padding:setSize(10),
    width:setSize(80),
    fontSize:setSize(70),
  },
  fixedTop:{
    position:'absolute',
    top:0,
    left:0,
    zIndex:100
  }
})

export default OnlineCourseInfo