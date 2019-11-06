import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import BxButton from '../../components/Pubilc/Button';
import { Checkbox } from '@ant-design/react-native';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';


interface Props { }
interface State {

}

let imgw = setSize(180);

@inject('paymentStore')
@observer
class PaySuccess extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      checkBox1: false
    };
  }
  TORELOADTRAINORDERBOOK: object;

  componentDidMount() {
    let { paymentStore } = this.props
    paymentStore.getOrderBook()
    this.TORELOADTRAINORDERBOOK = DeviceEventEmitter.addListener('TORELOADTRAINORDERBOOK', res => {
      paymentStore.getOrderBook()
    })
  }
  componentWillUnmount() {
    this.TORELOADTRAINORDERBOOK.remove();
  }

  handleToOrder() {
    let { navigation, paymentStore: { payStatus } } = this.props
    DeviceEventEmitter.emit('TORELOADORDERLIST', 'yes');
    navigation.navigate('MyOrder', { index: 2 })
  }

  render() {
    let { navigation, paymentStore: { orderBook } } = this.props
    console.log(orderBook)
    return (
      <View style={[mainStyle.column, mainStyle.flex1]}>
        <NavTop
          navType="normal"
          title="支付成功"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1, mainStyle.column, mainStyle.bgcf7]}>
          <View style={[mainStyle.bgcfff, mainStyle.column, mainStyle.aiCenter, mainStyle.patb20, mainStyle.mab15]}>
            <Text style={[mainStyle.icon, mainStyle.czt, { fontSize: setSize(140) }]}>&#xe653;</Text>
            <Text style={[mainStyle.czt, mainStyle.fs13, mainStyle.mat10]}>支付成功</Text>
            <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcAround]}>
              <BxButton
                title={'返回首页'}
                colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                btnstyle={[mainStyle.mat15, mainStyle.mar15,
                {
                  borderRadius: setSize(4),
                  width: setSize(260)
                }
                ]}
                textstyle={[mainStyle.cfff, mainStyle.fs13]}
                onClick={() => {
                  navigation.popToTop()
                }}
              ></BxButton>
              <BxButton
                plain
                color={mainStyle.czt.color}
                title={'查看订单'}
                btnstyle={[mainStyle.mat15,
                {
                  borderWidth: setSize(1.2),
                  borderRadius: setSize(4),
                  width: setSize(260)
                }
                ]}
                textstyle={[mainStyle.czt, mainStyle.fs13]}
                onClick={() => {
                  this.handleToOrder()
                }}
              ></BxButton>
            </View>
          </View>
          {/* <View style={[mainStyle.column, mainStyle.bgcfff, mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2, mainStyle.patb15]}>
              <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter, mainStyle.palr15]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>特惠活动</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
              <Text style={[mainStyle.c999, mainStyle.fs13, mainStyle.mat15]}>
                以下是您的上课凭证，可在
                <Text style={[mainStyle.c666]}>【上课】</Text>
                中查看
              </Text>
              <View style={[mainStyle.row, mainStyle.mat15, mainStyle.aiCenter]}>
                <View style={[mainStyle.bgcc2, styles.coursePz]}></View>
                <View style={[mainStyle.bgcc2, styles.coursePz, mainStyle.mal15]}></View>
              </View>
            </View>
          </View> */}
          {
            orderBook.length > 0 ?
              <View style={[mainStyle.column, mainStyle.bgcfff, mainStyle.mab15]}>
                <View style={[mainStyle.brb1f2, mainStyle.patb15]}>
                  <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter, mainStyle.palr15]}>
                    <Text style={[mainStyle.fs14, mainStyle.c333]}>预定服务</Text>
                  </View>
                </View>
                <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
                  <Text style={[mainStyle.c999, mainStyle.fs13, mainStyle.mat15]}>
                    以下课程提供了预定服务，可在
                <Text style={[mainStyle.c333]}>【我的培训课】</Text>
                    中选择预定
              </Text>
                  <View style={[mainStyle.column]}>
                    {
                      orderBook.map((val, i) =>
                        <View key={i} style={[{ borderBottomColor: "#f7f7f7", borderBottomWidth: setSize(30) }]}>
                          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mat15]}>
                            <Image
                              style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }, mainStyle.bgcf2]}
                              mode="widthFix"
                              source={{ uri: 'http://' + val.image_url }}>
                            </Image>
                            <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
                              <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.flex1]}>{val.train_name}({val.sku_name})</Text>
                              <View style={[mainStyle.row, mainStyle.wrap, mainStyle.jcBetween, mainStyle.flex1, mainStyle.mat10]}>
                                {
                                  val.reserve.map((ser, index) =>
                                    <View key={index} style={[mainStyle.flex1, { width: screenW - setSize(90) - imgw }]}>
                                      {/* <Checkbox
                                        disabled
                                        checked={val.checked}
                                        style={{ color: mainStyle.czt.color }}> */}
                                      <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>{ser.server_name}</Text>
                                      {/* </Checkbox> */}
                                    </View>
                                  )
                                }
                              </View>
                            </View>
                          </View>
                          {
                            val.reserve.length > 0 ? <BxButton
                              title={'去预定'}
                              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                              btnstyle={[mainStyle.mat15, mainStyle.flex1,]}
                              borderRadius={setSize(4)}
                              textstyle={[mainStyle.cfff, mainStyle.fs13]}
                              onClick={() => {
                                navigation.navigate('OutlineCourseReserve', { id: val.my_course_id })
                              }}
                            ></BxButton> : null
                          }
                        </View>
                      )
                    }
                  </View>
                </View>
              </View> : null
          }
        </ScrollView>
      </View>
    )
  }
}

let pzw = (screenW - setSize(120)) / 3;

const styles = StyleSheet.create({
  coursePz: {
    height: pzw,
    width: pzw,
    borderRadius: setSize(6)
  }
})

export default PaySuccess