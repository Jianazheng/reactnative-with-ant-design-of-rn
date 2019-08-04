import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, DeviceEventEmitter, TextInput } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { Toast, Modal, ActivityIndicator } from '@ant-design/react-native';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {
  express_company: string,
  express_number: string,
  showLoading: boolean
}

@inject('orderStore')
@observer
class SendBack extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      express_number: '',
      express_company: '',
      showLoading: false
    };
  }


  componentDidMount() {

  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('TORELOADORDERLIST', 'yes')
    DeviceEventEmitter.emit('TORELOADORDER', 'order-detail')
  }

  handleSendBack() {
    this.setState({ showLoading: true })
    let { express_number, express_company } = this.state
    let { orderStore, navigation } = this.props
    if (express_number == '' || express_company == '') {
      Toast.info('请输入物流信息', 1.4, undefined, false)
      this.setState({ showLoading: false })
      return false
    }
    Modal.alert('提示', '是否确认回寄物流信息？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          orderStore.submitSendBack({ express_number, express_company })
            .then(res => {
              this.setState({
                showLoading: false
              }, () => {
                navigation.goBack()
              })
            }).catch(err => {
              this.setState({ showLoading: false })
            })
        }
      },
    ]);
  }

  render() {
    let { showLoading } = this.state
    let { orderStore: { orderStatus }, navigation } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="回寄商品"
          onPress={() => {
            navigation.goBack();
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
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>填写物流信息</Text>
                </View>
              </View>
              <View style={[mainStyle.palr15, mainStyle.column, mainStyle.mat15]}>
                <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.brb1f2]}>
                  <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.flex1]}>物流单号</Text>
                  <TextInput
                    style={[mainStyle.flex3]}
                    placeholder={'请输入物流单号'}
                    onChangeText={(express_number) => {
                      this.setState({ express_number })
                    }}
                  ></TextInput>
                </View>
                <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100]}>
                  <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.flex1]}>物流公司</Text>
                  <TextInput
                    style={[mainStyle.flex3]}
                    placeholder={'请输入物流公司'}
                    onChangeText={(express_company) => {
                      this.setState({ express_company })
                    }}
                  ></TextInput>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter]}>
          <BxButton
            colors={[mainStyle.czt.color, mainStyle.cztc.color]}
            borderRadius={setSize(40)}
            disabled={false}
            title={'确认回寄'}
            btnstyle={[{ height: setSize(80), width: screenW - setSize(60) }]}
            textstyle={[mainStyle.fs14]}
            onClick={() => {
              this.handleSendBack()
            }}>
          </BxButton>
        </View>
      </View>
    )
  }
}


export default SendBack