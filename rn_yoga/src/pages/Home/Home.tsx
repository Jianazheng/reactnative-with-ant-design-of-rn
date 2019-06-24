import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, DeviceEventEmitter } from 'react-native';
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
import { observer, inject } from 'mobx-react';
import RNStorage from './../../public/js/storage';


let { width, height } = Dimensions.get('window')

interface Props {}
interface State {
  canScroll:boolean,
  tabTop:number
}

@inject('userStore')
@observer
class Home extends React.Component<Props,State> {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({focused}) => {
      if (focused) {
          return (
            <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_home_sel.png')}></Image>
          );
      }
      return (
        <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_home_nor.png')}></Image>
      );
    },
  }

  TOLOGIN:object;

  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      tabTop:667,
      canScroll:false
    };
  }

  componentWillMount(){
    let {userStore,navigation} = this.props;
    RNStorage.load({
      key: 'token',
    }).then(res=>{
      console.log(res)
      userStore.setToken(res);
    }).catch(err=>{
      console.log(err)
    })
    this.TOLOGIN = DeviceEventEmitter.addListener('TOLOGIN',(res)=>{
      navigation.navigate('Login');
    })
  }

  componentWillUnmount(){
    this.TOLOGIN.remove();
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
    let {navigation} = this.props;
    return (
      <View style={[mainStyle.flex1]}>
        <ScrollView
        style={[mainStyle.flex1]}
        onScroll={(e)=>{
          this.handleScroll(e);
        }}
        >
          <View onLayout={(e)=>{
            this.setState({
              tabTop:e.nativeEvent.layout.height
            })
          }}>
            <HomeSearchBar 
            onSubmit={(e)=>{
              console.log(e)
            }}
            leftBtn={(
              <Text 
              style={[mainStyle.icon,mainStyle.pa15,{paddingRight:0},mainStyle.fs22]} 
              onPress={()=>{
                navigation.push('CartList')
              }}>&#xe60a;</Text>
            )}></HomeSearchBar>
            <HomeSwiper></HomeSwiper>
            <HomeBroadcast></HomeBroadcast>
          </View>
          <BxTabView 
          height={height-setSize(240)}
          canScroll={canScroll} 
          tabs={[{title:'推荐'},{title:'主轴课程'},{title:'非系统课程'},{title:'其他'}]} 
          navigateTo={()=>{}}>
            <Recommend navigation={navigation}></Recommend>
            <HomeCourse navigation={navigation}></HomeCourse>
            <View>
              <Text>265161333</Text>
            </View>
            <View>
              <Text>2333</Text>
            </View>
          </BxTabView>
        </ScrollView>
      </View>
    )
  }
}

export default Home