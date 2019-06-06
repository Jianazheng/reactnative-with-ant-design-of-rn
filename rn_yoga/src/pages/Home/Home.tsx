import React from 'react';
import { Text, View, ScrollView,Image,Dimensions } from 'react-native';
import HomeSearchBar from '../../components/Home/SeachBar';
import HomeBroadcast from '../../components/Home/Broadcast';
import HomeSwiper from '../../components/Home/Swiper';
import {mainStyle, setSize} from '../../public/style/style';
import TabSelect from '../../components/Pubilc/TabSelect';
import { IconOutline } from "@ant-design/icons-react-native";
import { Button } from '@ant-design/react-native';
import Recommend from './Recommend';
import HomeCourse from './Course';
import BxTabView from './../../components/ScrollTabs/TabView';

let { width, height } = Dimensions.get('window')

interface Props {}
interface State {
  canScroll:boolean,
  tabTop:number
}
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
      tabTop:667,
      canScroll:false
    };
  }

  componentDidMount(){
    console.warn('点击dismiss')
  }

  goto(){
    this.props.navigation.push('Login');
  }

  handleScroll(e:any){
    let {tabTop} = this.state;
    if(e.nativeEvent){
      this.setState({
        canScroll:tabTop<=e.nativeEvent.contentOffset.y+setSize(120)
      })
    }
  }

  render(){
    let {canScroll} = this.state;
    return (
      <ScrollView
        onScroll={(e)=>{
          this.handleScroll(e);
        }}
        >
        <View onLayout={(e)=>{
          this.setState({
            tabTop:e.nativeEvent.layout.height
          })
        }}>
          <HomeSearchBar></HomeSearchBar>
          <HomeSwiper></HomeSwiper>
          <HomeBroadcast></HomeBroadcast>
        </View>
        <BxTabView 
        height={height-setSize(240)}
        canScroll={canScroll} 
        tabs={[{title:'推荐'},{title:'主轴课程'},{title:'非系统课程'},{title:'其他'}]} 
        navigateTo={()=>{}}>
          <Recommend></Recommend>
          <HomeCourse></HomeCourse>
          <View>
            <Text>265161333</Text>
          </View>
          <View>
            <Text>2333</Text>
          </View>
        </BxTabView>
        
      </ScrollView>
    )
  }
}

export default Home