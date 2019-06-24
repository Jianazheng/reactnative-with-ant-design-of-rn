import React from 'react';
import { Text, View ,ScrollView,TouchableOpacity,Image,StyleSheet,Dimensions} from 'react-native';
import { mainStyle,screenW,setSize } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import BxCateTitle from '../../components/Pubilc/CateTitle';


let { width, height } = Dimensions.get('window');
const contentPadding = setSize(30);

interface Props {}
interface State {}


class Explore extends React.Component<Props,State> {
  static navigationOptions = {
    tabBarLabel: '探索',
    tabBarIcon: ({focused}) => {
      if (focused) {
          return (
            <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_explore_sel.png')}></Image>
          );
      }
      return (
        <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_explore_nor.png')}></Image>
      );
    },
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      news:[{},{},{},{}]
    };
  }

  goto(router:string){
    this.props.navigation.push(router);
  }

  render(){
    let {navigation} = this.props;
    let {news} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <ScrollView style={[mainStyle.flex1]}>
          <View style={[mainStyle.flex1,mainStyle.column]}>
            <View style={[mainStyle.flex1,mainStyle.pal15,mainStyle.mab15,mainStyle.column,mainStyle.bgcfff]}>
              <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs14]}>商城</Text>
              </View>
              <ScrollView
              style={[mainStyle.flex1,mainStyle.mab15]}
              horizontal
              nestedScrollEnabled
              >
                <View style={[mainStyle.row]}>
                <Classify navigation={navigation} type='all'></Classify>
                {
                  news.map((item,index)=><Classify navigation={navigation} data={news} key={index.toString()}></Classify>) 
                }
                </View>
              </ScrollView>
            </View>
            <View style={[mainStyle.flex1,mainStyle.pal15,mainStyle.mab15,mainStyle.column,mainStyle.bgcfff]}>
              <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs14]}>好物推荐</Text>
              </View>
              <ScrollView
              style={[mainStyle.flex1,mainStyle.mab5]}
              horizontal
              nestedScrollEnabled
              >
                <View style={[mainStyle.row]}>
                {
                  news.map((item,index)=><RecommendGoods navigation={navigation} data={news} key={index.toString()}></RecommendGoods>) 
                }
                </View>
              </ScrollView>
            </View>
            <View style={[mainStyle.flex1,mainStyle.pal15,mainStyle.mab15,mainStyle.column,mainStyle.bgcfff]}>
              <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs14]}>在线课程</Text>
              </View>
              <ScrollView
              style={[mainStyle.flex1,mainStyle.mab15]}
              horizontal
              nestedScrollEnabled
              >
                <View style={[mainStyle.row]}>
                {
                  news.map((item,index)=><Classify navigation={navigation} data={news} key={index.toString()}></Classify>) 
                }
                </View>
              </ScrollView>
            </View>
            <View style={[mainStyle.flex1,mainStyle.mab10,mainStyle.palr15,mainStyle.bgcfff]}>
              <BxCateTitle title={"最新在线课程"} navigateTitle={"更多"} onClick={()=>{
                this.goto('GoodsList')
              }}>
              </BxCateTitle>
              <View style={[mainStyle.jcBetween,mainStyle.wrap,mainStyle.row,mainStyle.flex1]}>
                {
                  news.map((item,index)=><RecommendCourse navigation={navigation} data={item} key={index.toString()}></RecommendCourse>)
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

interface GoodsProps {
  data:object,
  navigation:any
}

class RecommendGoods extends React.PureComponent<GoodsProps> {
  constructor(props:GoodsProps){
    super(props)
  }

  gotoInfo(route:string,params:object){
    let {navigation} = this.props;
    navigation.push(route,params);
  }

  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.reGoods,mainStyle.mab10]} onPress={()=>{this.gotoInfo('CourseInfo',{})}}>
        <View style={[mainStyle.column,mainStyle.jcBetween]}>
          <Image style={[styles.reGoodsImage,mainStyle.imgCover,mainStyle.mab5]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/sonja-langford-357.png'}}></Image>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mab5]}>凝心·软木瑜伽砖</Text>
            <Text style={[mainStyle.czt,mainStyle.fs14]}>￥59</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

interface CourseProps {
  data:Array<object>
}

class RecommendCourse extends React.PureComponent<CourseProps> {
  constructor(props:CourseProps){
    super(props)
  }

  gotoInfo(route:string,params:object){
    let {navigation} = this.props;
    navigation.push(route,params);
  }

  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.reCourse,mainStyle.mab10]} onPress={()=>{this.gotoInfo('CourseInfo',{})}}>
        <View style={[mainStyle.column,mainStyle.jcBetween]}>
          <View style={[mainStyle.positonre,mainStyle.mab5]}>
            <Text style={[styles.times,mainStyle.cfff,mainStyle.fs11]}>12课时</Text>
            <Image style={[styles.reCourseImage,mainStyle.imgCover]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
          </View>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mab5]}>高阶体式提升计划</Text>
            <Text style={[mainStyle.c999,mainStyle.fs11]}>122人报名</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

interface ClassifyProps {
  data:object,
  type:'all'|'item'
  navigation:any
}

class Classify extends React.PureComponent<ClassifyProps> {
  constructor(props:ClassifyProps){
    super(props)
  }

  gotoInfo(route:string,params:object){
    let {navigation} = this.props;
    navigation.push(route,params);
  }

  render (){
    let {data,type} = this.props;
    if(type=='all'){
      return(
        <TouchableOpacity style={[mainStyle.mar15]} onPress={()=>{this.gotoInfo('ClassifyList',{})}}>
          <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.bgcf7,mainStyle.h120,mainStyle.palr15,{minWidth:setSize(160)}]}>
            <Text style={[mainStyle.c333,mainStyle.fs13]}>/ / 全部 / /</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity style={[mainStyle.mar15]} onPress={()=>{this.gotoInfo('GoodsList',{})}}>
          <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter,mainStyle.bgcf7,mainStyle.h120,mainStyle.palr15,{minWidth:setSize(160)}]}>
            <Text style={[mainStyle.c333,mainStyle.fs13]}>分类</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

const contentWidth = width-contentPadding*2;
const GoodsImageWidth = (contentWidth-setSize(30))/3;
const CourseImageWidth = (contentWidth-setSize(20))/2;
const styles = StyleSheet.create({
  reImage:{
    width:contentWidth,
    height:(contentWidth)*0.45,
    borderRadius:setSize(14),
  },
  reGoods:{
    width:GoodsImageWidth,
    marginRight:setSize(20)
  },
  reGoodsImage:{
    width:GoodsImageWidth,
    height:GoodsImageWidth,
    borderRadius:setSize(6),
  },
  reCourse:{
    width:CourseImageWidth,
  },
  reCourseImage:{
    width:CourseImageWidth,
    height:CourseImageWidth*0.6,
    borderRadius:setSize(6),
  },
  times:{
    position:'absolute',
    bottom:setSize(10),
    right:setSize(10),
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingLeft:setSize(20),
    paddingRight:setSize(20),
    paddingTop:setSize(6),
    paddingBottom:setSize(6),
    zIndex:1,
    borderRadius:setSize(26)
  }
})

export default Explore