import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Animated,
  Easing
} from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { layout } from '../../public/js/dom'
import { IconFill } from "@ant-design/icons-react-native";

const scrollbarWidth = setSize(48);
const scrollbarPadding = setSize(5);
const scrollbarMargin = setSize(40);

interface Props {
  tabNames: Array<any>,
  tabAlign: string,
  current: number | string,
  navigateTo: () => void,
  tabWidth: number,
  goToPage: (i: number) => void,
}
type State = {
  currentIndex: number,
  scrollLeft: number,
  scrollWidth: number,
}

class BxTabbars extends React.Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      currentIndex: 0,
      scrollLeft: 0,
      scrollWidth: 0,
      pageXs: 0
    }
  }

  componentDidMount() {

  }

  shouldComponentUpdate(np, ns) {
    if (np.current != this.props.current || this.state.currentIndex != np.current || np.tabNames != this.props.tabNames) {
      this.setState({
        currentIndex: np.current
      })
      if (typeof this.props.navigateTo == 'function') {
        this.handleTabClick(np.current)
      }
      return true
    } else {
      return false
    }
  }

  handleTabClick(i: number): void {
    let ref = this.refs['tabsItem' + i];
    let { scrollLeft, scrollWidth } = this.state;
    let { current, tabNames } = this.props;
    if (current == i) return;//下标相同则不变，否则报错
    this.setState({
      currentIndex: i
    }, () => {
      if (this.props.goToPage) {
        this.props.goToPage(i);
      }
    })
    layout(ref).then(res => {
      //判断进度条位移
      let offsetLeft = res.pageX + scrollbarPadding * 2 - scrollbarMargin;
      let scrollOffset = (offsetLeft + scrollLeft) / 2;
      if (offsetLeft / scrollWidth < 0.2) {
        scrollOffset = 0;
      } else if (offsetLeft / scrollWidth > 0.8 || i == tabNames.length - 1) {
        this.refs['tab'].scrollToEnd({ animate: true })
        return false
      }
      this.refs['tab'].scrollTo({ x: scrollOffset, animate: true })
    }).catch(err => {
      //console.log(err);
      //console.warn('Tab切换报错了')
    })
  }

  handleTabClick2(i: number) {
    this.setState({
      currentIndex: i,
    }, () => {
      if (this.props.goToPage) {
        this.props.goToPage(i);
      }
    })

  }

  render() {
    let { tabNames, tabAlign, navigateTo, current, tabWidth } = this.props;
    let { currentIndex } = this.state;
    if (tabWidth == undefined) {
      tabWidth = screenW;
    }
    switch (tabAlign) {
      case 'center':
        return (
          <View style={[mainStyle.row, mainStyle.jcCenter, mainStyle.aiCenter, mainStyle.bgcfff]}>
            <View style={[styles.scrollmain, mainStyle.row, mainStyle.jcCenter, { width: tabWidth }]}>
              {
                tabNames.map((val, i) => {
                  return (
                    <TouchableOpacity ref={'tabsItem' + i} key={i} style={[styles.scrollItem2, mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}
                      onPress={this.handleTabClick2.bind(this, i)} >
                      <View style={[styles.scrollItem2, mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                        <Text style={[mainStyle.fs15, i == currentIndex ? mainStyle.c333 : mainStyle.c999]}>{val.title}</Text>
                        {
                          i == currentIndex ? <Text style={[styles.scrollbar2]}></Text> : null
                        }
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        )
        break;
      default:
        return (
          <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter, mainStyle.h80, mainStyle.palr15, mainStyle.bgcfff]}>
            <ScrollView
              onLayout={(e) => {
                this.setState({
                  scrollWidth: e.nativeEvent.layout.width
                })
              }}
              onScroll={(e) => {
                this.setState({
                  scrollLeft: e.nativeEvent.contentOffset.x
                })
              }}
              ref="tab"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              contentContainerStyle={[mainStyle.h80, mainStyle.bgcfff]}>
              <Animated.View style={[styles.scrollmain, mainStyle.row]}>
                {
                  tabNames.map((val, i) => {
                    return (
                      <TouchableOpacity ref={'tabsItem' + i} key={i} style={[mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}
                        onPress={this.handleTabClick.bind(this, i)}>
                        <View style={[styles.scrollItem, mainStyle.column, mainStyle.aiCenter, mainStyle.jcCenter]}>
                          <Text style={[mainStyle.fs15, i == currentIndex ? mainStyle.c333 : mainStyle.c999]}>{val.title}</Text>
                          {
                            i == currentIndex ? <Text style={[styles.scrollbar2]}></Text> : null
                          }
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </Animated.View>
            </ScrollView>
            <View>
              {
                typeof navigateTo != undefined
                  ? <TouchableOpacity style={[styles.scrollmain, mainStyle.aiCenter, mainStyle.jcCenter, mainStyle.row, { marginLeft: setSize(30) }]}
                    onPressIn={() => {
                      if (navigateTo) navigateTo()
                    }}>
                    <IconFill name="appstore" size={24} color={mainStyle.czt.color}></IconFill>
                  </TouchableOpacity>
                  : null
              }
            </View>
          </View>
        )
        break;
    }
  }
}

const styles = StyleSheet.create({
  scrollmain: {
    height: setSize(80),
  },
  scrollItem: {
    //minWidth:setSize(100),
    paddingLeft: scrollbarPadding,
    paddingRight: scrollbarPadding,
    height: setSize(80),
    paddingTop: 0,
    marginRight: scrollbarMargin,
  },
  scrollItem2: {
    // paddingLeft:scrollbarPadding,
    // paddingRight:scrollbarPadding,
    // marginLeft:scrollbarMargin,
    // marginRight:scrollbarMargin,
    //width:(screenW-scrollbarMargin*2)/3,
    flex: 1,
    height: setSize(80),
    paddingTop: 0,
  },
  scrollbar: {
    backgroundColor: mainStyle.czt.color,
    height: setSize(6),
    width: scrollbarWidth,
    borderRadius: setSize(4),
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  scrollbar2: {
    backgroundColor: mainStyle.czt.color,
    height: setSize(6),
    width: scrollbarWidth,
    borderRadius: setSize(4),
    position: 'absolute',
    bottom: 0
  },
})

export default BxTabbars