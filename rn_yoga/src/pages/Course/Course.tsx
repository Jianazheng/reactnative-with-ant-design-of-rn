import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import LinearGradient from 'react-native-linear-gradient';
import { CourseListItem } from '../../components/Course/CourseItem';
import { observer, inject } from 'mobx-react';
import { ActivityIndicator } from '@ant-design/react-native';

interface Props { }

const defaultIcon = require('../../../images/defaultIcon.png')

@inject('courseStore', 'userStore')
@observer
class Course extends React.Component<Props> {
  static navigationOptions = {
    tabBarLabel: '课程',
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return (
          <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_course_sel.png')}></Image>
        );
      }
      return (
        <Image style={[mainStyle.tabImg]} source={require('../../../images/tab_course_nor.png')}></Image>
      );
    },
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false
    };
  }

  componentDidMount() {
    this.loadCourse()
  }

  async loadCourse() {
    try {
      let { userStore, courseStore } = this.props
      await userStore.GetUserInfo()
      await courseStore.getOnlineCourseList()
      this.setState({
        loading: false,
        refreshing: false
      })
    } catch (error) {
      this.setState({
        loading: false,
        refreshing: false
      })
    }
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params)
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    }, () => {
      this.loadCourse()
    })
  }

  render() {
    let { loading } = this.state;
    let { navigation, userStore, courseStore } = this.props;
    let userInfo = userStore.userInfo;
    let onlineCourseList = courseStore.onlineCourseList
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <ActivityIndicator
          toast
          size="large"
          text="加载中..."
          animating={loading}
        ></ActivityIndicator>
        <ScrollView
          style={[mainStyle.flex1, mainStyle.positonre]}
          refreshControl={(
            <RefreshControl
              tintColor={mainStyle.czt.color}
              colors={[mainStyle.czt.color, mainStyle.cztc.color]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          )}
        >
          <View style={[mainStyle.flex1]}>
            <View style={[mainStyle.column, mainStyle.bgcfff]}>
              <View style={[mainStyle.pa15, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brb1f2]}>
                <TouchableOpacity onPressIn={() => { this.goto('UserInfo', {}) }}>
                  <Image style={[mainStyle.useravator]} source={userInfo.avatar ? { uri: userInfo.avatar } : defaultIcon}></Image>
                </TouchableOpacity>
                <View style={[mainStyle.column, mainStyle.flex1, mainStyle.mal15, mainStyle.aiStart]}>
                  <Text style={[mainStyle.c333, mainStyle.fs16]}>{userInfo.username != '' ? userInfo.username : '请登录'}</Text>
                  {userInfo.level_name
                    ? <Text style={[mainStyle.czt, mainStyle.fs11, mainStyle.mat5,
                    {
                      borderColor: mainStyle.czt.color,
                      borderWidth: setSize(1),
                      paddingLeft: setSize(12),
                      paddingRight: setSize(12),
                      borderRadius: setSize(40),
                    }
                    ]}
                    >{userInfo.level_name != '' ? userInfo.level_name : '登录后查看'}</Text>
                    : null}
                </View>
                <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>
                  <TouchableOpacity
                    onPress={() => {
                      this.goto('NotiveList', {})
                    }}>
                    <Text style={[mainStyle.icon, mainStyle.fs24, mainStyle.c666, mainStyle.patb15]}>&#xe616;</Text>
                  </TouchableOpacity>

                </View>
              </View>
              <View style={[mainStyle.palr15, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb15]}>
                <TouchableOpacity
                  style={[mainStyle.flex1]}
                  onPress={() => {
                    this.goto('CourseList', { type: 'outline' })
                  }}
                >
                  <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                    <Text style={[mainStyle.czt, mainStyle.fs18, mainStyle.mab5]}>{onlineCourseList.train_num ? onlineCourseList.train_num : 0}</Text>
                    <Text style={[mainStyle.c999, mainStyle.fs12]}>培训课</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[mainStyle.flex1]}
                  onPress={() => {
                    this.goto('CourseList', { type: 'online' })
                  }}
                >
                  <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter, mainStyle.brr1f2, mainStyle.brl1f2]}>
                    <Text style={[mainStyle.czt, mainStyle.fs18, mainStyle.mab5]}>{onlineCourseList.online_num ? onlineCourseList.online_num : 0}</Text>
                    <Text style={[mainStyle.c999, mainStyle.fs12]}>在线课程</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[mainStyle.flex1]}
                  onPress={() => {
                    this.goto('MyFinish', {})
                  }}
                >
                  <View style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                    <Text style={[mainStyle.czt, mainStyle.fs18, mainStyle.mab5]}>{onlineCourseList.finish_num ? onlineCourseList.finish_num : 0}</Text>
                    <Text style={[mainStyle.c999, mainStyle.fs12]}>已学完</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.palr15, mainStyle.mat15]}>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }]}>
                <View style={[mainStyle.column, mainStyle.brb1f2]}>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('CourseList', { type: 'outline' })
                    }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>我的培训课</Text>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Text style={[mainStyle.fs12, mainStyle.c999]}>全部</Text>
                        <Text style={[mainStyle.icon, mainStyle.c999, mainStyle.fs26, { marginBottom: setSize(5) }]}>&#xe64d;</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[mainStyle.column]}>
                  {
                    onlineCourseList.train.map((val, i) => (
                      <CourseListItem key={i} data={val} navigation={navigation} type='outline'></CourseListItem>
                    ))
                  }
                </View>
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.palr15, mainStyle.mat15, mainStyle.mab15]}>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }]}>
                <View style={[mainStyle.column, mainStyle.brb1f2]}>
                  <TouchableOpacity
                    style={[mainStyle.flex1]}
                    onPress={() => {
                      this.goto('CourseList', { type: 'online' })
                    }}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>我的在线课程</Text>
                      <View style={[mainStyle.row, mainStyle.aiCenter]}>
                        <Text style={[mainStyle.fs12, mainStyle.c999]}>全部</Text>
                        <Text style={[mainStyle.icon, mainStyle.c999, mainStyle.fs26, { marginBottom: setSize(5) }]}>&#xe64d;</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[mainStyle.column]}>
                  {
                    onlineCourseList.online.map((val, i) => (
                      <CourseListItem key={i} data={val} navigation={navigation} type='online'></CourseListItem>
                    ))
                  }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}



const styles = StyleSheet.create({

})

export default Course