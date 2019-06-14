

import React, { PureComponent } from 'react';
import { Text, View, Dimensions,ScrollView, Image } from 'react-native';
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
      <View style={[mainStyle.column,mainStyle.flex1]}>
        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.flex1]}>
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
        <View style={[mainStyle.row,mainStyle.aiEnd]}>
          <Text style={[mainStyle.fs12,mainStyle.c666]}>我当前的优惠价：</Text>
          <Text style={[mainStyle.fs12,mainStyle.czt]}>￥</Text>
          <Text style={[mainStyle.fs15,mainStyle.czt]}>3700</Text>
        </View>
      </View>
    )
  }
}

interface CartInfoProps {
  data:Array<object>,
}

class CartInfo extends React.Component<CartInfoProps>{
  constructor(props:CartInfoProps){
    super(props)
  }
  render (){
    let {data} = this.props;
    return(
      <View
       style={[mainStyle.column,mainStyle.flex1]}>
        <ScrollView 
        scrollEnabled 
        nestedScrollEnabled 
        style={[mainStyle.flex1,mainStyle.patb10]}>
          <Text style={[mainStyle.patb10,mainStyle.fs13,mainStyle.c333]}>活动类型</Text>
          {
            data.map((val,i)=>{
              return (
                <View style={[{marginBottom:setSize(10)}]}>
                  <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.flex1,
                  ]}>{val.title}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

export {
  CartInfoDetails,
  CartInfo
}


