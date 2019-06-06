import React from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ScrollView } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';
import BxTabbars from './../ScrollTabs/Tabbar';
import BxTabView from './../ScrollTabs/TabView';
import TabSelect from '../Pubilc/TabSelect';

let { width, height } = Dimensions.get('window')
interface Props {
  canScroll:boolean,
  tabs?:Array<object>,
  navigateTo:()=>void,
  tabAlign:'center'|''
}
interface State {
  tabs?:Array<any>,
  tabIndex:number
}

class HomeTabs extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabIndex:0
    }
  }

  handleOnChange(i:number){
    this.setState({
      tabIndex:i
    })
  }

  handleSelectChange(index){
    console.log(index)
  }

  render(){
    let {tabIndex} = this.state;
    let {canScroll,tabs,tabAlign,navigateTo} = this.props;
    return (
      <View style={[mainStyle.flex1]}>
        <BxTabView tabs={tabs} height={height-setSize(240)} canScroll={canScroll} changeIndex={tabIndex}>
          {this.props.children}
        </BxTabView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  
})

export default HomeTabs