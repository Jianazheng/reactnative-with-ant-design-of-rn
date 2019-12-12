import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { Toast, ActivityIndicator } from "@ant-design/react-native";
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxRadio from '../../components/Pubilc/Radio';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import { DeviceEventEmitter } from 'react-native';
import InputNumber from '../../components/Pubilc/InputNumber';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
interface Props { }
interface State {
  showLoading: boolean
}

let imgw = setSize(180);

@inject('cartStore', 'addressStore', 'paymentStore')
@observer
class Settlement extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }

  TORELOADCARTDATA: object;

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      showLoading: true,
    };
  }

  componentDidMount() {
    let { navigation, cartStore } = this.props
    let { params } = navigation.state
    this.setState({
      showLoading: false,
    })
    this.TORELOADCARTDATA = DeviceEventEmitter.addListener('TORELOADCARTDATA', async res => {
      if (params.from != 'fastbuy') {
        await cartStore.settlement()
      }
    })
  }

  componentWillUnmount() {
    this.TORELOADCARTDATA.remove()
  }

  handleGoTo(type: number | string, id: string | number) {
    let { navigation } = this.props
    switch (type) {
      case 1:
        navigation.navigate('GoodsInfo', { id })
        break;
      case 2:
        navigation.navigate('TrainInfo', { id })
        break;
      case 3:
        navigation.navigate('CourseInfo', { id })
        break;
    }
  }

  handleCreateOrder() {
    let { navigation, cartStore, cartStore: { settlementInfo }, paymentStore, addressStore: { addressSelect } } = this.props
    let { params } = navigation.state
    let selectData = cartStore.selectData;
    let order_type = 1
    if (!addressSelect.id && (params.type == 1 || params.type == undefined)) {
      Toast.info('请添加收货地址', 1.4, undefined, false)
      return false
    }
    this.setState({ showLoading: true })
    if (params.from == 'fastbuy') {
      //快速购买，提交订单
      cartStore.fastbuyOrder(addressSelect.id)
        .then(res => {
          //保存支付参数
          paymentStore.setPayStatus({ order_type: order_type, order_id: res.order_id, orderPrice: params.type == 1 && settlementInfo.pStatusArray.length == 1 ? settlementInfo.pStatusArray[0].original_price * selectData.count : settlementInfo.orderPrice })
          this.setState({ showLoading: false }, () => {
            navigation.replace('WxPay', { type: order_type, product_type: params.type })
          })
        }).catch(err => {
          this.setState({ showLoading: false })
        })
    } else {
      //购物车结算，提交订单
      cartStore.createOrder(addressSelect.id)
        .then(res => {
          //保存支付参数
          paymentStore.setPayStatus({ order_type: order_type, order_id: res.order_id, orderPrice: settlementInfo.orderPrice })
          //刷新购物车
          cartStore.getCartList()
            .then(cartlistSuccess => {
              this.setState({ showLoading: false }, () => {
                navigation.replace('WxPay', { type: order_type })
              })
            })
            .catch(cartlistFail => {
              this.setState({ showLoading: false })
            })
        })
        .catch(err => {
          this.setState({ showLoading: false })
        })
    }
  }
  changenum(e: number) {
    let { navigation, cartStore } = this.props;
    let selectData = cartStore.selectData;
    let settlementInfo = cartStore.settlementInfo;
    let { params } = navigation.state
    selectData.count = e;
    if (params.type == 1 && settlementInfo.pStatusArray.length == 1) {
      settlementInfo.pStatusArray[0].count = e;
    }
    cartStore.selectItem(selectData);
  }
  render() {
    let { showLoading } = this.state
    let { navigation, cartStore: { settlementInfo }, addressStore: { addressSelect } } = this.props
    let { params } = navigation.state
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="订单详情"
          onPress={() => {
            navigation.goBack()
          }}
        ></NavTop>
        <ActivityIndicator
          animating={showLoading}
          toast
          size="large"
          text="正在提交..."
        />
        <KeyboardAwareScrollView style={[mainStyle.flex1, mainStyle.bgcf7]}>
          <View style={[mainStyle.column, mainStyle.flex1, mainStyle.pa15]}>
            {
              params.type == 1 || params.type == undefined || settlementInfo.isProduct == 1
                ? <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10), overflow: 'hidden' }, mainStyle.mab15]}>
                  <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                    <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                      <Text style={[mainStyle.fs14, mainStyle.c333]}>选择地址</Text>
                    </View>
                  </View>
                  {addressSelect.region ?
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Address', { type: 'select' })
                    }}>
                      <View style={[mainStyle.row, mainStyle.pa15, mainStyle.aiCenter, mainStyle.jcBetween]}>
                        <View style={[mainStyle.column, mainStyle.flex1, mainStyle.mar15]}>
                          <Text style={[mainStyle.fs14, mainStyle.c333, mainStyle.mab5, { lineHeight: setSize(30) }]} numberOfLines={3}>{addressSelect.region.join('')}{addressSelect.address}</Text>
                          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
                            <Text style={[mainStyle.fs13, mainStyle.c333]}>{addressSelect.mobile}</Text>
                            <Text style={[mainStyle.fs13, mainStyle.c333]}>{addressSelect.consignee}</Text>
                          </View>
                        </View>
                        <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs22]}>&#xe64d;</Text>
                      </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Address', { type: 'select' })
                    }}>
                      <View style={[mainStyle.row, mainStyle.pa15, mainStyle.aiCenter, mainStyle.jcBetween]}>
                        <View style={[mainStyle.column, mainStyle.flex1, mainStyle.mar15, mainStyle.mat5]}>
                          <Text style={[mainStyle.fs14, mainStyle.c333, mainStyle.mab5]}>请添加收货地址</Text>
                        </View>
                        <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs22]}>&#xe64d;</Text>
                      </View>
                    </TouchableOpacity>
                  }
                  <Image style={[{ width: screenW - setSize(60) }, mainStyle.imgContain]} source={require('../../../images/addressbg.png')}></Image>
                </View>
                : null
            }
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>商品信息</Text>
                </View>
              </View>
              {
                settlementInfo.pStatusArray.map((val, i) => (
                  <View key={i} style={[mainStyle.pab15, i < settlementInfo.pStatusArray.length - 1 ? mainStyle.brb1f2 : null]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleGoTo(val.type, val.good_id)
                      }}
                    >
                      <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.pa15, mainStyle.brb1f2]}>
                        <Image
                          style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }, mainStyle.bgcf2]}
                          mode="widthFix"
                          source={{ uri: 'http://' + val.good_img }}>
                        </Image>
                        <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
                          <Text style={[mainStyle.c333, mainStyle.fs12]}>{val.good_name}</Text>
                          {val.sku_name ? <Text style={[mainStyle.c999, mainStyle.fs10, mainStyle.bgcf7, mainStyle.pa5_10, mainStyle.mab5, mainStyle.mat5]}>{val.sku_name}</Text> : null}
                          <Text style={[mainStyle.czt, mainStyle.fs10, mainStyle.lh42]}>￥<Text style={[mainStyle.fs14, mainStyle.fontsilm]}>{val.original_price}</Text></Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={[mainStyle.column, mainStyle.palr15]}>
                      <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat15]}>
                        <Text style={[mainStyle.c333, mainStyle.fs12]}>
                          {val.type == 1 ? '商品数量' : '课程数量'}
                        </Text>
                        {val.type == 1 && params.type != 'pay' ? <InputNumber value={val.count} max={val.product_stock} onChange={(v) => { this.changenum(v) }}></InputNumber> :
                          <Text style={[mainStyle.c333, mainStyle.fs14]}>{val.count}</Text>}
                      </View>
                      {
                        val.type == 2
                          ? <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                            <Text style={[mainStyle.c333, mainStyle.fs12]}>优惠价格</Text>
                            <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{val.favorable_price}</Text>
                          </View>
                          : null
                      }
                      {
                        val.type == 2
                          ? <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                            <Text style={[mainStyle.c333, mainStyle.fs12]}>优惠金额</Text>
                            <Text style={[mainStyle.czt, mainStyle.fs14]}>-￥{val.total_favorable}</Text>
                          </View>
                          : null
                      }
                      <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                        <Text style={[mainStyle.c333, mainStyle.fs12]}>总金额</Text>
                        <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{val.type == 1 && params.type != 'pay' ? (val.original_price * val.count).toFixed(2) : val.totalPrice}</Text>
                      </View>
                    </View>
                  </View>
                ))
              }
            </View>
            <PayStatus data={settlementInfo}></PayStatus>
          </View>
        </KeyboardAwareScrollView>

        <PayBar
          data={settlementInfo}
          type={params.type}
          handlePayment={() => {
            this.handleCreateOrder()
          }}
        ></PayBar>

      </View>
    )
  }
}

