import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { mainStyle, screenW, setSize } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import BxCateTitle from '../../components/Pubilc/CateTitle';
import { observer, inject } from 'mobx-react';


let { width, height } = Dimensions.get('window');
const contentPadding = setSize(30);

interface Props { }
interface State { }

@inject('goodsStore', 'courseStore')
@observer
class Explore extends React.Component<Props, State> {
  static navigationOptions = {
    tabBarLabel: '探索',
    tabBarIcon: ({ focused }) => {
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
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      news: [{}, {}, {}, {}],
      refreshing: false
    };
  }

  componentDidMount() {
    let { goodsStore, courseStore } = this.props;
    goodsStore.getGoodsClassify();
    goodsStore.getRecommendGoods();
    courseStore.getClassify();
    courseStore.getRecommendCourse();
  }

  goto(router: string) {
    this.props.navigation.push(router);
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    }, () => {
      let { goodsStore, courseStore } = this.props;
      goodsStore.getGoodsClassify();
      goodsStore.getRecommendGoods();
      courseStore.getClassify();
      courseStore.getRecommendCourse()
        .then(res => {
          this.setState({
            refreshing: false
          })
        })
    })
  }

  render() {
    let { navigation, goodsStore, courseStore } = this.props
    let { refreshing } = this.state
    let goodsClassify = goodsStore.goodsClassify
    let recommendGoods = goodsStore.recommendGoods
    let courseClassify = courseStore.classify
    let recommendCourses = courseStore.recommendCourse
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <ScrollView
          style={[mainStyle.flex1]}
          refreshControl={(
            <RefreshControl
              tintColor={mainStyle.czt.color}
              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          )}
        >
          <View style={[mainStyle.flex1, mainStyle.column]}>
            <View style={[mainStyle.flex1, mainStyle.pal15, mainStyle.mab15, mainStyle.column, mainStyle.bgcfff]}>
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.fontbold]}>商城</Text>
              </View>
              <ScrollView
                style={[mainStyle.flex1, mainStyle.mab15]}
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
              >
                <View style={[mainStyle.row]}>
                  {
                    goodsClassify.map((item, index) => <Classify navigation={navigation} data={item} itemType="goods" type={index == 0 ? 'all' : 'item'} key={index.toString()}></Classify>)
                  }
                </View>
              </ScrollView>
            </View>
            <View style={[mainStyle.flex1, mainStyle.pal15, mainStyle.mab15, mainStyle.column, mainStyle.bgcfff]}>
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.fontbold]}>好物推荐</Text>
              </View>
              <ScrollView
                style={[mainStyle.flex1, mainStyle.mab5]}
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
              >
                <View style={[mainStyle.row]}>
                  {
                    recommendGoods.map((item, index) => <RecommendGoods navigation={navigation} data={item} key={index.toString()}></RecommendGoods>)
                  }
                </View>
              </ScrollView>
            </View>
            <View style={[mainStyle.flex1, mainStyle.pal15, mainStyle.mab15, mainStyle.column, mainStyle.bgcfff]}>
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.fontbold]}>在线课程</Text>
              </View>
              <ScrollView
                style={[mainStyle.flex1, mainStyle.mab15]}
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
              >
                <View style={[mainStyle.row]}>
                  {
                    courseClassify.map((item, index) => <Classify navigation={navigation} itemType="course" type={index == 0 ? 'all' : 'item'} data={item} key={index.toString()}></Classify>)
                  }
                </View>
              </ScrollView>
            </View>
            <View style={[mainStyle.flex1, mainStyle.mab10, mainStyle.palr15, mainStyle.bgcfff]}>
              <BxCateTitle title={"好课推荐"} navigateTitle={"更多"} onClick={() => {
                this.goto('OnlineCourseList')
              }}>
              </BxCateTitle>
              <View style={[mainStyle.jcBetween, mainStyle.wrap, mainStyle.row, mainStyle.flex1]}>
                {
                  recommendCourses.map((item, index) => <RecommendCourse navigation={navigation} data={item} key={index.toString()}></RecommendCourse>)
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
  data: object,
  navigation: object
}

class RecommendGoods extends React.PureComponent<GoodsProps> {
  constructor(props: GoodsProps) {
    super(props)
  }

  gotoInfo(route: string, params: object) {
    let { navigation } = this.props;
    navigation.push(route, params);
  }

