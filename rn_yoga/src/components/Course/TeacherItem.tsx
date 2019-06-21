

import React, { PureComponent } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,contentPadding,setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window');

interface CourseInfoItemProps {
  data:object,
}

class CourseTeacherItem extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[mainStyle.mab15]} onPress={()=>{}}>
        <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1]}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mab10]}>
            <Image style={[styles.CourseInfoImage,mainStyle.imgCover]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
            <View style={[mainStyle.column,mainStyle.flex1,mainStyle.mal15]}>
              <Text style={[mainStyle.fs15,mainStyle.c666]}>袁培安</Text>
              <View style={[mainStyle.row,mainStyle.wrap,mainStyle.mat10]}>
                <View style={[mainStyle.bgcf2,mainStyle.mar10,styles.tips]}><Text style={[mainStyle.fs13,mainStyle.c666]}>空中瑜伽</Text></View>
              </View>
            </View>
          </View>
          <View style={[mainStyle.flex1,mainStyle.mab10]}>
            <Text style={[mainStyle.c666,mainStyle.fs14,mainStyle.lh42]}>亚太国际瑜伽协会高级瑜伽导师，长年参与瑜伽教练培训工作。2004年接触瑜伽，跟随国内外多位老师学习各流  派。精通哈他、能量流瑜伽和内观阴瑜伽，专注于瑜伽的身心疗愈。</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class CourseTeacherItem2 extends PureComponent<CourseInfoItemProps>{
  constructor(props:CourseInfoItemProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <TouchableOpacity style={[mainStyle.mab15,styles.CourseInfo2,mainStyle.mar15]} onPress={()=>{}}>
        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage2,mainStyle.imgCover]} mode="widthFix" source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
          <View style={[mainStyle.flex1,mainStyle.mal10]}>
            <Text style={[mainStyle.fs13,mainStyle.c333]}>空中瑜伽</Text>
            <Text style={[mainStyle.c999,mainStyle.fs11]} numberOfLines={2}>亚太国际瑜伽协会高级瑜伽导师，长年参与瑜伽教练培训工作。2004年接触瑜伽，跟随国内外多位老师学习各流  派。精通哈他、能量流瑜伽和内观阴瑜伽，专注于瑜伽的身心疗愈。</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const contentWidth = width-contentPadding*2;
const CourseImageWidth = (contentWidth-setSize(20))/2;
const CourseImageWidth2 = setSize(120);
const styles = StyleSheet.create({
  CourseInfoImage:{
    width:CourseImageWidth*0.5,
    height:CourseImageWidth*0.5,
    borderRadius:CourseImageWidth*0.5*0.5
  },
  tips:{
    paddingTop:setSize(6),
    paddingBottom:setSize(6),
    paddingLeft:setSize(10),
    paddingRight:setSize(10),
    borderRadius:setSize(4),
  },
  CourseInfoImage2:{
    width:CourseImageWidth2,
    height:CourseImageWidth2,
    borderRadius:CourseImageWidth2*0.5
  },
  CourseInfo2:{
    width:CourseImageWidth*1.2,
    height:setSize(160),
    borderRadius:setSize(12),
    borderColor:mainStyle.cf2.color,
    borderWidth:setSize(1),
    padding:setSize(20)
  }
})

export {
  CourseTeacherItem,
  CourseTeacherItem2
}
