import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Order {
  constructor() {
    
  }
  @observable orderData = {
    orderNumber:{},
    orderList:{
      all:{
        data:[],
        total:null,
        page:1
      },
      unpay:{
        data:[],
        total:null,
        page:1
      },
      pay:{
        data:[],
        total:null,
        page:1
      },
      cancel:{
        data:[],
        total:null,
        page:1
      }
    }
  }

  @computed get orderNumber(){
    return this.orderData.orderNumber
  }

  @computed get orderListAll(){
    return this.orderData.orderList['all']
  }

  @action async getOrderNumber(){
    try {
      let response = await new Fetch('/user/order_num','GET',{},{})
      let orderNumber = response.data
      this.orderData.orderNumber = orderNumber
      return orderNumber
    } catch (error) {
      return null
    }
  }

  @action async getOrderList(type){
    try {
      let { orderList } = this.orderData
      let page = orderList[type].page
      let params = { type , page }
      let response = await new Fetch('/user/order_list','GET',{size:10,...params},{})
      let newdata = response.data
      let newlist = orderList[type].data.concat(newdata.data)
      if(newlist.length<newdata.total){
        page++
      }
      this.orderData.orderList[type] = {page,data:newlist,total:newdata.total}
      console.log(this.orderData.orderList[type])
      return this.orderData.orderList
    } catch (error) {
      console.log(error)
      return null
    }
  }
  
}

const orderStore = new Order()

export default orderStore