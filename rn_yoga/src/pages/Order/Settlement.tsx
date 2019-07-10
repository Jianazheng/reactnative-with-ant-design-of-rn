import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle,setSize, screenW } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxRadio from '../../components/Pubilc/Radio';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props {}
interface State {
  orderType:string
}

let imgw = setSize(180);

@inject('cartStore')
@observer
class Settlement extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      orderType:''
    };
  }

  componentDidMount(){
    let {navigation:{state:{params}}} = this.props
    if(!params){
      params = {
        type:'pay'
      }
    }
    this.setState({
      orderType:params.type
    })
  }

  render(){
    let {orderType} = this.state
    let {navigation,cartStore,cartStore:{settlementInfo}} = this.props
    console.log(settlementInfo)
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="订单详情"
        onPress={()=>{
          navigation.goBack()
        }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1,mainStyle.bgcf7]}>
          <View style={[mainStyle.column,mainStyle.flex1,mainStyle.pa15]}>
            <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10),overflow:'hidden'},mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>选择地址</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('Address',{type:'select'})
              }}>
                <View style={[mainStyle.row,mainStyle.pa15,mainStyle.aiCenter,mainStyle.jcBetween]}>
                  <View style={[mainStyle.column,mainStyle.flex1,mainStyle.mar15]}>
                    <Text style={[mainStyle.fs14,mainStyle.c333,mainStyle.mab5]}>广东省广州市海珠区琶洲中州中心2333号</Text>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>18828838888</Text>
                      <Text style={[mainStyle.fs13,mainStyle.c333]}>斌斌</Text>
                    </View>
                  </View>
                  <Text style={[mainStyle.icon,mainStyle.c666,mainStyle.fs22]}>&#xe64d;</Text>
                </View>
              </TouchableOpacity>
              <Image style={[{width:screenW-setSize(60)},mainStyle.imgContain]} source={require('../../../images/addressbg.png')}></Image>
            </View>
            <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
              <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
                <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>商品信息</Text>
                </View>
              </View>
              {
                settlementInfo.pStatusArray.map((val,i)=>(
                  <View key={i} style={[mainStyle.pab15,i<settlementInfo.pStatusArray.length-1?mainStyle.brb1f2:null]}>
                    <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.pa15,mainStyle.brb1f2]}>
                      <Image 
                      style={[{width:imgw,height:imgw,borderRadius:setSize(6)},mainStyle.bgcf2]}
                      mode="widthFix" 
                      source={{uri:'http://'+val.good_img}}>
                      </Image>
                      <View style={[mainStyle.column,mainStyle.aiStart,mainStyle.mal15,mainStyle.flex1]}>
                        <Text style={[mainStyle.c333,mainStyle.fs12]}>{val.good_name}</Text>
                        <Text style={[mainStyle.c999,mainStyle.fs10,mainStyle.bgcf7,mainStyle.pa5_10,mainStyle.mab5,mainStyle.mat5]}>{val.sku_name}</Text>
                        <Text style={[mainStyle.czt,mainStyle.fs10,mainStyle.lh42]}>￥<Text style={[mainStyle.fs14,mainStyle.fontsilm]}>{val.original_price}</Text></Text>
                      </View>
                    </View>
                    <View style={[mainStyle.column,mainStyle.palr15]}>
                      <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat10]}>
                        <Text style={[mainStyle.c333,mainStyle.fs12]}>课程数量</Text>
                        <Text style={[mainStyle.c333,mainStyle.fs14]}>{val.count}</Text>
                      </View>
                      <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat10]}>
                        <Text style={[mainStyle.c333,mainStyle.fs12]}>优惠价格</Text>
                        <Text style={[mainStyle.czt,mainStyle.fs14]}>￥{val.favorable_price}</Text>
                      </View>
                      <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat10]}>
                        <Text style={[mainStyle.c333,mainStyle.fs12]}>优惠金额</Text>
                        <Text style={[mainStyle.czt,mainStyle.fs14]}>-￥{val.total_favorable}</Text>
                      </View>
                      <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat10]}>
                        <Text style={[mainStyle.c333,mainStyle.fs12]}>总金额</Text>
                        <Text style={[mainStyle.czt,mainStyle.fs14]}>￥{val.totalPrice}</Text>
                      </View>
                    </View>
                  </View>
                ))
              }
            </View>
            <PayStatus data={settlementInfo} orderType={orderType}></PayStatus>
          </View>
        </ScrollView>
        {
          orderType=='pay'?
          <PayBar 
          data={settlementInfo}
          orderType={orderType} 
          handlePayment={()=>{
            this.props.navigation.push('WxPay')
          }}></PayBar>
          :null
        }
        {/* {
          orderType=='nopay'?
          <PayBar 
          data={settlementInfo} 
          orderType={orderType} 
          handlePayment={()=>{
            this.props.navigation.push('PaySuccess')
          }}
          handleCancel={()=>{}}
          ></PayBar>
          :null
        }
        {
          orderType=='afterpay'?
          <PayBar 
          data={settlementInfo} 
          orderType={orderType} 
          handleRefund={()=>{}}
          ></PayBar>
          :null
        } */}
      </View>
    )
  }
}

interface PayStatusProps {
  orderType:string,
  data:object
}

