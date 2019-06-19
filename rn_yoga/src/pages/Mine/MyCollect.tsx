import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { mainStyle,screenH,setSize, screenW } from '../../public/style/style';
import NavTop from '../../router/navTop';
import BxTabView from '../../components/ScrollTabs/TabView';
import BxListView from '../../components/Pubilc/ListView';


interface Props {}
interface State {
  tabs:Array<object>
}

class MyCollect extends React.Component<Props,State> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabs:[{title:'培训课程'},{title:'在线课程'},{title:'商品'}]
    };
  }

  render(){
    let {tabs} = this.state;
    return (
      <View style={[mainStyle.column,mainStyle.flex1,mainStyle.bgcf2]}>
        <NavTop
        navType="normal"
        title="我的收藏"
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
          <View style={[mainStyle.patb15]}>
            <BxListView
            listData={[{},{},{},{},{},{},{},{},{},{}]}
            colNumber={1}
            nomore={true}
            onLoadmore={()=>{}}
            listItem={({item,index})=><CollectItem type="outline" navigation={this.props.navigation} data={{}}></CollectItem>}
            ></BxListView>
          </View>
          <View style={[mainStyle.patb15]}>
            <BxListView
            listData={[{},{},{},{},{},{},{},{},{},{}]}
            colNumber={1}
            nomore={true}
            onLoadmore={()=>{}}
            listItem={({item,index})=><CollectItem type="online" navigation={this.props.navigation} data={{}}></CollectItem>}
            ></BxListView>
          </View>
          <View style={[mainStyle.flex1,mainStyle.mab15,{paddingLeft:setSize(10),paddingRight:setSize(10)}]}>
            <BxListView
            listData={[{},{},{},{},{},{},{},{},{},{}]}
            colNumber={2}
            nomore={true}
            onLoadmore={()=>{}}
            listItem={({item,index})=><CollectItem type="goods" navigation={this.props.navigation} data={{}}></CollectItem>}
            ></BxListView>
          </View>
        </BxTabView>
      </View>
    )
  }
}

interface CollectItemState {

}

interface CollectItemProps {
  data:object,
  navigation:any,
  type:'outline'|'online'|'goods'
}

