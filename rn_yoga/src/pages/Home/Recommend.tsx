import React,{PureComponent} from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import {mainStyle, setSize} from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import BxCateTitle from '../../components/Pubilc/CateTitle';
import BxListView from '../../components/Pubilc/ListView';


let { width, height } = Dimensions.get('window');
const contentPadding = setSize(30);

interface Props {
  navigation:any
}
interface State {}
class Recommend extends React.Component<Props,State> {
  
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      news:[
        {title:'运动防震瑜伽BR…',price:'￥79'},{title:'运动防震瑜伽BR…',price:'￥79'},{title:'运动防震瑜伽BR…',price:'￥79'},
        {title:'运动防震瑜伽BR…',price:'￥79'},{title:'运动防震瑜伽BR…',price:'￥79'},{title:'运动防震瑜伽BR…',price:'￥79'},
        {title:'运动防震瑜伽BR…',price:'￥79'},{title:'运动防震瑜伽BR…',price:'￥79'},{title:'运动防震瑜伽BR…',price:'￥79'},
      ]
    };
  }

  componentDidMount(){
    
  }

  goto(router:string){
    this.props.navigation.push(router);
  }

  render(){
    let {navigation} = this.props;
    let {news} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.column,mainStyle.pa15]}>
        <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter]}>
          <Text style={[mainStyle.c666,mainStyle.fs14]}>
            \\&nbsp;&nbsp;&nbsp;本期最新培训&nbsp;&nbsp;&nbsp;//
          </Text>
        </View>
        <TouchableOpacity style={[mainStyle.mab10]} onPress={()=>{this.goto('CourseInfo')}}>
          <View style={[styles.reMain,mainStyle.column]}>
            <Image style={[styles.reImage,mainStyle.mat15]} resizeMode="cover" source={{uri:'http://center.jkxuetang.com/wp-content/themes/jkxuetang/images/slider3.png'}}></Image>
            <Text style={[mainStyle.fs15,mainStyle.c333,mainStyle.mat10]}>第一阶：脉轮与胜王瑜伽初级（师资班）</Text>
            <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mat10]}>包含6天培训，活动时间2018年6月10-15日，活动截止报名：2019年06月09日</Text>
            <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mat10,mainStyle.jcBetween]}>
              <Text>
                <Text style={[mainStyle.fs12,mainStyle.c666]}>最低特价可低至：</Text>
                <Text style={[mainStyle.fs15,mainStyle.czt]}>￥600</Text>
              </Text>
              <Text style={[mainStyle.fs12,mainStyle.c999]}>已报名33人</Text>
            </View>
          </View>
        </TouchableOpacity>
        <BxListView
          listData={[{},{}]}
          listItem={({item,index})=>
          <View>
            {
              index<1?
              <View style={[mainStyle.flex1,mainStyle.mab10]}>
              <BxCateTitle title={"最新商品"} navigateTitle={"更多"} onClick={()=>{
                this.goto('GoodsList')
              }}>
                </BxCateTitle> 
              <View style={[mainStyle.jcBetween,mainStyle.wrap,mainStyle.row,mainStyle.flex1]}>
                {
                  news.map((item,index)=><RecommendGoods navigation={navigation} data={item} key={index.toString()}></RecommendGoods>)
                }
              </View>
            </View>
            :null
            }
            {
              index>=1?
              <View style={[mainStyle.flex1,mainStyle.mab10]}>
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
              :null
            }
          </View>
          }
          nomore={true}
          colNumber={1}
          >
        </BxListView>
        
      </View>
    )
  }
}

interface GoodsProps {
  data:object,
  navigation:any
}

class RecommendGoods extends PureComponent<GoodsProps> {
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
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mab5]}>{data.title}</Text>
            <Text style={[mainStyle.czt,mainStyle.fs14]}>{data.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
interface CourseProps extends GoodsProps {

}

class RecommendCourse extends PureComponent<CourseProps> {
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
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mab5]}>{data.title}</Text>
            <Text style={[mainStyle.c999,mainStyle.fs11]}>122人报名</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const contentWidth = width-contentPadding*2;
const GoodsImageWidth = (contentWidth-setSize(30))/3;
const CourseImageWidth = (contentWidth-setSize(20))/2;
const styles = StyleSheet.create({
  reMain:{
    width:contentWidth,
  },
  reImage:{
    width:contentWidth,
    height:(contentWidth)*0.45,
    borderRadius:setSize(14),
  },
  reGoods:{
    width:GoodsImageWidth,
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

export default Recommend