  render() {
    let { data } = this.props;
    return (
      <TouchableOpacity style={[styles.reGoods, mainStyle.mab10]} onPress={() => { this.gotoInfo('GoodsInfo', { id: data.id }) }}>
        <View style={[mainStyle.column, mainStyle.jcBetween]}>
          <Image style={[styles.reGoodsImage, mainStyle.imgCover, mainStyle.mab5]} mode="widthFix" source={{ uri: data.image_url ? data.image_url.length > 0 ? data.image_url[0] : '' : '' }}></Image>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mab5]} numberOfLines={1}>{data.product_name}</Text>
            <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{data.list_price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

interface CourseProps {
  data: Array<object>
}

class RecommendCourse extends React.PureComponent<CourseProps> {
  constructor(props: CourseProps) {
    super(props)
  }

  gotoInfo(route: string, params: object) {
    let { navigation } = this.props;
    navigation.push(route, params);
  }

  render() {
    let { data } = this.props;
    return (
      <TouchableOpacity style={[styles.reCourse, mainStyle.mab10]} onPress={() => { this.gotoInfo('CourseInfo', { id: data.id }) }}>
        <View style={[mainStyle.column, mainStyle.jcBetween]}>
          <View style={[mainStyle.positonre, mainStyle.mab5]}>
            <Text style={[styles.times, mainStyle.cfff, mainStyle.fs11]}>{data.lesson}课时</Text>
            <Image style={[styles.reCourseImage, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + data.image }}></Image>
          </View>
          <View style={[mainStyle.flex1]}>
            <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.mab5]} numberOfLines={1}>{data.course_name}</Text>
            <Text style={[mainStyle.c999, mainStyle.fs11]}>{data.reply}人报名</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

interface ClassifyProps {
  data: object,
  type: 'all' | 'item'
  navigation: object,
  itemType: string
}

@inject('courseStore')
@observer
class Classify extends React.Component<ClassifyProps> {
  constructor(props: ClassifyProps) {
    super(props)
  }

  gotoInfo(route: string, params: object) {
    let { navigation, courseStore } = this.props;
    if (route == 'OnlineCourseList') {
      courseStore.setCondition(params.categroy_name, params.cid)
    }
    navigation.push(route, params);
  }

  render() {
    let { data, type, itemType } = this.props;
    if (type == 'all') {
      if (itemType == 'goods') {
        return (
          <TouchableOpacity style={[mainStyle.mar15]} onPress={() => { this.gotoInfo('GoodsList', { cid: data.id, type: 'goods', product_category_name: data.product_category_name }) }}>
            <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.bgcf7, mainStyle.h120, mainStyle.palr15, { minWidth: setSize(160) }]}>
              <Text style={[mainStyle.c333, mainStyle.fs13]}>{data.product_category_name}</Text>
            </View>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={[mainStyle.mar15]} onPress={() => { this.gotoInfo('OnlineCourseList', { cid: '', type: 'course', categroy_name: '全部' }) }}>
            <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.bgcf7, mainStyle.h120, mainStyle.palr15, { minWidth: setSize(160) }]}>
              <Text style={[mainStyle.c333, mainStyle.fs13]}>全部</Text>
            </View>
          </TouchableOpacity>
        )
      }
    } else {
      if (itemType == 'goods') {
        return (
          <TouchableOpacity style={[mainStyle.mar15]} onPress={() => { this.gotoInfo('GoodsList', { cid: data.id, type: 'goods', product_category_name: data.product_category_name }) }}>
            <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.bgcf7, mainStyle.h120, mainStyle.palr15, { minWidth: setSize(160) }]}>
              <Text style={[mainStyle.c333, mainStyle.fs13]}>{data.product_category_name}</Text>
            </View>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={[mainStyle.mar15]} onPress={() => { this.gotoInfo('OnlineCourseList', { cid: data.id, type: 'course', categroy_name: data.categroy_name }) }}>
            <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.bgcf7, mainStyle.h120, mainStyle.palr15, { minWidth: setSize(160) }]}>
              <Text style={[mainStyle.c333, mainStyle.fs13]}>{data.categroy_name}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    }
  }
}

const contentWidth = width - contentPadding * 2;
const GoodsImageWidth = (contentWidth - setSize(30)) / 3;
const CourseImageWidth = (contentWidth - setSize(20)) / 2;
const styles = StyleSheet.create({
  reImage: {
    width: contentWidth,
    height: (contentWidth) * 0.45,
    borderRadius: setSize(14),
  },
  reGoods: {
    width: GoodsImageWidth,
    marginRight: setSize(20)
  },
  reGoodsImage: {
    width: GoodsImageWidth,
    height: GoodsImageWidth,
    borderRadius: setSize(6),
  },
  reCourse: {
    width: CourseImageWidth,
  },
  reCourseImage: {
    width: CourseImageWidth,
    height: CourseImageWidth * 0.6,
    borderRadius: setSize(6),
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
  }
})

export default Explore