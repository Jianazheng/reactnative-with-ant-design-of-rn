import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import NavTop from '../../router/navTop';


interface Props {}

class ClassifyList extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{checked:true},{checked:false},{checked:false}]
    };
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  handleLeftItemSelect(index:number){
    let {arr} = this.state;
    this.setState(()=>{
      let newarr = arr;
      newarr.map((val,i)=>{
        val.checked = i==index?true:false
      })
      return {
        arr:newarr
      }
    })
  }

  leftListItem(checked:boolean,index:number,data:object){
    if(checked){
      return (
        <TouchableOpacity onPress={()=>{
          this.handleLeftItemSelect(index)
        }}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,styles.classItem,mainStyle.bgcf7]}>
            <Text style={[mainStyle.flex1,mainStyle.tc,styles.classItemTextOncheck]}>瑜伽</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity onPress={()=>{
          this.handleLeftItemSelect(index)
        }}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,styles.classItem,mainStyle.bgcfff]}>
            <Text style={[mainStyle.flex1,mainStyle.tc,styles.classItemText]}>瑜伽</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render(){
    let {arr} = this.state;
    let {navigation} = this.props;
    return (
      <View style={[mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="全部分类"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.flex1,mainStyle.row]}>
          <View style={[styles.leftList,mainStyle.bgcfff]}>
            <ScrollView
            nestedScrollEnabled
            style={[mainStyle.flex1]}
            >
              <View style={[mainStyle.flex1,mainStyle.column]}>
                {
                  arr.map((val,i)=>this.leftListItem(val.checked,i,val))
                }
              </View>
            </ScrollView>
          </View>
          <View style={[styles.rightList,mainStyle.bgcf7]}>
            <ScrollView
            nestedScrollEnabled
            style={[mainStyle.flex1]}
            >
              <RightListItem navigation={navigation}></RightListItem>
              <RightListItem navigation={navigation}></RightListItem>
              <RightListItem navigation={navigation}></RightListItem>
              <RightListItem navigation={navigation}></RightListItem>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

interface RightListItemProps {
  navigation:any
}

class RightListItem extends React.PureComponent<RightListItemProps>{
  constructor(props:RightListItemProps){
    super(props)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    return (
      <View style={[mainStyle.column,mainStyle.palr15]}>
        <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter]}>
          <Text style={[mainStyle.fs13,mainStyle.c333]}>初级瑜伽</Text>
        </View>
        <View style={[mainStyle.column]}>
          <TouchableOpacity style={[mainStyle.mab10,mainStyle.bgcfff]} onPress={()=>{
            this.goto('CourseInfo',{})
          }}>
            <Text style={[mainStyle.pa15,mainStyle.fs13,mainStyle.c333,mainStyle.lh36]}>第一阶：脉轮与胜王瑜伽初级</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mainStyle.mab10,mainStyle.bgcfff]} onPress={()=>{
            this.goto('CourseInfo',{})
          }}>
            <Text style={[mainStyle.pa15,mainStyle.fs13,mainStyle.c333,mainStyle.lh36]}>第二阶：瑜伽呼吸法与身印法初级</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[mainStyle.mab10,mainStyle.bgcfff]} onPress={()=>{
            this.goto('CourseInfo',{})
          }}>
            <Text style={[mainStyle.pa15,mainStyle.fs13,mainStyle.c333,mainStyle.lh36]}>第三阶：五大元素与心灵转化瑜伽初级心灵转化瑜伽初级</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  leftList:{
    width:screenW*0.25
  },
  classItem:{
    height:setSize(120)
  },
  classItemOncheck:{

  },
  classItemText:{
    color:mainStyle.c666.color,
    fontSize:setSize(26),
    borderLeftWidth:setSize(6),
    borderRightWidth:setSize(6),
    borderColor:mainStyle.cfff.color
  },
  classItemTextOncheck:{
    color:mainStyle.c333.color,
    fontSize:setSize(28),
    borderLeftWidth:setSize(6),
    borderRightWidth:setSize(6),
    borderLeftColor:mainStyle.czt.color,
    borderRightColor:mainStyle.bgcf7.backgroundColor
  },
  rightList:{
    width:screenW*0.75
  }
})

export default ClassifyList