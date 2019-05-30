import React from 'react';
import { Text, View, Alert, Keyboard, TextInput, StyleSheet } from 'react-native';
import { mainStyle, setSize } from '../../public/style/style';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

class HomeSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.clear = () => {
      this.setState({ value: '' });
      Keyboard.dismiss();
    };
    this.onChange = value => {
      this.setState({ value });
    };
  }

  render(){
    let {value} = this.state;
    return (
      <View style={[mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.palr15,mainStyle.bgcfff,mainStyle.row]}>
        <View style={[mainStyle.bgcf2,mainStyle.row,mainStyle.aiCenter,styles.searcBar,mainStyle.flex1]}>
          <Text style={[mainStyle.icon,mainStyle.fs18]}>&#xe63f;</Text>
          <TextInput
          style={[styles.input,mainStyle.flex1]}
          placeholder="搜索培训课堂"
          ></TextInput>
        </View>
        <Text style={[mainStyle.icon,styles.btn,mainStyle.fs22]}>&#xe60a;</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searcBar:{
    height:setSize(80),
    paddingLeft:setSize(24),
    paddingRight:setSize(24),
    marginTop:setSize(10),
    marginBottom:setSize(10),
    borderRadius:setSize(40),
  },
  input:{
    paddingTop:0,
    paddingBottom:0
  },
  btn:{
    paddingLeft:setSize(20),
    paddingTop:setSize(20),
    paddingBottom:setSize(20)
  }
})

export default HomeSearchBar

