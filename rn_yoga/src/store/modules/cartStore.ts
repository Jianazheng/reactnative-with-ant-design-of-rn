import { observable, computed, action, toJS } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';
import { DeviceEventEmitter } from 'react-native';
import addressStore from './addressStore';

class Cart {
  constructor() {

  }
  @observable cartData = {
    selectData: {},
    cartList: {},//购物车分类：course 课程 product 商品 train 培训 
    cartListObj2Arr: [],//购物车不归类全部集合 用于对比
    cartInvalid: [],// 已过期的
    ids: [],
    cartTotalPrice: 0,
    cartTotals: 0,
    settlementInfo: {
      orderCount: 0,
      orderPrice: 0,
      pStatusArray: [],
      pass: 0,
      address: {}
    },
    orderStatus: {},
    hascart: false
  }

  @computed get selectData() {
    return this.cartData.selectData
  }

  @computed get settlementInfo() {
    return this.cartData.settlementInfo
  }

  @computed get orderStatus() {
    return this.cartData.orderStatus
  }

  @computed get cartList() {
    let { cartList } = this.cartData
    for (let i in cartList) {
      for (let j in cartList[i]) {
        cartList[i][j].checked = cartList[i][j].checked == undefined ? false : true;
      }
    }
    return this.cartData.cartList
  }
  @computed get hascart() {
    return this.cartData.hascart
  }

  @computed get cartListObj2Arr() {
    let { cartListObj2Arr } = this.cartData
    return cartListObj2Arr
  }

  @computed get cartInvalid() {
    let { cartInvalid } = this.cartData
    let newArr = []
    for (let i in cartInvalid) {
      newArr.push(...cartInvalid[i])
    }
    return newArr
  }

  @computed get ids() {
    let { ids } = this.cartData
    return ids
  }
  /**
   * 购物车价格计算 
   * */
  @computed get cartPrice() {
    let { cartList, cartTotalPrice } = this.cartData
    if (cartList.length < 1) {
      cartTotalPrice = 0
      return 0
    } else {
      let newCartList = JSON.parse(JSON.stringify(cartList))
      let newPrice = 0
      for (let i in newCartList) {
        for (let j in newCartList[i]) {
          let citem = newCartList[i][j];
          if (citem.checked) {
            if (citem.count != undefined && citem != null) {
              newPrice += Number(citem.count) * Number(citem.price)
            } else {
              newPrice += Number(citem.price)
            }
          }
        }
      }
      cartTotalPrice = newPrice
      return newPrice
    }
  }
  /**
   * 购物车数量计算 
   * */
  @computed get cartTotal() {
    let { cartList, cartTotals } = this.cartData
    if (cartList.length < 1) {
      cartTotals = 0
      return 0
    } else {
      let newCartList = JSON.parse(JSON.stringify(cartList))
      let newTotal = 0
      for (let i in newCartList) {
        for (let j in newCartList[i]) {
          let citem = newCartList[i][j];
          if (citem.checked) {
            if (citem.count != undefined && citem != null) {
              newTotal += Number(citem.count)
            } else {
              newTotal += 1
            }
          }
        }
      }
      cartTotals = newTotal
      return cartTotals
    }
  }

