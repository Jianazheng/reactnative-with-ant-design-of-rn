import React from 'react';
import { Text, View, ScrollView, DeviceEventEmitter, StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { Toast, ActivityIndicator, Modal } from "@ant-design/react-native";
import { headerTitle, headerRight } from '../../router/navigationBar';
import { OrderGoodsItem, OrderCourseItem, OrderTrainItem } from '../../components/Course/CourseItem';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {
  orderType: string,
  showLoading: boolean
}

@inject('orderStore', 'paymentStore')
@observer
class OrderDetail extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }

  TORELOADORDER: object;//刷新订单详情

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      orderType: '',
      showLoading: true,
    };
  }

  componentDidMount() {
    this.getDetail()
    this.TORELOADORDER = DeviceEventEmitter.addListener('TORELOADORDER', res => {
      if (res == 'order-detail') {
        this.getDetail()
      }
    })
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('TORELOADORDERLIST', 'yes')
    this.TORELOADORDER.remove()
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  getDetail() {
    let { navigation: { state: { params } }, orderStore } = this.props
    this.setState({ showLoading: true })
    orderStore.getOrderInfo(params.id)
      .then(res => {
        this.setState({
          showLoading: false
        })
      })
  }

  handleCancel(id: number | string) {
    let { orderStore } = this.props
    Modal.alert('提示', '确认取消订单吗？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          orderStore.cancelOrder(id)
            .then(res => {
              this.getDetail()
            })
        }
      },
    ]);
  }

  handleToRefund() {
    let { orderStore, orderStore: { orderInfo }, navigation } = this.props
    orderStore.setOrderId(orderInfo)
      .then(res => {
        if (orderInfo.type == 2) {
          navigation.navigate('ApplyRefund')
        } else if (orderInfo.type == 1) {
          navigation.navigate('RefundReason')
        }
      })
  }

  handleToPay() {
    let { paymentStore, orderStore: { orderInfo }, navigation } = this.props
    paymentStore.setPayStatus({ order_type: orderInfo.order_type, order_id: orderInfo.id, orderPrice: orderInfo.total_price })
      .then(res => {
        navigation.navigate('WxPay', { from: 'order-detail' })
      })
  }

  handleCancelRefund() {
    let { orderStore, orderStore: { orderInfo } } = this.props
    Modal.alert('提示', '确认取消退款吗？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          orderStore.cancelRefund(orderInfo.id)
            .then(res => {
              this.getDetail()
            })
        }
      },
    ]);
  }

  handleSendBack() {
    let { navigation } = this.props
    navigation.navigate('SendBack')
  }

  render() {
    let { showLoading } = this.state
    let { navigation, orderStore: { orderInfo } } = this.props
    let address = orderInfo.status == 2 ? orderInfo.address ? JSON.parse(orderInfo.address) : {} : {}
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
          text="加载中..."
        />
        <ScrollView style={[mainStyle.flex1, mainStyle.bgcf7]}>
          <View style={[mainStyle.column, mainStyle.flex1, mainStyle.pa15]}>
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>订单信息</Text>
                </View>
              </View>
              <View style={[mainStyle.column, mainStyle.palr15, mainStyle.pab15]}>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>订单状态</Text>
                  {orderInfo.status == 1 ? <Text style={[mainStyle.fs12, mainStyle.c333]}>已完成</Text> : null}
                  {orderInfo.status == 2 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>待支付</Text> : null}
                  {orderInfo.status == 3 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>{orderInfo.type == 2 ? '待上课' : '待发货'}</Text> : null}
                  {orderInfo.status == 4 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>已发货</Text> : null}
                  {orderInfo.status == 5 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>售后</Text> : null}
                  {orderInfo.status == 6 ? <Text style={[mainStyle.fs12, mainStyle.c999]}>已取消</Text> : null}
                </View>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>订单号</Text>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.order_number}</Text>
                </View>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>创建时间</Text>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.create_time}</Text>
                </View>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>支付单号</Text>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.pay_number}</Text>
                </View>
              </View>
            </View>
            {
              orderInfo.status != 6 && orderInfo.type == 1
                ? <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
                  <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                    <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                      <Text style={[mainStyle.fs14, mainStyle.c333]}>收货信息</Text>
                    </View>
                  </View>
                  <View style={[mainStyle.column, mainStyle.palr15, mainStyle.pab15]}>
                    <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                      <Text style={[mainStyle.c333, mainStyle.fs12]}>收货人</Text>
                      <Text style={[mainStyle.c333, mainStyle.fs12]}>{address.consignee}</Text>
                    </View>
                    <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                      <Text style={[mainStyle.c333, mainStyle.fs12]}>收货电话</Text>
                      <Text style={[mainStyle.c333, mainStyle.fs12]}>{address.mobile}</Text>
                    </View>
                    <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                      <Text style={[mainStyle.c333, mainStyle.fs12]}>收货地址</Text>
                      <Text style={[mainStyle.c333, mainStyle.fs12]}>{address.region != null ? JSON.parse(address.region) : ''}{address.address}</Text>
                    </View>
                  </View>
                </View>
                : null
            }
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>商品信息</Text>
                </View>
              </View>
              <View style={[mainStyle.pab15]}>
                <View>
                  {orderInfo.type == 1
                    ? <OrderGoodsItem
                      data={orderInfo}
                      onClick={() => this.goto('GoodsInfo', { id: orderInfo.good_id })}
                    ></OrderGoodsItem>
                    : null}
                  {orderInfo.type == 2
                    ? <OrderTrainItem
                      data={orderInfo}
                      onClick={() => this.goto('TrainInfo', { id: orderInfo.good_id })}
                    ></OrderTrainItem>
                    : null}
                  {orderInfo.type == 3
                    ? <OrderCourseItem
                      data={orderInfo}
                      onClick={() => this.goto('CourseInfo', { id: orderInfo.good_id })}
                    ></OrderCourseItem>
                    : null}
                </View>
                <View style={[mainStyle.column, mainStyle.palr15]}>
                  <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>优惠价格</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs12]}>￥{orderInfo.favorable_price}</Text>
                  </View>
                  <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>优惠金额</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs12]}>-￥{orderInfo.total_favorable}</Text>
                  </View>
                  <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>总金额</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs12]}>￥{orderInfo.total_price}</Text>
                  </View>
                </View>
              </View>
            </View>
            <PayStatus data={orderInfo} orderType={orderInfo.status}></PayStatus>
          </View>
        </ScrollView>
        {
          orderInfo.status == 2
            ? <PayBar
              data={orderInfo}
              orderType='nopay'
              handlePayment={() => {
                this.handleToPay()
              }}
              handleCancel={() => {
                this.handleCancel(orderInfo.id)
              }}
            ></PayBar>
            : null
        }
        {
          (orderInfo.status == 3 || orderInfo.status == 4) && orderInfo.type != 3
            ? <PayBar
              data={orderInfo}
              orderType='afterpay'
              handleRefund={() => {
                this.handleToRefund()
              }}
            ></PayBar>
            : null
        }
        {
          orderInfo.status == 5 && orderInfo.type != 3
            ? <PayBar
              data={orderInfo}
              orderType='refund'
              handleSendBack={() => {
                this.handleSendBack()
              }}
              handleCancelRefund={() => {
                this.handleCancelRefund()
              }}
            ></PayBar>
            : null
        }
      </View>
    )
  }
}

