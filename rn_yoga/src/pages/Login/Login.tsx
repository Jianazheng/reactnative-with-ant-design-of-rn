import React from 'react';
import { Text, View } from 'react-native';

interface Props {}
interface State {}

class Login extends React.Component<Props,State> {
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