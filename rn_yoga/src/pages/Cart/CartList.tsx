import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, DeviceEventEmitter, RefreshControl } from 'react-native';
import { mainStyle, setSize } from '../../public/style/style';
import { ActivityIndicator, Toast, Modal } from "@ant-design/react-native";
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxRadio from '../../components/Pubilc/Radio';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {
  showLoading: boolean,
  selectAll: boolean,
  refreshing: boolean
}

@inject('cartStore', 'addressStore')
@observer
class CartList extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  TORELOAD: object

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      showLoading: true,
      selectAll: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.getCartList()
    this.TORELOAD = DeviceEventEmitter.addListener('TORELOAD', (res) => {
      this.setState({
        showLoading: true
      }, () => {
        this.getCartList()
      })
    })
  }

  componentWillUnmount() {
    this.TORELOAD.remove()
  }

  getCartList() {
    let { cartStore } = this.props;
    cartStore.getCartList()
      .then(res => {
        this.setState({
          showLoading: false
        })
      }).catch(err => {
        this.setState({
          showLoading: false
        })
      })
  }

  handleDelectCartItem() {
    let { cartStore } = this.props;
    if (cartStore.ids.length < 1) {
      Toast.info('请选择移除项', 1.2, undefined, false)
      return false
    }

    Modal.alert('提示', '确认移除选中的商品吗？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          cartStore.delectCartItem()
            .then(res => {
              this.getCartList();
              DeviceEventEmitter.emit('TORELOADCARTNUM', 'yes');
            })
        }
      },
    ]);
  }

  handleDelectCartMain(typenum) {
    let { cartStore } = this.props;
    Modal.alert('提示', '确认移除此模块中的全部商品吗？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确认', onPress: () => {
          cartStore.delectCartMain(typenum)
            .then(res => {
              this.getCartList();
              DeviceEventEmitter.emit('TORELOADCARTNUM', 'yes');
            })
        }
      },
    ]);
  }

  handleSelectAll() {
    let { selectAll } = this.state;
    let { cartStore } = this.props;
    this.setState(() => {
      return { selectAll: !selectAll }
    }, () => {
      cartStore.setSelectAll(selectAll)
    })
  }

  async handleSubmit() {
    let { cartStore, navigation, addressStore } = this.props
    let { ids } = cartStore
    if (ids.length > 0) {
      try {
        this.setState({ showLoading: true })
        let res = await cartStore.settlement()
        if (res != null) {
          if (res.errorCode == 1083) {
            navigation.navigate('Info');
          } else if (res.pass == 1) {
            if (res.address.region) {
              res.address.region = JSON.parse(res.address.region)
              addressStore.setAddress(res.address)
            }
            navigation.navigate('Settlement', { type: 'pay' })
          } else {
            navigation.navigate('SettlementFail', { type: 'pay' })
          }
        }
        this.setState({ showLoading: false })
      } catch (error) {
        this.setState({ showLoading: false })
        console.log(error)
      }
    } else {
      Toast.info('请选择商品', 1.4, undefined, false)
    }
  }
  _onRefresh() {
    this.setState({
      showLoading: true
    }, () => {
      this.getCartList()
    })
  }
  render() {
    let { showLoading, selectAll } = this.state
    let { cartStore, navigation } = this.props
    let { cartList, cartInvalid, cartListObj2Arr, ids } = cartStore
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="购物车"
          onPress={() => {
            this.props.navigation.goBack();
          }}
          children={(
            <View style={[mainStyle.flex1, mainStyle.column, mainStyle.jcBetween, mainStyle.aiEnd, mainStyle.mar15]}>
              <TouchableOpacity onPress={() => {
                this.handleDelectCartItem()
              }}>
                <Text style={[mainStyle.icon, mainStyle.c666, mainStyle.fs20]}>&#xe642;</Text>
              </TouchableOpacity>
            </View>
          )}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1, mainStyle.bgcf7]}
          refreshControl={(
            <RefreshControl
              tintColor={mainStyle.czt.color}
              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
              refreshing={false}
              onRefresh={this._onRefresh.bind(this)}
            />
          )}>
          <View style={[mainStyle.column, mainStyle.flex1, mainStyle.pa15]}>
            {
              cartList.product
                ? <CartArray data={cartList.product} navigation={navigation} title={'商品'} type={'product'} typenum={1} num={cartList.product.length ? cartList.product.length : 0}
                  onDel={(e) => {
                    this.handleDelectCartMain(e)
                  }}
                ></CartArray>
                : null
            }
            {
              cartList.train
                ? <CartArray data={cartList.train} navigation={navigation} title={'培训课程'} type={'train'} typenum={2} num={cartList.train.length ? cartList.train.length : 0}
                  onDel={(e) => {
                    this.handleDelectCartMain(e)
                  }}
                ></CartArray>
                : null
            }
            {
              cartList.course
                ? <CartArray data={cartList.course} navigation={navigation} title={'在线课程'} type={'course'} typenum={3} num={cartList.course.length ? cartList.course.length : 0}
                  onDel={(e) => {
                    this.handleDelectCartMain(e)
                  }}
                ></CartArray>
                : null
            }
            {
              cartInvalid != undefined && cartInvalid.length > 0
                ? <CartArray data={cartInvalid} title={'已失效'} type={'invalid'} typenum={4} num={cartInvalid.length ? cartInvalid.length : 0}
                  onDel={(e) => {
                    this.handleDelectCartMain(e)
                  }}
                ></CartArray>
                : null
            }
          </View>
        </ScrollView>
        <View style={[mainStyle.h120, mainStyle.brt1e2, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.palr15]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.mal10]}>
            <BxRadio
              checked={selectAll && cartListObj2Arr.length == ids.length}
              size={18}
              color={mainStyle.czt.color}
              onChange={() => {
                this.handleSelectAll()
              }}></BxRadio>
            <Text style={[mainStyle.fs13, mainStyle.mal10, mainStyle.c666]}>全选</Text>
          </View>
          <View style={[mainStyle.row, mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs13, mainStyle.lh42, mainStyle.c333]}>
              合计：
              <Text style={[mainStyle.czt]}>￥</Text>
              <Text style={[mainStyle.czt, mainStyle.fs14]}>{cartStore.cartPrice.toFixed(2)}</Text>
            </Text>
            <BxButton
              disabled={false}
              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
              title={'结算(' + cartStore.cartTotal + ')'}
              btnstyle={[mainStyle.palr15, mainStyle.mal15, { borderRadius: setSize(40), height: setSize(80) }]}
              textstyle={[mainStyle.fs14]}
              onClick={() => {
                this.handleSubmit()
              }}>
            </BxButton>
          </View>
        </View>
        <ActivityIndicator
          animating={showLoading}
          toast
          size="large"
          text="加载中..."
        />
      </View>
    )
  }
}

