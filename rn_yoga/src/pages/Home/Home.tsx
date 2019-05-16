import React from 'react';
import { Text, View, ScrollView,Image } from 'react-native';
import HomeSearchBar from '../../components/Home/SeachBar';
import HomeBroadcast from '../../components/Home/Broadcast';
import HomeSwiper from '../../components/Home/Swiper';
import HomeTabs from '../../components/Home/Tabs';
import {mainStyle} from '../../public/style/style';

interface Props {}
interface State {}
class Home extends React.Component<Props,State> {
  static navigationOptions = {
    tabBarLabel: '首页',
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
      value: ''
    };
  }

  render(){
    return (
      <View>
        <ScrollView>
          <HomeSearchBar></HomeSearchBar>
          <HomeBroadcast></HomeBroadcast>
          <HomeSwiper></HomeSwiper>
          <HomeTabs></HomeTabs>
        </ScrollView>
      </View>
    )
  }
}

export default Home