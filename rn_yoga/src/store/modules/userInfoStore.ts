
import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';
import RNStorage from './../../public/js/storage';


class UserInfo {
  constructor() {
    
  }
  @observable userData = {
    token:''
  }

  @computed get token(){
    return this.userData.token
  }

  @action setToken(token:string){
    this.userData.token = token
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

  @action Login(params:object){
    return new Promise((resolve,reject)=>{
      let response = new Fetch('/login/mobile','POST',params,{});
      response.then(res=>{
        this.userData.token = res.data.token;
        RNStorage.save({
          key:'token',
          data:res.data.token
        }).then(saveSuccess=>{
          resolve(res);
        }).then(err=>{})
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
      
    })
  }

  @action Loginout(){
    return new Promise((resolve,reject)=>{
      let response = new Fetch('/user/logout','POST',{},{});
      response.then(res=>{
        //Toast.info(res.msg,2);
        this.userData.token = '';
        RNStorage.remove({key:'token'})
        .then(ress=>{})
      })
      .catch(err=>{
        reject(err)
        console.log(err)
      })
      
    })
  }


}

const userInfoStore = new UserInfo()

export default userInfoStore

