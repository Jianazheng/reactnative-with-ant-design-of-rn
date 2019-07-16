import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Order {
  constructor() {

  }
  @observable orderData = {
    orderStatus: {},
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
    orderInfo: {},
    orderReason: {},
    refundExplain: {
      reason: [],
      price: {}
    }
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

  @computed get refundExplain() {
    return this.orderData.refundExplain
  }

  @computed get orderStatus() {
    return this.orderData.orderStatus
  }

  @action async setOrderId(val) {
    this.orderData.orderStatus = val
    return val
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
      if (!order_id) order_id = this.orderData.orderStatus.order_id
      let response = await new Fetch('/user/order_detail', 'GET', { order_id }, {})
      let orderInfo = response.data
      this.orderData.orderStatus = orderInfo//保存最近的order,用于刷新订单详情，退款
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

  @action async getOrderReason() {
    try {
      let { orderStatus: { id } } = this.orderData
      let response = await new Fetch('/order/refund_reason', 'GET', { order_id: id }, {})
      let orderReason = response.data
      this.orderData.orderReason = orderReason
      return orderReason
    } catch (error) {
      return null
    }
  }

  @action async getRefundExplain() {
    try {
      let { orderStatus: { id } } = this.orderData
      let response = await new Fetch('/order/train_refund_explain', 'GET', { order_id: id }, {})
      let refundExplain = response.data
      this.orderData.refundExplain = refundExplain
      return orderReason
    } catch (error) {
      return null
    }
  }

  @action async submitRefund(refund_reason: string) {
    try {
      let { orderStatus: { id, type } } = this.orderData
      let response = await new Fetch('/order/submit_refund', 'POST', { order_id: id, type, refund_reason }, {})
      Toast.info(response.message, 1.4, undefined, false)
      return response
    } catch (error) {
      return null
    }
  }

  @action async cancelRefund(order_id: string | number) {
    try {
      let response = await new Fetch('/order/cancel_refund_order', 'POST', { order_id }, {})
      Toast.info(response.message, 1.4, undefined, false)
      return response
    } catch (error) {
      return null
    }
  }

}

const orderStore = new Order()

export default orderStore