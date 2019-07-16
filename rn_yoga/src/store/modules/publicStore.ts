import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Public {
  constructor() {

  }

  @observable publicData = {
    collectData: [
      {
        data: [],
        current_page: 1,
        total: null
      },
      {
        data: [],
        current_page: 1,
        total: null
      },
      {
        data: [],
        current_page: 1,
        total: null
      }
    ],
    notiveList: {
      data: [],
      current_page: 1,
      total: null
    }
  }

  @computed get collectData() {
    return this.publicData.collectData
  }

  @computed get notiveList() {
    return this.publicData.notiveList
  }

  @action async setCollection(common_id: string | number, type: string, isCollect: string | number) {
    try {
      let params = { common_id, type }
      let response = await new Fetch('/user/collection', 'POST', params, {})
      console.log(response)
      Toast.info(response.message, 1.2, undefined, false)
      return response
    } catch (error) {
      return null
    }
  }

  @action async getNotiveList() {
    try {
      let response = await new Fetch('/announcement/list', 'GET', { type: 1 }, {})
      let notiveList = response.data
      console.log(notiveList)
      return response.data
    } catch (error) {
      return null
    }
  }

  @action async getNotiveInfo(id) {
    try {
      let params = { id }
      let response = await new Fetch('/announcement/detail', 'GET', params, {})
      return response.data
    } catch (error) {
      return null
    }
  }

  @action async getCollectData(type: string, reload: string) {
    try {
      let { collectData } = this.publicData
      let collectlist = collectData[type - 1]
      let params = {
        type: type,
        page: collectlist.current_page
      }
      if (reload) {
        //重置列表
        collectlist = {
          data: [],
          current_page: 1,
          total: null
        }
        this.publicData.collectData[type - 1] = collectlist
      }
      let response = await new Fetch('/user/collection_list', 'GET', { size: 10, ...params }, {});
      let gl = response.data
      if (collectlist.data.length >= gl.total && gl.total > 0) return response
      collectlist.data = collectlist.data.concat(gl.data)
      collectlist.current_page = gl.current_page
      collectlist.total = gl.total
      if (collectlist.data.length < gl.total && collectlist.current_page > 1) {
        collectlist.current_page += 1;
      }
      this.publicData.collectData[type - 1] = collectlist
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

const publicStore = new Public()

export default publicStore