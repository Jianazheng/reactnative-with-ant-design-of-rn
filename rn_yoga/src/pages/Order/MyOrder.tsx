import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { mainStyle,screenH,setSize } from '../../public/style/style';
import NavTop from '../../router/navTop';
import BxTabView from '../../components/ScrollTabs/TabView';
import BxListView from '../../components/Pubilc/ListView';
import { CourseInfoItem2 } from '../../components/Course/CourseItem';


interface Props {}
interface State {
  tabs:Array<object>
}

class MyOrder extends React.Component<Props,State> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabs:[{title:'全部'},{title:'培训课程'},{title:'在线课程'},{title:'商品'}]
    };
  }

  render(){
    let {tabs} = this.state;
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
            listData={[{}]}
            colNumber={1}
            nomore={false}
            onLoadmore={()=>{}}
            listItem={({item,index})=><OrderItem data={{}}></OrderItem>}
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
  data:object
}

class OrderItem extends React.Component<OrderItemState,OrderItemProps>{
  constructor(props:OrderItemProps,state:OrderItemState){
    super(props)
  }
  render(){
    return (
      <View style={[mainStyle.column,mainStyle.mat15]}>
        <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.h80,mainStyle.bgcf7,mainStyle.palr15]}>
          <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter]}>
            <Text style={[mainStyle.icon,mainStyle.c333]}>&#xe63d;</Text>
            <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.mal10]}>订单号：8230832048234</Text>
          </View>
        </View>
        <View style={[mainStyle.bgcfff,mainStyle.palr15]}>
          <CourseInfoItem2 data={{title:'高阶体式提升计划高阶体式提升计划'}}></CourseInfoItem2>
        </View>
        
      </View>
    )
  }
}

export default MyOrder