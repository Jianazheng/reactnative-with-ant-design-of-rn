import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxRadio from '../../components/Pubilc/Radio';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  cartArr:Array<object>
}

class CartList extends React.Component<Props,State> {
  static navigationOptions = {
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      cartArr:[{arr:[{},{}]},{arr:[{},{}]}]
    };
  }

  render(){
    let {cartArr} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="购物车"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1,mainStyle.bgcf7]}>
          <View style={[mainStyle.column,mainStyle.flex1,mainStyle.pa15]}>
            {
              cartArr.map((val,i)=>(
                <CartArray data={val}></CartArray>
              ))
            }
          </View>
        </ScrollView>
        <View style={[mainStyle.h120,mainStyle.brt1e2,mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.palr15]}>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <BxRadio size={14} color={mainStyle.czt.color}></BxRadio>
            <Text style={[mainStyle.fs13,mainStyle.mal10,mainStyle.c666]}>全选</Text>
          </View>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs13,mainStyle.lh42,mainStyle.c333]}>
              合计：
              <Text style={[mainStyle.czt]}>￥</Text>
              <Text style={[mainStyle.czt,mainStyle.fs14]}>179.00</Text>
            </Text>
            <BxButton 
            disabled={false}
            title={'结算(0)'} 
            btnstyle={[mainStyle.palr15,mainStyle.mal15,{borderRadius:setSize(40),height:setSize(80)}]} 
            textstyle={[mainStyle.fs14]}
            onClick={()=>{}}>
            </BxButton>
          </View>
        </View>
      </View>
    )
  }
}

interface CartArrayProps {
  data:Array<object>
}


class CartArray extends React.Component<CartArrayProps>{
  constructor(props:CartArrayProps){
    super(props)
  }
  render(){
    
    return (
      <View style={[mainStyle.column,mainStyle.bgcfff,{borderRadius:setSize(10)},mainStyle.mab15]}>
        <View style={[mainStyle.brb1f2,mainStyle.patb15,mainStyle.palr15]}>
          <View style={[mainStyle.jcBetween,mainStyle.row,mainStyle.aiCenter]}>
            <Text style={[mainStyle.fs14,mainStyle.c333]}>有效培训课程（2）</Text>
            <Text style={[mainStyle.fs13,mainStyle.c666]}>移除</Text>
          </View>
        </View>
        <View style={[mainStyle.palr15,mainStyle.mab15]}>
        {
          this.props.data.arr.map((val,i)=>(
            <CartItem></CartItem>
          ))
        }
        </View>
      </View>
    )
  }
} 

let imgw = setSize(180);

class CartItem extends React.Component{
  render(){
    return (
      <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mat15]}>
        <View style={[mainStyle.mar15]}>
          <BxRadio 
          color={mainStyle.czt.color}
          data={{}}
          size={14}
          onChange={(e)=>{
          console.log(e)
          }}></BxRadio>
        </View>
        <Image 
        style={[{width:imgw,height:imgw,borderRadius:setSize(6)}]}
        mode="widthFix" 
        source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}>
        </Image>
        <View style={[mainStyle.column,mainStyle.aiStart,mainStyle.mal15,mainStyle.flex1]}>
          <Text style={[mainStyle.c333,mainStyle.fs13]}>高阶体式提升计划</Text>
          <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.bgcf7,mainStyle.pa5_10,mainStyle.mab5,mainStyle.mat5]}>师资班（6天，不含考证）2019年6月1日-6月30日</Text>
          <Text style={[mainStyle.czt,mainStyle.fs11,mainStyle.lh42]}>￥<Text style={[mainStyle.fs16]}>1800</Text></Text>
        </View>
      </View>
    )
  }
}


export default CartList