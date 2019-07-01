import React,{PureComponent} from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import {mainStyle, setSize} from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import BxCateTitle from '../../components/Pubilc/CateTitle';
import BxListView from '../../components/Pubilc/ListView';
import { observer, inject } from 'mobx-react';


let { width, height } = Dimensions.get('window');
const contentPadding = setSize(30);

interface Props {
  navigation:any
}
interface State {}

@inject('homeStore')
@observer
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
    let {homeStore} = this.props;
    homeStore.getNewTrain();
    homeStore.getRecommendGoods();
    homeStore.getRecommendTrain();
  }

  goto(router:string,params:object){
    this.props.navigation.navigate(router,params);
  }

  render(){
    let {navigation,homeStore} = this.props;
    let newItem = homeStore.newItem;
    return (
      <View style={[mainStyle.flex1,mainStyle.column,mainStyle.pa15,mainStyle.bgcfff]}>
        {
          newItem.id?
          <View style={[mainStyle.column]}>
            <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.aiCenter]}>
              <Text style={[mainStyle.c666,mainStyle.fs14]}>
                \\&nbsp;&nbsp;&nbsp;本期最新培训&nbsp;&nbsp;&nbsp;//
              </Text>
            </View>
            <TouchableOpacity style={[mainStyle.mab10]} onPress={()=>{this.goto('CourseInfo',{id:newItem.id,type:'all'})}}>
              <View style={[styles.reMain,mainStyle.column]}>
                <Image style={[styles.reImage,mainStyle.mat15]} resizeMode="cover" source={{uri:newItem.image_url?newItem.image_url[0]:''}}></Image>
                <Text style={[mainStyle.fs15,mainStyle.c333,mainStyle.mat10]}>{newItem.train_name}（{newItem.sku_name}）</Text>
                <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mat10]}>
                  {newItem.sku_intro}
                  {newItem.train_start_time?'，活动时间'+newItem.train_start_time.split(' ')[0]:''}
                  {newItem.train_end_time?'至'+newItem.train_end_time.split(' ')[0]:''}
                  {newItem.reg_end_time?'，截止报名时间'+newItem.reg_end_time.split(' ')[0]:''}
                </Text>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mat10,mainStyle.jcBetween]}>
                  {
                    newItem.dijia!=''&&newItem.dijia!=undefined&&newItem.dijia!=null
                    ?<Text>
                      <Text style={[mainStyle.fs12,mainStyle.c666]}>最低特价可低至：</Text>
                      <Text style={[mainStyle.fs15,mainStyle.czt]}>￥{newItem.dijia}</Text>
                    </Text>
                    :null
                  }
                  <Text style={[mainStyle.fs12,mainStyle.c999]}>已报名{newItem.apply_num}人</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          :null
        }
        <BxListView
          listData={[{},{}]}
          listItem={({item,index})=>
          <View>
            {
              index<1?
              <View style={[mainStyle.flex1,mainStyle.mab10]}>
              <BxCateTitle title={"最新商品"} navigateTitle={"更多"} onClick={()=>{
                this.goto('GoodsList',{})
              }}>
                </BxCateTitle> 
              <View style={[mainStyle.wrap,mainStyle.row,mainStyle.flex1]}>
                {
                  homeStore.recommendGoods.length>0
                  ?homeStore.recommendGoods.map((item,index)=>{
                    return (
                      <RecommendGoods index={index} navigation={navigation} data={item} key={index.toString()}></RecommendGoods>
                    )
                  })
                  :null
                }
              </View>
            </View>
            :null
            }
            {
              index>=1?
              <View style={[mainStyle.flex1,mainStyle.mab10]}>
                <BxCateTitle title={"最新在线课程"} navigateTitle={"更多"} onClick={()=>{
                  this.goto('GoodsList',{})
                }}>
                </BxCateTitle>
                <View style={[mainStyle.jcBetween,mainStyle.wrap,mainStyle.row,mainStyle.flex1]}>
                  {
                    
                    homeStore.recommendTrain.length>0
                    ?homeStore.recommendTrain.map((item,index)=>{
                      return (
                        <RecommendCourse navigation={navigation} data={item} key={index.toString()}></RecommendCourse>
                      )
                    })
                    :null
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
  navigation:any,
  index:number
}

class RecommendGoods extends PureComponent<GoodsProps> {
  constructor(props:GoodsProps){
    super(props)
  }

  gotoInfo(route:string,params:object){
    let {navigation} = this.props;
    navigation.navigate(route,params);
  }

  render (){
    let {data,index} = this.props;
    return(
      <TouchableOpacity style={[styles.reGoods,mainStyle.mab10,(index+1)%3==2?{marginLeft:setSize(10),marginRight:setSize(10)}:null]} onPress={()=>{this.gotoInfo('GoodsInfo',{id:data.id})}}>
        <View style={[mainStyle.column,mainStyle.jcBetween]}>
          <Image style={[styles.reGoodsImage,mainStyle.imgCover,mainStyle.mab5,mainStyle.bgcf2]} mode="widthFix" source={{uri:data.image_url?data.image_url[0]:''}}></Image>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mab5]}>{data.product_name}</Text>
            <Text style={[mainStyle.czt,mainStyle.fs14]}>{data.list_price}</Text>
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
    navigation.navigate(route,params);
  }

  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.reCourse,mainStyle.mab10]} onPress={()=>{this.gotoInfo('CourseInfo',{id:data.id})}}>
        <View style={[mainStyle.column,mainStyle.jcBetween]}>
          <View style={[mainStyle.positonre,mainStyle.mab5]}>
            <Text style={[styles.times,mainStyle.cfff,mainStyle.fs11]}>{data.lesson}课时</Text>
            <Image style={[styles.reCourseImage,mainStyle.imgCover,mainStyle.bgcf2]} mode="widthFix" source={{uri:data.image}}></Image>
          </View>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mab5]}>{data.course_name}</Text>
            <Text style={[mainStyle.c999,mainStyle.fs11]}>{data.reply}人报名</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const contentWidth = width-contentPadding*2;
const GoodsImageWidth = (contentWidth-setSize(50))/3;
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