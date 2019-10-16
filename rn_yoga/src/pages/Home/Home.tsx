import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, DeviceEventEmitter, RefreshControl, TouchableOpacity, StatusBarIOS, PermissionsAndroid } from 'react-native';
import HomeSearchBar from '../../components/Home/SeachBar';
import HomeBroadcast from '../../components/Home/Broadcast';
import HomeSwiper from '../../components/Home/Swiper';
import { mainStyle, setSize } from '../../public/style/style';
import TabSelect from '../../components/Pubilc/TabSelect';
import { IconOutline } from "@ant-design/icons-react-native";
import { Button } from '@ant-design/react-native';
import Recommend from './Recommend';
import HomeCourse from './Course';
import BxTabView from './../../components/ScrollTabs/TabView';
import { observer, inject } from 'mobx-react';
import RNStorage from './../../public/js/storage';
import { isios } from '../../tools/function'

let { width, height } = Dimensions.get('window')

interface Props { }
interface State {
  canScroll: boolean,
  tabTop: number,
  tabIndex: number,
  refreshing: boolean,
  statusBar: number
}

@inject('userStore', 'homeStore', 'cartStore')
@observer
class Home extends React.Component<Props, State> {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => {
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

  TOLOGIN: object;
  TOBIND: object;

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      tabTop: 667,
      tabIndex: 0,
      canScroll: false,
      refreshing: false,
      statusBar: 0
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    let { homeStore, userStore, cartStore, navigation } = this.props
    homeStore.getBanner()
    homeStore.getAnnouncement()
    homeStore.getTrainCate()
    homeStore.getupdate()
    RNStorage.load({
      key: 'token',
    }).then(res => {
      console.log(res)
      userStore.setToken(res)
      cartStore.getCartList();
    }).catch(err => {
      //console.log(err)
    })

    this.TOLOGIN = DeviceEventEmitter.addListener('TOLOGIN', res => {
      navigation.navigate('Login')
    })
    this.TOBIND = DeviceEventEmitter.addListener('TOBIND', res => {
      navigation.navigate('WxBind', { wxdata: res })
    })
    if (isios()) {
      let _this = this;
      StatusBarIOS._nativeModule.getHeight((h) => {
        this.setState({
          statusBar: h.height
        })
      });
    }
    this.requestReadPermission()

  }

  componentWillUnmount() {
    this.TOLOGIN.remove()
    this.TOBIND.remove()
  }
  async requestReadPermission() {
    try {
      if (!isios()) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            'title': '提示',
            'message': '没有访问相机权限，会导致后面无法保存图片到相册哦'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('你已获取了读写权限');
          // 继续运行其它代码
        } else {
          console.log('获取读写权限失败');
        }
      } else {
        console.log('你已获取了读写权限');
        // 继续运行其它代码
      }
    } catch (err) {
      console.log(err.toString());
    }
  }
  goto() {
    this.props.navigation.push('Login');
  }

  handleScroll(e: any) {
    let { tabTop } = this.state;
    if (e.nativeEvent) {
      // console.log(e.nativeEvent);
      this.setState({
        canScroll: e.nativeEvent.contentOffset.y >= (tabTop)
      })
    }
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    }, () => {
      let { homeStore } = this.props
      homeStore.getupdate()
      homeStore.getBanner()
      homeStore.getAnnouncement()
      homeStore.getTrainCate()
        .then(res => {
          this.setState({
            refreshing: false
          })
          DeviceEventEmitter.emit('TORELOADTRAINITEM', 'yes');
        })
      DeviceEventEmitter.emit('TORELOADRECOMMEND', 'yes');
    })
  }
  childrenScroll() {
    this.setState({
      canScroll: false
    })
  }
  render() {
    let { canScroll, tabIndex, refreshing, statusBar } = this.state;
    let { navigation, homeStore, cartStore: { hascart } } = this.props;
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf2, { marginTop: statusBar }]}>
        <ScrollView
          style={[mainStyle.flex1]}
          onScroll={(e) => {
            this.handleScroll(e);
          }}
          scrollEventThrottle={1}
          stickyHeaderIndices={[1]}
          refreshControl={(
            <RefreshControl
              tintColor={mainStyle.czt.color}
              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          )}
        >
          <View onLayout={(e) => {
            // console.log(e.nativeEvent.layout.height)
            this.setState({
              tabTop: e.nativeEvent.layout.height
            })
          }}
          >
            <HomeSearchBar
              onFocus={(e) => { navigation.push('Search'); }}
              leftBtn={(
                <TouchableOpacity onPress={() => {
                  navigation.push('CartList')
                }} style={[mainStyle.positonre]}>
                  <Text style={[mainStyle.icon, mainStyle.pa15, { paddingRight: 0 }, mainStyle.fs22]}>&#xe60a;</Text>
                  {hascart ? <Text style={[mainStyle.circle]}></Text> : null}
                </TouchableOpacity>
              )}></HomeSearchBar>
            <HomeSwiper navigation={navigation} img={homeStore.banner}></HomeSwiper>
            <HomeBroadcast navigation={navigation} list={homeStore.announcement}></HomeBroadcast>
          </View>
          {
            homeStore.trainCate.length > 0
              ? <BxTabView
                height={height}
                canScroll={canScroll}
                tabs={homeStore.trainCate}
                currentPageIndex={tabIndex}
                tabChange={(e) => {
                  this.setState({
                    tabIndex: e
                  })
                }}
                childrenScroll={
                  this.childrenScroll.bind(this)
                }
                navigateTo={() => { navigation.push('ClassifyList') }}
              >
                <View style={[mainStyle.flex1, mainStyle.pab140]}>
                  <Recommend navigation={navigation}></Recommend>
                </View>
                {
                  homeStore.trainCateShow.length > 0 ?
                    homeStore.trainCateShow.map((val, i) =>
                      <View style={[mainStyle.flex1, mainStyle.bgcf2, mainStyle.pab140]} key={i}>
                        <HomeCourse currentIndex={i} tabIndex={tabIndex} data={val.child} navigation={navigation}></HomeCourse>
                      </View>
                    ) : null
                }
              </BxTabView>
              : null
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home