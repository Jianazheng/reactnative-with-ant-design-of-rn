
import { observable, computed, action, toJS } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';
import { Alert } from 'react-native';
import RNStorage from './../../public/js/storage';
import * as Wechat from 'react-native-wechat';

class User {
  constructor() {
    Wechat.registerApp('wxa66b688d8d2383df')
  }
  @observable userData = {
    token: '',
    userInfo: {
      avatar: '',
      username: '',
      mobile: '',
      level_name: ''
    },
    memberInfo: {
      user: {},
      level: []
    },
    certList: {
      data: [],
      total: null,
      page: 1
    },
    imageData: [],
    codeList: []
  }

  @computed get token() {
    return this.userData.token
  }

  @computed get userInfo() {
    return this.userData.userInfo
  }

  @computed get memberInfo() {
    return this.userData.memberInfo
  }
  @computed get imageData() {
    return toJS(this.userData.imageData)
  }
  @action setToken(token: string) {
    this.userData.token = token
  }
  @computed get certList() {
    return this.userData.certList
  }
  @computed get codeList() {
    return this.userData.codeList
  }
  @action removeToken() {
    this.userData.token = ''
  }

  @action RegisterAndPassword(params: object) {
    return new Promise((resolve, reject) => {
      let response = new Fetch('/login/mobile_reg', 'POST', params, {}, 'v2');
      response.then(res => {
        Toast.info(res.message, 2);
        resolve(res);
      })
        .catch(err => {

        })

    })
  }

  @action async Login(params: object) {
    try {
      let response = await new Fetch('/login/mobile', 'POST', params, {});
      this.userData.token = response.data.token;
      RNStorage.save({ key: 'token', data: response.data.token }).then(saveSuccess => { });
      return response
    } catch (error) {
      return null
    }
  }

  @action async Loginout() {
    try {
      let response = await new Fetch('/user/logout', 'POST', {}, {});
      this.userData.token = '';
      RNStorage.remove({ key: 'token' })
    } catch (error) {
      return null
    }
  }
  /**
   * @description 修改密码的短信验证
   *
   */
  @action async PasswordVerify(params: object) {
    try {
      console.log(params);
      let response = await new Fetch('/user/change_verify', 'POST', params, {});
      console.log(response)
      return response;
    } catch (error) {
      return null
    }
  }
  /**
   * @description 确认修改密码
   *
   */
  @action async ChangePassword(params: object) {
    try {
      let response = await new Fetch('/user/change_password', 'POST', params, {});
      this.userData.token = '';
      RNStorage.remove({ key: 'token' }).then(ress => { });
      return response;
    } catch (error) {
      return null
    }
  }

  @action async GetUserInfo() {
    try {
      let response = await new Fetch('/user/detail', 'GET', {}, {});
      this.userData.userInfo = response.data;
      return response;
    } catch (error) {
      return null
    }
  }

  @action async EditUserName(params: object) {
    try {
      let response = await new Fetch('/user/edit_name', 'POST', params, {});
      this.userData.userInfo.username = params.username;
      return response;
    } catch (error) {
      return null
    }
  }

  @action async WxLogin() {
    try {
      const scope = 'snsapi_userinfo'
      const state = ''
      let isInstalled = await Wechat.isWXAppInstalled()
      console.log(isInstalled);
      if (isInstalled) {
        let responseCode = await Wechat.sendAuthRequest(scope, state)
        let res = await new Fetch('/login/wechat', 'POST', { code: responseCode.code }, {})
        return res
      } else {
        Alert.alert('请安装微信');
        return null
      }
    } catch (error) {
      Alert.alert('登录授权发生错误：');
      console.log(error)
      return null
    }
  }

  @action async bindPhone(params: object) {
    try {
      let response = await new Fetch('/login/wechat_bind', 'POST', params, {});
      return response;
    } catch (error) {
      return null
    }
  }

  @action async getMember() {
    try {
      let response = await new Fetch('/user/member', 'GET', {}, {});
      this.userData.memberInfo = response.data;
      return response;
    } catch (error) {
      return null
    }
  }

  @action async GetCertList() {
    try {
      let { certList, imageData } = this.userData
      let params = { page: this.certList.page }
      let response = await new Fetch('/user/cert_list', 'GET', { size: 10, ...params }, {});
      let resd = response.data
      if (certList.page == 1) {
        certList.data = [];
        imageData = [];
      }
      certList.total = resd.total
      if (certList.data.length >= resd.total) return response
      let newdata = certList.data.concat(resd.data)
      certList.data = newdata
      for (let i = 0; i < newdata.length; i++) {
        imageData.push(newdata[i].cert_img)
      }
      if (certList.data.length < resd.total) {
        certList.page += 1
      }
      this.userData.certList = certList
      this.userData.imageData = imageData;
      return response;
    } catch (error) {
      return null
    }
  }
  @action async CompleteInfo(params: object) {
    return new Promise((resolve, reject) => {
      let { userInfo } = this.userData;
      let response = new Fetch('/user/complete_info', 'POST', params, {});
      response.then(res => {
        Toast.info(res.message, 2);
        userInfo.birthday = params.birthday;
        userInfo.email = params.email;
        userInfo.sex = params.sex;
        userInfo.username = params.username;
        userInfo.address = params.address;
        resolve(res);
      })
        .catch(err => {

        })

    })
  }
  @action async EditInfo(params: object) {
    return new Promise((resolve, reject) => {
      let response = new Fetch('/user/edit_name', 'POST', params, {});
      response.then(res => {
        this.userData.userInfo.email = params.email;
        this.userData.userInfo.address = params.address;
        Toast.info(res.message, 2);
        resolve(res);
      })
        .catch(err => {

        })

    })
  }
  @action async getareacode() {
    try {
      let response = await new Fetch('/identity/area_code_list', 'GET', {}, {}, 'v2');
      const res = response.data;
      let codelist = [];
      for (var i = 0; i < res.length; i++) {
        codelist.push({ 'label': res[i].name_zh + ' ' + '+' + res[i].phonecode, 'value': res[i].phonecode })
      }
      this.userData.codeList = codelist;
      return response;
    } catch (error) {
      return null
    }
  }
}

const userStore = new User()

export default userStore