class CollectItem extends React.Component<CollectItemState,CollectItemProps>{
  constructor(props:CollectItemProps){
    super(props)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {type} = this.props;
    switch (type) {
      case 'outline':
        return (
          <View style={[mainStyle.row,mainStyle.pa15,mainStyle.bgcfff,mainStyle.brb1f2,mainStyle.aiStart,mainStyle.jcBetween]}>
            <TouchableOpacity 
            onPress={()=>{
              this.goto('CourseInfo',{});
            }}
            style={[styles.outline]}>
              <Image
              style={[styles.outlineImg]}
              resizeMode="cover" 
              source={{uri:'http://center.jkxuetang.com/wp-content/themes/jkxuetang/images/slider3.png'}}
              ></Image>
            </TouchableOpacity>
            <View style={[mainStyle.column,mainStyle.flex1,mainStyle.mal15]}>
              <TouchableOpacity 
              style={[mainStyle.h70,mainStyle.mab10,mainStyle.mat5]}
              onPress={()=>{
                this.goto('CourseInfo',{});
              }}>
                <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh42,mainStyle.mab5]} numberOfLines={2}>高阶体式提升计高阶体式提升计划高阶体式提升计划高阶体式提升计划高阶体式提升计划划</Text>
              </TouchableOpacity>
              <Text style={[mainStyle.c999,mainStyle.fs12]}>2019.06.01-06.30</Text>
              <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.flex1]}>
                <View style={[mainStyle.row,mainStyle.aiEnd]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>￥5900</Text>
                  <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mal15]}>12人报名</Text>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,{top:setSize(0)}]}>
                  <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe655;</Text>
                  <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh44,mainStyle.mal10]}>取消收藏</Text>
                </View>
              </View>
            </View>
          </View>
        )
        break;
      case 'online':
        return (
          <View style={[mainStyle.row,mainStyle.pa15,mainStyle.bgcfff,mainStyle.brb1f2,mainStyle.aiStart,mainStyle.jcBetween]}>
            <TouchableOpacity 
            style={[styles.outline]}
            onPress={()=>{
              this.goto('CourseInfo',{});
            }}>
              <Image
              style={[styles.outlineImg]}
              resizeMode="cover" 
              source={{uri:'http://center.jkxuetang.com/wp-content/themes/jkxuetang/images/slider3.png'}}
              ></Image>
            </TouchableOpacity>
            <View style={[mainStyle.column,mainStyle.flex1,mainStyle.mal15]}>
              <TouchableOpacity 
              style={[mainStyle.h70,mainStyle.mab10,mainStyle.mat5]}
              onPress={()=>{
                this.goto('CourseInfo',{});
              }}>
                <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh42,mainStyle.mab5]} numberOfLines={2}>高阶体式提升计划</Text>
              </TouchableOpacity>
              <View style={[mainStyle.row]}>
                <Text style={[mainStyle.c999,mainStyle.fs12,mainStyle.bgcf7,
                  {
                    borderRadius:setSize(12),
                    paddingLeft:setSize(14),
                    paddingRight:setSize(14),
                    paddingTop:setSize(2),
                    paddingBottom:setSize(2)
                  }
                  ]}>6课时</Text>
              </View>
              <View style={[mainStyle.row,mainStyle.jcBetween,mainStyle.aiCenter,mainStyle.flex1]}>
                <View style={[mainStyle.row,mainStyle.aiEnd]}>
                  <Text style={[mainStyle.fs14,mainStyle.c333]}>￥5900</Text>
                  <Text style={[mainStyle.fs12,mainStyle.c999,mainStyle.mal15]}>12人报名</Text>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,{top:setSize(0)}]}>
                  <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe655;</Text>
                  <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh44,mainStyle.mal10]}>取消收藏</Text>
                </View>
              </View>
            </View>
          </View>
        )
        break;  
      case 'goods':
        return (
          <View style={[mainStyle.column,mainStyle.mat15,mainStyle.bgcfff,styles.goods]}>
            <TouchableOpacity 
            onPress={()=>{
              this.goto('CourseInfo',{});
            }}
            style={[styles.goodsImg]}>
              <Image
              style={[styles.goodsImg]}
              resizeMode="cover" 
              source={{uri:'http://center.jkxuetang.com/wp-content/themes/jkxuetang/images/slider3.png'}}
              ></Image>
            </TouchableOpacity>
            <View style={[mainStyle.pa5_10]}>
              <View style={[mainStyle.h70,mainStyle.mab10,mainStyle.mat5]}>
                <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh42,mainStyle.mab5]} numberOfLines={2}>高阶体式提升计高阶体式提升计划高阶体式提升计划高阶体式提升计划高阶体式提升计划划</Text>
              </View>
              <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.mab5]}>
                <View style={[mainStyle.row,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs12,mainStyle.czt,mainStyle.lh44]}>￥</Text>
                  <Text style={[mainStyle.fs16,mainStyle.czt,mainStyle.lh44]}>59</Text>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter]}>
                  <Text style={[mainStyle.icon,mainStyle.czt]}>&#xe655;</Text>
                  <Text style={[mainStyle.fs13,mainStyle.c333,mainStyle.lh44,mainStyle.mal10]}>取消收藏</Text>
                </View>
              </View>
            </View>
          </View>
        )
        break; 
    }
  }
}

let goodsImg = (screenW-setSize(80))/2;
let outlineImg = screenW*0.26;

const styles = StyleSheet.create({
  outline:{
    width:outlineImg,
    borderRadius:setSize(8),
    overflow:'hidden',
  },
  outlineImg:{
    width:outlineImg,
    height:outlineImg
  },
  goods:{
    width:goodsImg,
    borderRadius:setSize(8),
    overflow:'hidden',
    marginLeft:setSize(20)
  },
  goodsImg:{
    width:goodsImg,
    height:goodsImg
  },
})

export default MyCollect