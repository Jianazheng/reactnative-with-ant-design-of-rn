import React from 'react';
import {
  Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Animated,
  Easing
} from 'react-native';
import { mainStyle, setSize, contentPadding } from '../../public/style/style';

import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import BxTabbars from './Tabbar';

const { width, height } = Dimensions.get('window');
let scrollWidth = width - contentPadding * 2;

interface Props {
  children: any[],
  height: number,
  canScroll: boolean,
  currentPageIndex: number | string,
  tabs: Array<object>,
  tabAlign: 'center' | '',
  tabWidth: number,
  navigateTo: () => void,
  tabChange: (index: number) => void
}
type State = {
  currentIndex: number | undefined,
}

class BxTabView extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      currentIndex: undefined
    }
  }

  // componentDidUpdate(np,ns){
  //   return ns.currentIndex!=this.state.currentIndex
  // }

  handleChange({ i }) {
    this.setState({
      currentIndex: i
    }, () => {
      if (this.props.tabChange) this.props.tabChange(i)
    })

  }

  render() {
    let { children, tabs, tabAlign, canScroll, tabWidth, navigateTo, currentPageIndex } = this.props
    let currentIndex = this.state.currentIndex != undefined
      ? this.state.currentIndex < currentPageIndex
        ? this.state.currentIndex
        : this.state.currentIndex || currentPageIndex
      : currentPageIndex
    let scrollHeight = this.props.height
    if (tabs == undefined) tabs = []
    return (
      <View style={[mainStyle.flex1]}>
        <ScrollableTabView
          style={[{ height: scrollHeight }]}
          locked={false}
          onChangeTab={(e) => {
            this.handleChange(e)
          }}
          initialPage={currentIndex}
          //page={currentIndex}
          prerenderingSiblingsNumber={1}
          renderTabBar={() => <BxTabbars tabWidth={tabWidth} current={currentIndex} tabAlign={tabAlign} tabNames={tabs} navigateTo={navigateTo}></BxTabbars>}
        >

          {
            React.Children.map(children, (child, i) => {
              return (
                <View key={i} style={[mainStyle.flex1, { height: scrollHeight }]}>
                  <ScrollView
                    style={[mainStyle.flex1]}
                    scrollEnabled={canScroll}
                    nestedScrollEnabled={true}>
                    {child}
                  </ScrollView>
                </View>
              )
            })
          }
        </ScrollableTabView>
      </View>
    )
  }
}


const styles = StyleSheet.create({

})

export default BxTabView