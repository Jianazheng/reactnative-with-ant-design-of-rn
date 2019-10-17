import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl, DeviceEventEmitter } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react';
import { Toast } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";


interface Props { }

const defaultIcon = require('../../../images/defaultIcon.png')

@inject('userStore', 'orderStore')
@observer
class Mine extends React.Component<Props> {
  static navigationOptions = {
    tabBarLabel: '个人中心',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_user_sel.png')}></Image>
        );
      }
      return (
        <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_user_nor.png')}></Image>
      );
    },
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }
  TORELOADMINE: object;
  TORELOADCARTNUM: object;
  componentDidMount() {
    let { userStore, orderStore, navigation } = this.props
    console.log(navigation);
    userStore.GetUserInfo()
    orderStore.getOrderNumber()
    userStore.GetCartNum();
    this.TORELOADMINE = DeviceEventEmitter.addListener('TORELOADMINE', res => {
      userStore.GetUserInfo()
      orderStore.getOrderNumber()
      userStore.GetCartNum();

    })
    this.TORELOADCARTNUM = DeviceEventEmitter.addListener('TORELOADCARTNUM', res => {
      userStore.GetCartNum();
    })
  }
  componentWillUnmount() {
    this.TORELOADMINE.remove();
    this.TORELOADCARTNUM.remove();
  }
  goto(routeName: string, params: any) {
    let { userStore, navigation } = this.props;
    if (userStore.token == '') {
      Toast.info('请登录', 1.8);
      navigation.navigate('Login', { from: 'Mine' });
    } else {
      navigation.navigate(routeName, params);
    }
  }

  async handleLoginout() {
    let { userStore, navigation } = this.props;
    await userStore.Loginout();
    DeviceEventEmitter.emit('TORELOADMINE', 'yes');
    navigation.navigate('Login', { from: 'Mine' });
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    }, () => {
      let { userStore, orderStore } = this.props
      userStore.GetUserInfo()
      userStore.GetCartNum();
      orderStore.getOrderNumber()
        .then(res => {
          this.setState({
            refreshing: false
          })
        })
    })
  }

  render() {
    let { userStore: { userInfo, cartNum }, orderStore: { orderNumber } } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <ScrollView
          style={[mainStyle.flex1, mainStyle.positonre]}
          refreshControl={(
            <RefreshControl
              tintColor={mainStyle.czt.color}
              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          )}
        >
          <View style={[mainStyle.flex1, mainStyle.positonre]}>
            <View style={[styles.userbg]}>
              <LinearGradient
                colors={['#FF6243', '#FF2043']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[mainStyle.flex1]}
              >
              </LinearGradient>
            </View>
            <View style={[styles.userinfo, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
              <TouchableOpacity onPressIn={() => { this.goto('UserInfo', {}) }}>
                <Image style={[mainStyle.useravator]} source={userInfo.avatar ? { uri: userInfo.avatar } : defaultIcon}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter]} onPressIn={() => { this.goto('UserInfo', {}) }}>
                <View style={[mainStyle.column, mainStyle.flex1, mainStyle.palr10, mainStyle.aiStart]}>
                  <Text style={[mainStyle.cfff, mainStyle.fs16]}>{userInfo.username == '' ? '请登录' : userInfo.username}</Text>
                  {userInfo.level_name
                    ? <Text style={[mainStyle.cfff, mainStyle.fs13, mainStyle.mat5,
                    {
                      borderColor: '#fff',
                      borderWidth: setSize(1),
                      paddingLeft: setSize(12),
                      paddingRight: setSize(12),
                      borderRadius: setSize(14),
                    }
                    ]}
                    >{userInfo.level_name != '' ? userInfo.level_name : '登录后查看'}</Text>
                    : null}
                </View>
              </TouchableOpacity>
              <View style={[mainStyle.column, mainStyle.aiEnd, mainStyle.mal20]}>
                <TouchableOpacity
                  onPress={() => {
                    this.goto('NotiveList', {})
                  }}
                >
                  <IconOutline name="sound" size={20} color={[mainStyle.cfff.color]}></IconOutline>
                  {/* <Text style={[mainStyle.icon, mainStyle.fs24, mainStyle.cfff, mainStyle.patb15]}>&#xe616;</Text> */}
                </TouchableOpacity>
                {/* <Text style={[mainStyle.lh44,mainStyle.mat10]}>
                  <Text style={[mainStyle.icon,mainStyle.fs16,mainStyle.cfff]}>&#xe638;</Text>
                  <Text style={[mainStyle.icon,mainStyle.fs14,mainStyle.cfff]}> 4300分</Text>
                </Text> */}
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.palr15, { top: -screenW * 0.08 }]}>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
                <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                  <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                    <Text style={[mainStyle.fs14, mainStyle.c333]}>订单信息</Text>
                  </View>
                </View>
                <View style={[mainStyle.palr15, mainStyle.mab15, mainStyle.row]}>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('MyOrder', { index: 0 })
                    }}
                  >
                    <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                      {/* {orderNumber.all ? <Text style={[styles.point, mainStyle.bgczt, mainStyle.fs11, mainStyle.cfff]}>{orderNumber.all}</Text> : null} */}
                      <Image source={require('../../../images/allo.png')} style={[styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>全部</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('MyOrder', { index: 1 })
                    }}
                  >
                    <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                      {orderNumber.notPay ? <Text style={[styles.point, styles.tag, mainStyle.bgczt, mainStyle.fs11, mainStyle.cfff]}>{orderNumber.notPay}</Text> : null}
                      <Image source={require('../../../images/pxo.png')} style={[styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>未支付</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('MyOrder', { index: 2 })
                    }}
                  >
                    <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                      {orderNumber.pay ? <Text style={[styles.point, styles.tag, mainStyle.bgczt, mainStyle.fs11, mainStyle.cfff]}>{orderNumber.pay}</Text> : null}
                      <Image source={require('../../../images/kco.png')} style={[styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>已支付</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('MyOrder', { index: 3 })
                    }}
                  >
                    <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                      {/* {orderNumber.cancel ? <Text style={[styles.point, mainStyle.bgczt, mainStyle.fs11, mainStyle.cfff]}>{orderNumber.cancel}</Text> : null} */}
                      <Image source={require('../../../images/spo.png')} style={[styles.orderImg]}></Image>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>已取消</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
                <View style={[mainStyle.column]}>
                  {/* <TouchableOpacity
                    style={[mainStyle.flex1, mainStyle.brb1f2]}
                    onPress={() => {
                      this.goto('Info', {})
                    }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/collect.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>完善信息</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={[mainStyle.flex1, mainStyle.brb1f2]}
                    onPress={() => {
                      this.goto('MyCollect', {})
                    }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/collect.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>我的收藏</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[mainStyle.flex1, mainStyle.brb1f2]}
                    onPress={() => {
                      this.goto('MyCertificate', {})
                    }}
                  >
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/cert.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>我的证书</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[mainStyle.flex1, mainStyle.brb1f2]}
                    onPress={() => {
                      this.goto('MyLevel', {})
                    }}
                  >
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/member.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>我的会员</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('CartList', {})
                    }}
                  >
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/cart.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>我的购物车</Text>
                      </View>
                      <Text style={[styles.tag, mainStyle.bgczt, mainStyle.fs11, mainStyle.cfff, { marginTop: setSize(4) }]}>{cartNum}</Text>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
                <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
                  <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
                    <Text style={[mainStyle.fs14, mainStyle.c333]}>我的账户</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                  <TouchableOpacity style={[mainStyle.flex1, mainStyle.brb1f2]} onPress={() => {
                    this.goto('Address', { type: 'check' })
                  }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[{ height: setSize(48), width: setSize(48), left: -setSize(1) }]} source={require('../../../images/address.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>地址管理</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1, mainStyle.brb1f2]} onPress={() => {
                    //this.props.navigation.navigate('Forget')
                    this.goto('Forget', {})
                  }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/password.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>密码修改</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
                    this.handleLoginout()
                  }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Image style={[mainStyle.userimg]} source={require('../../../images/logout.png')}></Image>
                        <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.mal10]}>退出登录</Text>
                      </View>
                      <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs26]}>&#xe64d;</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userbg: {
    width: screenW * 1.2,
    left: -screenW * 0.1,
    borderBottomLeftRadius: setSize(160),
    borderBottomRightRadius: setSize(160),
    overflow: 'hidden',
    top: 0,
    height: screenW * 0.4,
  },
  userinfo: {
    height: screenH * 0.15,
    borderTopLeftRadius: setSize(10),
    borderTopRightRadius: setSize(10),
    width: screenW - setSize(60),
    top: setSize(30),
    position: 'absolute',
    left: setSize(30),
    bottom: 0,
    zIndex: 1,
  },
  orderImg: {
    height: (screenW - setSize(200)) / 4,
    width: (screenW - setSize(200)) / 4,
    marginTop: setSize(20),
    transform: [
      { translateY: setSize(10) }
    ]
  },
  point: {
    position: 'absolute',
    right: setSize(16),
    top: setSize(40),
    height: setSize(34),
    minWidth: setSize(54),
    textAlign: 'center',
    lineHeight: setSize(34),
    borderRadius: setSize(17),
    borderWidth: setSize(1),
    borderColor: mainStyle.cfff.color,
    zIndex: 1,

  },
  tag: {
    height: setSize(34),
    minWidth: setSize(54),
    textAlign: 'center',
    lineHeight: setSize(34),
    borderRadius: setSize(17),
    borderWidth: setSize(1),
    borderColor: mainStyle.cfff.color,
    overflow: 'hidden'
  }
})

export default Mine