import React from 'react';
import { Text, View, ScrollView, Alert, Image, TouchableOpacity, TextInput, StyleSheet, DeviceEventEmitter, Keyboard } from 'react-native';
import { WhiteSpace, Switch, ActivityIndicator, Toast } from '@ant-design/react-native';
import { mainStyle, screenH, setSize, screenW } from '../../public/style/style';
import { headerTitle, headerRight } from '../../router/navigationBar';
import NavTop from '../../router/navTop';
import { observer, inject } from 'mobx-react';
import BxButton from '../../components/Pubilc/Button';
import { ADDRESS } from '../../tools/addressJson';
import BxAddressPicker from '../../components/Pubilc/AddressPicker';

interface Props { }
interface State {

}

@inject('addressStore')
@observer
class AddressOperate extends React.Component<Props, State> {
  static navigationOptions = {
    // headerTitle:headerTitle('个人信息'),
    // headerRight:headerRight(<Text></Text>),
    header: null
  }
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      mobile: '',
      consignee: '',
      address: '',
      is_default: 0,
      region: [],
      id: '',
      loading: false
    };
  }

  componentDidMount() {
    let { addressStore, navigation } = this.props
    let { params } = navigation.state
    if (params.type == 'edit') {
      this.setState({
        loading: true
      })
      addressStore.getAddressInfo(params.id)
        .then(res => {
          this.setState({
            mobile: res.mobile,
            consignee: res.consignee,
            address: res.address,
            is_default: res.is_default,
            region: JSON.parse(res.region),
            id: res.id,
            loading: false
          })
        }).catch(err => {
          this.setState({ loading: false })
        })
    }
  }

  handleSubmit() {
    let { id, mobile, consignee, address, is_default, region } = this.state
    let { addressStore, navigation } = this.props
    let { params } = navigation.state
    let postData = { mobile, consignee, address, is_default, region: JSON.stringify(region) }
    if (params.type == 'edit') {
      postData.id = id
    }
    if (mobile == '' || consignee == '' || address == '' || region.length < 1) {
      Toast.info('请输入信息', 1.4, undefined, false)
      return false
    }
    this.setState({
      loading: true
    })
    addressStore.addOrEditAddress(postData, params.type)
      .then(res => {
        // if (res.errorCode != 2001) {
        //   return false
        // }
        this.setState({
          loading: false
        })
        postData.region = region
        if (params.type == 'add') {
          postData.id = res.data.id;
          addressStore.setAddress(postData)
          DeviceEventEmitter.emit('TORELOADCARTDATA', 'yes')
        }
        navigation.goBack()
      }).catch(err => {
        this.setState({ loading: false })
      })
  }

  showAddressPicker() {
    this.refs.AddressPicker._show()
  }

  handleChangeDefault() {
    let { is_default } = this.state
    this.setState({
      is_default: is_default == 1 ? 0 : 1
    })
  }
  handledelete() {
    let { addressStore, navigation } = this.props
    let { params } = navigation.state
    let { addressSelect } = addressStore
    if (params.type == 'edit') {
      this.setState({ loading: true })
      addressStore.delectAddress(params.id)
        .then(res => {
          this.setState({ loading: false })
          if (params.id == addressSelect.id) {
            addressStore.setAddress({})
          }
          navigation.goBack();
        })
        .catch(err => { this.setState({ loading: false }) })
    }
  }
  render() {
    let { addressStore, navigation } = this.props
    let { params } = navigation.state
    let { mobile, consignee, address, is_default, region, loading } = this.state
    return (
      <View style={[mainStyle.column, mainStyle.flex1, mainStyle.bgcf7]}>
        <NavTop
          navType="normal"
          title="地址管理"
          onPress={() => {
            this.props.navigation.goBack();
          }}
          children={(
            <View style={[mainStyle.column, mainStyle.aiEnd, mainStyle.flex1, mainStyle.mar15]}>
              <TouchableOpacity
                onPress={() => {
                  this.handleSubmit()
                }}
              >
                <Text style={[mainStyle.c333, mainStyle.fs13]}>{params.type == 'edit' ? '保存修改' : '提交'}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></NavTop>
        <ActivityIndicator
          toast
          size="large"
          text="加载中..."
          animating={loading}
        ></ActivityIndicator>
        <View style={[mainStyle.flex1, mainStyle.mat15]}>
          <ScrollView style={[mainStyle.flex1]}>
            <View style={[mainStyle.flex1, mainStyle.palr15, mainStyle.column, mainStyle.bgcfff]}>
              <WhiteSpace />
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brb1f2]}>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.c333, mainStyle.fs14]}>姓名</Text>
                </View>
                <View style={[mainStyle.flex3, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
                  <TextInput
                    value={consignee}
                    placeholderTextColor={mainStyle.c999.color}
                    style={[styles.input]}
                    placeholder={"请输入收货人姓名"}
                    onChangeText={consignee => {
                      this.setState({ consignee })
                    }}
                    onBlur={() => { Keyboard.dismiss(); }}
                    returnKeyType={"done"}
                  ></TextInput>
                </View>
              </View>
              <WhiteSpace />
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brb1f2]}>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.c333, mainStyle.fs14]}>手机</Text>
                </View>
                <View style={[mainStyle.flex3, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
                  <TextInput
                    type="phone"
                    value={mobile}
                    placeholderTextColor={mainStyle.c999.color}
                    style={[styles.input]}
                    placeholder={"请输入收货人手机号"}
                    onChangeText={mobile => {
                      this.setState({ mobile })
                    }}
                    onBlur={() => { Keyboard.dismiss(); }}
                    returnKeyType={"done"}
                  ></TextInput>
                </View>
              </View>
              <WhiteSpace />
              <TouchableOpacity onPress={() => {
                this.showAddressPicker();
                Keyboard.dismiss();
              }}
                style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brb1f2]}>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.c333, mainStyle.fs14]}>选择地区</Text>
                </View>
                <View style={[mainStyle.flex3, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
                  <View style={[mainStyle.flex1, mainStyle.h100, mainStyle.row, mainStyle.aiCenter]}>
                    {
                      region.length == 0
                        ? <Text style={[mainStyle.fs13, mainStyle.c999, { marginLeft: setSize(4) }]}>点击选择地址</Text>
                        : <Text style={[mainStyle.fs13, mainStyle.c333, { marginLeft: setSize(4) }]}>{region[0]}  {region[1] ? '-' + region[1] : ''} {region[2] ? '-' + region[2] : ''}</Text>
                    }
                  </View>
                </View>
              </TouchableOpacity>
              <WhiteSpace />
              <View style={[mainStyle.row, mainStyle.jcBetween, mainStyle.brb1f2]}>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.h100, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.c333, mainStyle.fs14]}>详细地址</Text>
                </View>
                <View style={[mainStyle.flex3, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
                  <TextInput
                    value={address}
                    placeholderTextColor={mainStyle.c999.color}
                    style={[
                      styles.input,
                    ]}
                    placeholder={"请输入详细地址"}
                    onChangeText={address => {
                      this.setState({ address })
                    }}
                    onBlur={() => { Keyboard.dismiss(); }}
                  ></TextInput>
                </View>
              </View>
              <WhiteSpace />
              <View style={[mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.brb1f2]}>
                <View style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter]}>
                  <Text style={[mainStyle.c333, mainStyle.fs14]}>设置默认</Text>
                </View>
                <View style={[mainStyle.flex3, mainStyle.row, mainStyle.jcBetween, mainStyle.aiCenter]}>
                  <Switch
                    color={mainStyle.cztc.color}
                    checked={is_default == 1}
                    onChange={(e) => {
                      this.handleChangeDefault()
                    }}
                  />
                </View>
              </View>
            </View>
            {params.type == 'edit' ? <TouchableOpacity onPress={() => { this.handledelete() }} style={[mainStyle.palr15, mainStyle.h100, mainStyle.row, mainStyle.aiCenter, mainStyle.jcBetween, mainStyle.bgcfff, mainStyle.mat15]}>
              <View style={[mainStyle.flex1, mainStyle.row, mainStyle.aiCenter]}>
                <Text style={[mainStyle.czt, mainStyle.fs14]}>删除地址</Text>
              </View>
            </TouchableOpacity> : null}
          </ScrollView>
          <BxAddressPicker ref="AddressPicker" onChange={region => { this.setState({ region }) }}></BxAddressPicker>
          {/* <View style={[mainStyle.h120, mainStyle.palr15, mainStyle.bgcfff, mainStyle.aiCenter, mainStyle.row]}>
            <BxButton
              disabled={loading}
              colors={[mainStyle.cztc.color, mainStyle.cju.color]}
              btnstyle={[{ borderRadius: setSize(60), width: screenW - setSize(60) }]}
              title={params.type == 'edit' ? '保存修改' : '提交'}
              onClick={() => {
                this.handleSubmit()
              }}
            ></BxButton>
          </View> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 0,
    color: mainStyle.c333.color,
    flex: 1,
    height: setSize(100)
  }
})

export default AddressOperate