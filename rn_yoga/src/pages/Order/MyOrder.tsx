import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { mainStyle,screenH,setSize } from '../../public/style/style';
import NavTop from '../../router/navTop';
import BxTabView from '../../components/ScrollTabs/TabView';
import BxListView from '../../components/Pubilc/ListView';
import { CourseInfoItem2 } from '../../components/Course/CourseItem';
import BxButton from './../../components/Pubilc/Button';
import { observer, inject } from 'mobx-react';


interface Props {}
interface State {
  tabs:Array<object>
}

@inject('orderStore')
@observer
class MyOrder extends React.Component<Props,State> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabs:[{title:'全部',type:'all'},{title:'未支付',type:'unpay'},{title:'已支付',type:'pay'},{title:'已取消',type:'cancel'}]
    };
  }

  componentDidMount(){
    // let {orderStore,navigation} = this.props
    // let {params} = navigation.state
    // params = {type:'all'}
    this.handleLoadOrder()
  }

  handleLoadOrder(){
    console.log(233)
    let {orderStore,navigation} = this.props
    let {params} = navigation.state
    params = {type:'all'}
    orderStore.getOrderList(params.type)
  }

  render(){
    let {tabs} = this.state
    let {navigation,orderStore,orderStore:{orderListAll}} = this.props
    let {params} = navigation.state
    console.log(orderListAll)
    return (
      <View style={[mainStyle.column,mainStyle.flex1,mainStyle.bgcf2]}>
        <NavTop
        navType="normal"
        title="我的订单"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <BxTabView
        height={screenH-setSize(240)}
        canScroll={true}
        tabAlign={'center'}
        tabs={tabs}
        >
          <View style={[mainStyle.flex1]}>
            <BxListView
            pab={setSize(20)}
            listData={orderListAll.data.slice()}
            colNumber={1}
            nomore={false}
            loading={orderListAll.total==null||orderListAll.total>orderListAll.data.length}
            onLoadmore={()=>{
              this.handleLoadOrder()
            }}
            listItem={({item,index})=><OrderItem navigation={this.props.navigation} data={item}></OrderItem>}
            ></BxListView>
          </View>
          <View>
            <Text>2333</Text>
          </View>
          <View>
            <Text>2333</Text>
          </View>
          <View>
            <Text>2333</Text>
          </View>
        </BxTabView>
      </View>
    )
  }
}

interface OrderItemState {

}

interface OrderItemProps {
  data:object,
  navigation:any
}

class OrderItem extends React.Component<OrderItemState,OrderItemProps>{
  constructor(props:OrderItemProps){
    super(props)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    return (
      <View style={[mainStyle.column,mainStyle.mat15,mainStyle.bgcfff]}>
        <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.h100,mainStyle.bgcf7,mainStyle.palr15]}>
          <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter]}>
            <Text style={[mainStyle.icon,mainStyle.c333]}>&#xe63d;</Text>
            <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>订单号：8230832048234</Text>
          </View>
          <Text style={[mainStyle.fs13,mainStyle.czt]}>待付款</Text>
        </View>
        <View style={[mainStyle.bgcfff,mainStyle.palr15]}>
          <CourseInfoItem2 data={{title:'高阶体式提升计划高阶体式提升计划'}}></CourseInfoItem2>
        </View>
        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.h100,mainStyle.brt1f2]}>
          <Text style={[mainStyle.lh44,mainStyle.mal15]}>
            <Text style={[mainStyle.fs13,mainStyle.c333]}>待支付金额：</Text>
            <Text style={[mainStyle.fs14,mainStyle.czt]}>￥1800</Text>
          </Text>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mar15]}>
            <BxButton
            title={'去支付'}
            plain
            color={mainStyle.czt.color}
            borderRadius={setSize(30)}
            btnstyle={[mainStyle.bgcfff,mainStyle.h60,mainStyle.palr15]}
            textstyle={[mainStyle.fs13]}
            onClick={()=>{
              this.goto('Settlement',{type:'pay'});
            }}
            ></BxButton>
            <BxButton
            title={'取消订单'}
            plain
            color={mainStyle.c666.color}
            borderRadius={setSize(30)}
            btnstyle={[mainStyle.bgcfff,mainStyle.h60,mainStyle.palr15,mainStyle.mal10]}
            textstyle={[mainStyle.fs13]}
            onClick={()=>{
              this.goto('ApplyRefund',{type:'pay'});
            }}
            ></BxButton>
          </View>
        </View>
      </View>
    )
  }
}

export default MyOrder