  @action selectItem(item: object) {
    /**item 三个参数
     *type	整型	必填	-	-	商品类型1-商品，2-培训，3-在线课程
      good_id	整型	必填	-	-	商品ID
      sku_id	整型	非必填	-	-	商品SKU，当type为在线课程时，字段为空
     */
    this.cartData.selectData = item;
  }
  @action async getCartList() {
    try {

      let response = await new Fetch('/cart/list', 'GET', {}, {})
      let cartList = response.data
      let newobj = {}
      let newArr = []
      this.cartData.cartInvalid = [];
      for (let i in cartList) {
        if (i == 'invalid') {
          this.cartData.cartInvalid = cartList[i]
        } else {
          newobj[i] = cartList[i]
          newArr.push(...cartList[i])
        }
      }
      this.cartData.ids = []
      this.cartData.cartList = newobj
      this.cartData.cartListObj2Arr = newArr
      this.cartData.hascart = Object.keys(newobj).length > 0 ? true : false;
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }

  @action async createCart() {
    let { selectData } = this.cartData
    return selectData
  }

  @action async addCart() {
    try {
      let { selectData } = this.cartData
      let params = { ...selectData }
      let response = await new Fetch('/cart/add', 'POST', params, {})
      Toast.info(response.message, 1.2, undefined, false)
      this.cartData.hascart = true;
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 批量删除购物车，可多选 ids:Array<string>
   */
  @action async delectCartItem() {
    try {
      let { ids } = this.cartData
      let params = { ids: ids }
      let response = await new Fetch('/cart/del', 'POST', params, {})
      ids = [];
      Toast.info(response.message, 1.2, undefined, false)
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 删除单个类型购物车 商品类型1-商品，2-培训，3-在线课程
   */
  @action async delectCartMain(type: string | number) {
    try {
      let params = { type }
      let response = await new Fetch('/cart/del_type', 'POST', params, {})
      Toast.info(response.message, 1.2, undefined, false)
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 购物车多选
   */
  @action setSelectItem(type: string, index: number) {
    let { cartList } = this.cartData
    cartList[type][index].checked = cartList[type][index].checked ? false : true
    let ids = [];
    for (let i in cartList) {
      for (let j in cartList[i]) {
        if (cartList[i][j].checked) {
          ids.push(cartList[i][j].id)
        }
      }
    }
    let newids = ids
    this.cartData.ids = newids;
  }
  /**
   * 全选
   */
  @action setSelectAll(selectAll) {
    let { cartList } = this.cartData
    let newids = [];
    for (let i in cartList) {
      for (let j in cartList[i]) {
        if (!selectAll) {
          cartList[i][j].checked = true
          newids.push(cartList[i][j].id)
        } else {
          cartList[i][j].checked = false
          newids = []
        }
      }
    }
    this.cartData.ids = newids;
  }

  @action async editCartItem(type: string, index: number, value: string) {
    try {
      let { cartList } = this.cartData
      let id = cartList[type][index].id
      let params = { id, num: value }
      cartList[type][index].count = value
      let response = await new Fetch('/cart/product_edit', 'POST', params, {})
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 购物车添加数量
   */
  @action async addCartItem(type: string, index: number) {
    try {
      let { cartList } = this.cartData
      let count = cartList[type][index].count
      let id = cartList[type][index].id
      count = Number(count)
      count += 1
      let params = { id, num: count }
      cartList[type][index].count = count.toString()
      let response = await new Fetch('/cart/product_edit', 'POST', params, {})
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 购物车减少数量
   */
  @action async reduceCartItem(type: string, index: number) {
    try {
      let { cartList } = this.cartData
      let count = cartList[type][index].count
      let id = cartList[type][index].id
      if (count > 1) {
        count -= 1
      }
      let params = { id, num: count }
      cartList[type][index].count = count.toString()
      let response = await new Fetch('/cart/product_edit', 'POST', params, {})
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 购物车结算
   */
  @action async settlement() {
    try {
      let { ids, settlementInfo } = this.cartData
      let params = { cart: toJS(ids) }
      let response = await new Fetch('/order/settle_cart', 'POST', params, {}, 'v2')
      this.cartData.settlementInfo = response.data
      if (response.errorCode == 1083) {
        return response
      } else if (response.data.pass == 0) {
        Toast.info(response.message, 1.4, undefined, false)
        return response.data
      } else {
        return response.data
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 购物车结算生成订单
   */
  @action async createOrder(address_id) {
    try {
      let { ids } = this.cartData
      let params = { cart: ids, address_id }
      let response = await new Fetch('/order/place_cart', 'POST', params, {}, 'v2')
      Toast.info(response.message, 1, undefined, false)
      this.cartData.orderStatus = response.data
      DeviceEventEmitter.emit('TORELOADMINE', 'yes');
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 快速购买
   */
  @action async fastBuy(params: object) {
    /**
     * params:{
    *   good_id :商品ID
    *   type:商品类型，1-商品，2-培训，3-在线课程
    *   sku_id:sku
     * }
     */
    try {
      let response = await new Fetch('/order/direct_settle', 'POST', { ...params }, {}, 'v2')
      this.cartData.settlementInfo = response.data
      if (response.data.pass == 0) {
        Toast.info(response.message, 1.4, undefined, false)
      } else {
        if (params.type == 1) {
          //保存地址
          if (response.data.address.region) {
            response.data.address.region = JSON.parse(response.data.address.region)
          }
          addressStore.setAddress(response.data.address)
        }
      }
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * 快速购买生成订单
   */
  @action async fastbuyOrder(address_id = '') {
    try {
      let { selectData } = this.cartData
      let params = { ...selectData, address_id }
      let response = await new Fetch('/order/place_direct', 'POST', params, {}, 'v2')
      Toast.info(response.message, 1, undefined, false)
      this.cartData.orderStatus = response.data
      DeviceEventEmitter.emit('TORELOADMINE', 'yes');
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

const cartStore = new Cart()

export default cartStore