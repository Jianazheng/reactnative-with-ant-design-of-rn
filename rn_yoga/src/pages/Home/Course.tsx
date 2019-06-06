import React,{PureComponent} from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import {mainStyle, setSize} from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import TabSelect from '../../components/Pubilc/TabSelect';


let { width, height } = Dimensions.get('window');
const contentPadding = setSize(30);

interface Props {}
interface State {}
class HomeCourse extends React.Component<Props,State> {
  
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      news:[
        {title:'第一阶：脉轮与胜王瑜伽初级（师资班）',desc:'包含6天培训，活动时间2018年6月10-15日',price:'￥1279'},
        {title:'第一阶：脉轮与胜王瑜伽初级（师资班）',desc:'包含6天培训，活动时间2018年6月10-15日',price:'￥1279'},
        {title:'第一阶：脉轮与胜王瑜伽初级（师资班）',desc:'包含6天培训，活动时间2018年6月10-15日',price:'￥1279'},
      ]
    };
  }

  componentDidMount(){
    
  }

  goto(router:string){
    this.props.navigation.push(router);
  }

  render(){
    let {news} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <View style={[mainStyle.patb10,mainStyle.palr15]}>
          <TabSelect handleChange={()=>{}}></TabSelect>
        </View>
        <View style={[mainStyle.pa15,mainStyle.bgcf2]}>
          <BxListView
            nomore={true}
            listData={news}
            listItem={({item,index})=>
              (
                <CourseItem data={item} key={index}></CourseItem>
              )
            }
            colNumber={1}
            loading={false}
          ></BxListView>
        </View>
      </View>
    )
  }
}

interface CourseItemProps {
  data:object,
}

class CourseItem extends PureComponent<CourseItemProps> {
  constructor(props:CourseItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.CourseItems,mainStyle.row,mainStyle.jcCenter]}>
        <View style={[mainStyle.column,mainStyle.jcBetween,styles.CourseItemInfo,mainStyle.bgcfff]}>
          <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiStart,mainStyle.mab5]}>
            <Text style={[mainStyle.c333,mainStyle.fs14]} numberOfLines={2}>{data.title}</Text>
            <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs22]}>&#xe64d;</Text>
          </View>
          <Text style={[mainStyle.c999,mainStyle.fs12]} numberOfLines={2}>{data.desc}</Text>
          <View style={[mainStyle.column,mainStyle.mat10,mainStyle.mab10,mainStyle.flex1]}>
            <Text style={[mainStyle.c666,mainStyle.fs13,mainStyle.mab5]}>原价：<Text style={[mainStyle.fs15]}>￥4800</Text></Text>
            <Text style={[mainStyle.mab5]}>
              <Text style={[mainStyle.c666,mainStyle.fs13]}>6月10日前报名特惠价：</Text>
              <Text style={[mainStyle.czt,mainStyle.fs15]}>{data.price}</Text>
            </Text>
            <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.mab5]}>
              <Text style={[mainStyle.fs12,mainStyle.bgcaa4,mainStyle.c8d0,styles.lowPrice,mainStyle.fontsilm]}>最低特价可低至：<Text style={[mainStyle.fs13]}>￥600</Text></Text>
              <Text style={[mainStyle.fs13,mainStyle.czt]}>查看特惠活动</Text>
            </View>
          </View>
          <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs13,mainStyle.c999]}>截止报名日期：2019年6月9日</Text>
            <Text style={[mainStyle.fs13,mainStyle.c999]}>已报名33天</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}



const contentWidth = width-contentPadding*2;
const styles = StyleSheet.create({
  CourseItems:{
    width:contentWidth,
    marginBottom:setSize(30),
  },
  CourseItemInfo:{
    width:contentWidth,
    padding:setSize(30)
  },
  lowPrice:{
    borderRadius:setSize(4),
    paddingLeft:setSize(10),
    paddingRight:setSize(10),
    paddingTop:setSize(4),
    paddingBottom:setSize(4),
  }
})

export default HomeCourse