import React from 'react';
import { Text, View, ScrollView,Image } from 'react-native';
import HomeSearchBar from '../../components/Home/SeachBar';
import HomeBroadcast from '../../components/Home/Broadcast';
import HomeSwiper from '../../components/Home/Swiper';
import HomeTabs from '../../components/Home/Tabs';
import {mainStyle} from '../../public/style/style';
import { IconOutline } from "@ant-design/icons-react-native";
import { Button } from '@ant-design/react-native';

interface Props {}
interface State {}
class Home extends React.Component<Props,State> {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({focused}) => {
      if (focused) {
          return (
            <IconOutline name="home" size={24} color={mainStyle.czt.color}></IconOutline>
          );
      }
      return (
        <IconOutline name="home" size={24} color={mainStyle.c666.color}></IconOutline>
      );
    },
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      value: ''
    };
  }

  goto(){
    this.props.navigation.push('Login');
  }

  render(){
    return (
      <View>
        <ScrollView>
          <HomeSearchBar></HomeSearchBar>
          <HomeBroadcast></HomeBroadcast>
          <HomeSwiper></HomeSwiper>
          <HomeTabs></HomeTabs>
          <Button onPressIn={()=>{this.goto()}}>登录</Button>
        </ScrollView>
      </View>
    )
  }
}

export default Home