import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { mainStyle, screenH, setSize } from '../../public/style/style';
import NavTop from '../../router/navTop';
import BxTabView from '../../components/ScrollTabs/TabView';
import BxListView from '../../components/Pubilc/ListView';
import { OrderGoodsItem, OrderCourseItem, OrderTrainItem } from '../../components/Course/CourseItem';
import BxButton from './../../components/Pubilc/Button';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Modal } from '@ant-design/react-native';


interface Props { }
interface State {
  tabs: Array<object>
}

@inject('orderStore')
@observer
class MyOrder extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  TORELOADORDERLIST: object;

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      tabs: [{ title: '全部', type: 'all' }, { title: '未支付', type: 'unpay' }, { title: '已支付', type: 'pay' }, { title: '已取消', type: 'cancel' }],
      current: undefined
    };
  }

  componentDidMount() {
    let { tabs, current } = this.state
    let { navigation } = this.props
    let { params } = navigation.state
    let types = params.index ? tabs[params.index].type : 'all'
    this.setState({ current: params.index }, () => {
      this.handleLoadOrder(types, true)
    })
    this.TORELOADORDERLIST = DeviceEventEmitter.addListener('TORELOADORDERLIST', res => {
      //重新回到列表时刷新列表，防止状态未更新
      this.handleTabChange(current == undefined ? params.index == undefined ? 0 : params.index : params.index)
    })
  }

  componentWillUnmount() {
    this.TORELOADORDERLIST.remove()
  }

  handleLoadOrder(type: string, resize: boolean) {
    let { orderStore, navigation } = this.props
    orderStore.getOrderList(type, resize)
  }

  handleTabChange(index: number) {
    let { tabs } = this.state
    this.handleLoadOrder(tabs[index].type, true)
    this.setState({ current: index })
  }

  handleCancel(id: number | string) {
    let { orderStore } = this.props
    let { current } = this.state
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
              //刷新列表
              this.handleTabChange(current)
            })
        }
      },
    ]);
  }

  render() {
    let { tabs, current } = this.state
    let { navigation, orderStore: { orderListAll } } = this.props
    let { params } = navigation.state
    return (
      <View style={[mainStyle.column, mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="我的订单"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <BxTabView
          height={screenH - setSize(240)}
          canScroll={true}
          tabAlign={'center'}
          currentPageIndex={params.index}
          tabs={tabs}
          tabChange={(e) => {
            this.handleTabChange(e)
          }}
        >
          {
            Object.keys(orderListAll).map((val, i) => (
              <View key={i} style={[mainStyle.flex1, { height: screenH - setSize(240) }]}>
                <BxListView
                  pab={setSize(20)}
                  listData={orderListAll[val].data.slice()}
                  colNumber={1}
                  nomore={false}
                  loading={orderListAll[val].total == null || orderListAll[val].total > orderListAll[val].data.length}
                  onLoadmore={() => {
                    this.handleLoadOrder(val, false)
                  }}
                  listItem={({ item, index }) =>
                    <OrderItem
                      key={index}
                      navigation={this.props.navigation}
                      data={item}
                      onCancel={(e) => {
                        this.handleCancel(e)
                      }}
                    ></OrderItem>
                  }
                ></BxListView>
              </View>
            ))
          }
        </BxTabView>
      </View>
    )
  }
}

interface OrderItemState {

}

interface OrderItemProps {
  data: object,
  navigation: any,
  onCancel: (id: string | number) => void
}

@inject('paymentStore', 'orderStore')
@observer
class OrderItem extends React.Component<OrderItemState, OrderItemProps>{
  constructor(props: OrderItemProps) {
    super(props)
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  handleToCancel(id: string | number) {
    let { onCancel } = this.props;
    if (onCancel) onCancel(id)
  }

  handleToPay() {
    let { paymentStore, data, navigation } = this.props
    paymentStore.setPayStatus({ order_type: data.order_type, order_id: data.id, orderPrice: data.total_price })
      .then(res => {
        navigation.navigate('WxPay')
      })
  }

  handleToRefund() {
    let { orderStore, data, navigation } = this.props
    orderStore.setOrderId(data)
      .then(res => {
        if (data.type == 2) {
          navigation.navigate('ApplyRefund')
        } else if (data.type == 1) {
          navigation.navigate('RefundReason')
        }
      })
  }

  handleCancelRefund() {
    let { orderStore, data } = this.props
    Modal.alert('提示', '确认取消退款吗？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          orderStore.cancelRefund(data.id)
            .then(res => {
              console.log(res)
              DeviceEventEmitter.emit('TORELOADORDERLIST', 'yes')
            })
        }
      },
    ]);
  }

  handleToSendBack() {
    let { orderStore, navigation, data } = this.props
    orderStore.setOrderId(data)
      .then(res => {
        navigation.navigate('SendBack')
      })
  }

  render() {
    let { data } = this.props
    return (
      <View style={[mainStyle.column, mainStyle.mat15, mainStyle.bgcfff]}>
        <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h100, mainStyle.bgcf2, mainStyle.palr15]}>
          <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
            <Text style={[mainStyle.icon, mainStyle.c333]}>&#xe63d;</Text>
            <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>订单号：{data.order_number}</Text>
          </View>
          {data.status == 1 ? <Text style={[mainStyle.fs13, mainStyle.c333]}>已完成</Text> : null}
          {data.status == 2 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>待支付</Text> : null}
          {data.status == 3 && data.type == 2 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>待上课</Text> : null}
          {data.status == 3 && data.type != 2 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>待发货</Text> : null}
          {data.status == 4 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>已发货</Text> : null}
          {data.status == 5 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>售后</Text> : null}
          {data.status == 6 ? <Text style={[mainStyle.fs13, mainStyle.c999]}>已取消</Text> : null}
        </View>
        <View style={[mainStyle.bgcfff]}>
          <View>
            {data.type == 1
              ? <OrderGoodsItem
                data={data}
                onClick={() => this.goto('OrderDetail', { id: data.id })}
              ></OrderGoodsItem>
              : null}
            {data.type == 2
              ? <OrderTrainItem
                data={data}
                onClick={() => this.goto('OrderDetail', { id: data.id })}
              ></OrderTrainItem>
              : null}
            {data.type == 3
              ? <OrderCourseItem
                data={data}
                onClick={() => this.goto('OrderDetail', { id: data.id })}
              ></OrderCourseItem>
              : null}
          </View>
        </View>
        {data.status != 6
          ? <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.brt1f2]}>
            {
              data.status == 2
                ? <Text style={[mainStyle.lh44, mainStyle.mal15]}>
                  <Text style={[mainStyle.fs13, mainStyle.c333]}>待支付金额：</Text>
                  <Text style={[mainStyle.fs14, mainStyle.czt]}>￥{data.total_price}</Text>
                </Text>
                : <Text></Text>
            }
            {
              data.status == 5 && data.type != 3
                ? <View style={[mainStyle.mal15, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.flex1]}>
                  {/* 退款状态 */}
                  {data.refund.status == 1 ? <Text style={[mainStyle.fs13, mainStyle.c333]}>已退款</Text> : null}
                  {data.refund.status == 2 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>退款订单审核中</Text> : null}
                  {data.refund.status == 3 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>审核成功，待回寄商品</Text> : null}
                  {data.refund.status == 4 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>待商家收货</Text> : null}
                  {data.refund.status == 5 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>待商家退款</Text> : null}
                  {data.refund.status == 6 ? <Text style={[mainStyle.fs13, mainStyle.c999]}>已取消退款</Text> : null}
                  {data.refund.status == 7 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>拒绝退款</Text> : null}
                </View>
                : <Text></Text>
            }
            <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.mar15]}>
              {
                //未支付
                data.status == 2
                  ? <BxButton
                    title={'去支付'}
                    colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                    borderRadius={setSize(30)}
                    btnstyle={[mainStyle.h60, mainStyle.palr15]}
                    textstyle={[mainStyle.fs12]}
                    onClick={() => {
                      this.handleToPay()
                    }}
                  ></BxButton>
                  : null
              }
              {
                //未支付
                data.status == 2
                  ? <BxButton
                    title={'取消订单'}
                    colors={[mainStyle.cc2.color, mainStyle.c999.color]}
                    borderRadius={setSize(30)}
                    btnstyle={[mainStyle.h60, mainStyle.palr15, mainStyle.mal10]}
                    textstyle={[mainStyle.fs12]}
                    onClick={() => {
                      this.handleToCancel(data.id)
                    }}
                  ></BxButton>
                  : null
              }
              {
                //已支付，已发货与未发货
                (data.status == 4 || data.status == 3) && data.type != 3
                  ? <BxButton
                    title={'申请退款'}
                    colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                    borderRadius={setSize(30)}
                    btnstyle={[mainStyle.h60, mainStyle.palr15, mainStyle.mal10]}
                    textstyle={[mainStyle.fs12]}
                    onClick={() => {
                      this.handleToRefund()
                    }}
                  ></BxButton>
                  : null
              }
              {
                //已支付，退款审核中
                data.status == 5 && data.type != 3
                  ? <View>
                    {
                      data.refund.status == 3
                        ? <BxButton
                          title={'回寄商品'}
                          colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                          borderRadius={setSize(30)}
                          btnstyle={[mainStyle.h60, mainStyle.palr15, mainStyle.mal10]}
                          textstyle={[mainStyle.fs12]}
                          onClick={() => {
                            this.handleToSendBack()
                          }}
                        ></BxButton>
                        : null
                    }
                    {
                      data.refund.status == 2
                        ? <BxButton
                          title={'取消退款'}
                          colors={[mainStyle.c999.color, mainStyle.cc2.color]}
                          borderRadius={setSize(30)}
                          btnstyle={[mainStyle.h60, mainStyle.palr15, mainStyle.mal10]}
                          textstyle={[mainStyle.fs12]}
                          onClick={() => {
                            this.handleCancelRefund()
                          }}
                        ></BxButton>
                        : null
                    }
                  </View>
                  : null
              }
            </View>
          </View>
          : null
        }
      </View>
    )
  }
}


export default MyOrder