

import React, { PureComponent } from 'react';
import { Text, View, Dimensions, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,contentPadding,setSize, screenH } from '../../../public/style/style';
import { observer, inject } from 'mobx-react';
import { splitStr } from '../../../tools/function';

let { width, height } = Dimensions.get('window');

let imgw = setSize(200);

interface CartInfoProps {
  closeBtn:JSXElement
}

interface CartInfoState {
  oncheck:number
}

@inject('trainStore','cartStore')
@observer
class CartInfo extends React.Component<CartInfoProps,CartInfoState>{
  constructor(props:CartInfoProps,state:CartInfoState){
    super(props);
    this.state = {
      oncheck:0
    }
  }

  componentDidMount(){
    let {trainStore} = this.props
    let trainSelectItem = trainStore.trainSelectItem
    if(trainSelectItem.length>0)this.handleSelectItem(trainSelectItem[0])
  }

  handleSelectItem(val:object){
    let {trainStore,cartStore} = this.props
    let trainInfo = trainStore.trainInfo
    trainStore.selectCartItem(val)
    cartStore.selectItem({type:2,good_id:trainInfo.id,sku_id:val.id})
  }

  render (){
    let {trainStore,closeBtn} = this.props
    let {oncheck} = this.state
    let trainInfo = trainStore.trainInfo
    let trainSelectItem = trainStore.trainSelectItem
    let cartItem = trainStore.cartItem
    return(
      <View
       style={[mainStyle.flex1,mainStyle.bgcfff]}
      >
        <View style={[mainStyle.column]}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
            <Image 
            style={[mainStyle.imgCover,mainStyle.bgcf2,
              {width:imgw, height:imgw, borderRadius:setSize(6)}]} 
            mode="widthFix" 
            source={{uri:
              trainInfo.image_url?trainInfo.image_url.length>0?trainInfo.image_url[0]:'':''
            }}></Image>
            <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,mainStyle.mal15,
              {height:imgw}
            ]}>
              <View style={[mainStyle.column]}>
                <View style={[mainStyle.row,mainStyle.jcBetween]}>
                  <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.mab5]}>
                    <Text style={[mainStyle.fs12,mainStyle.czt,mainStyle.lh42]}>￥</Text>
                    <Text style={[mainStyle.fs16,mainStyle.czt,mainStyle.lh42]}>{cartItem.price}</Text>
                  </View>
                  {closeBtn}
                </View>
                <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.lh42,mainStyle.mab10]}>{trainInfo.train_name}</Text>
                <View style={[mainStyle.row]}>
                 <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.bgcf2,mainStyle.pa5_10,{borderRadius:setSize(6)}]}>{splitStr(trainInfo.train_start_time,' ')}至{splitStr(trainInfo.train_end_time,' ')}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.mab5,mainStyle.mat10]}>
          <Text style={[mainStyle.fs12,mainStyle.c666,mainStyle.lh42]}>我当前的优惠价：</Text>
          <Text style={[mainStyle.fs12,mainStyle.czt,mainStyle.lh42]}>￥</Text>
          <Text style={[mainStyle.fs18,mainStyle.czt,mainStyle.lh42]}>{cartItem.dijia}</Text>
        </View>
        <View style={[mainStyle.flex1]}>
          <ScrollView 
          scrollEnabled 
          nestedScrollEnabled 
          style={[mainStyle.flex1,mainStyle.patb10]}>
            <Text style={[mainStyle.mab10,mainStyle.fs13,mainStyle.c333]}>选择规格</Text>
            <View style={[mainStyle.column,mainStyle.aiStart,mainStyle.mab10]}>
            {
              trainSelectItem.length>0
              ?trainSelectItem.map((val,i)=>{
                return ( 
                  <Text 
                  key={i}
                  onPress={()=>{
                    this.setState({oncheck:i},()=>{
                      this.handleSelectItem(val)
                    })
                  }}
                  style={[mainStyle.fs12,mainStyle.mab10,styles.goodsBtn,oncheck==i?styles.goodsCheck:styles.goodsNo]}>
                    {val.type_name}
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

