import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import HomeSwiper from '../../../components/Home/Swiper';
import {mainStyle, setSize,screenH, screenW} from '../../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';
import { IconOutline } from "@ant-design/icons-react-native";
import { Button } from '@ant-design/react-native';
import {headerTitle,headerRight} from '../../../router/navigationBar';
import BxTabView from './../../../components/ScrollTabs/TabView';
import RelatedCourse from './RelatedCourse';
import CourseTeacher from './CourseTeacher';
import CourseArtInfo from './CourseArtInfo';
import ApplyNotice from './ApplyNotice';
import { CartInfo, CartInfoDetails } from './CartInfo';


let { width, height } = Dimensions.get('window')

interface Props {}
interface State {
  canScroll:boolean,
  tabTop:number,
  courseData:Array<object>
}
class CourseInfo extends React.Component<Props,State> {
  static navigationOptions = {
    headerTitle:headerTitle('课程详情'),
    headerRight:headerRight(<Text></Text>),
  }
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
      <View style={[mainStyle.column,mainStyle.flex1]}>
        <ScrollView
        style={[mainStyle.flex1]}
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
            <View style={[mainStyle.mab40]}>
              <CourseTeacher data={courseData}></CourseTeacher>
            </View>
            <View style={[mainStyle.mab40]}>
              <CourseArtInfo data={courseData}></CourseArtInfo>
            </View>
            <View style={[mainStyle.mab40]}>
              <RelatedCourse data={courseData}></RelatedCourse>
            </View>
          </BxTabView>

        </ScrollView>

        <View style={[mainStyle.h120,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,styles.fixedview,mainStyle.bgcfff,mainStyle.brt1e2]}>
          <View style={[styles.fixedbtn,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter]}>
            <TouchableOpacity style={[mainStyle.flex1,mainStyle.bgcjin]} onPress={()=>{}}>
              <LinearGradient 
              colors={['#FF8604','#FF5100']} 
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.flex1]}>
                <Text style={[mainStyle.cfff,mainStyle.fs15]}>加入购物车</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1,mainStyle.bgc59]} onPress={()=>{}}>
              <LinearGradient 
              colors={['#FA5439','#FA3352']} 
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.flex1]}>
                <Text style={[mainStyle.cfff,mainStyle.fs15]}>立即购买</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* <View style={[styles.fixedinfo,mainStyle.bgcfff,mainStyle.pa15,
          {
            height:screenH*0.55
          }
        ]}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
            <Text style={[mainStyle.fs14,mainStyle.c333]}>报名条件</Text>
            <Text style={[mainStyle.c999,mainStyle.icon,mainStyle.fs20]}>&#xe651;</Text>
          </View>
          <ApplyNotice data={courseData}></ApplyNotice>
        </View> */}

        <View style={[styles.fixedinfo,mainStyle.bgcfff,mainStyle.pa15,
          {
            height:screenH*0.55
          }
        ]}>
          <View style={[mainStyle.row,mainStyle.aiStart,mainStyle.jcBetween]}>
            <CartInfoDetails data={{}}></CartInfoDetails>
            <Text style={[mainStyle.c999,mainStyle.icon,mainStyle.fs20]}>&#xe651;</Text>
          </View>
          <CartInfo data={courseData}></CartInfo>
        </View>

      </View>
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
  fixedinfo:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:100,
    marginBottom:setSize(120),
    width:screenW,
    borderTopLeftRadius:setSize(10),
    borderTopRightRadius:setSize(10),
  },
  fixedview:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:100,
    width:screenW
  },
  fixedbtn:{
    height:setSize(90),
    width:screenW-setSize(60),
    borderRadius:setSize(45),
    overflow:'hidden',
  },
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