import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
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

  componentDidMount() {
    let { paymentStore } = this.props
    paymentStore.getOrderBook()
  }

  handleToOrder() {
    let { navigation, paymentStore: { payStatus } } = this.props
    navigation.navigate('MyOrder', { index: 2 })
  }

  render() {
    let { navigation, paymentStore } = this.props
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
          <View style={[mainStyle.column, mainStyle.bgcfff, mainStyle.mab15]}>
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
          </View>
          <View style={[mainStyle.column, mainStyle.bgcfff, mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2, mainStyle.patb15]}>
              <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter, mainStyle.palr15]}>
                <Text style={[mainStyle.fs14, mainStyle.c333]}>预定服务</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.column]}>
              <Text style={[mainStyle.c999, mainStyle.fs13, mainStyle.mat15]}>
                以下课程提供了预定服务，可在
                <Text style={[mainStyle.c666]}>【上课】</Text>
                中选择预定
              </Text>
              <View style={[]}>
                <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mat15]}>
                  <Image
                    style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }]}
                    mode="widthFix"
                    source={{ uri: 'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg' }}>
                  </Image>
                  <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
                    <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.flex1]}>高阶体式提升计划</Text>
                    <View style={[mainStyle.row, mainStyle.wrap, mainStyle.jcBetween, mainStyle.flex1, mainStyle.mat10]}>
                      <View style={[mainStyle.flex1]}>
                        <Checkbox
                          checked={this.state.checkBox1}
                          style={{ color: mainStyle.czt.color }}
                          onChange={event => {
                            this.setState({ checkBox1: event.target.checked });
                          }}>
                          <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>座位</Text>
                        </Checkbox>
                      </View>
                      <View style={[mainStyle.flex1]}>
                        <Checkbox
                          checked={this.state.checkBox1}
                          style={{ color: mainStyle.czt.color }}
                          onChange={event => {
                            this.setState({ checkBox1: event.target.checked });
                          }}>
                          <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>餐点</Text>
                        </Checkbox>
                      </View>
                    </View>
                    <View style={[mainStyle.row, mainStyle.wrap, mainStyle.jcBetween, mainStyle.flex1]}>
                      <View style={[mainStyle.flex1]}>
                        <Checkbox
                          checked={this.state.checkBox1}
                          style={{ color: mainStyle.czt.color }}
                          onChange={event => {
                            this.setState({ checkBox1: event.target.checked });
                          }}>
                          <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>座位</Text>
                        </Checkbox>
                      </View>
                      <View style={[mainStyle.flex1]}>
                        <Checkbox
                          checked={this.state.checkBox1}
                          style={{ color: mainStyle.czt.color }}
                          onChange={event => {
                            this.setState({ checkBox1: event.target.checked });
                          }}>
                          <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>餐点</Text>
                        </Checkbox>
                      </View>
                    </View>
                  </View>
                </View>
                <BxButton
                  title={'去预定'}
                  plain
                  color={mainStyle.czt.color}
                  btnstyle={[mainStyle.mat15, mainStyle.flex1,
                  {
                    borderWidth: setSize(1.2),
                    borderRadius: setSize(4),
                  }
                  ]}
                  textstyle={[mainStyle.czt, mainStyle.fs13]}
                  onClick={() => { }}
                ></BxButton>
              </View>
            </View>
          </View>
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