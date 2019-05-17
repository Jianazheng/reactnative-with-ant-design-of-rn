import React from 'react';
import { Text, View } from 'react-native';
import { mainStyle } from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";

interface Props {}
interface State {}

class Login extends React.Component<Props,State> {
  static navigationOptions = {
    tabBarLabel: '探索',
    tabBarIcon: ({focused}) => {
      if (focused) {
          return (
            <IconOutline name="compass" size={24} color={mainStyle.czt.color}></IconOutline>
          );
      }
      return (
        <IconOutline name="compass" size={24} color={mainStyle.c666.color}></IconOutline>
      );
    },
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return (
      <View>
        <Text>2333</Text>
      </View>
    )
  }
}

export default Login