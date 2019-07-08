

import React, { PureComponent, ReactComponentElement } from 'react';
import { Text, View, Dimensions, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,contentPadding,setSize, screenH } from '../../../public/style/style';
import { observer, inject } from 'mobx-react';
import { JSXElement } from '@babel/types';

let { width, height } = Dimensions.get('window');

let imgw = setSize(180);


interface CartInfoProps {
  data:Array<object>,
  closeBtn:JSXElement
}

interface CartInfoState {
  oncheck:number
}

@inject('goodsStore','cartStore')
@observer
class CartInfo extends React.Component<CartInfoProps,CartInfoState>{
  constructor(props:CartInfoProps,state:CartInfoState){
    super(props);
    this.state = {
      oncheck:0
    }
  }

  componentDidMount(){
    let {data,goodsStore,cartStore} = this.props;
    if(data.sku&&data.sku.length>0){
      this.handleSelectItem(data.sku[0])
    }
  }

  handleSelectItem(val:object){
    let {data,goodsStore,cartStore} = this.props;
    goodsStore.selectItem(val);
    cartStore.selectItem({type:1,good_id:data.id,sku_id:val.id});
  }

  render (){
    let {data,goodsStore,closeBtn} = this.props;
    let {oncheck} = this.state;
    let goodsItem = goodsStore.goodsItem;
    return(
      <View
       style={[mainStyle.flex1,mainStyle.bgcfff]}
      >
        <View style={[mainStyle.column]}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
            <Image 
            style={[mainStyle.imgCover,
              {
                width:imgw,
                height:imgw,
                borderRadius:setSize(6)
              }
            ]} 
            mode="widthFix" 
            source={{uri:
              goodsItem.image_url?(goodsItem.image_url):''
            }}></Image>
            <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,mainStyle.mal15,
              {height:imgw}
            ]}>
              <View style={[mainStyle.column]}>
                <View style={[mainStyle.row,mainStyle.jcBetween]}>
                  <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.lh42,mainStyle.mab5]}>{data.product_name}</Text>
                  {closeBtn}
                </View>
                <Text style={[mainStyle.c999,mainStyle.fs12]}>{data.product_introduction}</Text>
              </View>
              <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.mab5]}>
                <Text style={[mainStyle.fs12,mainStyle.c666,mainStyle.lh42]}>价格：</Text>
                <Text style={[mainStyle.fs12,mainStyle.czt,mainStyle.lh42]}>￥</Text>
                <Text style={[mainStyle.fs18,mainStyle.czt,mainStyle.lh42]}>{goodsItem.price}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[mainStyle.flex1]}>
          <ScrollView 
          scrollEnabled 
          nestedScrollEnabled 
          style={[mainStyle.flex1,mainStyle.patb10]}>
            <Text style={[mainStyle.mab10,mainStyle.fs13,mainStyle.c333]}>选择规格</Text>
            <View style={[mainStyle.column,mainStyle.aiStart,mainStyle.mab10]}>
            {
              data.sku?data.sku.map((val,i)=>{
                return ( 
                  <Text 
                  onPress={()=>{
                    this.setState({
                      oncheck:i
                    },()=>{
                      this.handleSelectItem(val);
                    })
                  }}
                  key={i}
                  style={[mainStyle.fs12,mainStyle.mab10,styles.goodsBtn,oncheck==i?styles.goodsCheck:styles.goodsNo]}>
                    {val.sku_name}
                  </Text>
                )
              })
              :null
            }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  goodsBtn:{
    paddingTop:setSize(12),
    paddingBottom:setSize(12),
    paddingLeft:setSize(30),
    paddingRight:setSize(30),
    borderRadius:setSize(8)
  },
  goodsNo:{
    backgroundColor:mainStyle.bgcf2.backgroundColor,
    color:mainStyle.c666.color
  },
  goodsCheck:{
    color:mainStyle.c8d0.color,
    backgroundColor:mainStyle.bgcf6e.backgroundColor,
    borderWidth:setSize(2),
    paddingTop:setSize(10),
    paddingBottom:setSize(8),
    borderColor:mainStyle.c8d0.color,
  }
})

export {
  CartInfo
}

