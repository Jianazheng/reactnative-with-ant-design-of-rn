import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native';
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
import { consult } from '../../../tools/function'
import ApplyNotice from './ApplyNotice';
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
      tabTop: screenH,
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
    let { params } = this.props.navigation.state
    this.reload(params.id)
  }
  reload(id) {
    let { navigation, courseStore } = this.props
    courseStore.getCourseInfo(id)
      .then(res => {
        if (res == null) {
          navigation.goBack();
        }
        this.setState({ showLoading: false })
      }).catch(err => {
        this.setState({ showLoading: false })
      })
    courseStore.getFrontInfo(id)
  }
  goto() {
    this.props.navigation.push('Login');
  }

  handleScroll(e: any) {
    let { tabTop } = this.state;
    if (e.nativeEvent) {
      this.setState({
        canScroll: e.nativeEvent.contentOffset.y >= (tabTop - setSize(120))
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
              this.setState({
                clicking: false
              })
              if (res != null) {
                navigation.navigate('Settlement', { type: 3, from: 'fastbuy' })
              }
            })
        } else {//加入购物车
          cartStore.createCart()
            .then(res => {
              cartStore.addCart()
                .then(suc => {
                  this.setState({
                    clicking: false
                  })
                  DeviceEventEmitter.emit('TORELOADCARTNUM', 'yes');
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
  childrenScroll() {
    this.setState({
      canScroll: false
    })
  }
  handleCollection(common_id: string | number, type: string, isCollect: string | number) {
    let { publicStore, courseStore } = this.props
    publicStore.setCollection(common_id, type, isCollect)
      .then(res => { if (res != null) courseStore.changeCollect() })
  }
  render() {
    let { canScroll, showLoading, showApplyNotice } = this.state
    let { courseStore: { courseInfo, frontInfo }, cartStore: { hascart }, navigation } = this.props
    return (
      <View style={[mainStyle.column, mainStyle.flex1]}>
        <NavTop
          navType="normal"
          title="在线课程详情"
          onPress={() => {
            let { params } = navigation.state;
            if (params.backid != undefined) {
              this.reload(params.backid);
              navigation.goBack();
            } else {
              navigation.goBack();
            }
          }}
          children={(
            <View style={[mainStyle.column, mainStyle.aiEnd, mainStyle.mar15, mainStyle.flex1, mainStyle.positonre]}>
              <TouchableOpacity onPress={() => {
                navigation.push('CartList')
              }}
              >
                <Text style={[mainStyle.icon, { paddingRight: 0 }, mainStyle.fs22, mainStyle.c666]}
                >&#xe60a;</Text>
                {hascart ? <Text style={[mainStyle.circle, { top: setSize(6) }]}></Text> : null}
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
          stickyHeaderIndices={[1]}
          onScroll={(e) => {
            this.handleScroll(e);
          }}
        >
          <View onLayout={(e) => {
            this.setState({
              tabTop: e.nativeEvent.layout.height
            })
          }}
          >
            <HomeSwiper fullWidth img={courseInfo.images || []}></HomeSwiper>
            <View style={[mainStyle.pa15, mainStyle.column]}>
              <View style={[mainStyle.column, mainStyle.mab10]}>
                <Text style={[mainStyle.c333, mainStyle.fs16, mainStyle.lh44]}> {courseInfo.course_name}</Text>
                <Text style={[mainStyle.c666, mainStyle.fs13, mainStyle.lh44, mainStyle.mat10]}> {courseInfo.course_introduction}</Text>
                <Text style={[mainStyle.c666, mainStyle.fs13, mainStyle.lh44, mainStyle.mat10]}> 购买后{courseInfo.validay || 1}天内有效</Text>
              </View>
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10, mainStyle.aiCenter]}>
                <Text style={[mainStyle.czt, mainStyle.fs13]}>
                  ￥<Text style={[mainStyle.fs22]}>{courseInfo.course_price}</Text>
                </Text>
                <Text style={[mainStyle.c999, mainStyle.fs13]}>{courseInfo.reply}人报名</Text>
              </View>
              <TouchableOpacity onPress={() => {
                if (frontInfo.length == 0) return
                this.handleCloseApplyNotice(true)
              }}>
                <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100]}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
                    <Text style={[mainStyle.c999, mainStyle.fs15, mainStyle.mar15, mainStyle.flex1]}>前置条件</Text>
                    {frontInfo.length == 0 ? <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.flex3]}>无</Text> : null}
                  </View>
                  {frontInfo.length != 0 && frontInfo ? <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs24]}>&#xe64d;</Text> : null}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <BxTabView
            height={height - setSize(120)}
            tabWidth={width - setSize(160)}
            currentPageIndex={0}
            canScroll={canScroll}
            tabs={[{ title: '讲师' }, { title: '详情' }, { title: '相关课程' }]}
            tabAlign={'center'}
            childrenScroll={
              this.childrenScroll.bind(this)
            }
          >
            <View style={[mainStyle.pab140]}>
              <CourseTeacher teacher={courseInfo.teacher}></CourseTeacher>
            </View>
            <View style={[mainStyle.pab140]}>
              <CourseArtInfo info={courseInfo.detail} height={height - setSize(120)}></CourseArtInfo>
            </View>
            <View style={[mainStyle.pab140]}>
              <RelatedCourse course={courseInfo.relate_course} navigation={navigation} backid={courseInfo.id}></RelatedCourse>
            </View>
          </BxTabView>

        </ScrollView>

        <View style={[mainStyle.h120, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.fixedview, mainStyle.bgcfff, mainStyle.brt1e2, mainStyle.palr15]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mar10, { width: screenW * 0.24 }]}>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => { consult() }}>
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
        {
          showApplyNotice ?
            <View style={[styles.fixedinfo, mainStyle.bgcfff, mainStyle.pa15,
            {
              height: screenH * (frontInfo.online_apply_detail && frontInfo.online_apply_detail.length > 1 ? 0.55 : 0.3)
            }
            ]}>
              <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>前置条件</Text>
                <Text
                  style={[mainStyle.c999, mainStyle.icon, mainStyle.fs20]}
                  onPress={() => { this.handleCloseApplyNotice(false) }}
                >&#xe651;</Text>
              </View>
              <ApplyNotice data={frontInfo.online_apply_detail || []} relate={frontInfo.front_train_relate || 1}></ApplyNotice>
            </View>
            : null
        }

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