interface PayStatusProps {
  orderType: string,
  data: object
}

class PayStatus extends React.Component<PayStatusProps>{
  constructor(props: PayStatusProps) {
    super(props)
  }
  render() {
    let { orderType, data } = this.props;
    switch (orderType) {
      case '1':
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
              </View>
            </View>
          </View>
        )
        break;
      case '2':
        return (
          <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
              <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>支付信息</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
              <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat15]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>待支付金额</Text>
                <Text style={[mainStyle.czt, mainStyle.fs12]}>
                  ￥
                  <Text style={[mainStyle.czt, mainStyle.fs18]}> {data.total_price}</Text>
                </Text>
              </View>
            </View>
          </View>
        )
        break;
      case '6':
        return <View></View>
        break;
      default:
        return (
          <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
              <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>支付信息</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
              <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat15]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>支付时间</Text>
                <Text style={[mainStyle.c333, mainStyle.fs14]}>{data.create_time}</Text>
              </View>
              <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat15]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>支付方式</Text>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>微信支付</Text>
              </View>
              <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat15]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]}>支付金额</Text>
                <Text style={[mainStyle.czt, mainStyle.fs12]}>
                  ￥
                    <Text style={[mainStyle.czt, mainStyle.fs18]}> {data.total_price}</Text>
                </Text>
              </View>
            </View>
          </View>
        )
        break;
    }
  }
}

