import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, WebView, ImageBackground } from 'react-native';
import { mainStyle, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props { }
interface State {

}

const levelImg = {
  "白银会员": {
    bg: require('../../../images/level_1.png'),
    icon: require('../../../images/title_1b.png'),
    tips: require('../../../images/title_1b.png'),
  },
  "黄金会员": {
    bg: require('../../../images/level_2.png'),
    icon: require('../../../images/title_2b.png'),
    tips: require('../../../images/title_2.png'),
  },
  "铂金会员": {
    bg: require('../../../images/level_3.png'),
    icon: require('../../../images/title_3b.png'),
    tips: require('../../../images/title_3.png'),
  },
}

@inject('userStore')
@observer
class MyLevel extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    let { userStore } = this.props
    userStore.getMember()
  }

  render() {
    let { userStore } = this.props
    let { user, level } = userStore.memberInfo
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="我的会员"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ScrollView
          style={[mainStyle.flex1]}
        >
          <View style={[mainStyle.column, mainStyle.flex1]}>
            {
              user.level_name == undefined
                ? null
                : levelImg[user.level_name] == undefined
                  ? null
                  : <View style={[mainStyle.mab10]}>
                    <ImageBackground
                      style={[styles.imgbg, mainStyle.positonre]}
                      source={user.level_name ? levelImg[user.level_name].bg : levelImg["白银会员"].bg}
                    >
                      <View style={[mainStyle.pa30, mainStyle.flex1, mainStyle.column, mainStyle.jcBetween]}>
                        <View style={[mainStyle.row, mainStyle.aiCenter]}>
                          <Image style={[styles.titleImg1]} source={user.level_name ? levelImg[user.level_name].icon : levelImg["白银会员"].icon}></Image>
                          <View style={[mainStyle.mal10, mainStyle.column, mainStyle.jcBetween]}>
                            <Text style={[mainStyle.cfff, mainStyle.fs18]}>{user.level_name}</Text>
                            <Text style={[mainStyle.cfff, mainStyle.fs10]}>{user.description}</Text>
                          </View>
                        </View>
                        <View style={[mainStyle.column, mainStyle.aiEnd, mainStyle.mab5]}>
                          <Text style={[mainStyle.cfff, mainStyle.fs12]}>累计学习：{user.level_time}小时</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
            }
            <View style={[mainStyle.column, mainStyle.mat15]}>
              <View style={[mainStyle.brb1f2, mainStyle.palr15]}>
                <Text style={[mainStyle.c333, mainStyle.fs14, mainStyle.mab15]}>会员等级说明</Text>
              </View>
              <View style={[mainStyle.pa15, mainStyle.column]}>
                {
                  level.map((val, i) => (
                    <View key={i} style={[mainStyle.row, mainStyle.aiCenter, mainStyle.mab15]}>
                      <Image style={[styles.titleImg2]} source={levelImg[val.level_name] ? levelImg[val.level_name].tips : ''}></Image>
                      <View style={[mainStyle.flex1, mainStyle.column]}>
                        <Text style={[mainStyle.flex1, mainStyle.fs13, mainStyle.c666, mainStyle.mal15]}>{val.level_name}  |  在本平台累计学习时间{val.level_time}以上</Text>
                        <Text style={[mainStyle.flex1, mainStyle.fs10, mainStyle.c999, mainStyle.mal15]}>{val.description}</Text>
                      </View>
                    </View>
                  ))
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgbg: {
    width: screenW,
    height: (screenW) * 0.548
  },
  titleImg1: {
    width: setSize(90),
    height: setSize(90),
  },
  titleImg2: {
    width: setSize(60),
    height: setSize(60),
  },
})




export default MyLevel