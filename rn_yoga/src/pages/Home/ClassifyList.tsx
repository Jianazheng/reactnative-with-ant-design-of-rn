import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';


interface Props {}

@inject('trainStore')
@observer
class ClassifyList extends React.Component<Props> {
  static navigationOptions = {
    header:null
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      arr: [{checked:true},{checked:false},{checked:false}],
      current:0
    };
  }

  componentDidMount(){
    let {trainStore} = this.props;
    trainStore.getClassify();
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }


  handleLeftItemSelect(index:number){
    let {trainStore} = this.props;
    this.setState(()=>{
      trainStore.classifySelect(index)
      return {
        current:index
      }
    })
  }

  leftListItem(checked:boolean,index:number,data:object){
    if(checked){
      return (
        <TouchableOpacity key={index.toString()} onPress={()=>{
          this.handleLeftItemSelect(index)
        }}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,styles.classItem,mainStyle.bgcf7]}>
            <Text style={[mainStyle.flex1,mainStyle.tc,styles.classItemTextOncheck]}>{data.category_name}</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
      return (
        <TouchableOpacity key={index.toString()} onPress={()=>{
          this.handleLeftItemSelect(index)
        }}>
          <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcCenter,styles.classItem,mainStyle.bgcfff]}>
            <Text style={[mainStyle.flex1,mainStyle.tc,styles.classItemText]}>{data.category_name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render(){
    let {current} = this.state;
    let {navigation,trainStore} = this.props;
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
                  trainStore.classify.map((val,i)=>
                    this.leftListItem(val.checked,i,val)
                  )
                }
              </View>
            </ScrollView>
          </View>
          <View style={[styles.rightList,mainStyle.bgcf7]}>
            <ScrollView
            nestedScrollEnabled
            style={[mainStyle.flex1]}
            >
              {
                trainStore.classify[current]?
                trainStore.classify[current].child.map((val,i)=>
                  <RightListItem key={i} navigation={navigation} item={val}></RightListItem>
                )
                :null
              }
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

interface RightListItemProps {
  navigation:object,
  item:object
}

class RightListItem extends React.PureComponent<RightListItemProps>{
  constructor(props:RightListItemProps){
    super(props)
  }

  goto(routeName:string,params:any){
    this.props.navigation.navigate(routeName,params);
  }

  render(){
    let {item} = this.props;
    return (
      <View style={[mainStyle.column,mainStyle.palr15]}>
        <View style={[mainStyle.h100,mainStyle.row,mainStyle.aiCenter]}>
          <Text style={[mainStyle.fs13,mainStyle.c333]}>{item.category_name}</Text>
        </View>
        <View style={[mainStyle.column]}>
          {
            item.sub_train.length>0?
            item.sub_train.map((val,i)=>
              <TouchableOpacity 
              key={i}
              style={[mainStyle.mab10,mainStyle.bgcfff]} onPress={()=>{
                this.goto('CourseInfo',{id:val.id})
              }}>
                <Text style={[mainStyle.pa15,mainStyle.fs13,mainStyle.c333,mainStyle.lh36]}>{val.train_name}</Text>
              </TouchableOpacity>
            )
            :<Text style={[mainStyle.pa15,mainStyle.fs13,mainStyle.c333,mainStyle.lh36,mainStyle.bgcfff]}>暂无课程</Text>
          }
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