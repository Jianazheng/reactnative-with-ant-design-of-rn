import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity,Animated } from 'react-native';
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
import NavTop from '../../../router/navTop';
import { observer, inject } from 'mobx-react';
import { splitStr } from '../../../tools/function';

/**
 * 培训课程详情
 */

let { width, height } = Dimensions.get('window')

interface Props {}
interface State {
  canScroll:boolean,
  tabTop:number,
  courseData:Array<object>,
  showApplyNotice:boolean,
  showCartInfoDetails:boolean,
  showPromotion:boolean
}

@inject('trainStore','publicStore')
@observer
class CourseInfo extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('课程详情'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabTop:667,
      canScroll:false,
      showApplyNotice:false,
      showCartInfoDetails:false,
      showPromotion:false,
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
    let {navigation,trainStore} = this.props
    let {params} = navigation.state
    console.log(params)
    trainStore.getTrainInfo(params.id)
    trainStore.getFrontInfo(params.id)
    trainStore.getTrainPromotion(params.id)
    trainStore.getTrainSelectItem(params.id)
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

  handleCloseApplyNotice(isok:boolean){
    this.setState({
      showApplyNotice:isok
    })
  }

  handleCloseCartInfoDetails(isok:boolean){
    let {showCartInfoDetails} = this.state;
    if(!showCartInfoDetails){
      this.setState({
        showCartInfoDetails:isok
      })
    }else{
      this.props.navigation.push('Settlement',{type:'pay'});
    }
  }

  handleCloseCart(){
    this.setState({
      showCartInfoDetails:false
    })
  }

  handleCloseAll(){
    this.setState({
      showCartInfoDetails:false,
      showApplyNotice:false
    })
  }

  handleShowPromotion(){
    let {showPromotion} = this.state
    this.setState({
      showPromotion:!showPromotion
    })
  }

  handleCollection(common_id:string|number,type:string,isCollect:boolean){
    let {publicStore} = this.props
    publicStore.setCollection(common_id,type,isCollect)
  }

  render(){
    let {canScroll,courseData,showApplyNotice,showCartInfoDetails,showPromotion} = this.state
    let {trainStore} = this.props
    let trainInfo = trainStore.trainInfo
    let promotionInfo = trainStore.promotionInfo
    let frontInfo = trainStore.frontInfo
    return (
      <View style={[mainStyle.column,mainStyle.flex1]}>
        <NavTop
        navType="normal"
        title="培训课程详情"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ScrollView
        style={[mainStyle.flex1]}
        onScroll={(e)=>{
          this.handleScroll(e);
        }}
        >
          <HomeSwiper fullWidth img={trainInfo.image_url||[]}></HomeSwiper>
          <View style={[mainStyle.pa15,mainStyle.column]}>
            {
              trainInfo.is_apply==1?
              <View style={[mainStyle.row,mainStyle.mab10]}>
                <Taps>已报名</Taps>
                <Text style={[mainStyle.c333,mainStyle.fs16,mainStyle.lh44]}>
                  <Text style={[styles.span]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                  {trainInfo.train_introduction}
                </Text>
              </View>
              :
              <View style={[mainStyle.row,mainStyle.mab10]}>
                <Text style={[mainStyle.c333,mainStyle.fs16,mainStyle.lh44]}>
                  {trainInfo.train_introduction}
                </Text>
              </View>
            }
            <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.mab10]}>
              <Text style={[mainStyle.c999,mainStyle.fs13]}>活动时间: {splitStr(trainInfo.train_start_time,' ')}至{splitStr(trainInfo.train_end_time,' ')}</Text>
              <Text style={[mainStyle.c999,mainStyle.fs13]}>{trainInfo.apply_num}人报名</Text>
            </View>
            <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.mab20,mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt,mainStyle.fs13]}>
                ￥<Text style={[mainStyle.fs22]}>{trainInfo.course_price}</Text>
              </Text>
              <Text style={[mainStyle.c999,mainStyle.fs13]}>截止报名日期: {trainInfo.reg_end_time}</Text>
            </View>
            <Animated.View style={[mainStyle.column,mainStyle.mab10,mainStyle.positonre,!showPromotion?{height:setSize(200),overflow:'hidden'}:{paddingBottom:setSize(60)}]}>
              <Text style={[mainStyle.c333,mainStyle.fs16,mainStyle.mab20]}>特惠活动</Text>
              {
                promotionInfo.map((val,i)=>(
                  <Text key={i} style={[mainStyle.c666,mainStyle.fs14,mainStyle.lh42]}>
                    {val.content}
                  </Text>
                ))
              }
              <TouchableOpacity 
              style={[mainStyle.flex1,mainStyle.h60,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,mainStyle.palr15,mainStyle.bgcfff,
                {position:'absolute',bottom:0,width:screenW,opacity:0.8}]}
              onPress={()=>{
                this.handleShowPromotion()
              }}  
              >
                {
                  showPromotion?<Text style={[mainStyle.icon,mainStyle.c333]}>&#xe8ed;</Text>:<Text style={[mainStyle.icon,mainStyle.c333]}>&#xe8ec;</Text>
                }
              </TouchableOpacity>
            </Animated.View>
            <View style={[mainStyle.column,mainStyle.mat30]}>
              <TouchableOpacity onPress={()=>{this.handleCloseCartInfoDetails(true)}}>
                <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.h100]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.flex1]}>
                    <Text style={[mainStyle.c999,mainStyle.fs15,mainStyle.mar15]}>选&nbsp;&nbsp;&nbsp;择</Text>
                    <Text style={[mainStyle.mal20,mainStyle.c333,mainStyle.fs15]}>请选择类型</Text>
                  </View>
                  <Text style={[mainStyle.c666,mainStyle.icon,mainStyle.fs24]}>&#xe64d;</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.handleCloseApplyNotice(true)}}>
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
          tabWidth={width-setSize(160)}
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

        <View style={[mainStyle.h120,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,styles.fixedview,mainStyle.bgcfff,mainStyle.brt1e2,mainStyle.palr15]}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mar10,{width:screenW*0.24}]}>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={()=>{}}>
              <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                <Text style={[mainStyle.czt,mainStyle.icon,mainStyle.fs18,mainStyle.mab5]}>&#xe610;</Text>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>咨询</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={()=>{
              this.handleCollection(goodsInfo.id,'3',true)
            }}>
              <View style={[mainStyle.column,mainStyle.aiCenter,mainStyle.jcCenter]}>
                <Text style={[mainStyle.czt,mainStyle.icon,mainStyle.fs18,mainStyle.mab5]}>&#xe65a;</Text>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>收藏</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.fixedbtn,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,mainStyle.flex1]}>
            <TouchableOpacity style={[mainStyle.flex1,mainStyle.bgcjin]} onPress={()=>{this.handleCloseCartInfoDetails(true)}}>
              <LinearGradient 
              colors={['#FF8604','#FF5100']} 
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.flex1]}>
                <Text style={[mainStyle.cfff,mainStyle.fs15]}>加入购物车</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1,mainStyle.bgc59]} onPress={()=>{this.handleCloseCartInfoDetails(true)}}>
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

        {showApplyNotice?
        <View style={[styles.fixedinfo,mainStyle.bgcfff,mainStyle.pa15,
          {
            height:screenH*0.55
          }
        ]}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
            <Text style={[mainStyle.fs14,mainStyle.c333]}>报名条件</Text>
            <Text 
            style={[mainStyle.c999,mainStyle.icon,mainStyle.fs20]}
            onPress={()=>{this.handleCloseApplyNotice(false)}}
            >&#xe651;</Text>
          </View>
          <ApplyNotice data={frontInfo.detail||[]}></ApplyNotice>
        </View>
        :null}

        {showCartInfoDetails?
          <View style={[styles.fixedinfo,mainStyle.bgcfff,mainStyle.column,mainStyle.jcBetween,mainStyle.pa15,
            {
              height:screenH*0.55
            }
          ]}>
            <CartInfo 
              data={[]}
              closeBtn={
                <Text 
                style={[mainStyle.c999,mainStyle.icon,mainStyle.fs20]}
                onPress={()=>{this.handleCloseCart()}}
                >
                  &#xe651;
                </Text>
              }
            ></CartInfo>
          </View>
        :null}

        {
          showCartInfoDetails||showApplyNotice?
          <TouchableOpacity 
          style={[
            styles.fixedzz,
            {
              height:screenH
            }
          ]}
          onPress={()=>{
            this.handleCloseAll()
          }}>
          </TouchableOpacity>
          :null
        }

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
  fixedzz:{
    position:'absolute',
    bottom:0,
    left:0,
    zIndex:99,
    width:screenW,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
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