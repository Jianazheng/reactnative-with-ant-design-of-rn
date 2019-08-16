import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, Animated, Easing, Alert, DeviceEventEmitter } from 'react-native';
import { mainStyle, setSize, screenH, screenW } from '../../public/style/style';
import BxListView from '../../components/Pubilc/ListView';
import NavTop from '../../router/navTop';
import HomeSearchBar from '../../components/Home/SeachBar';
import { observer, inject } from 'mobx-react';


interface Props { }
interface State {

}

@inject('courseStore', 'cartStore', 'publicStore')
@observer
class OnlineCourseList extends React.Component<Props, State> {


  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      keyword: '',
      searchBarTranslate: new Animated.Value(screenW),
      searchBarOpacity: new Animated.Value(0),
      autoFocus: false,
      conditionShow: false,
      sortShow: false,
      type: '',
      cid: ''
    };
  }

  static navigationOptions = {
    header: null,
  }
  TORELOADCOURSELIST: object;
  componentDidMount() {
    let { navigation, courseStore } = this.props;
    let { params } = navigation.state;
    console.log(params);
    if (params.cid == undefined) {
      courseStore.setCondition('全部', '')
    }
    courseStore.getClassify()
      .then(res => {
        courseStore.getCourseList(true);
      })
    this.TORELOADCOURSELIST = DeviceEventEmitter.addListener('TORELOADCOURSELIST', res => {
      courseStore.getCourseList(true);
    })
  }
  componentWillUnmount() {
    this.TORELOADCOURSELIST.remove()
  }
  showSearchBar() {
    let { searchBarTranslate, searchBarOpacity } = this.state;
    Animated.timing(searchBarTranslate, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300
    }).start();
    Animated.timing(searchBarOpacity, {
      toValue: 1,
      easing: Easing.ease,
      duration: 300
    }).start();
  }

  hideSearchBar() {
    let { searchBarTranslate, searchBarOpacity } = this.state;
    Animated.timing(searchBarTranslate, {
      toValue: screenW,
      easing: Easing.ease,
      duration: 300
    }).start();
    Animated.timing(searchBarOpacity, {
      toValue: 0,
      easing: Easing.ease,
      duration: 300
    }).start();
    this.handleSearch('')
  }

  showCondition() {
    let { conditionShow } = this.state;
    this.setState({
      conditionShow: !conditionShow,
      sortShow: false
    })
  }

  showSort() {
    let { sortShow } = this.state;
    this.setState({
      conditionShow: false,
      sortShow: !sortShow
    })
  }

  handleSearch(keyword: string) {
    let { courseStore } = this.props
    courseStore.setKeyword(keyword)
  }

  goto(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }


  render() {
    let { searchBarTranslate, searchBarOpacity, sortShow, conditionShow, keyword } = this.state
    let { navigation, courseStore, cartStore: { hascart }, publicStore: { iosmt } } = this.props
    return (
      <View style={[mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="在线课程"
          onPress={() => {
            this.props.navigation.goBack();
          }}
          children={(
            <View style={[mainStyle.bgcfff, mainStyle.row, mainStyle.aiCenter, mainStyle.flex1]}>
              <TouchableOpacity style={[mainStyle.flex1]} onPress={() => {
                this.showSearchBar();
              }}>
                <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs22]}>&#xe63f;</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[mainStyle.flex1, mainStyle.positonre]} onPress={() => {
                this.goto('CartList', {})
              }}>
                <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs22]}>&#xe60a;</Text>
                {hascart ? <Text style={[mainStyle.circle, { top: setSize(6), right: setSize(40) }]}></Text> : null}
              </TouchableOpacity>
            </View>
          )}
        ></NavTop>

        <Animated.View style={[styles.searchBar,
        { transform: [{ translateX: searchBarTranslate }], opacity: searchBarOpacity }
        ]}>
          <HomeSearchBar
            placeholder={'搜索课程'}
            autoFocus={false}
            onChange={(e) => {
              this.setState({ keyword: e })
            }}
            onSubmit={(e) => {
              this.handleSearch(e)
            }}
            leftBtn={(
              <View style={[mainStyle.row, mainStyle.aiCenter]}>
                <TouchableOpacity
                  style={[mainStyle.mal10]}
                  onPress={() => {
                    this.handleSearch(keyword)
                  }}>
                  <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs13]}>搜索</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[mainStyle.mal10]} onPress={() => {
                  this.hideSearchBar();
                }}>
                  <Text style={[mainStyle.c666, mainStyle.icon, mainStyle.fs13]}>取消</Text>
                </TouchableOpacity>
              </View>
            )}
          ></HomeSearchBar>
        </Animated.View>

        <View style={[mainStyle.row, mainStyle.h100, mainStyle.aiCenter, mainStyle.bgcfff, mainStyle.brb1e2]}>
          <TouchableOpacity
            style={[mainStyle.flex1, mainStyle.h100, mainStyle.aiCenter, mainStyle.jcCenter]}
            onPress={() => {
              this.showCondition();
            }}
          >
            <Text style={[conditionShow ? mainStyle.czt : mainStyle.c333, mainStyle.lh42]}>
              <Text style={[mainStyle.fs13]}>{courseStore.classifySelect.categroy_name}</Text>
              {
                conditionShow ?
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ed;</Text>
                  :
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ec;</Text>
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[mainStyle.flex1, mainStyle.h100, mainStyle.aiCenter, mainStyle.jcCenter]}
            onPress={() => {
              this.showSort();
            }}
          >
            <Text style={[sortShow ? mainStyle.czt : mainStyle.c333, mainStyle.lh42]}>
              <Text style={[mainStyle.fs13]}>{courseStore.orderby.str}</Text>
              {
                sortShow ?
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ed;</Text>
                  :
                  <Text style={[mainStyle.icon, mainStyle.fs14]}>&#xe8ec;</Text>
              }
            </Text>
          </TouchableOpacity>
        </View>

        {
          conditionShow ?
            <Animated.View style={[mainStyle.column, styles.seacrhCondition, mainStyle.brb1e2, { top: setSize(200) + iosmt }]}>
              <View style={[mainStyle.row, mainStyle.wrap, mainStyle.bgcfff, styles.seacrhConditionMain]}>
                {
                  courseStore.classify.map((val, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.seacrhConditionItem, val.checked ? mainStyle.bgczt : mainStyle.bgcfff]}
                      onPress={() => {
                        courseStore.selectGoodsCondition(i)
                          .then(res => {
                            this.showCondition();
                          })
                      }}
                    >
                      <Text style={[mainStyle.fs12, mainStyle.c666, val.checked ? mainStyle.cfff : mainStyle.c666]}>{val.categroy_name}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <TouchableOpacity
                style={[mainStyle.flex1]}
                onPress={() => {
                  this.showCondition();
                }}
              ></TouchableOpacity>
            </Animated.View>
            : null
        }
        {
          sortShow ?
            <Animated.View style={[mainStyle.column, styles.seacrhCondition, mainStyle.brb1e2, { top: setSize(200) + iosmt }]}>
              <View style={[mainStyle.row, mainStyle.wrap, mainStyle.bgcfff, styles.seacrhConditionMain]}>
                {
                  courseStore.orderbyArr.map((val, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[mainStyle.row, mainStyle.aiCenter, mainStyle.jcCenter, styles.seacrhConditionItem, val.checked ? mainStyle.bgczt : mainStyle.bgcfff]}
                      onPress={() => {
                        courseStore.selectGoodsSort(i)
                          .then(res => {
                            this.showSort();
                          })
                      }}
                    >
                      <Text style={[mainStyle.fs12, mainStyle.c666, val.checked ? mainStyle.cfff : mainStyle.c666]}>{val.str}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              <TouchableOpacity
                style={[mainStyle.flex1]}
                onPress={() => {
                  this.showSort();
                }}
              ></TouchableOpacity>
            </Animated.View>
            : null
        }

        <View style={[mainStyle.flex1]}>
          {
            courseStore.courseList.data
              ? <BxListView
                listData={courseStore.courseList.data.slice()}
                listItem={({ item, index }) => <GoodsItem navigation={navigation} key={index.toString()} data={item} index={index}></GoodsItem>}
                nomore={false}
                colNumber={1}
                loading={courseStore.courseList.total == null || (courseStore.courseList.total > courseStore.courseList.data.length)}
                onLoadmore={() => {
                  courseStore.getCourseList(false);
                }}
                pab={setSize(20)}
              >
              </BxListView>
              : null
          }
        </View>

      </View >
    )
  }
}

