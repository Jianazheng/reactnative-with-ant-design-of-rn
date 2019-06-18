import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import {mainStyle, setSize,screenH, screenW} from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import BxListView from '../../components/Pubilc/ListView';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  
}
class GoodsList extends React.Component<Props,State> {

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      arr:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
    };
  }

  static navigationOptions = {
    header:null,
  }

  
  render(){
    let {arr} = this.state;
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="商城"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.row,mainStyle.h100,mainStyle.aiCenter,mainStyle.bgcfff]}>
          <TouchableOpacity style={[mainStyle.flex1,mainStyle.h100,mainStyle.aiCenter,mainStyle.jcCenter]}>
            <Text style={[mainStyle.czt,mainStyle.lh42]}>
              <Text style={[mainStyle.fs13]}>全部</Text>
              <Text style={[mainStyle.icon,mainStyle.fs14]}>&#xe8ec;</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mainStyle.flex1,mainStyle.h100,mainStyle.aiCenter,mainStyle.jcCenter]}>
            <Text style={[mainStyle.c333,mainStyle.lh42]}>
              <Text style={[mainStyle.fs13]}>默认排序</Text>
              <Text style={[mainStyle.icon,mainStyle.fs14]}>&#xe8ec;</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView
        >
          <View style={[mainStyle.row,mainStyle.wrap,mainStyle.jcBetween,mainStyle.pa15]}>
            {
              arr.map((val,i)=>(
                <GoodsItem></GoodsItem>
              ))
            }
          </View>
        </ScrollView> */}
        <BxListView
        listData={arr}
        listItem={({item,index})=><GoodsItem navigation={this.props.navigation} key={index.toString()} index={index}></GoodsItem>}
        nomore={true}
        colNumber={2}
        >
        </BxListView>
      </View>
    )
  }
}

interface GoodsItemProps {
  key:string,
  index:number,
  navigation:any
}
interface GoodsItemState {
  
}

let imgw = (screenW-setSize(80))*0.5;

class GoodsItem extends React.Component<GoodsItemProps,GoodsItemState> {
  
  constructor(props:GoodsItemProps,state:GoodsItemState) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    let {navigation,index} = this.props;
    return (
      <TouchableOpacity 
      style={[mainStyle.mab10,{overflow:'hidden',borderRadius:setSize(8),marginLeft:index%2!=0?setSize(20):setSize(30)}]}
      onPress={()=>{
        navigation.push('CourseInfo')
      }}>
        <View style={[
          mainStyle.bgcfff,
          { 
            width:imgw
          }
        ]}>
          <Image
          style={[{width:imgw,height:imgw}]}
          mode="widthFix" 
          source={{uri:'http://center.jkxuetang.com/wp-content/uploads/2019/05/cover-pic_-real-estate.jpg'}}>
          </Image>
          <View style={[mainStyle.column,
            {
              padding:setSize(20)
            }
          ]}>
            <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh42,{height:setSize(84)}]}>高阶体式提升计划高阶体式提升计划高阶体式提升计划高阶体式提升计划</Text>
            <View style={[mainStyle.row,mainStyle.mat5]}>
              <Text style={[mainStyle.fs12,mainStyle.czt,mainStyle.lh44]}>￥</Text>
              <Text style={[mainStyle.fs16,mainStyle.czt,mainStyle.lh42]}>49</Text>
              <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mal10,mainStyle.lh42]}>122 人购买</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default GoodsList