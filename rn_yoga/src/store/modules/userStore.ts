
import { observable, computed, action } from 'mobx';
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
      level_name: '',
    },
    memberInfo: {
      user: {},
      level: []
    },
    certList: {
      data: [],
      total: null,
      page: 1
    }
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

  @action setToken(token: string) {
    this.userData.token = token
  }
  @computed get certList() {
    return this.userData.certList
  }
  @action removeToken() {
    this.userData.token = ''
  }

  @action RegisterAndPassword(params: object) {
    return new Promise((resolve, reject) => {
      let response = new Fetch('/login/mobile_reg', 'POST', params, {});
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
      let { certList } = this.userData
      let params = { page: this.certList.page }
      let response = await new Fetch('/user/cert_list', 'GET', { size: 10, ...params }, {});
      let resd = response.data
      if (certList.page == 1) {
        certList.data = [];
      }
      certList.total = resd.total
      if (certList.data.length >= resd.total) return response
      let newdata = certList.data.concat(resd.data)
      certList.data = newdata
      if (certList.data.length < resd.total) {
        certList.page += 1
      }
      this.userData.certList = certList
      return response;
    } catch (error) {
      return null
    }
  }
  @action async CompleteInfo(params: object) {
    return new Promise((resolve, reject) => {
      let response = new Fetch('/user/complete_info', 'POST', params, {});
      response.then(res => {
        Toast.info(res.message, 2);
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
}

const userStore = new User()

export default userStore

