import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { mainStyle,setSize, screenW } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import {headerTitle,headerRight} from '../../router/navigationBar';
import BxRadio from '../../components/Pubilc/Radio';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import { Checkbox, TextareaItem } from '@ant-design/react-native';

interface Props {}
interface State {
  orderType:string,
  reason:Array<object>,
}

let imgw = setSize(180);

class RefundReason extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('购物车'),
    // headerRight:headerRight(<Text></Text>),
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      orderType:'',
      reason:[{title:'重复下单',checked:false},{title:'订单商品选择有误',checked:false},{title:'现在不想购买',checked:false},{title:'价格比较贵',checked:false},{title:'无法支付订单',checked:false},]
    };
  }
  

  componentDidMount(){
    // let {navigation:{state:{params}}} = this.props
    // console.log(params);
    // this.setState({
    //   orderType:params.type
    // })
  }

  selectReason(index:number){
    let {reason} = this.state;
    let newReason = reason;
    newReason[index].checked = !newReason[index].checked;
    this.setState({
      reason:newReason,
    })
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {reason} = this.state;
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
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>请选择取消订单原因</Text>
                </View>
              </View>
              <View style={[mainStyle.palr15,mainStyle.column,mainStyle.mat15]}>
                {
                  reason.map((val,i)=>(
                    <TouchableOpacity style={[mainStyle.mab10]} onPress={event => {
                      this.selectReason(i)
                    }}>
                      <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter]}>
                        <Text style={[mainStyle.fs13,val.checked?mainStyle.czt:mainStyle.c333]}>{val.title}</Text>
                        <Checkbox
                          checked={val.checked}
                          style={{ color: mainStyle.czt.color }}
                          >
                        </Checkbox>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <View style={[mainStyle.palr15,mainStyle.mab15,mainStyle.column]}>
                <Text style={[mainStyle.fs13,mainStyle.c333]}>其他</Text>
                <View style={[
                  mainStyle.mat10,
                  {
                    height:setSize(240),
                    borderRadius:setSize(8),
                    borderWidth:setSize(2),
                    borderColor:mainStyle.ce2.color,
                    padding:setSize(10)
                  }
                ]}>
                  <TextInput
                  placeholder = {'请输入原因'} 
                  multiline
                  style={[
                    mainStyle.fs13,
                    {
                      maxHeight:setSize(240),
                      paddingVertical: 0,
                    }
                  ]}
                  ></TextInput>
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
          title={'确认取消'} 
          btnstyle={[{height:setSize(80),width:screenW-setSize(60)}]} 
          textstyle={[mainStyle.fs14]}
          onClick={()=>{}}>
          </BxButton>        
        </View>
      </View>
    )
  }
}


export default RefundReason