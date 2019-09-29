

import React, { PureComponent } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle, contentPadding, setSize, screenW } from '../../public/style/style';
import { splitStr } from '../../tools/function';
import PercentageCircle from 'react-native-percentage-circle';

let { width, height } = Dimensions.get('window');

interface CourseInfoItemProps {
  data: object,
  navigation: object
}

class HomeCourseItem extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data } = this.props;
    return (
      <TouchableOpacity style={[styles.reCourse, mainStyle.mab10]} onPress={() => { }}>
        <View style={[mainStyle.column, mainStyle.jcBetween]}>
          <View style={[mainStyle.positonre, mainStyle.mab5]}>
            <Text style={[styles.times, mainStyle.cfff, mainStyle.fs11]}>12课时</Text>
            <Image style={[styles.reCourseImage, mainStyle.imgCover]} mode="widthFix" source={{ uri: 'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg' }}></Image>
          </View>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mab5]}>{data.title}</Text>
            <Text style={[mainStyle.c999, mainStyle.fs11]}>122人报名</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


class CourseInfoItem extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, navigation, backid } = this.props;
    return (
      <TouchableOpacity
        style={[styles.infoCourse, mainStyle.pa15]}
        onPress={() => {
          navigation.push('TrainInfo', { id: data.id, backid: backid })
        }}>
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + (data.image_url ? data.image_url.length > 0 ? data.image_url[0] : '' : '') }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal15]}>
            <Text style={[mainStyle.c333, mainStyle.fs14, mainStyle.mab10]}>{data.title || data.train_name}</Text>
            <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.mab10]}>{splitStr(data.reg_start_time, ' ')}至{splitStr(data.reg_end_time, ' ')}</Text>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.mat10]}>{data.apply_num}人报名</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


class CourseInfoItem2 extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, navigation, backid } = this.props;
    return (
      <TouchableOpacity style={[styles.infoCourse, mainStyle.bgcfff, mainStyle.patb15]} onPress={() => { navigation.push('CourseInfo', { id: data.id, backid: backid }) }}>
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiStart, mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage, mainStyle.imgCover]} mode="widthFix" source={{ uri: 'http://' + data.image }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal15]}>
            <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.mab5]}>{data.course_name}</Text>
            {/* <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
              <Text style={[mainStyle.fs12, mainStyle.czt]}>{data.lesson}课时</Text>
            </View> */}
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
              <Text style={[mainStyle.czt, mainStyle.fs12, mainStyle.mab5]}>{data.lesson}课时</Text>
              <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.mab5]}>{data.reply}人报名</Text>
              <Text style={[mainStyle.czt, mainStyle.fs12, mainStyle.mab5]}>￥{data.course_price}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
              {data.isreply == 1 ? <Text style={[mainStyle.bgcf2, mainStyle.fs12, { borderRadius: setSize(6), paddingLeft: setSize(12), paddingRight: setSize(12) }]}>已报名</Text> : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class CourseApplyNotice extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data } = this.props;
    return (
      <View style={[styles.infoCourse, mainStyle.mab15]}>
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.flex1]}>
          <Image style={[styles.ApplyNoticeImage, mainStyle.imgCover]} mode="widthFix" source={{ uri: 'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg' }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal15, mainStyle.column]}>
            <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.mab10, styles.ApplyNoticeTitle]}>{data.title}</Text>
            <Text style={[mainStyle.c666, mainStyle.fs14, mainStyle.mab10]}>{data.title}</Text>
          </View>
        </View>
      </View>
    )
  }
}

//在线课程和培训的列表
interface CourseListItemProps {
  data: object,
  type: 'outline' | 'online',
  navigation: object | undefined
}

let imgw = (screenW - setSize(120)) * 0.28;

class CourseListItem extends React.Component<CourseListItemProps>{
  constructor(props: CourseListItemProps) {
    super(props)
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  render() {
    let { type, data, navigation } = this.props;
    return (
      <View style={[mainStyle.row, mainStyle.pal15, mainStyle.patb15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brb1f2, mainStyle.bgcfff]}>
        <TouchableOpacity style={[mainStyle.flex1]}
          onPress={() => {
            if (navigation) this.goto(type == 'online' ? 'OnlineCourse' : 'OutlineCourse', { id: data.id })
          }}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brr1f2]}>
            <Image
              style={[{ width: imgw, height: imgw * 0.7, borderRadius: setSize(6) }, mainStyle.bgcf2]}
              mode="widthFix"
              source={{ uri: 'http://' + data.img }}>
            </Image>
            <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1, mainStyle.mal15, { height: imgw * 0.7 }]}>
              <View style={[mainStyle.row, mainStyle.mat5, mainStyle.mab5, { overflow: 'hidden' }, mainStyle.mar10]}>
                {type == 'online' ? <View><Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.bgcf7, mainStyle.mar10,
                {
                  borderRadius: setSize(12),
                  paddingLeft: setSize(14),
                  paddingRight: setSize(14),
                  paddingTop: setSize(1),
                  paddingBottom: setSize(1)
                }
                ]}>{data.lesson}课时</Text></View> : null}
                <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.flex1]}>{type == 'online' ? data.course_name : data.train_name}</Text>
              </View>
              {type == 'online' ? <Text style={[mainStyle.c999, mainStyle.fs12]}>有效期至{data.validay || ''}</Text> : null}
              {
                type == 'online'
                  ? <Text style={[mainStyle.fs12, mainStyle.mat5, mainStyle.c999, { lineHeight: setSize(28) }]}>{data.create_time}</Text>
                  : <Text style={[mainStyle.fs12, mainStyle.mat5, mainStyle.c999, { lineHeight: setSize(28) }]}>{data.train_start_time}</Text>
              }
            </View>
          </View>
        </TouchableOpacity>
        {
          type == 'outline'
            ? <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter, { width: imgw * 0.8 }]}>
              {data.server == 1 && data.isserver == 0 ?
                <TouchableOpacity style={[styles.serverbtn]} onPress={() => { this.goto('OutlineCourseReserve', { id: data.id }) }}><Text style={[mainStyle.cfff, mainStyle.fs11]}>预定服务</Text></TouchableOpacity>
                : null}
              <View>
                {
                  data.isreport == 1
                    ? <Text style={[mainStyle.fs12, mainStyle.c999]}>已报到</Text>
                    : <Text style={[mainStyle.fs12, mainStyle.czt]}>未报到</Text>
                }
              </View>
            </View>
            : <TouchableOpacity style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, { width: imgw * 0.8 }]}>
              <View>
                <PercentageCircle
                  text={data.rate ? Number(data.rate) > 100 ? '已学完' : (data.rate + '%') : '0%'}
                  radius={setSize(imgw * 0.5)}
                  borderWidth={setSize(6)}
                  percent={data.rate ? Number(data.rate) : 0}
                  color={mainStyle.czt.color}
                ></PercentageCircle>
              </View>
            </TouchableOpacity>
        }
      </View >
    )
  }
}

