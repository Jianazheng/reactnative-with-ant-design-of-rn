import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { mainStyle, screenH, setSize } from '../../public/style/style';
import NavTop from '../../router/navTop';
import BxTabView from '../../components/ScrollTabs/TabView';
import BxListView from '../../components/Pubilc/ListView';
import { OrderGoodsItem, OrderCourseItem } from '../../components/Course/CourseItem';
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

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      tabs: [{ title: '全部', type: 'all' }, { title: '未支付', type: 'unpay' }, { title: '已支付', type: 'pay' }, { title: '已取消', type: 'cancel' }],
      current: 0
    };
  }

  componentDidMount() {
    this.handleLoadOrder('all', true)
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
              this.handleTabChange(current)
            })
        }
      },
    ]);
  }

  render() {
    let { tabs } = this.state
    let { navigation, orderStore, orderStore: { orderListAll } } = this.props
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
          tabs={tabs}
          tabChange={(e) => {
            this.handleTabChange(e)
          }}
        >
          {
            Object.keys(orderListAll).map((val, i) => (
              <View key={i} style={[mainStyle.flex1]}>
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

class OrderItem extends React.Component<OrderItemState, OrderItemProps>{
  constructor(props: OrderItemProps) {
    super(props)
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  handleOrderCancel(id: string | number) {
    let { onCancel } = this.props;
    if (onCancel) onCancel(id)
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
          {data.status == 3 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>待发货</Text> : null}
          {data.status == 4 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>已发货</Text> : null}
          {data.status == 5 ? <Text style={[mainStyle.fs13, mainStyle.czt]}>售后</Text> : null}
          {data.status == 6 ? <Text style={[mainStyle.fs13, mainStyle.c999]}>已取消</Text> : null}
        </View>
        <View style={[mainStyle.bgcfff]}>
          <TouchableOpacity onPress={() => {
            this.goto('OrderDetail', { id: data.id })
          }}>
            <View>
              {data.type == 1 ? <OrderGoodsItem data={data}></OrderGoodsItem> : null}
              {data.type == 2 || data.type == 3 ? <OrderCourseItem data={data}></OrderCourseItem> : null}
            </View>
          </TouchableOpacity>
        </View>
        <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.brt1f2]}>
          <Text style={[mainStyle.lh44, mainStyle.mal15]}>
            <Text style={[mainStyle.fs13, mainStyle.c333]}>待支付金额：</Text>
            <Text style={[mainStyle.fs14, mainStyle.czt]}>￥{data.total_price}</Text>
          </Text>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.mar15]}>
            {
              data.status == 2
                ? <BxButton
                  title={'去支付'}
                  colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                  borderRadius={setSize(30)}
                  btnstyle={[mainStyle.h60, mainStyle.palr15]}
                  textstyle={[mainStyle.fs12]}
                  onClick={() => {
                    this.goto('Settlement', { type: 'pay' });
                  }}
                ></BxButton>
                : null
            }
            {
              data.status == 2
                ? <BxButton
                  title={'取消订单'}
                  colors={[mainStyle.cc2.color, mainStyle.c999.color]}
                  borderRadius={setSize(30)}
                  btnstyle={[mainStyle.h60, mainStyle.palr15, mainStyle.mal10]}
                  textstyle={[mainStyle.fs12]}
                  onClick={() => {
                    this.handleOrderCancel(data.id)
                  }}
                ></BxButton>
                : null
            }
            {
              data.status == 4 || data.status == 3
                ? <BxButton
                  title={'申请退款'}
                  colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                  borderRadius={setSize(30)}
                  btnstyle={[mainStyle.h60, mainStyle.palr15, mainStyle.mal10]}
                  textstyle={[mainStyle.fs12]}
                  onClick={() => {
                    this.goto('ApplyRefund', { type: 'pay' });
                  }}
                ></BxButton>
                : null
            }
          </View>
        </View>
      </View>
    )
  }
}


export default MyOrder