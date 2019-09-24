import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity, Animated, DeviceEventEmitter } from 'react-native';
import HomeSwiper from '../../components/Home/Swiper';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';
import BxTabView from '../../components/ScrollTabs/TabView';
import RelatedCourse from './RelatedCourse';
import CourseTeacher from './CourseTeacher';
import CourseArtInfo from './CourseArtInfo';
import ApplyNotice from './ApplyNotice';
import { CartInfo } from './CartInfo';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import { splitStr } from '../../tools/function';
import { ActivityIndicator } from '@ant-design/react-native';
import { consult } from '../../tools/function'


/**
 * 培训课程详情
 */

let { width, height } = Dimensions.get('window')

interface Props { }
interface State {
  canScroll: boolean,
  tabTop: number,
  showApplyNotice: boolean,
  showCartInfoDetails: boolean,
  showPromotion: boolean,
  clicking: boolean,
  hascart: boolean,
  cheight: number
}

@inject('trainStore', 'publicStore', 'cartStore')
@observer
class TrainInfo extends React.Component<Props, State> {
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
      cheight: height
    };
  }
  componentDidMount() {
    let { params } = this.props.navigation.state
    this.reload(params.id);
  }
  reload(id) {
    let { navigation, trainStore, cartStore: { hascart } } = this.props
    trainStore.getTrainInfo(id)
      .then(res => {
        if (res == null) {
          navigation.goBack();
        }
        this.setState({ showLoading: false })
      }).catch(err => {
        this.setState({ showLoading: false })
      })
    trainStore.getFrontInfo(id)
    trainStore.getTrainPromotion(id)
    trainStore.getTrainSelectItem(id)
  }
  componentWillUnmount() {
  }
  goto() {
    this.props.navigation.push('Login');
  }

  handleScroll(e: any) {
    // let { tabTop } = this.state;
    if (e.nativeEvent) {
      this.setState({
        canScroll: e.nativeEvent.contentOffset.y >=0
      })
    }
  }

  handleCloseApplyNotice(isok: boolean) {
    this.setState({
      showApplyNotice: isok
    })
  }

  handleCloseCartInfoDetails(isok: boolean, fastbuy: boolean) {
    let { showCartInfoDetails, clicking } = this.state
    let { cartStore, cartStore: { selectData }, navigation } = this.props
    console.log(selectData)
    if (!showCartInfoDetails) {
      this.setState({
        showCartInfoDetails: isok
      })
    } else {
      if (!clicking) {//防止多次点击请求购物车
        this.setState({
          clicking: true
        }, () => {
          if (fastbuy) {//立即购买
            cartStore.fastBuy(selectData)
              .then(res => {
                this.setState({
                  clicking: false
                })
                console.log(res)
                if (res != null && res.status != 400) {
                  navigation.navigate('Settlement', { type: 2, from: 'fastbuy' })
                } else if (res != null) {
                  navigation.navigate('Info');
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
                  })
              })
          }
        })
      }
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
    let { publicStore, trainStore } = this.props
    publicStore.setCollection(common_id, type, isCollect)
      .then(res => { if (res != null) trainStore.changeCollect() })
  }

  render() {
    let { canScroll, showLoading, showApplyNotice, showCartInfoDetails, showPromotion, cheight } = this.state
    let { trainStore, navigation, cartStore: { hascart } } = this.props
    let trainInfo = trainStore.trainInfo
    let promotionInfo = trainStore.promotionInfo
    let cartItem = trainStore.cartItem
    let frontInfo = trainStore.frontInfo
    return (
      <View style={[mainStyle.column, mainStyle.flex1]}>
        <NavTop
          navType="normal"
          title="培训课程详情"
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
        />
        <ScrollView
          style={[mainStyle.flex1]}
          stickyHeaderIndices={[2]}
          onScroll={(e) => {
            this.handleScroll(e);
          }}
        >
          <HomeSwiper fullWidth img={trainInfo.image_url || []}></HomeSwiper>
          <View style={[mainStyle.pa15, mainStyle.column]}>
            {
              trainInfo.is_apply == 1 ?
                <View style={[mainStyle.row, mainStyle.mab10]}>
                  <Taps>已报名</Taps>
                  <Text style={[mainStyle.c333, mainStyle.fs16, mainStyle.lh44]}>
                    <Text style={[styles.span]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    {trainInfo.train_name}
                  </Text>
                </View>
                :
                <View style={[mainStyle.row, mainStyle.mab10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs16, mainStyle.lh44]}>
                    {trainInfo.train_name}
                  </Text>
                </View>
            }
            <View style={[mainStyle.row, mainStyle.mab10]}>
              <Text style={[mainStyle.c999, mainStyle.fs13]}>{trainInfo.train_introduction}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10]}>
              <Text style={[mainStyle.c999, mainStyle.fs13]}>活动时间: {splitStr(trainInfo.train_start_time, ' ')}至{splitStr(trainInfo.train_end_time, ' ')}</Text>
              <Text style={[mainStyle.c999, mainStyle.fs13]}>{trainInfo.apply_num}人报名</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10, mainStyle.aiCenter]}>
              <Text style={[mainStyle.c999, mainStyle.fs13]}>开始报名时间: {splitStr(trainInfo.reg_start_time, ' ')}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10, mainStyle.aiCenter]}>
              <Text style={[mainStyle.c999, mainStyle.fs13]}>截止报名时间: {splitStr(trainInfo.reg_end_time, ' ')}</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.fs13]}>
                ￥<Text style={[mainStyle.fs22]}>{cartItem.price}</Text>
              </Text>
            </View>

            {
              promotionInfo.length > 0 ?
                <Animated.View style={[mainStyle.column, mainStyle.mab10, mainStyle.mat10, mainStyle.positonre, !showPromotion ? { height: setSize(200), overflow: 'hidden' } : { paddingBottom: setSize(60) }]}>
                  <Text style={[mainStyle.c333, mainStyle.fs14, mainStyle.mab10]}>特惠活动</Text>
                  {
                    promotionInfo.map((val, i) => (
                      <Text key={i} style={[mainStyle.c666, mainStyle.fs14, mainStyle.lh42]}>
                        {val}
                      </Text>
                    ))
                  }
                  <TouchableOpacity
                    style={[mainStyle.flex1, mainStyle.h60, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, mainStyle.palr15, mainStyle.bgcfff,
                    showPromotion ? mainStyle.brb1f2 : null,
                    { position: 'absolute', bottom: 0, width: screenW - setSize(60), opacity: 0.8 }]}
                    onPress={() => {
                      this.handleShowPromotion()
                    }}
                  >
                    {
                      showPromotion ? <Text style={[mainStyle.icon, mainStyle.c333]}>&#xe8ed;</Text> : <Text style={[mainStyle.icon, mainStyle.c333]}>&#xe8ec;</Text>
                    }
                  </TouchableOpacity>
                </Animated.View>
                : null
            }
            <View style={[mainStyle.column, mainStyle.mat10]}>
              <TouchableOpacity onPress={() => { this.handleCloseCartInfoDetails(true, false) }}>
                <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100]}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
                    <Text style={[mainStyle.c999, mainStyle.fs15, mainStyle.mar15, mainStyle.flex1]}>选&nbsp;&nbsp;&nbsp;择</Text>
                    <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.flex3]}>{cartItem.type_name || '请选择类型'}</Text>
                  </View>
                  <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs24]}>&#xe64d;</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (frontInfo.length == 0) return
                this.handleCloseApplyNotice(true)
              }}>
                <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100]}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
                    <Text style={[mainStyle.c999, mainStyle.fs15, mainStyle.mar15, mainStyle.flex1]}>报名条件</Text>
                    {frontInfo.length == 0 ? <Text style={[mainStyle.c333, mainStyle.fs15, mainStyle.flex3]}>无</Text> : null}
                  </View>
                  {frontInfo.length != 0 && frontInfo ? <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs24]}>&#xe64d;</Text> : null}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <BxTabView
            height={height - setSize(200)}
            tabWidth={width - setSize(160)}
            currentPageIndex={0}
            canScroll={canScroll}
            tabs={[{ title: '讲师' }, { title: '详情' }, { title: '相关课程' }]}
            tabAlign={'center'}
          >
            <View style={[mainStyle.pab220]}>
              <CourseTeacher></CourseTeacher>
            </View>
            <View style={[mainStyle.pab220]}>
              <CourseArtInfo height={height - setSize(120)}></CourseArtInfo>
            </View>
            <View style={[mainStyle.pab220]}>
              <RelatedCourse navigation={navigation} backid={trainInfo.id}></RelatedCourse>
            </View>
          </BxTabView>

        </ScrollView>

        <View style={[mainStyle.h120, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.fixedview, mainStyle.bgcfff, mainStyle.brt1e2, mainStyle.palr15]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mar10, { width: screenW * 0.24 }]}>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => { consult() }}>
              <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe610;</Text>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>咨询{canScroll}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
              this.handleCollection(trainInfo.id, '1', trainInfo.is_collection)
            }}>
              <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                {
                  trainInfo.is_collection == 0 ?
                    <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe65a;</Text>
                    :
                    <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe65b;</Text>
                }
                <Text style={[mainStyle.c333, mainStyle.fs12]}>{trainInfo.is_collection == 0 ? '收藏' : '已收藏'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.fixedbtn, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, mainStyle.flex1]}>
            <TouchableOpacity style={[mainStyle.flex1, mainStyle.bgcjin]} onPress={() => { this.handleCloseCartInfoDetails(true, false) }}>
              <LinearGradient
                colors={['#FF8604', '#FF5100']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.flex1]}>
                <Text style={[mainStyle.cfff, mainStyle.fs15]}>加入购物车</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1, mainStyle.bgc59]} onPress={() => { this.handleCloseCartInfoDetails(true, true) }}>
              <LinearGradient
                colors={['#FA5439', '#FA3352']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.flex1]}>
                <Text style={[mainStyle.cfff, mainStyle.fs15]}>立即报名</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {
          showApplyNotice ?
            <View style={[styles.fixedinfo, mainStyle.bgcfff, mainStyle.pa15,
            {
              height: screenH * (frontInfo.apply_detail && frontInfo.apply_detail.length > 1 ? 0.55 : 0.3)
            }
            ]}>
              <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>报名条件</Text>
                <Text
                  style={[mainStyle.c999, mainStyle.icon, mainStyle.fs20]}
                  onPress={() => { this.handleCloseApplyNotice(false) }}
                >&#xe651;</Text>
              </View>
              <ApplyNotice data={frontInfo.apply_detail || []} relate={frontInfo.front_train_relate || 1}></ApplyNotice>
            </View>
            : null
        }

        {
          showCartInfoDetails ?
            <View style={[styles.fixedinfo, mainStyle.bgcfff, mainStyle.column, mainStyle.jcBetween, mainStyle.pa15,
            {
              height: screenH * 0.55
            }
            ]}>
              <CartInfo
                closeBtn={
                  <Text
                    style={[mainStyle.c999, mainStyle.icon, mainStyle.fs20]}
                    onPress={() => { this.handleCloseCart() }}
                  >
                    &#xe651;
                </Text>
                }
              ></CartInfo>
            </View>
            : null
        }

        {
          showCartInfoDetails || showApplyNotice ?
            <TouchableOpacity
              style={[
                styles.fixedzz,
                {
                  height: screenH
                }
              ]}
              onPress={() => {
                this.handleCloseAll()
              }}>
            </TouchableOpacity>
            : null
        }

      </View >
    )
  }
}

class Taps extends React.PureComponent {
  render() {
    return (
      <Text style={[styles.tips, mainStyle.bgczt, mainStyle.cfff, mainStyle.fs13]}>{this.props.children}</Text>
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

export default TrainInfo