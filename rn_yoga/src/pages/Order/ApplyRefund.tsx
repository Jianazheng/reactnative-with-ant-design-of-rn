import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { mainStyle,setSize, screenW } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { Checkbox, TextareaItem } from '@ant-design/react-native';

interface Props {}
interface State {
  orderType:string,
  reason:Array<object>,
  inputHeight:number
}


class ApplyRefund extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      orderType:'',
    };
  }
  

  componentDidMount(){
    
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {reason,inputHeight} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="取消订单"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1,mainStyle.bgcf7]}>
          <View style={[mainStyle.column,mainStyle.flex1,mainStyle.pa15]}>
            <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
              <View style={[mainStyle.patb15,mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>订单号</Text>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>8230832048234</Text>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>已支付课程取消说明：</Text>
                </View>
              </View>
              <View style={[mainStyle.palr15,mainStyle.column,mainStyle.mat15,mainStyle.mab15]}>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                1.学费特惠期前申请退费者，可全额退款。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                2.特惠期后到课程开始前申请退费者，扣除学员提前缴 
                  费的特惠金额，例如特惠金额是两百元，就扣除两百元。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                3.课程开始后，始申请退费者，依所缴金额扣除手续费
                  300元。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                4.如果有来参加课程，而中途离开者，则不再退费。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                5.课程结束后，才申请退费者，依所缴金额扣除手续费
                  400元。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                6.教师认证费在学费特惠期前申请退费者，可全额退款。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                7.教师认证费在特惠期后到认证开始前申请退费者，扣
                  除学员提前缴费的特惠金额，例如特惠金额是两百元，
                  就扣除两百元。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666,mainStyle.mab10]}>
                8.认证考试只要有参加而中途退场者不退款。
                </Text>
                <Text style={[mainStyle.fs13,mainStyle.c666]}>
                9.有报名认证却没来参加认证者，扣除手续费等300元。
                </Text>
              </View>
            </View>
            <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
              <View style={[mainStyle.patb15,mainStyle.palr15,mainStyle.column]}>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>您当前取消课程需要扣除手续费：</Text>
                  <View style={[mainStyle.row,mainStyle.aiCenter]}>
                    <Text style={[mainStyle.fs16,mainStyle.czt]}>-</Text>
                    <Text style={[mainStyle.fs12,mainStyle.czt]}>￥</Text>
                    <Text style={[mainStyle.fs16,mainStyle.czt]}>200</Text>
                  </View>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mat10]}>
                  <Text style={[mainStyle.icon,mainStyle.c999]}>&#xe659;</Text>
                  <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mal5]}>手续费将在退款中扣除</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter]}>
          <BxButton
          color={mainStyle.czt.color}
          borderRadius={setSize(40)}
          disabled={false}
          title={'下一步'} 
          btnstyle={[{height:setSize(80),width:screenW-setSize(60)}]} 
          textstyle={[mainStyle.fs14]}
          onClick={()=>{
            this.goto('RefundReason',{})
          }}>
          </BxButton>        
        </View>
      </View>
    )
  }
}


export default ApplyRefund