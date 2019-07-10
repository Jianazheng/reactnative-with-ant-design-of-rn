import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle,setSize, screenW } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  
}

class WxPay extends React.Component<Props,State> {
  static navigationOptions = {
    header:null,
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="订单支付"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.bgcf7,mainStyle.column,mainStyle.flex1]}>
          <View style={[mainStyle.bgcfff,mainStyle.palr15]}>
            <View style={[mainStyle.row,mainStyle.jcCenter,mainStyle.pa30,mainStyle.mab20,mainStyle.mat20]}>
              <Text style={[mainStyle.cjin]}><Text style={[mainStyle.fs12]}>￥</Text><Text style={[{fontSize:setSize(72)}]}>120.00</Text></Text>
            </View>
            <View style={[mainStyle.bgcfff,mainStyle.column]}>
              <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter,mainStyle.brb1f2,mainStyle.brt1f2,mainStyle.h100]}>
                <Text style={[mainStyle.fs14,mainStyle.c333]}>支付方式</Text>
              </View>
              <View style={[mainStyle.h100,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter]}>
                <Text style={[mainStyle.czt,mainStyle.fs13]}>微信支付</Text>
                <RadioSelect></RadioSelect>
              </View>
            </View>
            <View style={[mainStyle.bgcfff,mainStyle.h100,mainStyle.row,mainStyle.aiCenter,mainStyle.brt1f2]}>
              <Text style={[mainStyle.c666,mainStyle.fs12]}>你可以在未支付订单中继续支付</Text>
            </View>
          </View>
        </View>
        <View style={[mainStyle.row,mainStyle.h200,mainStyle.aiCenter,mainStyle.jcCenter]}>
          <BxButton 
          title={'确认支付'}
          colors={['#54FF9F','#4EEE94']}
          borderRadius={setSize(6)}
          btnstyle={[{width:screenW-setSize(60)}]}
          textstyle={[mainStyle.fs13]}
          onClick={()=>{
            this.props.navigation.replace('PaySuccess');
          }}
          ></BxButton>
        </View>
      </View>
    )
  }
}

class RadioSelect extends React.PureComponent {
  render(){
    return(
      <View style={[mainStyle.bgcfff,mainStyle.aiCenter,mainStyle.jcCenter,
        {
          borderColor:mainStyle.czt.color,
          borderRadius:setSize(40),
          borderWidth:setSize(2),
          height:setSize(42),
          width:setSize(42)
        }
      ]}>
        <Text style={[mainStyle.bgczt,
        {
          borderRadius:setSize(40),
          height:setSize(22),
          width:setSize(22)
        }
        ]}></Text>
      </View>
    )
  }
}

export default WxPay