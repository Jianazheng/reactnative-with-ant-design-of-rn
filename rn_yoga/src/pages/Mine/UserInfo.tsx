import React from 'react';
import { Text, View, ScrollView, Alert, Image,TouchableOpacity } from 'react-native';
import {Modal} from '@ant-design/react-native';
import { mainStyle,screenH } from '../../public/style/style';
import {headerTitle,headerRight} from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';

interface Props {}
interface State {
  
}

@inject('userStore')
@observer
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

  componentDidMount(){
    
  }

  handleEditUsername(){
    let {userStore} = this.props;
    Modal.prompt(
      '请输入新的昵称',
      '',
      username =>{
        userStore.EditUserName({username})
        .then(res=>{console.log(res)})
      },
      'default',
      null,
      ['新的昵称']
    );
  }

  render(){
    let {userStore} = this.props;
    let userInfo = userStore.userInfo;
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
                <Image style={[mainStyle.useravator]} source={{uri:userInfo.avatar}}></Image>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            this.handleEditUsername()
          }}>
            <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1f2,mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15,mainStyle.c666]}>昵称</Text>
              <View style={[mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs15]}>{userInfo.username}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.brb1f2,mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15,mainStyle.c666]}>绑定手机</Text>
              <View style={[mainStyle.row,mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333,mainStyle.fs15]}>{userInfo.mobile}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[mainStyle.row,mainStyle.palr15,mainStyle.aiCenter,mainStyle.jcBetween,mainStyle.patb20,mainStyle.bgcfff]}>
            <Text style={[mainStyle.fs15,mainStyle.c666]}>会员等级</Text>
            <View style={[mainStyle.row,mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt,mainStyle.fs14]}>{userInfo.level_name}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default UserInfo