class OrderGoodsItem extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, onClick } = this.props;
    return (
      <TouchableOpacity
        style={[styles.infoCourse, mainStyle.pa15]}
        onPress={() => {
          if (onClick) onClick()
        }}
      >
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + data.good_img }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal15]}>
            <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mab10]} numberOfLines={2}>{data.good_name}</Text>
            <View style={[mainStyle.row]}>
              <Text style={[mainStyle.c666, mainStyle.fs10, mainStyle.bgcf2, mainStyle.pa5_10, { borderRadius: setSize(2) }]}>{data.good_sku_name}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mat10]}>
              <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{data.original_price}</Text>
              <Text style={[mainStyle.c333, mainStyle.fs15]}>x {data.count}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class OrderTrainItem extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, onClick } = this.props;
    return (
      <TouchableOpacity
        style={[styles.infoCourse, mainStyle.pa15]}
        onPress={() => {
          if (onClick) onClick()
        }}
      >
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + data.good_img }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal15]}>
            <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mab10]} numberOfLines={2}>{data.good_name}</Text>
            <View style={[mainStyle.row]}>
              <Text style={[mainStyle.c666, mainStyle.fs10, mainStyle.bgcf2, mainStyle.pa5_10, { borderRadius: setSize(2) }]}>{data.good_sku_name}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mat10]}>
              <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{data.original_price}</Text>
              <Text style={[mainStyle.c333, mainStyle.fs15]}>x {data.count}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class OrderCourseItem extends PureComponent<CourseInfoItemProps>{
  constructor(props: CourseInfoItemProps) {
    super(props)
  }
  render() {
    let { data, onClick } = this.props;
    return (
      <TouchableOpacity
        style={[styles.infoCourse, mainStyle.pa15]}
        onPress={() => {
          if (onClick) onClick()
        }}
      >
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
          <Image style={[styles.CourseInfoImage, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + data.good_img }}></Image>
          <View style={[mainStyle.flex1, mainStyle.mal15]}>
            <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mab10]} numberOfLines={2}>{data.good_name}</Text>
            <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
              <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{data.original_price}</Text>
              <Text style={[mainStyle.c333, mainStyle.fs15]}>x {data.count}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const contentWidth = width - contentPadding * 2;
const CourseImageWidth = (contentWidth - setSize(20)) / 2;
const styles = StyleSheet.create({
  reMain: {
    width: contentWidth,
  },
  reImage: {
    width: contentWidth,
    height: (contentWidth) * 0.45,
    borderRadius: setSize(14),
  },
  reCourse: {
    width: CourseImageWidth,
  },
  reCourseImage: {
    width: CourseImageWidth,
    height: CourseImageWidth * 0.6,
    borderRadius: setSize(6),
  },
  infoCourse: {
    width: contentWidth,
  },
  times: {
    position: 'absolute',
    bottom: setSize(10),
    right: setSize(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingLeft: setSize(20),
    paddingRight: setSize(20),
    paddingTop: setSize(6),
    paddingBottom: setSize(6),
    zIndex: 1,
    borderRadius: setSize(26)
  },
  CourseInfoImage: {
    width: CourseImageWidth * 0.6,
    height: CourseImageWidth * 0.6,
    borderRadius: setSize(6)
  },
  ApplyNoticeImage: {
    width: CourseImageWidth * 0.16,
    height: CourseImageWidth * 0.16,
  },
  ApplyNoticeTitle: {
    height: CourseImageWidth * 0.16,
    lineHeight: CourseImageWidth * 0.16,
  },
  serverbtn: {
    backgroundColor: mainStyle.czt.color,
    paddingLeft: setSize(14),
    paddingRight: setSize(14),
    paddingTop: setSize(7),
    paddingBottom: setSize(7),
    marginBottom: setSize(16),
    borderRadius: setSize(30)
  }
})

export {
  CourseInfoItem,
  CourseInfoItem2,
  HomeCourseItem,
  CourseApplyNotice,
  CourseListItem,
  OrderGoodsItem,
  OrderCourseItem,
  OrderTrainItem
}
