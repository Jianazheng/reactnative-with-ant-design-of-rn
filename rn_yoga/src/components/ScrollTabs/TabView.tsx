import React from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ScrollView,Animated,
  Easing } from 'react-native';
import { mainStyle,setSize } from '../../public/style/style';

const { width, height } = Dimensions.get('window');
let scrollWidth = width-setSize(20);

interface Props {
  children:any[],
  changeIndex:number,
  height:number
}
type State = {
  tabViewSlide:number
}

class BxTabView extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabViewSlide:new Animated.Value(0)
    }
  }

  shouldComponentUpdate(np,ns){ 
    if(np.changeIndex!=this.props.changeIndex){
      this.tabToSilde(np.changeIndex);
      return true
    }else{
      return false
    }
  }

  tabToSilde(changeIndex){
    let {tabViewSlide} = this.state;
    //this.refs.tabview.scrollTo({x: changeIndex*(width-setSize(20)), y: 0, duration: 500});
    Animated.timing(tabViewSlide, {
      toValue: -scrollWidth*changeIndex,
      easing: Easing.bezier(1,0.8,0.6,0.4),
      duration: 100
    }).start();
  }
  

  render(){
    let {children} = this.props;
    let {tabViewSlide} = this.state; 
    let scrollHeight = this.props.height;
    return (
      <View style={[
        {
          height:scrollHeight,
          overflow:'hidden'
        }
      ]}>
        <ScrollView 
          ref="tabview"
          horizontal={true}
          scrollEnabled={false}
          >
          <Animated.View style={[mainStyle.row,mainStyle.jcBetween,
          {
            width:scrollWidth*children.length,
            transform:[
              {
                translateX:tabViewSlide
              }
            ]
          }
          ]}>
          {
            React.Children.map(children,(child, i)=>{
              return (
                <View style={[
                  {
                    height:scrollHeight,
                    width:scrollWidth
                  }
                ]}>
                  <ScrollView>
                    {child}
                  </ScrollView>
                </View>
                )
            })
          }
          </Animated.View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})

export default BxTabView