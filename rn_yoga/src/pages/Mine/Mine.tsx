import React from 'react';
import { Text, View } from 'react-native';
import {mainStyle} from '../../public/style/style';

class Mine extends React.Component {
  static navigationOptions = {
    tabBarLabel: '个人中心',
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
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render(){
    return (
      <View>
        <Text>666</Text>
      </View>
    )
  }
}

export default Mine