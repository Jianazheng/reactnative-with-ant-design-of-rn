import React from 'react';
import { Text, View, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, InputItem, Toast, Picker, DatePicker, List } from '@ant-design/react-native';
import { mainStyle, screenH, setSize } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import BxButton from '../../components/Pubilc/Button';
import NavTop from '../../router/navTop';
import BxImgCodeInput from '../../components/Pubilc/ImgCodeInput';
import { randomCode } from '../../tools/function';
import { Fetch } from './../../fetch/request';
import { observer, inject } from 'mobx-react';
import userStore from './../../store/modules/userStore';


interface Props { }
interface State {
  username: string,
  birthday: string,
  email: string,
  address: string,
  sex: number,
  sexdata: object,
  clicking: boolean
}

@inject('userStore')
@observer
class Register extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }
  timer: any;
  codeRef: any;
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      username: '',
      sex: 1,
      birthday: '',
      email: '',
      address: '',
      sexdata: [{ 'value': 1, 'label': '男' }, { 'value': 2, 'label': '女' }],
      clicking: false
    };
  }

  componentDidMount() {

  }

  handleRegister() {
    let { userStore, navigation } = this.props;
    let { username, sex, birthday, email, address } = this.state;
    let { params } = navigation.state;
    console.log(params);
    if (username == '' || birthday == '' || email == '' || address == '') {
      Toast.info('请完善所有信息');
      return false
    }
    console.log(sex);
    userStore.CompleteInfo({ username, sex: sex.toString(), birthday, email, address })
      .then(res => {
        this.setState({
          clicking: true
        }, () => {
          if (params.length > 0) {
            navigation.navigate({ routeName: params.form });
          } else {
            navigation.goBack();
          }
        })
        setTimeout(() => {
          this.setState({
            clicking: false
          })
        }, 100)
      })

  }

  render() {
    let { username, sex, birthday, email, address, clicking, sexdata } = this.state;
    return (
      <View style={[mainStyle.flex1, mainStyle.column]}>
        <NavTop
          navType="normal"
          title="完善用户信息"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        ></NavTop>
        <ScrollView style={[mainStyle.flex1]} keyboardShouldPersistTaps="handled">
          <View style={[mainStyle.column, mainStyle.jcBetween, mainStyle.flex1, { height: screenH - setSize(200) }]}>
            <View style={[mainStyle.column]}>
              <WhiteSpace style={[{ height: setSize(120) }]} />
              <InputItem
                clear
                type="text"
                ref={el => (this.codeRef = el)}
                value={username}
                onChange={value => {
                  this.setState({
                    username: value
                  });
                }}
                placeholder="请输入用户名"
                style={[mainStyle.fs14]}
              >
                <Text style={[mainStyle.c333, mainStyle.fs14]}>用户名</Text>
              </InputItem>
              <Picker
                value={sex}
                data={sexdata}
                cols={1}
                onChange={value => {
                  console.log(value);
                  this.setState({
                    sex: value
                  });
                }}
              >
                <PickerChildren>性别</PickerChildren>
              </Picker>
              <DatePicker
                value={birthday}
                mode="date"
                minDate={new Date(1900, 1, 1)}
                onChange={value => {
                  this.setState({
                    birthday: value.toLocaleDateString()
                  });
                }}
                format="YYYY/MM/DD"
              >
                <PickerChildren>生日</PickerChildren>
              </DatePicker>
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
              <View style={[mainStyle.palr15]}>
                <View style={[mainStyle.mat20]}>
                  <BxButton
                    title="提交"
                    disabled={clicking}
                    colors={[mainStyle.czt.color, mainStyle.cztc.color]}
                    onClick={() => { this.handleRegister() }}
                  ></BxButton>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View >
    )
  }
}
const PickerChildren = (props: any) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[styles.pickersty, mainStyle.row]}
    >
      <Text style={[mainStyle.c333, mainStyle.fs14, mainStyle.flex1]}>{props.children}</Text>
      <Text style={[mainStyle.fs14, mainStyle.c333]}>
        {props.extra}
      </Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  pickersty: {
    paddingTop: setSize(30),
    paddingBottom: setSize(30),
    marginLeft: setSize(36),
    paddingRight: setSize(36),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd',
  },
})
export default Register