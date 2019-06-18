

import React, { PureComponent } from 'react';
import { Text, View, Dimensions, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,contentPadding,setSize, screenH } from '../../../public/style/style';

let { width, height } = Dimensions.get('window');

interface CartInfoDetailsProps {
  data:Object,
}

let imgw = setSize(200);

class CartInfoDetails extends PureComponent<CartInfoDetailsProps>{
  constructor(props:CartInfoProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View style={[mainStyle.column,mainStyle.flex1,{
        height:imgw+setSize(80)
      }]}>
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
          source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}></Image>
          <View style={[mainStyle.column,mainStyle.jcBetween,mainStyle.flex1,mainStyle.mal15,
            {
              height:imgw
            }
          ]}>
            <Text style={[mainStyle.czt,mainStyle.fs14]}>￥4500</Text>
            <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.lh42]}>高阶体式提升计划高阶体式提升计划高阶体式提升计划高阶体式提升计划</Text>
            <Text style={[mainStyle.c999,mainStyle.fs12]}>2019年6月1日-6月30日</Text>
          </View>
        </View>
        <View style={[mainStyle.row,mainStyle.aiEnd,mainStyle.flex1,mainStyle.mab5]}>
          <Text style={[mainStyle.fs12,mainStyle.c666,mainStyle.lh42]}>我当前的优惠价：</Text>
          <Text style={[mainStyle.fs12,mainStyle.czt,mainStyle.lh42]}>￥</Text>
          <Text style={[mainStyle.fs16,mainStyle.czt,mainStyle.lh42]}>3700</Text>
        </View>
      </View>
    )
  }
}

interface CartInfoProps {
  data:Array<object>,
}

interface CartInfoState {
  oncheck:number
}

class CartInfo extends React.Component<CartInfoProps,CartInfoState>{
  constructor(props:CartInfoProps,state:CartInfoState){
    super(props);
    this.state = {
      oncheck:0
    }
  }
  render (){
    let {data} = this.props;
    let {oncheck} = this.state;
    return(
      <View
       style={[mainStyle.flex1,mainStyle.bgcfff]}
      >
        <ScrollView 
        scrollEnabled 
        nestedScrollEnabled 
        style={[mainStyle.flex1,mainStyle.patb10]}>
          <Text style={[mainStyle.mab10,mainStyle.fs13,mainStyle.c333]}>活动类型</Text>
          <View style={[mainStyle.column,mainStyle.aiStart,mainStyle.mab10]}>
          {
            data.map((val,i)=>{
              return ( 
                <Text 
                onPress={()=>{
                  this.setState({
                    oncheck:i
                  })
                }}
                key={i}
                style={[mainStyle.fs12,mainStyle.mab10,styles.goodsBtn,oncheck==i?styles.goodsCheck:styles.goodsNo]}>
                {val.title}
                </Text>
              )
            })
          }
          </View>
        </ScrollView>
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
  CartInfoDetails,
  CartInfo
}


