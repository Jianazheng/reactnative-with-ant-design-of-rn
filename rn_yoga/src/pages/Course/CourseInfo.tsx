import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import HomeSwiper from '../../components/Home/Swiper';
import {mainStyle, setSize} from '../../public/style/style';
import TabSelect from '../../components/Pubilc/TabSelect';
import { IconOutline } from "@ant-design/icons-react-native";
import { Button } from '@ant-design/react-native';
import BxTabView from './../../components/ScrollTabs/TabView';
import RelatedCourse from './RelatedCourse';
import CourseTeacher from './CourseTeacher';

let { width, height } = Dimensions.get('window')

interface Props {}
interface State {
  canScroll:boolean,
  tabTop:number,
  courseData:Array<object>
}
class CourseInfo extends React.Component<Props,State> {

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabTop:667,
      canScroll:false,
      courseData:[
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
        {title:'高阶体式提升计划',time:'2019年6月1日-6月30日'},
      ]
    };
  }

  componentDidMount(){
    console.warn('点击dismiss')
  }

  goto(){
    this.props.navigation.push('Login');
  }

  handleScroll(e:any){
    let {tabTop} = this.state;
    if(e.nativeEvent){
      this.setState({
        canScroll:tabTop<=e.nativeEvent.contentOffset.y+setSize(120)
      })
    }
  }

  render(){
    let {canScroll,courseData} = this.state;
    return (
      <ScrollView
        onScroll={(e)=>{
          this.handleScroll(e);
        }}
        >
        <HomeSwiper fullWidth></HomeSwiper>
        <View style={[mainStyle.pa15,mainStyle.column]}>
          <View style={[mainStyle.row,mainStyle.mab10]}>
            <Taps>已报名</Taps>
            <Text style={[mainStyle.c333,mainStyle.fs16,mainStyle.lh44]}>
              <Text style={[styles.span]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
              脉轮与胜王瑜伽初级
            </Text>
          </View>
          <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.mab10]}>
            <Text style={[mainStyle.c999,mainStyle.fs13]}>活动时间: 2019年6月10-15日</Text>
            <Text style={[mainStyle.c999,mainStyle.fs13]}>12人报名</Text>
          </View>
          <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.mab20,mainStyle.aiCenter]}>
            <Text style={[mainStyle.czt,mainStyle.fs13]}>
              ￥<Text style={[mainStyle.fs22]}>1000-5800</Text>
            </Text>
            <Text style={[mainStyle.c999,mainStyle.fs13]}>截止报名日期: 2019年6月10日</Text>
          </View>
          <View style={[mainStyle.column,mainStyle.mab10]}>
            <Text style={[mainStyle.c333,mainStyle.fs16,mainStyle.mab20]}>特惠活动</Text>
            <Text style={[mainStyle.c666,mainStyle.fs14,mainStyle.lh42,mainStyle.mab10]}>
            1、凡是在2019年6月10前报名者，特惠价为RMB2400元，
            6月10日之后报名者，优惠价为RMB2700元。
            </Text>
            <Text style={[mainStyle.c666,mainStyle.fs14,mainStyle.lh42]}>
            2、凡是参加过邱显峰老师举办的呼吸身印课或五大元素与
            心灵转化瑜伽课学员，与6月10日前报名者，特惠价…
            </Text>
          </View>
          <View style={[mainStyle.column,mainStyle.mat30]}>
            <TouchableOpacity>
              <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.h100]}>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.flex1]}>
                  <Text style={[mainStyle.c999,mainStyle.fs15,mainStyle.mar15]}>选&nbsp;&nbsp;&nbsp;择</Text>
                  <Text style={[mainStyle.mal20,mainStyle.c333,mainStyle.fs15]}>请选择类型</Text>
                </View>
                <Text style={[mainStyle.c666,mainStyle.icon,mainStyle.fs24]}>&#xe64d;</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.h100]}>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.flex1]}>
                  <Text style={[mainStyle.c999,mainStyle.fs15,mainStyle.mar15]}>报名条件</Text>
                </View>
                <Text style={[mainStyle.c666,mainStyle.icon,mainStyle.fs24]}>&#xe64d;</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <BxTabView 
        height={height-setSize(240)}
        canScroll={canScroll}
        tabs={[{title:'讲师'},{title:'详情'},{title:'相关课程'}]}
        tabAlign={'center'}
        >
          <View style={[mainStyle.column,mainStyle.aiCenter]}>
            <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.h100,mainStyle.mat10]}>
              <Text style={[mainStyle.fs16,mainStyle.c333]}>~ 教师介绍 ~</Text>
            </View>
            <CourseTeacher data={courseData}></CourseTeacher>
          </View>
          <View>
            <Text>2333</Text>
          </View>
          <RelatedCourse data={courseData}></RelatedCourse>
        </BxTabView>
      </ScrollView>
    )
  }
}

class Taps extends React.PureComponent{
  render(){
    return(
      <Text style={[styles.tips,mainStyle.bgczt,mainStyle.cfff,mainStyle.fs13]}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  tips:{
    textAlign:'center',
    paddingTop:setSize(4),
    paddingBottom:setSize(4),
    paddingLeft:setSize(12),
    paddingRight:setSize(12),
    borderRadius:setSize(6),
    position:'absolute',
    top:setSize(-2),
    left:0
  },
  span:{
    width:setSize(100)
  }
})

export default CourseInfo