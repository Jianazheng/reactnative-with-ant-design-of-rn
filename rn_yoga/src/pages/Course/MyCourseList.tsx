import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, DeviceEventEmitter } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';


interface Props { }

@inject('courseStore', 'trainStore')
@observer
class MyCourseList extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      arr: [{}, {}, {}, {}, {}, {}]
    };
  }
  TORELOADONLINECOURSELIST: object;

  componentDidMount() {
    let { courseStore, trainStore, navigation } = this.props
    let { params } = navigation.state
    if (params.type == 'online') {
      courseStore.getOnlineCourse()
      this.TORELOADONLINECOURSELIST = DeviceEventEmitter.addListener('TORELOADONLINECOURSELIST', res => {
        courseStore.getOnlineCourse()
      })
    } else {
      trainStore.getTrainCourse()
    }
  }
  componentWillUnmount() {
    let { params } = this.props.navigation.state
    if (params.type == 'online') {
      this.TORELOADONLINECOURSELIST.remove()
    }
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  render() {
    let { navigation, courseStore, trainStore } = this.props
    let { params } = navigation.state
    let onlineCourse = courseStore.onlineCourse
    let trainCourse = trainStore.trainCourse
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title={params.type == 'online' ? '我的在线课程' : '我的线下课程'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <View style={[mainStyle.flex1]}>
          {
            params.type == 'online'
              ? <BxListView
                pab={setSize(30)}
                pat={setSize(30)}
                onLoadmore={() => {
                  if (onlineCourse.data.length < onlineCourse.total)courseStore.getOnlineCourse()
                }}
                loading={onlineCourse.total == null || (onlineCourse.total > onlineCourse.data.length && onlineCourse.total >= 1)}
                colNumber={1}
                listData={onlineCourse.data}
                listItem={({ item, index }) => (
                  <CourseListItem key={index} data={item} navigation={navigation} type='online'></CourseListItem>
                )}
              ></BxListView>
              :
              <BxListView
                pab={setSize(30)}
                pat={setSize(30)}
                onLoadmore={() => {
                  if (trainCourse.data.length < trainCourse.total)trainStore.getTrainCourse()
                }}
                loading={trainCourse.total == null || (trainCourse.total > trainCourse.data.length && trainCourse.total >= 1)}
                colNumber={1}
                listData={trainCourse.data}
                listItem={({ item, index }) => (
                  <CourseListItem key={index} data={item} navigation={navigation} type='outline'></CourseListItem>
                )}
              ></BxListView>

          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default MyCourseList