import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { Toast, ActivityIndicator } from "@ant-design/react-native";
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
    let { navigation: { state: { params } }, orderStore } = this.props
    orderStore.getOrderInfo(params.id)
      .then(res => {
        this.setState({
          showLoading: false
        })
      })
  }


  render() {
    let { showLoading } = this.state
    let { navigation, orderStore: { orderInfo } } = this.props
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
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>商品信息</Text>
                </View>
              </View>
              <View style={[mainStyle.pab15]}>
                {/* <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.pa15, mainStyle.brb1f2]}>
                  <Image
                    style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }, mainStyle.bgcf2]}
                    mode="widthFix"
                    source={{ uri: 'http://' + orderInfo.good_img }}>
                  </Image>
                  <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>{orderInfo.good_name}</Text>
                    <Text style={[mainStyle.c999, mainStyle.fs10, mainStyle.bgcf7, mainStyle.pa5_10, mainStyle.mab5, mainStyle.mat5]}>{orderInfo.sku_name}</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs10, mainStyle.lh42]}>￥<Text style={[mainStyle.fs14, mainStyle.fontsilm]}>{orderInfo.original_price}</Text></Text>
                  </View>
                </View> */}
                <TouchableOpacity onPress={() => {

                }}>
                  <View>
                    {orderInfo.type == 1 ? <OrderGoodsItem data={orderInfo}></OrderGoodsItem> : null}
                    {orderInfo.type == 2 ? <OrderCourseItem data={orderInfo}></OrderCourseItem> : null}
                  </View>
                </TouchableOpacity>
                <View style={[mainStyle.column, mainStyle.palr15]}>
                  <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>优惠价格</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{orderInfo.favorable_price}</Text>
                  </View>
                  <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>优惠金额</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs14]}>-￥{orderInfo.total_favorable}</Text>
                  </View>
                  <View style={[mainStyle.flex1, mainStyle.row, mainStyle.jcBetween, mainStyle.mat10]}>
                    <Text style={[mainStyle.c333, mainStyle.fs12]}>总金额</Text>
                    <Text style={[mainStyle.czt, mainStyle.fs14]}>￥{orderInfo.total_price}</Text>
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