interface PayBarProps extends PayStatusProps {
  handleCancel: () => void,
  handlePayment: () => void,
  handleRefund: () => void,
  handleCancelRefund: () => void,
  handleSendBack: () => void,
  data: object
}
//底部按钮栏
class PayBar extends React.Component<PayBarProps>{
  constructor(props: PayBarProps) {
    super(props)
  }
  render() {
    let { orderType, handlePayment, handleCancel, handleRefund, handleCancelRefund, data } = this.props;
    switch (orderType) {
      case 'nopay':
        return (
          <View style={[mainStyle.h120, mainStyle.brt1e2, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.palr15]}>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs16, mainStyle.lh42]}>&#xe639;</Text>
              <Text style={[mainStyle.fs12, mainStyle.c333, mainStyle.lh44, { marginLeft: setSize(10) }]}>有问题，咨询在线客服</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <BxButton
                colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                borderRadius={setSize(35)}
                disabled={false}
                title={'去支付'}
                btnstyle={[mainStyle.mal10, mainStyle.bgcfff, { height: setSize(70), width: setSize(170) }]}
                textstyle={[mainStyle.fs12, mainStyle.cfff]}
                onClick={() => { handlePayment() }}>
              </BxButton>
              <BxButton
                colors={[mainStyle.cc2.color, mainStyle.c999.color]}
                borderRadius={setSize(35)}
                disabled={false}
                title={'取消订单'}
                btnstyle={[mainStyle.mal10, mainStyle.bgcfff, { height: setSize(70), width: setSize(170) }]}
                textstyle={[mainStyle.fs12, mainStyle.cfff]}
                onClick={() => { handleCancel() }}>
              </BxButton>
            </View>
          </View>
        )
        break;
      case 'afterpay':
        return (
          <View style={[mainStyle.h120, mainStyle.brt1e2, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.palr15]}>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs16, mainStyle.lh42]}>&#xe639;</Text>
              <Text style={[mainStyle.fs12, mainStyle.c333, mainStyle.lh44, { marginLeft: setSize(10) }]}>有问题，咨询在线客服</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <BxButton
                colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                borderRadius={setSize(35)}
                disabled={false}
                title={'申请退款'}
                btnstyle={[mainStyle.mal10, mainStyle.bgcfff, { height: setSize(70), width: setSize(170) }]}
                textstyle={[mainStyle.fs12, mainStyle.cfff]}
                onClick={() => { handleRefund() }}>
              </BxButton>
            </View>
          </View>
        )
        break;
      case 'refund':
        return (
          <View style={[mainStyle.h120, mainStyle.brt1e2, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.palr15]}>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs16, mainStyle.lh42, mainStyle.mar10]}>&#xe659;</Text>
              {/* 退款状态 */}
              {data.refund.status == 1 ? <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42]}>已退款</Text> : null}
              {data.refund.status == 2 ? <Text style={[mainStyle.fs13, mainStyle.czt, mainStyle.lh42]}>退款订单审核中</Text> : null}
              {data.refund.status == 3 ? <Text style={[mainStyle.fs13, mainStyle.czt, mainStyle.lh42]}>审核成功，待回寄商品</Text> : null}
              {data.refund.status == 4 ? <Text style={[mainStyle.fs13, mainStyle.czt, mainStyle.lh42]}>待商家收货</Text> : null}
              {data.refund.status == 5 ? <Text style={[mainStyle.fs13, mainStyle.czt, mainStyle.lh42]}>待商家退款</Text> : null}
              {data.refund.status == 6 ? <Text style={[mainStyle.fs13, mainStyle.c999, mainStyle.lh42]}>已取消退款</Text> : null}
              {data.refund.status == 7 ? <Text style={[mainStyle.fs13, mainStyle.czt, mainStyle.lh42]}>拒绝退款</Text> : null}
            </View>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              {
                data.refund.status == 3
                  ? <BxButton
                    colors={[mainStyle.c999.color, mainStyle.cc2.color]}
                    borderRadius={setSize(35)}
                    disabled={false}
                    title={'回寄商品'}
                    btnstyle={[mainStyle.mal10, mainStyle.bgcfff, { height: setSize(70), width: setSize(170) }]}
                    textstyle={[mainStyle.fs12, mainStyle.cfff]}
                    onClick={() => { handleSendBack() }}>
                  </BxButton>
                  : null
              }
              <BxButton
                colors={[mainStyle.c999.color, mainStyle.cc2.color]}
                borderRadius={setSize(35)}
                disabled={false}
                title={'取消退款'}
                btnstyle={[mainStyle.mal10, mainStyle.bgcfff, { height: setSize(70), width: setSize(170) }]}
                textstyle={[mainStyle.fs12, mainStyle.cfff]}
                onClick={() => { handleCancelRefund() }}>
              </BxButton>
            </View>
          </View>
        )
        break;
      default:
        return <View></View>
        break;
    }
  }
}


export default OrderDetail