interface CartArrayProps {
  data: Array<object>,
  title: string,
  num: string | number,
  type: string,
  typenum: number,
  onDel: (typenum: number) => void,
  navigation: object
}

@inject('cartStore')
@observer
class CartArray extends React.Component<CartArrayProps>{
  constructor(props: CartArrayProps) {
    super(props)
  }
  handleDelectCartMain(typenum) {
    this.props.onDel(typenum);
  }

  invalidItem = (val, i) => (
    <View key={i} style={[mainStyle.row, mainStyle.jcBetween, mainStyle.mat15, { opacity: 0.8 }]}>
      <Image
        style={[{ width: imgw * 0.6, height: imgw * 0.6, borderRadius: setSize(6) }, mainStyle.bgcf2]}
        mode="widthFix"
        source={{ uri: 'http://' + (typeof val.image_url == "object" && val.image_url != null ? val.image_url[0] : '') }}>
      </Image>
      <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
        <Text style={[mainStyle.c666, mainStyle.fs13, mainStyle.mab5]} numberOfLines={2}>{val.name}</Text>
        <Text style={[mainStyle.czt, mainStyle.fs11, mainStyle.lh42]}>￥<Text style={[mainStyle.fs13]}>{val.price}</Text></Text>
      </View>
    </View>
  )

  render() {
    let { data, title, num, type, typenum, navigation } = this.props;
    return (
      <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }, mainStyle.mab15]}>
        <View style={[mainStyle.brb1f2, mainStyle.patb15, mainStyle.palr15]}>
          <View style={[mainStyle.jcBetween, mainStyle.row, mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs14, mainStyle.c333]}>{title}（{num}）</Text>
            <TouchableOpacity onPress={() => {
              this.handleDelectCartMain(typenum);
            }}>
              <Text style={[mainStyle.fs13, mainStyle.c666]}>移除</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[mainStyle.palr10, mainStyle.mab15]}>
          {
            type != 'invalid'
              ? data.map((val, i) => (
                <CartItem data={val} index={i} type={type} navigation={navigation} key={i}></CartItem>
              ))
              : data.map((val, i) => (
                this.invalidItem(val, i)
              ))
          }
        </View>
      </View>
    )
  }
}

let imgw = setSize(180);

