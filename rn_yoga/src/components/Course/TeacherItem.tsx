

import React, { PureComponent } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle, contentPadding, setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window');

interface CourseInfoItemProps {
  data: object,
}

class CourseTeacherItem extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data } = this.props;
    return (
      <TouchableOpacity style={[mainStyle.mab15]} onPress={() => { }}>
        <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.mab10]}>
            <Image style={[styles.CourseInfoImage, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + data.avatar }}></Image>
            <View style={[mainStyle.column, mainStyle.flex1, mainStyle.mal15]}>
              <Text style={[mainStyle.fs15, mainStyle.c666]}>{data.teacher_name}</Text>
              <View style={[mainStyle.row, mainStyle.wrap, mainStyle.mat10]}>
                {
                  data.teach_level ?
                    data.teach_level.length > 0 ?
                      data.teach_level.map((val, i) => (
                        <View key={i} style={[mainStyle.bgcf2, mainStyle.mar10, styles.tips]}><Text style={[mainStyle.fs10, mainStyle.c666]}>{val}</Text></View>
                      ))
                      : null
                    : null
                }
              </View>
            </View>
          </View>
          <View style={[mainStyle.flex1, mainStyle.mab10]}>
            <Text style={[mainStyle.c666, mainStyle.fs12, mainStyle.lh42]}>{data.teacher_introduction}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class CourseTeacherItem2 extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, onClick } = this.props;
    return (
      <TouchableOpacity style={[mainStyle.mab15, styles.CourseInfo2, mainStyle.mar15]} onPress={() => { if (onClick) onClick() }}>
        <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage2, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + data.avatar }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal10]}>
            <Text style={[mainStyle.fs13, mainStyle.c333]}>{data.teacher_name}</Text>
            <Text style={[mainStyle.c999, mainStyle.fs11]} numberOfLines={2}>{data.teacher_introduction}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const contentWidth = width - contentPadding * 2;
const CourseImageWidth = (contentWidth - setSize(20)) / 2;
const CourseImageWidth2 = setSize(120);
const styles = StyleSheet.create({
  CourseInfoImage: {
    width: CourseImageWidth * 0.5,
    height: CourseImageWidth * 0.5,
    borderRadius: setSize(6),
  },
  tips: {
    paddingTop: setSize(3),
    paddingBottom: setSize(3),
    paddingLeft: setSize(6),
    paddingRight: setSize(6),
    borderRadius: setSize(4),
    marginBottom: setSize(6),
  },
  CourseInfoImage2: {
    width: CourseImageWidth2,
    height: CourseImageWidth2,
    borderRadius: CourseImageWidth2 * 0.5
  },
  CourseInfo2: {
    width: CourseImageWidth * 1.2,
    height: setSize(160),
    borderRadius: setSize(6),
    borderColor: mainStyle.cf2.color,
    borderWidth: setSize(0.6),
    padding: setSize(20)
  }
})

export {
  CourseTeacherItem,
  CourseTeacherItem2
}
