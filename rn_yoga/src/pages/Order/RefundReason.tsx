import React from 'react';
import { Text, View, ScrollView, DeviceEventEmitter, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { Checkbox, ActivityIndicator, Toast, Modal } from '@ant-design/react-native';
import { inject, observer } from 'mobx-react';

interface Props { }
interface State {
  orderType: string,
  reasons: Array<object>,
  other: string,
  showLoading: boolean
}

@inject('orderStore')
@observer
class RefundReason extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      orderType: '',
      reasons: [],
      other: '',
      showLoading: true
    };
  }


  componentDidMount() {
    let { navigation, orderStore } = this.props
    orderStore.getOrderReason()
      .then(res => {
        this.setState({
          reasons: res,
          showLoading: false
        })
      })
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('TORELOADORDERLIST', 'yes')
    DeviceEventEmitter.emit('TORELOADORDER', 'order-detail')
  }

  selectReason(index: number) {
    let { reasons } = this.state;
    let newReason = reasons;
    newReason[index].checked = !newReason[index].checked;
    this.setState({
      reasons: newReason,
    })
  }

  handleSubmit() {
    this.setState({ showLoading: true })
    let { reasons, other } = this.state
    let { orderStore, navigation } = this.props
    let reasonStr = ''
    reasons.map((val, i) => {
      if (val.checked) {
        reasonStr += val.reason + '，'
      }
    })
    reasonStr += other
    if (reasonStr == '') {
      Toast.info('请输入退款原因', 1.4, undefined, false)
      this.setState({ showLoading: false })
      return false
    }
    Modal.alert('确认申请退款', '申请退款审核通过后，会于1-3个工作日内将退款金额返回至您的微信账号', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          orderStore.submitRefund(reasonStr)
            .then(res => {
              this.setState({
                showLoading: false
              }, () => {
                DeviceEventEmitter.emit('TORELOADORDERLIST', 'yes')
                navigation.goBack()
              })
            }).catch(err => {
              this.setState({ showLoading: false })
            })
        }
      },
    ]);
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  render() {
    let { reasons, showLoading } = this.state;
    let { orderStore: { orderStatus }, navigation } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="取消订单"
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
                  <Text style={[mainStyle.fs14, mainStyle.c333]}>请选择取消订单原因</Text>
                </View>
              </View>
              <View style={[mainStyle.palr15, mainStyle.column, mainStyle.mat15]}>
                {
                  reasons.map((val, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[mainStyle.mab10,mainStyle.flex1]}
                      onPress={event => {
                        this.selectReason(i)
                      }}>
                      <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.positonre]}>
                        <Text style={[mainStyle.fs13, val.checked ? mainStyle.czt : mainStyle.c999]}>{val.reason}</Text>
                        <Checkbox
                        onChange={event => {
                          console.log(event)
                          this.selectReason(i)
                        }}
                          checked={val.checked}
                          style={[{ color: val.checked ? mainStyle.czt.color : mainStyle.c999.color }, styles.checkbox]}
                        >
                        </Checkbox>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
                <Text style={[mainStyle.fs13, mainStyle.c333]}>其他</Text>
                <View style={[
                  mainStyle.mat10,
                  {
                    height: setSize(240),
                    borderRadius: setSize(2),
                    borderWidth: setSize(2),
                    borderColor: mainStyle.c999.color,
                    padding: setSize(10)
                  }
                ]}>
                  <TextInput
                    placeholder={'请输入原因'}
                    multiline
                    style={[
                      mainStyle.fs13,
                      {
                        maxHeight: setSize(240),
                        minWidth: setSize(440),
                        paddingVertical: 0,
                      }
                    ]}
                    onChangeText={(other) => {
                      this.setState({ other })
                    }}
                  ></TextInput>
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
            title={'确认退款'}
            btnstyle={[{ height: setSize(80), width: screenW - setSize(60) }]}
            textstyle={[mainStyle.fs14]}
            onClick={() => {
              this.handleSubmit()
            }}>
          </BxButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkbox: {
    position: 'absolute',
    right: 0,
    zIndex: 1
  }
})

export default RefundReason