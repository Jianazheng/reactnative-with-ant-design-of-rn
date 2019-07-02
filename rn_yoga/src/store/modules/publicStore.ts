import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Public {
  constructor() {
    
  }
  
  @action async setCollection(common_id:string|number,type:string,isCollect:boolean){
    try {
      let params = {common_id,type}
      let response = new Fetch(isCollect?'/user/collection':'/user/cancel_collection','POST',params,{})
      Toast.info(response.message,1.2,undefined,false)
      return response
    } catch (error) {
      return null
    }
  }
}

const publicStore = new Public()

export default publicStore