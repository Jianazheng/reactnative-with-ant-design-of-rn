import React from 'react';
import { Text, View, StyleSheet,Dimensions,TouchableOpacity,ScrollView } from 'react-native';
import { IconFill } from "@ant-design/icons-react-native";
import { mainStyle,setSize } from '../../public/style/style';

let { width, height } = Dimensions.get('window')
interface Props {
  
}
interface State {
  tabIndex:number,
  index:number,
  routes:Array<any>
}

class HomeTabView extends React.Component<Props,State> {
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabIndex:0,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    }
  }

  handleOnChange(i:number){
    this.setState({
      tabIndex:i
      
    })
  }

  handleSelectChange(index){
    
  }

  render(){
    
    return (
      <Text></Text>
    )
  }
}

class TabViewInfo extends React.Component{
  render(){
    return(
      <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
    )
  }
}

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);



const styles = StyleSheet.create({
  scene:{
    height:height,
    flex:1
  }
})

export default HomeTabView