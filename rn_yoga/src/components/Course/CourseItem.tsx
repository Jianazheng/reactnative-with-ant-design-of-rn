

import React, { PureComponent } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,contentPadding,setSize,screenW } from '../../public/style/style';

let { width, height } = Dimensions.get('window');

interface CourseInfoItemProps {
  data:object,
}

class HomeCourseItem extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.reCourse,mainStyle.mab10]} onPress={()=>{}}>
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

class CourseInfoItem extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.infoCourse,mainStyle.mab15]} onPress={()=>{}}>
        <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage,mainStyle.imgCover]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
          <View style={[mainStyle.flex1,mainStyle.mal15]}>
            <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mab10]}>{data.title}</Text>
            <Text style={[mainStyle.c999,mainStyle.fs14,mainStyle.mab10]}>{data.time}</Text>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt,mainStyle.fs12]}>
                ￥<Text style={[mainStyle.fs18]}>1800</Text>
              </Text>
              <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mal20,mainStyle.mat10]}>122人报名</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


class CourseInfoItem2 extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[styles.infoCourse,mainStyle.bgcfff,mainStyle.patb15]} onPress={()=>{}}>
        <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiStart,mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage,mainStyle.imgCover]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
          <View style={[mainStyle.flex1,mainStyle.mal15]}>
            <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mab5]}>{data.title}</Text>
            <View style={[mainStyle.row,mainStyle.jcBetween]}>
              <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mab5,mainStyle.bgcf2,{borderRadius:setSize(6),paddingLeft:setSize(12),paddingRight:setSize(12)}]}>6课时</Text>
            </View>
            <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mab5]}>122人报名</Text>
            <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mab5]}>2019.06.01-06.30</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class CourseApplyNotice extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View style={[styles.infoCourse,mainStyle.mab15]}>
        <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.flex1]}>
          <Image style={[styles.ApplyNoticeImage,mainStyle.imgCover]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
          <View style={[mainStyle.flex1,mainStyle.mal15,mainStyle.column]}>
            <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mab10,styles.ApplyNoticeTitle]}>{data.title}</Text>
            <Text style={[mainStyle.c666,mainStyle.fs14,mainStyle.mab10]}>{data.title}</Text>
          </View>
        </View>
      </View>
    )
  }
}
interface CourseListItemProps {
  data:object,
  type:'outline'|'online',
  navigation:object|undefined
}

let imgw = (screenW-setSize(120))*0.28;

class CourseListItem extends React.Component<CourseListItemProps>{
  constructor(props:CourseListItemProps){
    super(props)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {type,data,navigation} = this.props;
    return (
      <View style={[mainStyle.row,mainStyle.pal15,mainStyle.patb15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.brb1f2,mainStyle.bgcfff]}>
        <TouchableOpacity style={[mainStyle.flex1]} 
        onPress={()=>{
          if(navigation)this.goto('OnlineCourse',{id:data.id})
        }}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.brr1f2]}>
            <Image
            style={[{width:imgw,height:imgw*0.7,borderRadius:setSize(6)},mainStyle.bgcf2]}
            mode="widthFix" 
            source={{uri:'http://'+data.img}}>
            </Image>
            <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,mainStyle.mal15]}>
              <Text style={[mainStyle.fs13,mainStyle.c333]}>{data.course_name}</Text>
              <View style={[mainStyle.row,mainStyle.mat5,mainStyle.mab5]}>
                <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.bgcf7,
                  {
                    borderRadius:setSize(12),
                    paddingLeft:setSize(14),
                    paddingRight:setSize(14),
                    paddingTop:setSize(1),
                    paddingBottom:setSize(1)
                  }
                ]}>{data.lesson}课时</Text>
              </View>
              <Text style={[mainStyle.fs12,mainStyle.c999]}>{data.create_time}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {
          type=='outline'
          ?<TouchableOpacity style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,{width:imgw*0.8}]}>
            <View>
              <Text style={[mainStyle.fs12,mainStyle.c999]}>已报到</Text>
            </View>
          </TouchableOpacity>
          :<TouchableOpacity style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,{width:imgw*0.8}]}>
            <View>
              <Text style={[mainStyle.fs12,mainStyle.c999]}>已学{data.rate}</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const contentWidth = width-contentPadding*2;
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
  reCourse:{
    width:CourseImageWidth,
  },
  reCourseImage:{
    width:CourseImageWidth,
    height:CourseImageWidth*0.6,
    borderRadius:setSize(6),
  },
  infoCourse:{
    width:contentWidth,
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
  },
  CourseInfoImage:{
    width:CourseImageWidth*0.6,
    height:CourseImageWidth*0.6,
    borderRadius:setSize(6)
  },
  ApplyNoticeImage:{
    width:CourseImageWidth*0.16,
    height:CourseImageWidth*0.16,
  },
  ApplyNoticeTitle:{
    height:CourseImageWidth*0.16,
    lineHeight:CourseImageWidth*0.16,
  }
})

export {
  CourseInfoItem,
  CourseInfoItem2,
  HomeCourseItem,
  CourseApplyNotice,
  CourseListItem
}
