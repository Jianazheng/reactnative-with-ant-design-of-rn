import { observable, computed, action, toJS } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Train {
  constructor() {

  }
  @observable trainData = {
    trainInfo: {
      is_collection: 0,
      teacher: [],
      relate_train: []
    },
    frontInfo: { detail: [] },
    trainSelectItem: [],
    promotionInfo: [],
    selectItem: {},
    classify: [],
    //培训列表
    trainCourse: {
      data: [],
      total: null,
      page: 1
    },
    //培训详情
    trainCourseInfo: {
      teacher: [],
      servers: ''
    },
    //培训服务
    trainService: {
      server: []
    },
    //培训服务id集
    serviceIdArr: [],
    //培训购物车
    cartItem: { price: '', type_name: '' },
    oncheck: 0,
    keyword: '',
    trainSearch: {
      data: [],
      total: 0,
      current_page: 1
    }
  }

  @computed get cartItem() {
    return this.trainData.cartItem
  }
  @computed get oncheck() {
    return this.trainData.oncheck
  }
  @computed get trainInfo() {
    return this.trainData.trainInfo
  }

  @computed get promotionInfo() {
    return this.trainData.promotionInfo
  }

  @computed get frontInfo() {
    return this.trainData.frontInfo
  }

  @computed get trainSelectItem() {
    return this.trainData.trainSelectItem
  }

  @computed get classify() {
    return this.trainData.classify
  }

  @computed get trainCourse() {
    return this.trainData.trainCourse
  }

  @computed get trainCourseInfo() {
    return this.trainData.trainCourseInfo
  }

  @computed get trainService() {
    return this.trainData.trainService
  }

  @computed get serviceIdArr() {
    return this.trainData.serviceIdArr
  }
  @computed get trainSearch() {
    return this.trainData.trainSearch
  }
  @action setKeyword(keyword: string, issearch: boolean) {
    this.trainData.keyword = keyword
    if (issearch == true) {
      this.getSearchList(true)
    }
  }
  @action async getSearchList(reload: boolean | undefined) {
    try {
      let { trainSearch, keyword } = this.trainData
      let params = { page: this.trainSearch.current_page, search: keyword }
      if (reload) {
        //重置列表
        trainSearch = {
          data: [],
          current_page: 1,
          total: 0
        }
        this.trainData.trainSearch = trainSearch
        params.page = 1;
      }
      let response = await new Fetch('/train/search', 'GET', { size: 10, ...params }, {})
      let resd = response.data
      trainSearch.total = resd.total
      if (trainSearch.data.length >= resd.total) return response
      let newdata = trainSearch.data.concat(resd.data)
      trainSearch.data = newdata
      if (trainSearch.data.length < resd.total) {
        trainSearch.current_page += 1
      }
      this.trainData.trainSearch = trainSearch
      return response
    } catch (error) {
      return null
    }
  }
  @action async getClassify() {
    try {
      let response = await new Fetch('/train/list', 'GET', {}, {});
      let classifys = response.data;
      if (classifys.length > 0) {
        classifys[0].checked = true;
      }
      this.trainData.classify = classifys;
      return response
    } catch (error) {
      return null
    }
  }

  @action classifySelect(index: number | string) {
    let { classify } = this.trainData
    classify.map((val, i) => {
      val.checked = i == index ? true : false
    })
  }

  @action async getTrainInfo(id: string | number) {
    try {
      this.trainData.trainInfo = {
        is_collection: 0,
        teacher: [],
        relate_train: []
      }
      let response = await new Fetch('/train/base_info', 'GET', { id }, {});
      let trainInfo = response.data;
      trainInfo.cover = trainInfo.image_url != null ? trainInfo.image_url.length > 0 ? trainInfo.image_url[0] : '' : '';
      if (trainInfo.video_url) {
        if (trainInfo.image_url) {
          trainInfo.image_url.unshift(trainInfo.video_url)
        }
      }
      this.trainData.trainInfo = trainInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getFrontInfo(id: string | number) {
    try {
      this.trainData.frontInfo = { detail: [] }
      let response = await new Fetch('/train/front_train_info', 'GET', { id }, {});
      let frontInfo = response.data;
      this.trainData.frontInfo = frontInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainPromotion(id: string | number) {
    try {
      this.trainData.promotionInfo = []
      let response = await new Fetch('/train/promotion_info', 'GET', { id }, {});
      let promotionInfo = response.data;
      this.trainData.promotionInfo = promotionInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainSelectItem(id: string | number) {
    try {
      let response = await new Fetch('/train/sku_info', 'GET', { id }, {})
      let trainSelectItem = response.data
      if (trainSelectItem.length > 0) {
        this.trainData.oncheck = 0;
        this.trainData.cartItem = trainSelectItem[0]
      }
      this.trainData.trainSelectItem = trainSelectItem
      return response
    } catch (error) {
      return null
    }
  }

  @action selectItem(item: object) {
    this.trainData.selectItem = item;
  }

  @action async getTrainCourse() {
    try {
      let { trainCourse } = this.trainData
      let params = { page: this.trainCourse.page }
      let response = await new Fetch('/train/mycourse/list', 'GET', { size: 10, ...params }, {})
      let resd = response.data
      trainCourse.total = resd.total
      if (trainCourse.data.length >= resd.total) return response
      let newdata = params.page == 1 ? resd.data : trainCourse.data.concat(resd.data)
      trainCourse.data = newdata
      if (trainCourse.data.length < resd.total) {
        trainCourse.page += 1
      }
      this.trainData.trainCourse = trainCourse
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainCourseInfo(id: string | number) {
    try {
      let response = await new Fetch('/train/mycourse/detail', 'GET', { id }, {});
      let trainCourseInfo = response.data;
      this.trainData.trainCourseInfo = trainCourseInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainService(id: string | number) {
    try {
      this.trainData.trainService = { server: [] }
      let response = await new Fetch('/train/server/info', 'GET', { id }, {});
      let trainService = response.data;
      this.trainData.trainService = trainService;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectService(index: number | string) {
    let { trainService } = this.trainData
    trainService.server[index].checked = trainService.server[index].checked ? false : true
  }

  @action async serviceEnsure() {
    try {
      let { trainService } = this.trainData
      let newarr = []
      for (let i in trainService.server) {
        if (trainService.server[i].checked) {
          newarr.push(trainService.server[i].server_id)
        }
      }
      this.trainData.serviceIdArr = newarr
      return this.trainData.serviceIdArr
    } catch (error) {
      console.log(error)
      this.trainData.serviceIdArr = []
      return this.trainData.serviceIdArr
    }
  }

  @action async toEnsureService() {
    try {
      let { trainService, serviceIdArr } = this.trainData
      let params = {
        id: trainService.id,
        server_id: serviceIdArr
      }
      let response = await new Fetch('/train/server/sure', 'POST', params, {});
      Toast.info('预约成功', 1.4, undefined, false)
      return response
    } catch (error) {
      return null
    }
  }

  @action selectCartItem(item: any, index: number) {
    this.trainData.cartItem = item;
    this.trainData.oncheck = index;
  }

  @action changeCollect() {
    let { trainInfo } = this.trainData
    this.trainData.trainInfo.is_collection = trainInfo.is_collection == 0 ? 1 : 0
  }

}

const trainStore = new Train()

export default trainStore