interface PayStatusProps {
  data: object
}

class PayStatus extends React.Component<PayStatusProps>{
  constructor(props: PayStatusProps) {
    super(props)
  }
  render() {
    return (
      <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
        <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
          <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs14, mainStyle.c333]}>支付方式</Text>
          </View>
        </View>
        <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
          <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat15]}>
            <Text style={[mainStyle.c333, mainStyle.fs12]}>微信支付</Text>
            <RadioSelect></RadioSelect>
          </View>
        </View>
      </View>
    )
  }
}

interface PayBarProps extends PayStatusProps {
  handlePayment: () => void,
  data: object
}

class PayBar extends React.Component<PayBarProps>{
  constructor(props: PayBarProps) {
    super(props)
  }
  render() {
    let { handlePayment, data, type } = this.props;
    return (
      <View style={[mainStyle.h120, mainStyle.brt1e2, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.palr15]}>
        <View style={[mainStyle.row, mainStyle.aiCenter]}>
          <Text style={[mainStyle.fs12, mainStyle.lh42, mainStyle.c333]}>
            合计：
            <Text style={[mainStyle.czt]}>￥</Text>
            <Text style={[mainStyle.czt, mainStyle.fs18]}>{type == 1 && type != 'pay' ? (data.pStatusArray[0].original_price * data.pStatusArray[0].count).toFixed(2) : data.orderPrice}</Text>
          </Text>
        </View>
        <View style={[mainStyle.row, mainStyle.aiCenter]}>
          <BxButton
            colors={[mainStyle.czt.color, mainStyle.cztc.color]}
            borderRadius={setSize(40)}
            disabled={false}
            title={'去支付'}
            btnstyle={[mainStyle.mal15, { height: setSize(80), width: setSize(220) }]}
            textstyle={[mainStyle.fs14]}
            onClick={() => { handlePayment() }}>
          </BxButton>
        </View>
      </View>
    )
  }
}

class RadioSelect extends React.PureComponent {
  render() {
    return (
      <View style={[mainStyle.bgcfff, mainStyle.aiCenter, mainStyle.jcCenter,
      {
        borderColor: mainStyle.czt.color,
        borderRadius: setSize(40),
        borderWidth: setSize(2),
        height: setSize(42),
        width: setSize(42)
      }
      ]}>
        <Text style={[mainStyle.bgczt,
        {
          borderRadius: setSize(40),
          height: setSize(22),
          width: setSize(22)
        }
        ]}></Text>
      </View>
    )
  }
}

export default Settlement