import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Order {
  constructor() {

  }
  @observable orderData = {
    orderNumber: {},
    orderList: {
      all: {
        data: [],
        total: null,
        page: 1
      },
      unpay: {
        data: [],
        total: null,
        page: 1
      },
      pay: {
        data: [],
        total: null,
        page: 1
      },
      cancel: {
        data: [],
        total: null,
        page: 1
      }
    },
    orderInfo: {}
  }

  @computed get orderNumber() {
    return this.orderData.orderNumber
  }

  @computed get orderListAll() {
    return this.orderData.orderList
  }

  @computed get orderInfo() {
    return this.orderData.orderInfo
  }

  @action async getOrderNumber() {
    try {
      let response = await new Fetch('/user/order_num', 'GET', {}, {})
      let orderNumber = response.data
      this.orderData.orderNumber = orderNumber
      return orderNumber
    } catch (error) {
      return null
    }
  }

  @action async getOrderList(type, resize) {
    try {
      let { orderList } = this.orderData
      if (resize) {
        orderList[type] = {
          data: [],
          total: null,
          page: 1
        }
      }
      let page = orderList[type].page
      let params = { type, page }
      if (orderList[type].data.length >= orderList[type].total && orderList[type].total != null) {
        return false
      }
      let response = await new Fetch('/user/order_list', 'GET', { size: 10, ...params }, {})
      let newdata = response.data
      let newlist = orderList[type].data.concat(newdata.data)
      if (newlist.length < newdata.total && newdata.total > 1) {
        page++
      }
      this.orderData.orderList[type] = { page, data: newlist, total: newdata.total }
      return this.orderData.orderList
    } catch (error) {
      //console.log(error)
      this.orderData.orderList[type] = {
        data: [],
        total: 0,
        page: 1
      }
      return null
    }
  }

  @action async getOrderInfo(order_id: string | number) {
    try {
      this.orderData.orderInfo = {}
      let response = await new Fetch('/user/order_detail', 'GET', { order_id }, {})
      let orderInfo = response.data
      this.orderData.orderInfo = orderInfo
      return orderInfo
    } catch (error) {
      return null
    }
  }

  @action async cancelOrder(order_id: string | number) {
    try {
      this.orderData.orderInfo = {}
      let response = await new Fetch('/user/cancel_order', 'POST', { order_id }, {})
      Toast.info(response.message, 1.4, undefined, false)
      return response
    } catch (error) {
      return null
    }
  }

}

const orderStore = new Order()

export default orderStore