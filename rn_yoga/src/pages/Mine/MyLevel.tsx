import React from 'react';
import { Text, View, ScrollView, Image,StyleSheet, TouchableOpacity, WebView, ImageBackground } from 'react-native';
import { mainStyle,setSize, screenW } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  
}

class MyLevel extends React.Component<Props,State> {
  static navigationOptions = {
    header:null
  }
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return (
      <View style={[mainStyle.flex1,mainStyle.column]}>
        <NavTop
        navType="normal"
        title="我的会员"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <ScrollView
        style={[mainStyle.flex1]}
        >
          <View style={[mainStyle.column,mainStyle.flex1]}>
            <View style={[mainStyle.mab10]}>
              <ImageBackground
              style={[styles.imgbg,mainStyle.positonre]}
              source={require('../../../images/level_1.png')}
              >
                <View style={[mainStyle.pa30,mainStyle.flex1,mainStyle.column,mainStyle.jcBetween]}>
                  <View style={[mainStyle.row,mainStyle.aiCenter]}>
                    <Image style={[styles.titleImg1]} source={require('../../../images/title_1b.png')}></Image>
                    <View style={[mainStyle.mal10,mainStyle.column,mainStyle.jcBetween]}>
                      <Text style={[mainStyle.cfff,mainStyle.fs18]}>白金会员</Text>
                      <Text style={[mainStyle.cfff,mainStyle.fs10]}>我当前的会员等级</Text>
                    </View>
                  </View>
                  <View style={[mainStyle.column,mainStyle.aiEnd,mainStyle.mab5]}>
                    <Text style={[mainStyle.cfff,mainStyle.fs12]}>累计积分：120分</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={[mainStyle.column,mainStyle.mat15]}>
              <View style={[mainStyle.brb1f2,mainStyle.palr15]}>
                <Text style={[mainStyle.c333,mainStyle.fs14,mainStyle.mab15]}>会员等级说明</Text>                
              </View>
              <View style={[mainStyle.pa15,mainStyle.column]}>
                <View style={[mainStyle.row,mainStyle.aiCenter]}>
                  <Image style={[styles.titleImg2]} source={require('../../../images/title_1.png')}></Image>
                  <Text style={[mainStyle.flex1,mainStyle.fs13,mainStyle.c666,mainStyle.mal15]}>白银会员  |  在本平台累计积分为0-50分</Text>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mat15]}>
                  <Image style={[styles.titleImg2]} source={require('../../../images/title_2.png')}></Image>
                  <Text style={[mainStyle.flex1,mainStyle.fs13,mainStyle.c666,mainStyle.mal15]}>黄金会员  |  在本平台累计积分为50-300分</Text>
                </View>
                <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mat15]}>
                  <Image style={[styles.titleImg2]} source={require('../../../images/title_3.png')}></Image>
                  <Text style={[mainStyle.flex1,mainStyle.fs13,mainStyle.c666,mainStyle.mal15]}>铂金会员  |  在本平台累计积分为300分以上</Text>
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
  imgbg:{
    width:screenW,
    height:(screenW)*0.548
  },
  titleImg1:{
    width:setSize(90),
    height:setSize(90),
  },
  titleImg2:{
    width:setSize(50),
    height:setSize(50),
  },
})




export default MyLevel