class PayStatus extends React.Component<PayStatusProps>{
  constructor(props:PayStatusProps){
    super(props)
  }
  render(){
    let {orderType} = this.props;
    switch (orderType) {
      case 'pay':
        return (
          <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
              <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.fs14,mainStyle.c333]}>支付方式</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15,mainStyle.mab15,mainStyle.column]}>
              <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat15]}>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>微信支付</Text>
                <RadioSelect></RadioSelect>
              </View>
            </View>  
          </View>
        )
        break;
      case 'nopay':
        return (
          <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
              <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.fs14,mainStyle.c333]}>支付信息</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15,mainStyle.mab15,mainStyle.column]}>
              <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat15]}>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>待支付金额</Text>
                <Text style={[mainStyle.czt,mainStyle.fs12]}>
                  ￥
                  <Text style={[mainStyle.czt,mainStyle.fs18]}> 46.10</Text>
                </Text>
              </View>
            </View>  
          </View>
        )
        break;
      case 'afterpay':
        return (
          <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
            <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
              <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.fs14,mainStyle.c333]}>支付信息</Text>
              </View>
            </View>
            <View style={[mainStyle.palr15,mainStyle.mab15,mainStyle.column]}>
              <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat15]}>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>支付时间</Text>
                <Text style={[mainStyle.c333,mainStyle.fs14]}>2019/04/05  19:03</Text>
              </View>
              <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat15]}>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>支付方式</Text>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>微信支付</Text>
              </View>
              <View style={[mainStyle.flex1,mainStyle.row,mainStyle.jcBetween,mainStyle.mat15]}>
                <Text style={[mainStyle.c333,mainStyle.fs12]}>支付金额</Text>
                <Text style={[mainStyle.czt,mainStyle.fs12]}>
                  ￥
                  <Text style={[mainStyle.czt,mainStyle.fs18]}> 46.10</Text>
                </Text>
              </View>
            </View>  
          </View>
        )
        break;  
      default:
        return <View></View>
        break;
    }
  }
}

interface PayBarProps extends PayStatusProps {
  handleCancel:()=>void,
  handlePayment:()=>void,
  handleRefund:()=>void,
  data:object
}

class PayBar extends React.Component<PayBarProps>{
  constructor(props:PayBarProps){
    super(props)
  }
  render(){
    let {orderType,handlePayment,handleCancel,handleRefund,data} = this.props;
    switch (orderType) {
      case 'pay':
        return (
          <View style={[mainStyle.h120,mainStyle.brt1e2,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.palr15]}>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <Text style={[mainStyle.fs12,mainStyle.lh42,mainStyle.c333]}>
                合计：
                <Text style={[mainStyle.czt]}>￥</Text>
                <Text style={[mainStyle.czt,mainStyle.fs18]}>{data.orderPrice}</Text>
              </Text>
            </View>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <BxButton
              colors={[mainStyle.czt.color,mainStyle.cztc.color]}
              borderRadius={setSize(40)}
              disabled={false}
              title={'去支付'} 
              btnstyle={[mainStyle.mal15,{height:setSize(80),width:setSize(220)}]} 
              textstyle={[mainStyle.fs14]}
              onClick={()=>{handlePayment()}}>
              </BxButton>
            </View>
          </View>
        )
        break;
      case 'nopay':
        return (
          <View style={[mainStyle.h120,mainStyle.brt1e2,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.palr15]}>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt,mainStyle.icon,mainStyle.fs18,mainStyle.lh42]}>&#xe639;</Text>
              <Text style={[mainStyle.fs12,mainStyle.c333,mainStyle.lh44,{marginLeft:setSize(10)}]}>有问题，咨询在线客服</Text>
            </View>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <BxButton 
              colors={[mainStyle.czt.color,mainStyle.cztc.color]}
              borderRadius={setSize(35)}
              disabled={false}
              title={'去支付'} 
              btnstyle={[mainStyle.mal10,mainStyle.bgcfff,{height:setSize(70),width:setSize(170)}]} 
              textstyle={[mainStyle.fs12,mainStyle.cfff]}
              onClick={()=>{handlePayment()}}>
              </BxButton>
              <BxButton 
              colors={[mainStyle.cc2.color,mainStyle.c999.color]}
              borderRadius={setSize(35)}
              disabled={false}
              title={'取消订单'} 
              btnstyle={[mainStyle.mal10,mainStyle.bgcfff,{height:setSize(70),width:setSize(170)}]} 
              textstyle={[mainStyle.fs12,mainStyle.cfff]}
              onClick={()=>{handleCancel()}}>
              </BxButton>
            </View>
          </View>
        )
        break;
      case 'afterpay':
        return (
          <View style={[mainStyle.h120,mainStyle.brt1e2,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.palr15]}>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
            </View>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <BxButton
              colors={[mainStyle.cc2.color,mainStyle.c999.color]}
              borderRadius={setSize(40)}
              disabled={false}
              title={'申请退款'} 
              btnstyle={[mainStyle.mal10,mainStyle.bgcfff,{height:setSize(80),width:setSize(200)}]} 
              textstyle={[mainStyle.fs14,mainStyle.czt]}
              onClick={()=>{handleRefund()}}>
              </BxButton>
            </View>
          </View>
        )
        break;  
      default:
        return <View></View>
        break;
    }
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

export default Settlement