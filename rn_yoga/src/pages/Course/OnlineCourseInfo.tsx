import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, Animated, Platform } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { ActivityIndicator } from '@ant-design/react-native';
import { CourseListItem } from '../../components/Course/CourseItem';
import { CourseTeacherItem2 } from '../../components/Course/TeacherItem';
import BxButton from '../../components/Pubilc/Button';
import Video from 'react-native-video';
import { observer, inject } from 'mobx-react';
import FileViewer from 'react-native-file-viewer';


interface Props {}

let imgw = (screenW-setSize(120))*0.28;

@inject('courseStore')
@observer
class OnlineCourseInfo extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      id:'',
      course_id:'',
      summary_id:'',
      loading:true,
      scrollTop:new Animated.Value(0),
      scrollTopNum:0,
      hidefixedTop:new Animated.Value(0),
      showfixedTop:new Animated.Value(1),
    };
  }

  componentDidMount(){
    let {navigation,courseStore} = this.props
    let {params} = navigation.state
    courseStore.getOnlineCourseStudy(params.id,params.course_id,params.summary_id)
    .then(res=>{
      this.setState({
        id:params.id,
        course_id:params.course_id,
        summary_id:params.summary_id,
        loading:false
      })
    })
    console.log(params)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
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

  handleOpenPPT(){
    this.setState({ loading: true });
    let path = 'http://yoga.t.jkxuetang.com/upload/courseware/20190703/c88cd64a11bc9876e2602fe7a7b01f23.pdf'
    FileViewer.open(path, { showOpenWithDialog: true })
    .then(() => {
      this.setState({ loading: false });
    })
    .catch(error => {
      console.log(error)
      this.setState({ loading: false });
    });
  }

  render(){
    let {loading,hidefixedTop,showfixedTop,id,course_id,summary_id} = this.state
    let {navigation,courseStore} = this.props
    let onlineCourseStudy = courseStore.onlineCourseStudy
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
            {/** 视频播放start */}
            <View style={[styles.videoVertical,mainStyle.bgc000,mainStyle.positonre]}>
              {/* {
                onlineCourseStudy.url!=''
                ?<Video 
                style={[styles.videoVertical]} 
                source={{uri:onlineCourseStudy.url}}
                onLoad={(e)=>{
                  console.log(e)
                }}
                resizeMode={'contain'}
                ></Video>
                :null
              }  */}
              <View style={[mainStyle.flex1,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter]}>
                <BxButton 
                color={mainStyle.cfff.color}
                textstyle={[mainStyle.c333]}
                btnstyle={[{width:setSize(240),borderRadius:setSize(80)}]}
                title={'查看课程'}
                onClick={()=>{
                  this.handleOpenPPT()
                }}
                ></BxButton>
              </View>
            </View>
            {/** 视频播放end */}
            <View style={[mainStyle.flex1,{marginBottom:setSize(150)}]}>
              {
                onlineCourseStudy.chapter.length>0
                ?onlineCourseStudy.chapter.map((val,i)=>(
                  <View key={i} style={[mainStyle.column,mainStyle.flex1,mainStyle.mat15,mainStyle.bgcfff]}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,mainStyle.brb1f2]}>
                      <Text style={[mainStyle.fs12,mainStyle.c333]}>{i+1}、{val.chapter_name}</Text>
                    </View>
                    <View style={[mainStyle.column]}>
                      {
                        val.summary.constructor==Array?
                        val.summary.length>0?
                        val.summary.map((item,ci)=>(
                          <Summary 
                          navigation={navigation} 
                          ids={{id,course_id}}
                          oncheckid={summary_id}
                          item={item} 
                          key={ci}
                          ></Summary>
                        ))
                        :<Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.pa15]}>暂无课程</Text>
                        :<Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.pa15]}>暂无课程</Text>
                      }
                    </View>
                  </View>
                ))
                :
                <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.pa15]}>暂无课程</Text>
              }
            </View>
          </View>
        </ScrollView>
        <ActivityIndicator
          animating={loading}
          toast
          size="large"
          text="加载中..."
        />
      </View>
    )
  }
}

interface SummaryProps {
  item:object,
  ids:object,
  oncheckid:string,
  navigation:object
}

class Summary extends React.PureComponent<SummaryProps>{

  constructor(props:SummaryProps){
    super(props)
  }

  goto(routeName:string,params:any){
    this.props.navigation.replace(routeName,params);
  }

  render(){
    let {item,ids,oncheckid} = this.props
    return (
      <TouchableOpacity onPress={()=>{
        this.goto('OnlineCourseInfo',{summary_id:item.id,...ids})
      }}>
        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.palr15,item.id==oncheckid?styles.oncheck:mainStyle.brb1f2]}>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>

              {item.type=='pdf'?<Image source={require('../../../images/picture.png')} style={[styles.summaryImg,mainStyle.imgContain]}></Image>:null}
              {item.type=='ppt'?<Image source={require('../../../images/pdf.png')} style={[styles.summaryImg,mainStyle.imgContain]}></Image>:null}
              {item.type=='video'?<Image source={require('../../../images/video.png')} style={[styles.summaryImg,mainStyle.imgContain]}></Image>:null}
              {item.type=='audio'?<Image source={require('../../../images/audio.png')} style={[styles.summaryImg,mainStyle.imgContain]}></Image>:null}

              <Text style={[mainStyle.fs12,item.isread!=1||item.id==oncheckid?mainStyle.c333:mainStyle.c999,mainStyle.mal5]}>{item.summary_name}</Text>
            </View>
            {
              item.isread==1
              ?<View style={[mainStyle.mal15]}>
                <Text style={[styles.isread,mainStyle.bgcf6e,mainStyle.c8d0,mainStyle.fs10]}>已学完</Text>
              </View>
              :null
            }
          </View>
          <Text style={[mainStyle.icon,mainStyle.c999,mainStyle.fs28]}>&#xe64d;</Text>
        </View>
      </TouchableOpacity>
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
  },
  isread:{
    height:setSize(34),
    lineHeight:setSize(31),
    borderRadius:setSize(36),
    paddingLeft:setSize(12),
    paddingRight:setSize(12),
    paddingTop:setSize(1),
    paddingBottom:setSize(1),
    borderWidth:setSize(1),
    borderColor:mainStyle.c8d0.color
  },
  summaryImg:{
    height:setSize(40),
    width:setSize(40)
  }
})

export default OnlineCourseInfo