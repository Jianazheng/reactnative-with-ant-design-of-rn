

import React, { PureComponent } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,contentPadding,setSize } from '../../public/style/style';

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
  }
})

export {
  CourseInfoItem,
  HomeCourseItem
}
