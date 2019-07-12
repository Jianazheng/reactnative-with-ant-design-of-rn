import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';
import * as Wechat from 'react-native-wechat';
import {Alert,DeviceEventEmitter} from 'react-native';

class Payment {
  constructor() {
    Wechat.registerApp('wxa66b688d8d2383df')
  }
  @observable paymentData = {
    payStatus:{},
    orderBook:{}
  }

  @computed get payStatus(){
    return this.paymentData.payStatus
  }

  @computed get orderBook(){
    return this.paymentData.orderBook
  }

  @action async WXPay(order_type,order_id){
    return new Promise((resolve,reject)=>{
      new Fetch('/pay/pay_app','POST',{order_type,order_id},{})
      .then(res=>{
        let {noncestr,partnerid,prepayid,timestamp,sign} = res.data
        Wechat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            Wechat.pay({
              noncestr,
              partnerid,
              prepayid,
              timestamp,
              sign,
              package:"Sign=WXPay"
            }).then(async (requestJson)=>{
              //支付成功回调                                           
              if (requestJson.errCode=="0"){
                resolve({status:1,message:'支付成功'})
                //保存订单参数
                this.paymentData.payStatus = {order_type,order_id}
                //支付回调
                await new Fetch('/pay/notify_app','POST',{},{})
              }
              return false
            }).catch((err)=>{
              console.warn(err)
              reject({status:0,message:'支付失败'})
              return false
            })
          }else{
            reject({status:1,message:'请安装微信'})
            Alert.alert('请安装微信');
          }
        })
      })
      .catch(err=>{
        //服务器错误
        reject({status:3,message:err.toString()})
        console.log(err)
      })
    })
  }

  @action async getOrderBook(){
    try {
      let {payStatus} = this.paymentData
      let params = {...payStatus}
      let response = await new Fetch('/reserve/order_server','GET',params,{})
      this.paymentData.orderBook = response.data
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  
}

const paymentStore = new Payment()

export default paymentStore