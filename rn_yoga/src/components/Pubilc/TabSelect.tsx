import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window')
interface Props {
  tabs?:Array<object>,
  handleChange:(data:object)=>void
}
interface State {
  tabs?:Array<any>,
  tabIndex:number
}

class TabSelect extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabs:[{title:'初级课程'},{title:'中级课程'},{title:'高级课程'},],
      tabIndex:0
    }
  }

  handleOnChange(i:number,data:object){
    this.setState({
      tabIndex:i
    },()=>{
      if(this.props.handleChange)this.props.handleChange({i,data})
    })
  }

  render(){
    let {tabIndex} = this.state;
    let {tabs} = this.props;
    return (
      <View style={[mainStyle.flex1,{height:setSize(100)}]}>
        <ScrollView 
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[mainStyle.row,mainStyle.flex1]}>
          <View style={[mainStyle.row,mainStyle.mal10,mainStyle.mar10,mainStyle.aiCenter,mainStyle.h100]}>
          {
            tabs.map((val,i)=>{
              return (
                <View style={[styles.tabItem,mainStyle.aiCenter,mainStyle.jcCenter]} key={i}>
                  <TouchableOpacity style={[mainStyle.flex1,mainStyle.aiCenter,mainStyle.jcCenter,styles.info,i==tabIndex?mainStyle.bgcju:null]} 
                  onPressIn={()=>{
                    this.handleOnChange(i,val)
                  }}>
                    <Text style={[i==tabIndex?styles.textSel:styles.textNor,mainStyle.fs14]}>{val.category_name}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabItem:{
    height:setSize(60),
    width:(width-setSize(100))/3,
    paddingLeft:setSize(10),
    paddingRight:setSize(10)
  },
  info:{
    width:(width-setSize(160))/3,
    borderRadius:setSize(30)
  },
  textNor:{
    color:mainStyle.c666.color
  },
  textSel:{
    color:mainStyle.cfff.color
  }
})

export default TabSelect