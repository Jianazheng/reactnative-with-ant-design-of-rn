import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { ActivityIndicator } from "@ant-design/react-native";
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {

}

@inject('cartStore', 'paymentStore')
@observer
class WxPay extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  TOPAYSUCCESS: object;
  TOPAYFAIL: object;

  constructor(props: Props, state: State) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    let { navigation } = this.props
    this.TOPAYSUCCESS = DeviceEventEmitter.addListener('TOPAYSUCCESS', res => {
      navigation.replace('PaySuccess')
    })
    this.TOPAYFAIL = DeviceEventEmitter.addListener('TOPAYFAIL', res => {
      navigation.replace('Payfail')
    })
    this.setState({ showLoading: false })
  }

  componentWillUnmount() {
    this.TOPAYSUCCESS.remove()
    this.TOPAYFAIL.remove()
  }

  handleToPay() {
    let { paymentStore, paymentStore: { payStatus }, navigation } = this.props
    let { params } = navigation.state
    this.setState({ showLoading: true })
    paymentStore.WXPay(payStatus.order_type, payStatus.order_id)
      .then(res => {
        this.setState({ showLoading: false }, () => {
          navigation.replace('PaySuccess')
        })
      })
      .catch(err => {
        setTimeout(() => {
          navigation.replace('Payfail')
        }, 400);
      })
  }

  render() {
    let { showLoading } = this.state
    let { paymentStore: { payStatus } } = this.props
    console.log(payStatus)
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="订单支付"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ActivityIndicator
          animating={showLoading}
          toast
          size="large"
          text="正在提交..."
        />
        <View style={[mainStyle.bgcf7, mainStyle.column, mainStyle.flex1]}>
          <View style={[mainStyle.bgcfff, mainStyle.palr15]}>
            <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.pa30, mainStyle.mab20, mainStyle.mat20]}>
              <Text style={[mainStyle.cjin]}><Text style={[mainStyle.fs12]}>￥</Text><Text style={[{ fontSize: setSize(72) }]}>{payStatus.orderPrice}</Text></Text>
            </View>
            <View style={[mainStyle.bgcfff, mainStyle.column]}>
              <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter, mainStyle.brb1f2, mainStyle.brt1f2, mainStyle.h100]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>支付方式</Text>
              </View>
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
                <Text style={[mainStyle.czt, mainStyle.fs13]}>微信支付</Text>
                <RadioSelect></RadioSelect>
              </View>
            </View>
            <View style={[mainStyle.bgcfff, mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.brt1f2]}>
              <Text style={[mainStyle.c666, mainStyle.fs12]}>你可以在未支付订单中继续支付</Text>
            </View>
          </View>
        </View>
        <View style={[mainStyle.row, mainStyle.h120, mainStyle.aiCenter, mainStyle.jcCenter]}>
          <BxButton
            title={'确认支付'}
            colors={['#54FF9F', '#4EEE94']}
            borderRadius={setSize(6)}
            btnstyle={[{ width: screenW - setSize(60), height: setSize(80) }]}
            textstyle={[mainStyle.fs14]}
            onClick={() => {
              this.handleToPay()
            }}
          ></BxButton>
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

export default WxPay