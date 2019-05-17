import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {mainStyle,setSize,screenH, screenW} from '../../public/style/style';
import { IconOutline,IconFill } from "@ant-design/icons-react-native";
import { List,Badge } from '@ant-design/react-native';
const Item = List.Item;
console.log(Badge)
class Mine extends React.Component {
  static navigationOptions = {
    tabBarLabel: '个人中心',
    tabBarIcon: ({focused}) => {
      if (focused) {
        return (
          <IconOutline name="user" size={24} color={mainStyle.czt.color}></IconOutline>
        );
      }
      return (
        <IconOutline name="user" size={24} color={mainStyle.c666.color}></IconOutline>
      );
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render(){
    return (
      <ScrollView>
        <View style={[styles.userbg,mainStyle.bgczt]}>
          <View style={[styles.userinfo,mainStyle.bgcfff,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween]}>
            <TouchableOpacity style={[styles.useravator]}>
              <Image source={{}}></Image>
            </TouchableOpacity>
            <View style={[mainStyle.row,mainStyle.flex1,mainStyle.palr10,mainStyle.aiCenter]}>
              <Text style={[mainStyle.c333,mainStyle.fs16]}>binbinMax</Text>
              <Text style={[mainStyle.cjin,mainStyle.fs14,mainStyle.mal10]}>白金会员</Text>
            </View>
            <View style={[mainStyle.column,mainStyle.aiEnd]}>
              <IconFill name="mail" size={26} color={mainStyle.c666.color}></IconFill>
              <TouchableOpacity style={[mainStyle.row,mainStyle.aiCenter,mainStyle.mat15]}>
                <IconFill name="gift" size={16} color={mainStyle.cjin.color}></IconFill>
                <Text style={[mainStyle.cjin,mainStyle.fs14]}>233分</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[mainStyle.palr15]}>
          <List>
            <Item arrow="empty">
              <View style={[mainStyle.column,mainStyle.mat10]}>
                <View style={[mainStyle.row,mainStyle.aiCenter]}>
                  <IconFill name="account-book" size={25} color={mainStyle.czt.color}></IconFill>
                  <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mal10]}>我的订单</Text>
                </View>
                <View style={[mainStyle.mal10,mainStyle.row,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb10]}>
                  <TouchableOpacity style={[mainStyle.mat10]}>
                    <Badge overflowCount={99} text={9}>
                      <View style={[mainStyle.column,mainStyle.aiCenter]}>
                        <IconOutline name="snippets" size={28} color={mainStyle.c666.color}></IconOutline>
                        <Text style={[mainStyle.c333,mainStyle.fs14]}>&nbsp;&nbsp;全部&nbsp;&nbsp;</Text>
                      </View>
                    </Badge>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.mat10]}>
                    <Badge overflowCount={99} text={9}>
                      <View style={[mainStyle.column,mainStyle.aiCenter]}>
                        <IconOutline name="wallet" size={28} color={mainStyle.c666.color}></IconOutline>
                        <Text style={[mainStyle.c333,mainStyle.fs14]}>未支付</Text>
                      </View>
                    </Badge>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.mat10]}>
                    <Badge overflowCount={99} text={9}>
                      <View style={[mainStyle.column,mainStyle.aiCenter]}>
                        <IconOutline name="file-done" size={28} color={mainStyle.c666.color}></IconOutline>
                        <Text style={[mainStyle.c333,mainStyle.fs14]}>已支付</Text>
                      </View>
                    </Badge>
                  </TouchableOpacity>
                  <TouchableOpacity style={[mainStyle.mat10]}>
                    <Badge overflowCount={99} text={9}>
                      <View style={[mainStyle.column,mainStyle.aiCenter]}>
                        <IconOutline name="file-excel" size={28} color={mainStyle.c666.color}></IconOutline>
                        <Text style={[mainStyle.c333,mainStyle.fs14]}>已取消</Text>
                      </View>
                    </Badge>
                  </TouchableOpacity>
                </View>
              </View>
            </Item>
            <Item extra={<IconOutline name="right" size={16} color={mainStyle.c666.color}></IconOutline>} arrow="empty" onPress={() => {}}>
              <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.patb10]}>
                <IconFill name="star" size={25} color={mainStyle.czt.color}></IconFill>
                <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mal10]}>我的收藏</Text>
              </View>
            </Item>
            <Item extra={<IconOutline name="right" size={16} color={mainStyle.c666.color}></IconOutline>} arrow="empty" onPress={() => {}}>
              <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.patb10]}>
                <IconFill name="trophy" size={25} color={mainStyle.czt.color}></IconFill>
                <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mal10]}>我的证书</Text>
              </View>
            </Item>
            <Item extra={<IconOutline name="right" size={16} color={mainStyle.c666.color}></IconOutline>} arrow="empty" onPress={() => {}}>
              <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.patb10]}>
                <IconFill name="crown" size={25} color={mainStyle.czt.color}></IconFill>
                <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mal10]}>我的会员</Text>
              </View>
            </Item>
            <Item extra={<IconOutline name="right" size={16} color={mainStyle.c666.color}></IconOutline>} arrow="empty" onPress={() => {}}>
              <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.patb10]}>
                <IconFill name="control" size={25} color={mainStyle.czt.color}></IconFill>
                <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mal10]}>系统设置</Text>
              </View>
            </Item>
            <Item extra={<IconOutline name="right" size={16} color={mainStyle.c666.color}></IconOutline>} arrow="empty" onPress={() => {}}>
              <View style={[mainStyle.row,mainStyle.aiCenter,mainStyle.patb10]}>
                <IconFill name="close-square" size={25} color={mainStyle.czt.color}></IconFill>
                <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mal10]}>退出登录</Text>
              </View>
            </Item>
          </List>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  userbg:{
    height:screenH*0.22,
    position:'relative'
  },
  userinfo:{
    height:screenH*0.16,
    borderTopLeftRadius:setSize(10),
    borderTopRightRadius:setSize(10),
    width:screenW-setSize(60),
    position:'absolute',
    paddingLeft:setSize(20),
    paddingRight:setSize(20),
    left:setSize(30),
    bottom:0,
    zIndex:1,
  },
  useravator:{
    height:screenH*0.09,
    width:screenH*0.09,
    borderRadius:screenH*0.09/2,
    backgroundColor:mainStyle.c999.color,
  }
})

export default Mine