interface GoodsItemProps {
  data: object,
  key: string,
  index: number,
  navigation: any
}
interface GoodsItemState {

}

let imgw = setSize(220);

class GoodsItem extends React.Component<GoodsItemProps, GoodsItemState> {

  constructor(props: GoodsItemProps, state: GoodsItemState) {
    super(props);
    this.state = {

    };
  }

  render() {
    let { navigation, index, data } = this.props;
    return (
      <TouchableOpacity
        style={[mainStyle.mat10, { overflow: 'hidden' }]}
        onPress={() => {
          navigation.push('CourseInfo', { id: data.id })
        }}>
        <View style={[mainStyle.bgcfff, mainStyle.pa15, mainStyle.row, mainStyle.jcBetween]}>
          <Image
            style={[{ width: imgw, height: imgw }, mainStyle.bgcf2, { borderRadius: setSize(8) }]}
            mode="widthFix"
            source={{ uri: 'http://' + (data.image != null ? data.image : '') }}
          >
          </Image>
          <View style={[mainStyle.column, mainStyle.mal15, mainStyle.flex1, mainStyle.jcBetween]}>
            <Text style={[mainStyle.fs13, mainStyle.c333, mainStyle.lh42, { height: setSize(84) }]} numberOfLines={2}>{data.course_name}</Text>
            <View style={[mainStyle.row]}>
              <Text style={[mainStyle.pa5_10, mainStyle.bgcf2, mainStyle.c333, mainStyle.fs12, { borderRadius: setSize(4) }]}>{data.lesson}课时</Text>
            </View>
            <View style={[mainStyle.row, mainStyle.mat5, mainStyle.jcBetween]}>
              <Text>
                <Text style={[mainStyle.fs12, mainStyle.czt, mainStyle.lh44]}>￥</Text>
                <Text style={[mainStyle.fs16, mainStyle.czt, mainStyle.lh42]}>{data.course_price}</Text>
              </Text>
              <Text style={[mainStyle.fs12, mainStyle.c999, mainStyle.mal10, mainStyle.lh42]}>{data.reply}人报名</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 0,
    right: setSize(20),
    zIndex: 99,
    width: screenW - setSize(120)
  },
  seacrhCondition: {
    position: 'absolute',
    top: setSize(200),
    left: 0,
    zIndex: 99,
    width: screenW,
    height: screenH - setSize(200),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  seacrhConditionMain: {
    paddingLeft: setSize(30),
    paddingRight: setSize(30),
    paddingBottom: setSize(30)
  },
  seacrhConditionItem: {
    height: setSize(60),
    width: (screenW - setSize(60)) / 3,
    marginTop: setSize(30),
    borderRadius: setSize(30)
  },
})

export default OnlineCourseList