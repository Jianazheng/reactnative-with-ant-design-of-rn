import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import HomeSwiper from '../../../components/Home/Swiper';
import { mainStyle, setSize, screenH, screenW } from '../../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';
import BxTabView from './../../../components/ScrollTabs/TabView';
import RelatedCourse from './RelatedCourse';
import CourseTeacher from './CourseTeacher';
import CourseArtInfo from './CourseArtInfo';
import NavTop from '../../../router/navTop';
import { observer, inject } from 'mobx-react';
import { ActivityIndicator } from '@ant-design/react-native';


/**
 * 培训课程详情
 */

let { width, height } = Dimensions.get('window')

interface Props { }
interface State {
  canScroll: boolean,
  tabTop: number,
  courseData: Array<object>,
  showApplyNotice: boolean,
  showCartInfoDetails: boolean,
  showPromotion: boolean,
  clicking: boolean
}

@inject('publicStore', 'cartStore', 'courseStore')
@observer
class CourseInfo extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('课程详情'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      clicking: false,
      tabTop: 667,
      canScroll: false,
      showApplyNotice: false,
      showCartInfoDetails: false,
      showPromotion: false,
      showLoading: true,
      courseData: [

      ]
    };
  }

  componentDidMount() {
    let { navigation, courseStore } = this.props
    let { params } = navigation.state
    courseStore.getCourseInfo(params.id)
      .then(res => {
        this.setState({ showLoading: false })
      }).catch(err => {
        this.setState({ showLoading: false })
      })
  }

  goto() {
    this.props.navigation.push('Login');
  }

  handleScroll(e: any) {
    let { tabTop } = this.state;
    if (e.nativeEvent) {
      this.setState({
        canScroll: tabTop <= e.nativeEvent.contentOffset.y + setSize(120)
      })
    }
  }

  handleCloseApplyNotice(isok: boolean) {
    this.setState({
      showApplyNotice: isok
    })
  }

  handleCloseCartInfoDetails(type: string) {
    let { clicking } = this.state;
    let { cartStore, navigation, courseStore: { courseInfo } } = this.props;
    cartStore.selectItem({ type: 3, good_id: courseInfo.id, sku_id: '' })
    if (!clicking) {//防止多次点击请求购物车
      this.setState({
        clicking: true
      }, () => {
        if (type == 'fastbuy') {//立即购买
          cartStore.fastBuy({ type: 3, good_id: courseInfo.id, sku_id: '' })
            .then(res => {
              navigation.navigate('Settlement', { type: 3, from: 'fastbuy' })
            })
        } else {//加入购物车
          cartStore.createCart()
            .then(res => {
              cartStore.addCart()
                .then(suc => {
                  this.setState({
                    clicking: false
                  })
                })
            })
        }
      })
    }
  }

  handleCloseCart() {
    this.setState({
      showCartInfoDetails: false
    })
  }

  handleCloseAll() {
    this.setState({
      showCartInfoDetails: false,
      showApplyNotice: false
    })
  }

  handleShowPromotion() {
    let { showPromotion } = this.state
    this.setState({
      showPromotion: !showPromotion
    })
  }

  handleCollection(common_id: string | number, type: string, isCollect: string | number) {
    let { publicStore, courseStore } = this.props
    publicStore.setCollection(common_id, type, isCollect)
      .then(res => courseStore.changeCollect())
  }

  render() {
    let { canScroll, showLoading } = this.state
    let { courseStore: { courseInfo }, navigation } = this.props
    return (
      <View style={[mainStyle.column, mainStyle.flex1]}>
        <NavTop
          navType="normal"
          title="在线课程详情"
          onPress={() => {
            navigation.goBack();
          }}
          children={(
            <View style={[mainStyle.column, mainStyle.aiEnd, mainStyle.mar15, mainStyle.flex1]}>
              <TouchableOpacity onPress={() => {
                navigation.push('CartList')
              }}
              >
                <Text style={[mainStyle.icon, { paddingRight: 0 }, mainStyle.fs22, mainStyle.c666]}
                >&#xe60a;</Text>
              </TouchableOpacity>
            </View>
          )}
        ></NavTop>
        <ActivityIndicator
          animating={showLoading}
          toast
          size="large"
          text="加载中..."
        />
        <ScrollView
          style={[mainStyle.flex1]}
          onScroll={(e) => {
            this.handleScroll(e);
          }}
        >
          <HomeSwiper fullWidth img={courseInfo.images || []}></HomeSwiper>
          <View style={[mainStyle.pa15, mainStyle.column]}>
            <View style={[mainStyle.column, mainStyle.mab10]}>
              <Text style={[mainStyle.c333, mainStyle.fs16, mainStyle.lh44]}> {courseInfo.course_name}</Text>
              <Text style={[mainStyle.c666, mainStyle.fs13, mainStyle.lh44, mainStyle.mat10]}> {courseInfo.course_introduction}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.fs13]}>
                ￥<Text style={[mainStyle.fs22]}>{courseInfo.course_price}</Text>
              </Text>
              <Text style={[mainStyle.c999, mainStyle.fs13]}>{courseInfo.reply}人报名</Text>
            </View>
          </View>

          <BxTabView
            height={height - setSize(240)}
            tabWidth={width - setSize(160)}
            currentPageIndex={0}
            canScroll={canScroll}
            tabs={[{ title: '讲师' }, { title: '详情' }, { title: '相关课程' }]}
            tabAlign={'center'}
          >
            <View style={[mainStyle.mab40]}>
              <CourseTeacher teacher={courseInfo.teacher}></CourseTeacher>
            </View>
            <View style={[mainStyle.mab40]}>
              <CourseArtInfo info={courseInfo.detail}></CourseArtInfo>
            </View>
            <View style={[mainStyle.mab40]}>
              <RelatedCourse course={courseInfo.relate_course}></RelatedCourse>
            </View>
          </BxTabView>

        </ScrollView>

        <View style={[mainStyle.h120, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.fixedview, mainStyle.bgcfff, mainStyle.brt1e2, mainStyle.palr15]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mar10, { width: screenW * 0.24 }]}>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => { }}>
              <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe610;</Text>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>咨询</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
              this.handleCollection(courseInfo.id, '2', courseInfo.is_collection)
            }}>
              <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                {
                  courseInfo.is_collection == 0 ?
                    <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe65a;</Text>
                    :
                    <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe65b;</Text>
                }
                <Text style={[mainStyle.c333, mainStyle.fs12]}>{courseInfo.is_collection == 0 ? '收藏' : '已收藏'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.fixedbtn, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, mainStyle.flex1]}>
            <TouchableOpacity style={[mainStyle.flex1, mainStyle.bgcjin]} onPress={() => { this.handleCloseCartInfoDetails('cart') }}>
              <LinearGradient
                colors={['#FF8604', '#FF5100']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.flex1]}>
                <Text style={[mainStyle.cfff, mainStyle.fs15]}>加入购物车</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1, mainStyle.bgc59]} onPress={() => { this.handleCloseCartInfoDetails('fastbuy') }}>
              <LinearGradient
                colors={['#FA5439', '#FA3352']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.flex1]}>
                <Text style={[mainStyle.cfff, mainStyle.fs15]}>立即购买</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  fixedzz: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 99,
    width: screenW,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  fixedinfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    marginBottom: setSize(120),
    width: screenW,
    borderTopLeftRadius: setSize(10),
    borderTopRightRadius: setSize(10),
  },
  fixedview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: screenW
  },
  fixedbtn: {
    height: setSize(90),
    width: screenW - setSize(60),
    borderRadius: setSize(45),
    overflow: 'hidden',
  },
  tips: {
    textAlign: 'center',
    paddingTop: setSize(4),
    paddingBottom: setSize(4),
    paddingLeft: setSize(12),
    paddingRight: setSize(12),
    borderRadius: setSize(6),
    position: 'absolute',
    top: setSize(-2),
    left: 0
  },
  span: {
    width: setSize(100)
  }
})

export default CourseInfo