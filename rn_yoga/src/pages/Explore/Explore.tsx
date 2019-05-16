import React from 'react';
import { Text, View } from 'react-native';

interface Props {}
interface State {}

class Login extends React.Component<Props,State> {
  static navigationOptions = {
    tabBarLabel: '探索',
    tabBarIcon: ({focused}) => {
        // if (focused) {
        //     return (
        //         <Image style={[mainStyle.icon]} source={require('../../img/tab_icon_my_sel.png')}/>
        //     );
        // }
        // return (
        //     <Image style={[mainStyle.icon]} source={require('../../img/tab_icon_my_nor.png')}/>
        // );
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