
import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';


class User {
  constructor() {
    
  }
  @observable userData = {
    name:'binbin'
  }
  @computed get username(){
    return this.userData.name
  }
  @action editUsername(name:string){
    this.userData.name = name
  }

  @action RegisterAndPassword(params:object){
    return  new Promise((resolve,reject)=>{
      let response = new Fetch('/login/mobile_reg','POST',params,{});
      response.then(res=>{
        Toast.info(res.msg,1.8);
        resolve(res);
        console.log(res)
      })
      .catch(err=>{
        
      })
      
    })
  }
}

const userStore = new User()

export default userStore

