import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { Checkbox, TextareaItem } from '@ant-design/react-native';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {
  orderType: string,
  reason: Array<object>,
  inputHeight: number,
  showLoading: boolean
}

@inject('orderStore')
@observer
class ApplyRefund extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      orderType: '',
      showLoading: true
    };
  }


  componentDidMount() {
    let { navigation, orderStore } = this.props
    orderStore.getRefundExplain()
      .then(res => {
        this.setState({
          showLoading: false
        })
      })
  }

  render() {
    let { orderStore: { refundExplain, orderStatus }, navigation } = this.props;
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="退款说明"
          onPress={() => {
            navigation.goBack();
          }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1, mainStyle.bgcf7]}>
          <View style={[mainStyle.column, mainStyle.flex1, mainStyle.pa15]}>
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
              <View style={[mainStyle.patb15, mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>订单号</Text>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>{orderStatus.order_number}</Text>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>已支付课程取消说明：</Text>
                </View>
              </View>
              <View style={[mainStyle.palr15, mainStyle.column, mainStyle.patb15]}>
                {
                  refundExplain.reason.map((val, i) => <Text key={i} style={[mainStyle.fs13, mainStyle.c666, mainStyle.mab10, { lineHeight: setSize(32) }]}>{val.reason}</Text>)
                }
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
              <View style={[mainStyle.patb15, mainStyle.palr15, mainStyle.column]}>
                <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>您当前取消课程需要扣除手续费：</Text>
                  <View style={[mainStyle.row, mainStyle.aiCenter]}>
                    <Text style={[mainStyle.fs16, mainStyle.czt]}>-</Text>
                    <Text style={[mainStyle.fs12, mainStyle.czt]}>￥</Text>
                    <Text style={[mainStyle.fs16, mainStyle.czt]}>{refundExplain.price.service_charge}</Text>
                  </View>
                </View>
                <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.mat10]}>
                  <Text style={[mainStyle.icon, mainStyle.c999]}>&#xe659;</Text>
                    <Text style={[mainStyle.fs12, mainStyle.c999, mainStyle.mal5]}>手续费将在退款中扣除</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter]}>
          <BxButton
            color={mainStyle.czt.color}
            borderRadius={setSize(40)}
            disabled={false}
            title={'下一步'}
            btnstyle={[{ height: setSize(80), width: screenW - setSize(60) }]}
            textstyle={[mainStyle.fs14]}
            onClick={() => {
              navigation.replace('RefundReason')
            }}>
          </BxButton>
        </View>
      </View>
    )
  }
}


export default ApplyRefund