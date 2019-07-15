import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { Toast, ActivityIndicator, Modal } from "@ant-design/react-native";
import { headerTitle, headerRight } from '../../router/navigationBar';
import { OrderGoodsItem, OrderCourseItem } from '../../components/Course/CourseItem';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {
  orderType: string,
  showLoading: boolean
}

let imgw = setSize(180);

@inject('orderStore')
@observer
class OrderDetail extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      orderType: '',
      showLoading: true,
    };
  }

  componentDidMount() {
    this.getDetail()
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  getDetail() {
    let { navigation: { state: { params } }, orderStore } = this.props
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
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>订单号</Text>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.order_number}</Text>
                </View>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>创建时间</Text>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.create_time}</Text>
                </View>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>订单状态</Text>
                  {orderInfo.status == 1 ? <Text style={[mainStyle.fs12, mainStyle.c333]}>已完成</Text> : null}
                  {orderInfo.status == 2 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>待支付</Text> : null}
                  {orderInfo.status == 3 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>待发货</Text> : null}
                  {orderInfo.status == 4 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>已发货</Text> : null}
                  {orderInfo.status == 5 ? <Text style={[mainStyle.fs12, mainStyle.czt]}>售后</Text> : null}
                  {orderInfo.status == 6 ? <Text style={[mainStyle.fs12, mainStyle.c999]}>已取消</Text> : null}
                </View>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>支付单号</Text>
                  <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.pay_number}</Text>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
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
                    ? <OrderCourseItem
                      data={orderInfo}
                      onClick={() => this.goto('OnlineCourseInfo', { id: orderInfo.good_id })}
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

              }}
              handleCancel={() => {
                this.handleCancel(orderInfo.id)
              }}
            ></PayBar>
            : null
        }
        {
          orderInfo.status == 3 || orderInfo.status == 4
            ? <PayBar
              data={orderInfo}
              orderType='afterpay'
              handleRefund={() => {

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
  data: object
}

class PayBar extends React.Component<PayBarProps>{
  constructor(props: PayBarProps) {
    super(props)
  }
  render() {
    let { orderType, handlePayment, handleCancel, handleRefund, data } = this.props;
    switch (orderType) {
      case 'nopay':
        return (
          <View style={[mainStyle.h120, mainStyle.brt1e2, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.palr15]}>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.icon, mainStyle.fs18, mainStyle.lh42]}>&#xe639;</Text>
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
            </View>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <BxButton
                colors={[mainStyle.cc2.color, mainStyle.c999.color]}
                borderRadius={setSize(40)}
                disabled={false}
                title={'申请退款'}
                btnstyle={[mainStyle.mal10, mainStyle.bgcfff, { height: setSize(80), width: setSize(200) }]}
                textstyle={[mainStyle.fs14, mainStyle.czt]}
                onClick={() => { handleRefund() }}>
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