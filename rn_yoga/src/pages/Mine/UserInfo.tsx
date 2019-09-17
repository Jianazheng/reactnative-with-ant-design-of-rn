import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Modal, InputItem, Toast, WhiteSpace } from '@ant-design/react-native';
import { mainStyle, screenH } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import BxButton from '../../components/Pubilc/Button';
// var ImagePicker = require('react-native-image-picker');

interface Props { }
interface State {
  email: string,
  address: string,
  clicking: boolean
}

const defaultIcon = require('../../../images/defaultIcon.png')

@inject('userStore')
@observer
class UserInfo extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('个人信息'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  timer: any;
  codeRef: any;
  constructor(props: Props, state: State) {
    super(props);
    let { userStore } = this.props;
    let userInfo = userStore.userInfo;
    this.state = {
      email: userInfo.email || '',
      address: userInfo.address || '',
      clicking: false
    };
  }

  componentDidMount() {

  }

  handleEditUsername() {
    let { userStore } = this.props;
    Modal.prompt(
      '请输入新的昵称',
      '',
      username => {
        userStore.EditUserName({ username })
          .then(res => { console.log(res) })
      },
      'default',
      null,
      ['新的昵称']
    );
  }
  handleSubmit() {
    let { userStore, navigation } = this.props;
    let { email, address } = this.state;
    if (email == '' || address == '') {
      Toast.info('请完善信息');
      return false
    }
    this.setState({
      clicking: true
    })
    userStore.EditInfo({ email, address })
      .then(res => {
        this.setState({
          clicking: false
        })
      })

  }
  changehead() {
    const options = {
      title: '从相册选择或拍摄',
      chooseFromLibraryButtonTitle: '从相册选择',
      takePhotoButtonTitle: '拍摄',
      cancelButtonTitle: '取消',
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (!response.error) {
    //     if (response.didCancel) {
    //       return;
    //     }
    //     const source = { uri: response.uri };
    //     this.base64 = response.data;
    //     //注意，iOS 获取的图片地址要替换掉"file://",这是后面上传遇到的坑
    //     this.fileURI = IS_IOS ? response.uri.replace('file://', '') : response.uri;
    //     this.fileName = response.fileName || 'cash.jpg';
    //     this.fileType = response.type;
    //   }

    // });
  }
  render() {
    let { userStore } = this.props;
    let { email, address, clicking } = this.state;
    let userInfo = userStore.userInfo;
    return (
      <View style={[mainStyle.column, mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="个人信息"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1, mainStyle.mat15]} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => this.changehead()}>
            <View style={[mainStyle.row, mainStyle.palr15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb20, mainStyle.brb1f2, mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15, mainStyle.c666]}>头像</Text>
              <View style={[mainStyle.row, mainStyle.aiCenter]}>
                <Image style={[mainStyle.useravator]} source={userInfo.avatar ? { uri: userInfo.avatar } : defaultIcon}></Image>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[mainStyle.row, mainStyle.palr15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb20, mainStyle.brb1f2, mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15, mainStyle.c666]}>姓名</Text>
              <View style={[mainStyle.row, mainStyle.aiCenter]}>
                {/* <TextInput
                  value={userInfo.username}
                  placeholderTextColor={mainStyle.c999.color}
                  style={[styles.input]}
                  placeholder={"请输入收货人姓名"}
                  onChangeText={userInfo => {
                    this.setState({ userInfo })
                  }}
                ></TextInput> */}
                <Text style={[mainStyle.c333, mainStyle.fs15]}>{userInfo.username}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[mainStyle.row, mainStyle.palr15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb20, mainStyle.brb1f2, mainStyle.bgcfff]}>
              <Text style={[mainStyle.fs15, mainStyle.c666]}>绑定手机</Text>
              <View style={[mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.c333, mainStyle.fs15]}>{userInfo.mobile}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[mainStyle.row, mainStyle.palr15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb20, mainStyle.brb1f2, mainStyle.bgcfff]}>
            <Text style={[mainStyle.fs15, mainStyle.c666]}>性别</Text>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.c333, mainStyle.fs14]}>{userInfo.sex == 1 ? '男' : '女'}</Text>
            </View>
          </View>
          <View style={[mainStyle.row, mainStyle.palr15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb20, mainStyle.brb1f2, mainStyle.bgcfff]}>
            <Text style={[mainStyle.fs15, mainStyle.c666]}>生日</Text>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.c333, mainStyle.fs14]}>{userInfo.birthday || ''}</Text>
            </View>
          </View>
          <View style={[mainStyle.row, mainStyle.palr15, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.patb20, mainStyle.bgcfff]}>
            <Text style={[mainStyle.fs15, mainStyle.c666]}>会员等级</Text>
            <View style={[mainStyle.row, mainStyle.aiCenter]}>
              <Text style={[mainStyle.czt, mainStyle.fs14]}>{userInfo.level_name}</Text>
            </View>
          </View>
          <View style={[mainStyle.column, mainStyle.bgcfff]}>
            <InputItem
              clear
              type="text"
              ref={el => (this.codeRef = el)}
              value={email}
              onChange={value => {
                this.setState({
                  email: value
                });
              }}
              placeholder="请输入邮箱"
              style={[mainStyle.fs14]}
            >
              <Text style={[mainStyle.c333, mainStyle.fs14]}>邮箱</Text>
            </InputItem>
            <InputItem
              clear
              type="text"
              ref={el => (this.codeRef = el)}
              value={address}
              onChange={value => {
                this.setState({
                  address: value
                });
              }}
              placeholder="请输入居住地"
              style={[mainStyle.fs14]}
            >
              <Text style={[mainStyle.c333, mainStyle.fs14]}>居住地</Text>
            </InputItem>
            <WhiteSpace />
          </View>
          <View style={[mainStyle.palr15]}>
            <View style={[mainStyle.mat20]}>
              <BxButton
                title="提交"
                disabled={clicking}
                colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                onClick={() => { this.handleSubmit() }}
              ></BxButton>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default UserInfo