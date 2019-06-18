import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  
}

class Payfail extends React.Component<Props,State> {
  static navigationOptions = {
    headerTitle:headerTitle('支付失败'),
    headerRight:headerRight(<Text></Text>),
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return (
      <View style={[mainStyle.flex1,mainStyle.column,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="支付失败"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.bgcfff,mainStyle.column,mainStyle.aiCenter,mainStyle.patb20]}>
          <Text style={[mainStyle.icon,mainStyle.c999,{fontSize:setSize(140)}]}>&#xe654;</Text>
          <Text style={[mainStyle.c333,mainStyle.fs13,mainStyle.mat10]}>支付失败</Text>
          <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.mat5]}>你可以在未支付订单中继续支付</Text>
          <BxButton 
          title={'重新支付'}
          btnstyle={[mainStyle.bgcfff,mainStyle.mat15,
            {
              borderWidth:setSize(1.2),
              borderRadius:setSize(4),
              borderColor:mainStyle.czt.color,
              width:setSize(260)
            }
          ]}
          textstyle={[mainStyle.czt,mainStyle.fs14]}
          onClick={()=>{}}
          ></BxButton>
        </View>
      </View>
    )
  }
}

export default Payfail