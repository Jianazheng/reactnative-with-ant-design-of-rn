import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import { Checkbox } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CourseListItem } from '../../components/Course/CourseItem';
import NavTop from '../../router/navTop';
import { CourseTeacherItem2 } from '../../components/Course/TeacherItem';
import BxButton from '../../components/Pubilc/Button';
import { inject, observer } from 'mobx-react';
import { ActivityIndicator, Modal } from '@ant-design/react-native';


interface Props { }

@inject('courseStore')
@observer
class OnlineCourse extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      arr: [{}, {}, {}, {}, {}, {}],
      checkbox: [{ title: '座位', checked: true }, { title: '餐点', checked: false }, { title: '酒店', checked: false }, { title: '大巴', checked: false }],
      loading: true,
      showJS: false,
      currentTeacher: {}
    };
  }

  componentDidMount() {
    let { navigation, courseStore } = this.props
    let { params } = navigation.state
    courseStore.getOnlineCourseInfo(params.id)
      .then(res => {
        this.setState({
          loading: false
        })
      })
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  selectService(index: number) {
    let { checkbox } = this.state;
    let newReason = checkbox;
    newReason[index].checked = !newReason[index].checked;
    this.setState({
      checkbox: newReason,
    })
  }
  handleShowJS(currentTeacher) {
    let { showJS } = this.state;
    this.setState({ showJS: !showJS, currentTeacher })
  }
  render() {
    let { arr, checkbox, loading, currentTeacher } = this.state;
    let { navigation, courseStore } = this.props;
    let onlineCourseInfo = courseStore.onlineCourseInfo
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="我的在线课程"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ActivityIndicator
          animating={loading}
          toast
          size="large"
          text="加载中..."
        />
        <ScrollView style={[mainStyle.flex1]}>
          <View style={[mainStyle.flex1]}>
            <View style={[mainStyle.column, mainStyle.palr15, mainStyle.mat15]}>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }]}>
                <View style={[mainStyle.column, mainStyle.brb1f2]}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13, mainStyle.c333]}>在线课程详情</Text>
                  </View>
                </View>
                <View style={[mainStyle.column]}>
                  <CourseListItem data={onlineCourseInfo} type='online'></CourseListItem>
                </View>
                <View style={[mainStyle.column, mainStyle.pa15, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.fs12, mainStyle.c999]}>上次学习时间：{onlineCourseInfo.lasttime || ''}</Text>
                  <BxButton
                    title={onlineCourseInfo.lasttime != null ? '继续学习' : '开始学习'}
                    colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                    borderRadius={setSize(60)}
                    btnstyle={[{ width: screenW - setSize(120), height: setSize(70) }, mainStyle.mat10]}
                    onClick={() => {
                      this.goto('OnlineCourseInfo', { id: onlineCourseInfo.course_id, course_id: onlineCourseInfo.course_id, summary_id: '' })
                    }}
                  ></BxButton>
                </View>
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.palr15, mainStyle.mat15]}>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }]}>
                <View style={[mainStyle.column, mainStyle.brb1f2]}>
                  <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                    <Text style={[mainStyle.fs13, mainStyle.c333]}>目录</Text>
                  </View>
                </View>
                {
                  onlineCourseInfo.chapter.length > 0
                    ? onlineCourseInfo.chapter.map((val, i) => (
                      <View key={i} style={[mainStyle.column, mainStyle.flex1, mainStyle.pal15, { paddingTop: setSize(30) }]}>
                        <Text style={[mainStyle.fs12, mainStyle.c333, mainStyle.aiCenter, mainStyle.mab10]}>{i + 1}、{val.chapter_name}</Text>
                        <View style={[mainStyle.column]}>
                          {
                            val.summary.constructor == Array ?
                              val.summary.length > 0 ?
                                val.summary.map((item, ci) => (
                                  <Summary
                                    navigation={navigation}
                                    ids={{ id: onlineCourseInfo.id, course_id: onlineCourseInfo.course_id }}
                                    item={item}
                                    key={ci}
                                  ></Summary>
                                ))
                                : <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.pa15]}>暂无课程</Text>
                              : <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.pa15]}>暂无课程</Text>
                          }
                        </View>
                      </View>
                    ))
                    :
                    <Text style={[mainStyle.c999, mainStyle.fs12, mainStyle.pa15]}>暂无课程</Text>
                }
              </View>
            </View>
            <View style={[mainStyle.column, mainStyle.palr15, mainStyle.mat15, mainStyle.mab30]}>
              <View style={[mainStyle.column, mainStyle.bgcfff, { borderRadius: setSize(10) }]}>
                <View style={[mainStyle.flex1]}>
                  <View style={[mainStyle.column, mainStyle.brb1f2]}>
                    <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.palr15,]}>
                      <Text style={[mainStyle.fs13, mainStyle.c333]}>授课教师</Text>
                    </View>
                  </View>
                  <ScrollView
                    style={[mainStyle.flex1, mainStyle.mab15, mainStyle.mat15, { height: setSize(160) }]}
                    nestedScrollEnabled
                    scrollEnabled
                    horizontal
                  >
                    <View style={[mainStyle.flex1, mainStyle.row, mainStyle.pal15]}>
                      {
                        onlineCourseInfo.teacher.map((val, i) => (
                          <CourseTeacherItem2 key={i} data={val} onClick={() => this.handleShowJS(val)}></CourseTeacherItem2>
                        ))
                      }
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          title="授课讲师"
          transparent
          onClose={() => {
            this.handleShowJS({})
          }}
          maskClosable
          visible={this.state.showJS}
        >
          <View style={[mainStyle.pa15, mainStyle.column]}>
            <View style={[mainStyle.column, { minHeight: setSize(460) }]}>
              <View style={[mainStyle.row, mainStyle.aiCenter]}>
                <Image style={[styles.CourseInfoImage2, mainStyle.imgCover, mainStyle.bgcf2]} mode="widthFix" source={{ uri: 'http://' + currentTeacher.avatar }}></Image>
                <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.flex1, mainStyle.mal10]}>{currentTeacher.teacher_name}</Text>
              </View>
              <View
                style={[mainStyle.flex1]}
              >
                <Text style={[mainStyle.c666, mainStyle.fs11, mainStyle.mab15, mainStyle.mat10]}>{currentTeacher.teacher_introduction}</Text>
              </View>
            </View>
            <BxButton
              title={'关闭'}
              colors={[mainStyle.c999.color, mainStyle.cc2.color]}
              onClick={() => { this.handleShowJS({}) }}
            ></BxButton>
          </View>
        </Modal>
      </View>
    )
  }
}


