import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import { validate } from '@babel/types';

interface Props {}
interface State {
  
}
let imgw = setSize(180);

@inject('cartStore')
@observer
class SettlementFail extends React.Component<Props,State> {
  static navigationOptions = {
    header:null,
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    let {cartStore} = this.props
    let settlementInfo = cartStore.settlementInfo
    console.log(settlementInfo)
    return (
      <View style={[mainStyle.flex1,mainStyle.column,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="结算失败"
        onPress={()=>{
          this.props.navigation.goBack()
        }}
        ></NavTop>
        <ScrollView>
          <View style={[mainStyle.bgcfff,mainStyle.column,mainStyle.aiCenter,mainStyle.patb20]}>
            <Text style={[mainStyle.icon,mainStyle.c999,{fontSize:setSize(140)}]}>&#xe654;</Text>
            <Text style={[mainStyle.c999,mainStyle.fs13,mainStyle.mat10]}>结算失败</Text>
            <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mat10]}>结算商品中存在无效的商品</Text>
            <BxButton 
            title={'返回购物车'}
            colors={[mainStyle.czt.color,mainStyle.cztc.color]}
            btnstyle={[mainStyle.mat15,
              {
                borderRadius:setSize(4),
                width:setSize(260)
              }
            ]}
            textstyle={[mainStyle.cfff,mainStyle.fs14]}
            onClick={()=>{
              this.props.navigation.goBack()
            }}
            ></BxButton>
          </View>
          <View style={[mainStyle.pa15]}>
            <View style={[{borderRadius:setSize(6)}]}>
              <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.bgcfff]}>
                <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter,mainStyle.palr15]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>已失效商品</Text>
                </View>
              </View>
              {
                settlementInfo.pStatusArray.map((val,i)=>{
                  if(val.haveStock==0){
                    return (
                      <View key={i} style={[mainStyle.row,mainStyle.jcBetween,mainStyle.pa15,mainStyle.bgcfff,mainStyle.brb1f2]}>
                        <Image 
                        style={[{width:imgw,height:imgw,borderRadius:setSize(6)},mainStyle.bgcf2]}
                        source={{uri:val.good_img}}></Image>
                        <View style={[mainStyle.column,mainStyle.flex1,mainStyle.mal15]}>
                          <Text style={[mainStyle.c333,mainStyle.fs13]}>{val.good_name}</Text>
                          <View style={[mainStyle.row]}>
                            <Text style={[mainStyle.c999,mainStyle.fs10,mainStyle.bgcf7,mainStyle.pa5_10,mainStyle.mab5,mainStyle.mat5]}>{val.sku_name}</Text>
                          </View>
                          <Text style={[mainStyle.c333,mainStyle.fs13]}>￥{val.original_price}</Text>
                        </View>
                      </View>
                    )
                  }
                })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default SettlementFail