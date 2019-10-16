

import React, { PureComponent, ReactComponentElement } from 'react';
import { Text, View, Dimensions, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle, contentPadding, setSize, screenH } from '../../../public/style/style';
import { observer, inject } from 'mobx-react';
import { JSXElement, validate } from '@babel/types';
import InputNumber from '../../../components/Pubilc/InputNumber';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let { width, height } = Dimensions.get('window');

let imgw = setSize(180);


interface CartInfoProps {
  data: Array<object>,
  closeBtn: JSXElement
}

interface CartInfoState {
  oncheck: number
}

@inject('goodsStore', 'cartStore')
@observer
class CartInfo extends React.Component<CartInfoProps, CartInfoState>{
  constructor(props: CartInfoProps, state: CartInfoState) {
    super(props);
    this.state = {
      oncheck: 0
    }
  }

  componentDidMount() {
    let { data, goodsStore: { onckeck, goodsInfo, goodsItem }, cartStore } = this.props;
    this.setState({
      oncheck: onckeck || 0
    })
    cartStore.selectItem({ type: 1, good_id: goodsInfo.id, sku_id: goodsItem.id, product_stock: goodsItem.product_stock, count: goodsItem.count })
    // if (data.sku && data.sku.length > 0) {
    //   this.handleSelectItem(data.sku[0])
    // }
  }

  handleSelectItem(val: object, i) {
    let { data, goodsStore, cartStore } = this.props;
    let goodsItem = goodsStore.goodsItem;
    val.count = goodsItem.count
    goodsStore.selectItem(val, i);
    cartStore.selectItem({ type: 1, good_id: data.id, sku_id: val.id, product_stock: val.product_stock, count: goodsItem.count });
  }
  changenum(e: number) {
    let { data, goodsStore, cartStore } = this.props;
    let goodsItem = goodsStore.goodsItem;
    goodsItem.count = e;
    goodsStore.selectItem(goodsItem);
    cartStore.selectItem({ type: 1, good_id: data.id, sku_id: goodsItem.id, product_stock: goodsItem.product_stock, count: e });
  }
  render() {
    let { data, goodsStore, closeBtn } = this.props;
    let { oncheck } = this.state;
    let goodsItem = goodsStore.goodsItem;
    return (
      <KeyboardAwareScrollView
        style={[mainStyle.flex1, mainStyle.bgcfff]}
      >
        <View style={[mainStyle.mab10, mainStyle.column]}>
          <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
            <Image
              style={[mainStyle.imgCover,
              {
                width: imgw,
                height: imgw,
                borderRadius: setSize(6)
              }
              ]}
              mode="widthFix"
              source={{
                uri:
                  goodsItem.image_url ? (goodsItem.image_url) : ''
              }}></Image>
            <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1, mainStyle.mal15, mainStyle.mar15,
            { height: imgw }
            ]}>
              <View style={[mainStyle.column]}>
                <View style={[mainStyle.row, mainStyle.jcBetween]}>
                  <Text style={[mainStyle.c333, mainStyle.fs13, mainStyle.lh42, mainStyle.mab5, mainStyle.mar10]}>{data.product_name}</Text>
                  {closeBtn}
                </View>
                <Text style={[mainStyle.c999, mainStyle.fs12]} numberOfLines={2}>{data.product_introduction}</Text>
              </View>
              <View style={[mainStyle.row, mainStyle.aiEnd, mainStyle.mab5]}>
                <Text style={[mainStyle.fs12, mainStyle.c666, mainStyle.lh42]}>价格：</Text>
                <Text style={[mainStyle.fs12, mainStyle.czt, mainStyle.lh42]}>￥</Text>
                <Text style={[mainStyle.fs18, mainStyle.czt, mainStyle.lh42]}>{goodsItem.price}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[mainStyle.flex1]}>
          <Text style={[mainStyle.mab10, mainStyle.fs13, mainStyle.c333]}>选择规格</Text>
          <ScrollView
            scrollEnabled
            nestedScrollEnabled
            style={[mainStyle.flex1, mainStyle.patb10]}>
            <View style={[mainStyle.column, mainStyle.aiStart, mainStyle.mab10]}>
              {
                data.sku ? data.sku.map((val, i) => {
                  return (
                    <Text
                      onPress={() => {
                        this.setState({
                          oncheck: i
                        }, () => {
                          this.handleSelectItem(val, i);
                        })
                      }}
                      key={i}
                      style={[mainStyle.fs12, mainStyle.mab10, styles.goodsBtn, oncheck == i ? styles.goodsCheck : styles.goodsNo]}>
                      {val.sku_name}
                    </Text>
                  )
                })
                  : null
              }
            </View>

          </ScrollView>
          <Text style={[mainStyle.mab10, mainStyle.fs13, mainStyle.c333]}>数量</Text>
          <InputNumber value={goodsItem.count} max={goodsItem.product_stock} onChange={(v) => { this.changenum(v) }}></InputNumber>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  goodsBtn: {
    paddingTop: setSize(12),
    paddingBottom: setSize(12),
    paddingLeft: setSize(30),
    paddingRight: setSize(30),
    borderRadius: setSize(8)
  },
  goodsNo: {
    backgroundColor: mainStyle.bgcf2.backgroundColor,
    color: mainStyle.c666.color
  },
  goodsCheck: {
    color: mainStyle.czt.color,
    backgroundColor: mainStyle.bgcf6e.backgroundColor,
    borderWidth: setSize(2),
    paddingTop: setSize(10),
    paddingBottom: setSize(8),
    borderColor: mainStyle.czt.color,
  }
})

export {
  CartInfo
}