interface SummaryProps {
  item: object,
  ids: object,
  navigation: object
}

class Summary extends React.PureComponent<SummaryProps>{

  constructor(props: SummaryProps) {
    super(props)
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  render() {
    let { item, ids } = this.props
    return (
      <TouchableOpacity onPress={() => {
        this.goto('OnlineCourseInfo', { summary_id: item.id, ...ids })
      }}>
        <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.h100, mainStyle.brb1f2]}>
          <View style={[mainStyle.row, mainStyle.aiCenter]}>
            <View style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween]}>

              {item.type == 'pdf' ? <Image source={require('../../../images/picture.png')} style={[styles.summaryImg, mainStyle.imgContain]}></Image> : null}
              {item.type == 'ppt' ? <Image source={require('../../../images/pdf.png')} style={[styles.summaryImg, mainStyle.imgContain]}></Image> : null}
              {item.type == 'video' ? <Image source={require('../../../images/video.png')} style={[styles.summaryImg, mainStyle.imgContain]}></Image> : null}
              {item.type == 'audio' ? <Image source={require('../../../images/audio.png')} style={[styles.summaryImg, mainStyle.imgContain]}></Image> : null}

              <Text style={[mainStyle.fs12, item.isread == 1 ? mainStyle.c999 : mainStyle.c333, mainStyle.mal5]}>{item.summary_name}</Text>
            </View>
            {
              item.isread == 1
                ? <View style={[mainStyle.mal15]}>
                  <Text style={[styles.isread, mainStyle.bgcf6e, mainStyle.c8d0, mainStyle.fs10]}>已学完</Text>
                </View>
                : null
            }
          </View>
          <Text style={[mainStyle.icon, mainStyle.c999, mainStyle.fs28]}>&#xe64d;</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  isread: {
    height: setSize(34),
    lineHeight: setSize(31),
    borderRadius: setSize(36),
    paddingLeft: setSize(12),
    paddingRight: setSize(12),
    paddingTop: setSize(1),
    paddingBottom: setSize(1),
    borderWidth: setSize(1),
    borderColor: mainStyle.c8d0.color
  },
  summaryImg: {
    height: setSize(40),
    width: setSize(40)
  }
})

export default OnlineCourse