interface CartItemProps {
  data: object,
  type: string,
  index: number,
  navigation: object
}

@inject('cartStore')
@observer
class CartItem extends React.Component<CartItemProps>{
  constructor(props: CartItemProps) {
    super(props)
  }

  goto(type: string, params: any) {
    let routeName = 'GoodsInfo'
    if (type == 'course') {
      routeName = 'CourseInfo'
    } else if (type == 'train') {
      routeName = 'TrainInfo'
    }
    this.props.navigation.navigate(routeName, params);
  }

  render() {
    let { type, data, index, cartStore } = this.props;
    return (
      <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.mat15]}>
        <View style={[mainStyle.mar10]}>
          <BxRadio
            color={mainStyle.czt.color}
            size={18}
            checked={data.checked}
            onChange={(e) => {
              cartStore.setSelectItem(type, index)
            }}></BxRadio>
        </View>
        <TouchableOpacity onPress={() => {
          this.goto(type, { id: data.good_id })
        }} style={[mainStyle.row, mainStyle.flex1]}>
          <Image
            style={[{ width: imgw, height: imgw, borderRadius: setSize(6) }, mainStyle.bgcf2]}
            mode="widthFix"
            source={{ uri: 'http://' + (typeof data.image_url == "object" && data.image_url != null ? data.image_url[0] : '') }}>
          </Image>

          {
            type == 'product'
              ? <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal10, mainStyle.flex1]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]} numberOfLines={2}>{data.name}</Text>
                <Text style={[mainStyle.c999, mainStyle.fs10, mainStyle.bgcf7, mainStyle.pa5_10, mainStyle.mab5, mainStyle.mat5]}>{data.sku_name}</Text>
                <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.flex1]}>
                  <View style={[mainStyle.flex1]}>
                    <Text style={[mainStyle.czt, mainStyle.fs10, mainStyle.lh42]}>￥<Text style={[mainStyle.fs14]}>{data.price}</Text></Text>
                  </View>
                  <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.numberSelect]}>
                    <TouchableOpacity style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter]}
                      onPress={() => {
                        cartStore.reduceCartItem(type, index)
                      }}
                    >
                      <Text style={[mainStyle.icon, mainStyle.c333, mainStyle.fs20, styles.numberSelectBtn]}>&#xe649;</Text>
                    </TouchableOpacity>
                    <TextInput
                      maxLength={4}
                      value={data.count}
                      onChangeText={(e) => {
                        cartStore.editCartItem(type, index, e)
                      }}
                      style={[mainStyle.bgcf2, mainStyle.c666, styles.numberSelectInput]}
                    ></TextInput>
                    <TouchableOpacity style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter]}
                      onPress={() => {
                        cartStore.addCartItem(type, index)
                      }}
                    >
                      <Text style={[mainStyle.icon, mainStyle.c333, mainStyle.fs20, styles.numberSelectBtn]}>&#xe648;</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View> : null
          }
          {
            type == 'train'
              ? <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]} numberOfLines={2}>{data.name}</Text>
                <Text style={[mainStyle.c999, mainStyle.fs10, mainStyle.bgcf7, mainStyle.pa5_10, mainStyle.mab5, mainStyle.mat5]}>{data.sku_name}</Text>
                <Text style={[mainStyle.czt, mainStyle.fs10, mainStyle.lh42]}>￥<Text style={[mainStyle.fs14]}>{data.price}</Text></Text>
              </View> : null
          }
          {
            type == 'course'
              ? <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mal15, mainStyle.flex1]}>
                <Text style={[mainStyle.c333, mainStyle.fs12]} numberOfLines={2}>{data.name}</Text>
                <Text style={[mainStyle.c999, mainStyle.fs10, mainStyle.bgcf7, mainStyle.pa5_10, mainStyle.mab5, mainStyle.mat5]}>{data.lesson}课时</Text>
                <Text style={[mainStyle.czt, mainStyle.fs10, mainStyle.lh42]}>￥<Text style={[mainStyle.fs14]}>{data.price}</Text></Text>
              </View> : null
          }</TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numberSelect: {
    height: setSize(50),
    width: setSize(170),
    borderRadius: setSize(2),
    backgroundColor: mainStyle.bgcf7.backgroundColor
  },
  numberSelectInput: {
    width: setSize(70),
    height: setSize(50),
    lineHeight: setSize(32),
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0
  },
  numberSelectBtn: {
    width: setSize(50),
    height: setSize(50),
    lineHeight: setSize(50),
    textAlign: 'center'
  }
})


export default CartList