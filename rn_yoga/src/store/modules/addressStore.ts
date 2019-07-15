import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Address {
  constructor() {

  }
  @observable addressData = {
    addressArr: [],
    addressInfo: {},
    addressSelect: {}
  }

  @computed get addressArr() {
    return this.addressData.addressArr
  }

  @computed get addressInfo() {
    return this.addressData.addressInfo
  }

  @computed get addressSelect() {
    let { addressSelect } = this.addressData
    return addressSelect
  }

  @action setAddress(val) {
    this.addressData.addressSelect = val
  }

  @action async addOrEditAddress(params: object, type: string) {
    try {
      let url = '/user/add_address'
      if (type == 'edit') {
        url = '/user/edit_address'
      }
      let response = await new Fetch(url, 'POST', { ...params }, {})
      Toast.info(response.message, 1.2, undefined, false)
      this.getAddress()
      return response
    } catch (error) {
      return null
    }
  }

  @action async delectAddress(id: string) {
    try {
      let response = await new Fetch('/user/del_address', 'POST', { id }, {})
      Toast.info(response.message, 1.2, undefined, false)
      this.getAddress()
      return response
    } catch (error) {
      return null
    }
  }

  @action async getAddress() {
    try {
      let response = await new Fetch('/user/address_list', 'GET', {}, {})
      let addressArr = response.data.data
      for (let i in addressArr) {
        if (addressArr[i].region) {
          addressArr[i].region = JSON.parse(addressArr[i].region)
        } else {
          addressArr[i].region = []
        }
      }
      this.addressData.addressArr = response.data.data
      return this.addressData.addressArr
    } catch (error) {
      return null
    }
  }

  @action async getAddressInfo(id: string) {
    try {
      let response = await new Fetch('/user/address_detail', 'GET', { id }, {})
      let addressInfo = response.data
      this.addressData.addressInfo = addressInfo
      return addressInfo
    } catch (error) {
      return null
    }
  }

}

const addressStore = new Address()

export default addressStore