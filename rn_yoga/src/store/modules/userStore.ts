
import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';
import RNStorage from './../../public/js/storage';


class User {
  constructor() {
    
  }
  @observable userData = {
    token:'',
    userInfo:{
      avatar:'',
      username:'',
      mobile:'',
      level_name:'',
    }
  }

  @computed get token(){
    return this.userData.token
  }

  @computed get userInfo(){
    return this.userData.userInfo
  }

  @action setToken(token:string){
    this.userData.token = token
  }

  @action removeToken(){
    this.userData.token = ''
  } 

  @action RegisterAndPassword(params:object){
    return new Promise((resolve,reject)=>{
      let response = new Fetch('/login/mobile_reg','POST',params,{});
      response.then(res=>{
        Toast.info(res.msg,2);
        resolve(res);
      })
      .catch(err=>{
        
      })
      
    })
  }

  @action async Login(params:object){
    try {
      let response = await new Fetch('/login/mobile','POST',params,{});
      this.userData.token = response.data.token;
      RNStorage.save({key:'token',data:response.data.token}).then(saveSuccess=>{});
      return response
    } catch (error) {
      return null
    }
  }

  @action async Loginout(){
    try {
      let response = await new Fetch('/user/logout','POST',{},{});
      this.userData.token = '';
      RNStorage.remove({key:'token'})
    } catch (error) {
      return null
    }
  }
  /**
   * @description 修改密码的短信验证
   *
   */
  @action async PasswordVerify(params:object){
    try {
      let response = await new Fetch('/user/change_verify','POST',params,{});
      return response;
    } catch (error) {
      return null
    }
  }
  /**
   * @description 确认修改密码
   *
   */
  @action async ChangePassword(params:object){
    try {
      let response = await new Fetch('/user/change_password','POST',params,{});
      this.userData.token = '';
      RNStorage.remove({key:'token'}).then(ress=>{});
      return response;
    } catch (error) {
      return null
    }
  }

  @action async GetUserInfo(){
    try {
      let response = await new Fetch('/user/detail','GET',{},{});
      this.userData.userInfo = response.data;
      return response;
    } catch (error) {
      return null
    }
  }

  @action async EditUserName(params:object){
    try {
      let response = await new Fetch('/user/edit_name','POST',params,{});
      this.userData.userInfo.username = params.username;
      return response;
    } catch (error) {
      return null
    }
  }


}

const userStore = new User()

export default userStore

