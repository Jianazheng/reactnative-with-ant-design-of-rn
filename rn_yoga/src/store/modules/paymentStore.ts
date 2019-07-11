import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Payment {
  constructor() {
    
  }
  @observable paymentData = {
    payOrder:{}
  }

  @action async WXPay(order_type,order_id){
    try {
      let response = await new Fetch('/pay/pay_app','POST',{order_type,order_id},{})
      return response
    } catch (error) {
      return null
    }
  }
  
}

const paymentStore = new Payment()

export default paymentStore