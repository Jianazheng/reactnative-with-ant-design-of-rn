import React from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ScrollView,Animated,
  Easing } from 'react-native';
import { mainStyle,setSize,contentPadding } from '../../public/style/style';

import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import BxTabbars from './Tabbar';

const { width, height } = Dimensions.get('window');
let scrollWidth = width-contentPadding*2;

interface Props {
  children:any[],
  height:number,
  canScroll:boolean,
  tabs:Array<any>,
  tabAlign:'center'|'',
  tabWidth:number
}
type State = {
  currentIndex:number,
}

class BxTabView extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      currentIndex:0
    }
  }

  handleChange({i}){
    this.setState({
      currentIndex:i
    })
  }
  
  render(){
    let {children,tabs,tabAlign,canScroll,tabWidth} = this.props;
    let {currentIndex} = this.state; 
    let scrollHeight = this.props.height;
    return (
      <View style={[mainStyle.flex1]}>
        <ScrollableTabView
        style={[{height:scrollHeight}]}
        locked={false}
        onChangeTab={(e)=>{
          this.handleChange(e)
        }}
        initialPage={currentIndex}
        prerenderingSiblingsNumber={1}
        renderTabBar={()=><BxTabbars tabWidth={tabWidth} current={currentIndex} tabAlign={tabAlign} tabNames={tabs}></BxTabbars>}
        >
          
          {
            React.Children.map(children,(child, i)=>{
              return (    
                <ScrollView 
                scrollEnabled={canScroll} 
                nestedScrollEnabled={true}>
                  {child}
                </ScrollView>
              )
            })
          }
        </ScrollableTabView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  
})

export default BxTabView