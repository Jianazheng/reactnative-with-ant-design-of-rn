import React from 'react';
import { Text, View, ScrollView, Alert, Image } from 'react-native';
import {WingBlank,WhiteSpace,InputItem} from '@ant-design/react-native';
import { mainStyle,screenH } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';

interface Props {}
interface State {
  
}

class UserInfo extends React.Component<Props,State> {
  static navigationOptions = {
    headerTitle:headerTitle('个人信息'),
    headerRight:headerRight(<Text></Text>),
  }
  timer:any;
  codeRef:any;
  constructor(props:Props,state:State) {
    super(props);
    this.state = {
      
    };
  }

  render(){
    return (
      <View style={[mainStyle.column]}>
        <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1e2]}>
          <Text style={[mainStyle.fs15,mainStyle.c333]}>头像</Text>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <Image style={[mainStyle.useravator,mainStyle.mar15]}></Image>
            <Text style={[mainStyle.c666,mainStyle.fs14]}>编辑</Text>
          </View>
        </View>
        <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1e2]}>
          <Text style={[mainStyle.fs15,mainStyle.c333]}>姓名</Text>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mar15]}>binbinMax</Text>
            <Text style={[mainStyle.c666,mainStyle.fs14]}>编辑</Text>
          </View>
        </View>
        <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1e2]}>
          <Text style={[mainStyle.fs15,mainStyle.c333]}>绑定手机</Text>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <Text style={[mainStyle.c333,mainStyle.fs15,mainStyle.mar15]}>18828838888</Text>
            <Text style={[mainStyle.c666,mainStyle.fs14]}>编辑</Text>
          </View>
        </View>
        <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1e2]}>
          <Text style={[mainStyle.fs15,mainStyle.c333]}>会员等级</Text>
          <View style={[mainStyle.row,mainStyle.aiCenter]}>
            <Text style={[mainStyle.cjin,mainStyle.fs14,mainStyle.mar15]}>白金会员</Text>
            <Text style={[mainStyle.c666,mainStyle.fs14]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default UserInfo