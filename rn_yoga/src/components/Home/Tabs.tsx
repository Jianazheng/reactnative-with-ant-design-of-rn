import React from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ScrollView } from 'react-native';
import {Tabs} from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { mainStyle,setSize } from '../../public/style/style';
import BxTabbars from './../ScrollTabs/Tabbar';
import BxTabView from './../ScrollTabs/TabView';

let { width, height } = Dimensions.get('window')
interface Props {
  
}
interface State {
  tabs?:any[],
  tabIndex:number
}

class HomeTabs extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabs:[{title:'推荐'},{title:'主轴课程'},{title:'非系统课程'},{title:'其他'}],
      tabIndex:0
    }
  }

  handleOnChange(i){
    this.setState({
      tabIndex:i
    })
  }

  render(){
    let {tabs,tabIndex} = this.state;
    return (
      <View style={[mainStyle.palr10,mainStyle.column]}>
        <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
          <BxTabbars tabs={tabs} ontabChange={this.handleOnChange.bind(this)}></BxTabbars>
          <View>
            <IconFill name="appstore" size={24} color={mainStyle.czt.color}></IconFill>
          </View>
        </View>
        <View>
          <BxTabView height={height-setSize(300)} changeIndex={tabIndex}>
            <View>
              <Text>2333</Text>
            </View>
            <View>
              <Text>666</Text>
            </View>
            <View>
              <Text>2333</Text>
            </View>
            <View>
              <Text>2333</Text>
            </View>
          </BxTabView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default HomeTabs