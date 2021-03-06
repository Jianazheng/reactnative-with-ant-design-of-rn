import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import HomeSwiper from '../../../components/Home/Swiper';
import { mainStyle, setSize, screenH, screenW } from '../../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';
import { IconOutline } from "@ant-design/icons-react-native";
import { headerTitle, headerRight } from '../../../router/navigationBar';
import BxTabView from './../../../components/ScrollTabs/TabView';
import { CartInfo } from './CartInfo';
import NavTop from '../../../router/navTop';
import { observer, inject } from 'mobx-react';
import BxRichText from '../../../components/Pubilc/RichText';
import { Toast } from '@ant-design/react-native';
import { consult } from '../../../tools/function'


let { width, height } = Dimensions.get('window')

interface Props { }
interface State {
  canScroll: boolean,
  tabTop: number,
  clicking: boolean,
  showCartInfoDetails: boolean
}

@inject('goodsStore', 'cartStore', 'publicStore', 'cartStore')
@observer
class GoodsInfo extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('课程详情'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      tabTop: height,
      canScroll: false,
      clicking: false,
      showCartInfoDetails: false
    };
  }
  componentDidMount() {
    let { navigation, goodsStore, cartStore: { cartList } } = this.props;
    let { params } = navigation.state;
    goodsStore.getGoodsInfo(params.id).then(res => {
      if (res == null) {
        navigation.goBack()
      }
    }).catch(err => {
      console.log(err)
    });
    let goodsItem = goodsStore.goodsItem
    goodsStore.selectItem(goodsItem, 0);
  }
  componentWillUnmount() {
  }
  goto() {
    this.props.navigation.push('Login');
  }

  handleScroll(e: any) {
    let { tabTop } = this.state;
    if (e.nativeEvent) {
      this.setState({
        canScroll: e.nativeEvent.contentOffset.y >= (tabTop - setSize(90))
      })
    }
  }

  handleCloseCartInfoDetails(isok: boolean, fastbuy: boolean) {
    let { showCartInfoDetails, clicking } = this.state;
    let { cartStore, cartStore: { selectData }, navigation, goodsStore: { goodsItem } } = this.props;
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
            selectData.count = goodsItem.count;
            if (selectData.product_stock > 0) {
              cartStore.fastBuy(selectData)
                .then(res => {
                  this.setState({
                    clicking: false
                  })
                  if (res != null) {
                    navigation.navigate('Settlement', { type: 1, from: 'fastbuy' })
                  }
                }).catch(err => {
                  this.setState({
                    clicking: false
                  })
                })
            } else {
              this.setState({
                clicking: false
              })
              Toast.info('库存不足', 1.2, undefined, false)
            }
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
  }

  handleCollection(common_id: string | number, type: string, isCollect: number | string) {
    let { publicStore, goodsStore } = this.props
    publicStore.setCollection(common_id, type, isCollect)
      .then(res => { if (res != null) goodsStore.changeCollect() })
      .catch(err => console.warn(err))
  }

  handleCloseCart() {
    this.setState({
      showCartInfoDetails: false
    })
  }
  childrenScroll() {
    this.setState({
      canScroll: false
    })
  }
  render() {
    let { canScroll, showCartInfoDetails } = this.state;
    let { goodsStore, navigation, cartStore: { hascart } } = this.props;
    let goodsInfo = goodsStore.goodsInfo
    let goodsItem = goodsStore.goodsItem
    return (
      <View style={[mainStyle.column, mainStyle.flex1, mainStyle.pab140]}>
        <NavTop
          navType="normal"
          title="商品详情"
          onPress={() => {
            navigation.goBack();
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
            <HomeSwiper
              fullWidth
              img={goodsInfo.image_url || []}
            ></HomeSwiper>
            <View style={[mainStyle.pa15, mainStyle.column]}>
              <View style={[mainStyle.row, mainStyle.mab10]}>
                <Text style={[mainStyle.c333, mainStyle.fs16, mainStyle.lh44]}>
                  {goodsInfo.product_name}
                </Text>
              </View>
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10]}>
                <Text style={[mainStyle.c999, mainStyle.fs13, { lineHeight: setSize(40) }]}>{goodsInfo.product_introduction}</Text>
              </View>
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mab10, mainStyle.aiCenter]}>
                <Text style={[mainStyle.czt, mainStyle.fs13]}>
                  ￥<Text style={[mainStyle.fs22]}>{goodsItem.price}</Text>
                </Text>
                <Text style={[mainStyle.c999, mainStyle.fs13]}>已售：{goodsInfo.sales_volume}</Text>
              </View>
              <View style={[mainStyle.column]}>
                <View style={[mainStyle.column]}>
                  <TouchableOpacity onPress={() => { this.handleCloseCartInfoDetails(true, false) }}>
                    <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
                        <Text style={[mainStyle.c999, mainStyle.fs15, mainStyle.mar15]}>选&nbsp;&nbsp;&nbsp;择</Text>
                        <Text style={[mainStyle.mal20, mainStyle.c333, mainStyle.fs15]}>{goodsItem.sku_name || '请选择类型'}</Text>
                      </View>
                      <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs24]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <BxTabView
            currentPageIndex={0}
            height={height - setSize(140)}
            tabWidth={width - setSize(160)}
            canScroll={canScroll}
            tabs={[{ title: '商品详情' }, { title: '参数规格' }]}
            tabAlign={'center'}
            childrenScroll={
              this.childrenScroll.bind(this)
            }
          >
            <View style={[mainStyle.pab140, mainStyle.flex1]}>
              <BxRichText text={goodsInfo.detail}></BxRichText>
            </View>
            <View style={[mainStyle.pab140, mainStyle.flex1, mainStyle.pa15]}>
              <View style={[mainStyle.flex1, mainStyle.column, mainStyle.brl1e2, mainStyle.brt1e2]}>
                {
                  goodsInfo.attr_rule
                    ? goodsInfo.attr_rule.map((val, i) => (
                      <View key={i} style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.pa15, mainStyle.brr1e2, mainStyle.brb1e2]}>
                        <Text style={[mainStyle.flex1, mainStyle.c666, mainStyle.fs14, mainStyle.brr1e2]}>{val.attr}</Text>
                        <Text style={[mainStyle.flex1, mainStyle.c666, mainStyle.fs14, mainStyle.pal15]}>{val.value}</Text>
                      </View>
                    ))
                    : null
                }
              </View>
            </View>
          </BxTabView>
        </ScrollView>

        <View style={[mainStyle.h120, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.fixedview, mainStyle.palr15, mainStyle.bgcfff, mainStyle.brt1e2]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mar10, { width: screenW * 0.24 }]}>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => { consult() }}>
              <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe610;</Text>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>咨询</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
              this.handleCollection(goodsInfo.id, '3', goodsInfo.is_collection)
            }}>
              <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                {
                  goodsInfo.is_collection == 0 ?
                    <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe65a;</Text>
                    :
                    <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.mab5]}>&#xe65b;</Text>
                }
                <Text style={[mainStyle.c333, mainStyle.fs12]}>{goodsInfo.is_collection == 0 ? '收藏' : '取消'}</Text>
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
                <Text style={[mainStyle.cfff, mainStyle.fs15]}>立即购买</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {showCartInfoDetails ?
          <View style={[styles.fixedinfo, mainStyle.bgcfff, mainStyle.column, mainStyle.jcBetween, mainStyle.pa15,
          {
            height: screenH * 0.55
          }
          ]}>
            <CartInfo
              data={goodsInfo}
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
          : null}

        {
          showCartInfoDetails ?
            <TouchableOpacity
              style={[
                styles.fixedzz,
                {
                  height: screenH
                }
              ]}
              onPress={() => {
                this.handleCloseCart()
              }}>
            </TouchableOpacity>
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

export default GoodsInfo