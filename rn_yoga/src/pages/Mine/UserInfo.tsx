import React from 'react';
import { Text, View, ScrollView, Alert, Image,TouchableOpacity } from 'react-native';
import {WingBlank,WhiteSpace,InputItem} from '@ant-design/react-native';
import { mainStyle,screenH } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import NavTop from '../../router/navTop';

interface Props {}
interface State {
  
}

class UserInfo extends React.Component<Props,State> {
  static navigationOptions = {
    // headerTitle:headerTitle('个人信息'),
    // headerRight:headerRight(<Text></Text>),
    header:null
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
      <View style={[mainStyle.column,mainStyle.flex1,mainStyle.bgcf7]}>
        <NavTop
        navType="normal"
        title="个人信息"
        onPress={()=>{
          this.props.navigation.goBack();
        }}
        ></NavTop>
        <View style={[mainStyle.flex1,mainStyle.mat15]}>
          <TouchableOpacity>
            <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1f2,mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15,mainStyle.c666]}>头像</Text>
              <View style={[mainStyle.row,mainStyle.aiCenter]}>
                <Image style={[mainStyle.useravator]}></Image>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1f2,mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15,mainStyle.c666]}>姓名</Text>
              <View style={[mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs15]}>binbinMax</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1f2,mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15,mainStyle.c666]}>绑定手机</Text>
              <View style={[mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs15]}>18828838888</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.bgcfff]}>
            <Text style={[mainStyle.fs15,mainStyle.c666]}>会员等级</Text>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt,mainStyle.fs14]}>白金会员</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default UserInfo