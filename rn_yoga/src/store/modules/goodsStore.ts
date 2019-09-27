import { observable, computed, action, toJS } from 'mobx';
import { Fetch } from './../../fetch/request';

class Goods {
  constructor() {

  }
  @observable goodsData = {
    goodsInfo: {},
    goodsItem: { is_collection: 0 },
    onckeck: 0,
    goodsClassify: [],
    recommendGoods: [],
    goodsCondition: [],
    goodsSort: [{ sort: 'default', str: '默认排序' }, { sort: 'sale', str: '销量最高' }, { sort: 'min_price', str: '最低价格' }, { sort: 'max_price', str: '最高价格' }],
    cate: { id: '', product_category_name: '全部' },
    sort: { sort: 'default', str: '默认排序' },
    page: 1,
    goodslist: {
      data: [],
      current_page: 1,
      total: null
    },
    keyword: ''
  }

  @computed get goodsInfo() {
    return this.goodsData.goodsInfo
  }

  @computed get goodsItem() {
    return this.goodsData.goodsItem
  }
  @computed get onckeck() {
    return this.goodsData.onckeck
  }

  @computed get goodsClassify() {
    return this.goodsData.goodsClassify
  }

  @computed get recommendGoods() {
    return this.goodsData.recommendGoods
  }

  @computed get goodsCondition() {
    return this.goodsData.goodsCondition
  }

  @computed get goodsSort() {
    return this.goodsData.goodsSort
  }

  @computed get cate() {
    return this.goodsData.cate
  }

  @computed get sort() {
    return this.goodsData.sort
  }

  @computed get goodslist() {
    return this.goodsData.goodslist
  }

  @action async getGoodsInfo(id: string | number) {
    try {
      this.goodsData.goodsInfo = {}
      let response = await new Fetch('/product/detail', 'GET', { id }, {});
      let goodsInfo = response.data;
      if (goodsInfo.sku.length > 0) {
        goodsInfo.sku.map((val, i) => {
          if (val.image_url) val.image_url = 'http://' + val.image_url;
        })
        goodsInfo.sku[0].count = 1
        this.goodsData.goodsItem = goodsInfo.sku[0]
      }
      this.goodsData.goodsInfo = goodsInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectItem(item: object, i: number) {
    item.count = item.count == undefined ? 1 : item.count;
    this.goodsData.goodsItem = item;
    this.goodsData.onckeck = i;
  }

  @action async getGoodsClassify() {
    try {
      let response = await new Fetch('/product/cate_list', 'GET', {}, {});
      let goodsClassify = response.data;
      this.goodsData.goodsClassify = goodsClassify;
      this.goodsData.goodsCondition = goodsClassify;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getRecommendGoods() {
    try {
      let response = await new Fetch('/product/recommend_list', 'GET', { size: 9, page: 1 }, {});
      let recommendGoods = response.data.data;
      recommendGoods.map((val, i) => {
        if (val.image_url.length > 0) {
          val.image_url[0] = 'http://' + val.image_url[0];
        }
      })
      this.goodsData.recommendGoods = recommendGoods;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getGoodslist(reload: boolean) {
    try {
      let { goodslist, cate, sort, keyword } = this.goodsData
      let params = {
        cate_id: cate.id,
        sort: sort.sort,
        page: goodslist.current_page,
        search: keyword || ''
      }
      console.log(reload)
      if (reload) {
        //重置列表
        goodslist = {
          data: [],
          current_page: 1,
          total: null
        }
        this.goodsData.goodslist = goodslist
        params.page = 1;
      }
      let response = await new Fetch('/product/list', 'GET', { size: 10, ...params }, {});
      let gl = response.data
      if (goodslist.data.length >= gl.total && gl.total > 0) return response
      goodslist.data = goodslist.data.concat(gl.data)
      goodslist.current_page = gl.current_page
      goodslist.total = gl.total
      if (goodslist.data.length < gl.total && goodslist.current_page >= 1) {
        goodslist.current_page += 1;
      }
      this.goodsData.goodslist = goodslist
      return response
    } catch (error) {
      return null
    }
  }

  @action setKeyword(keyword: string) {
    this.goodsData.keyword = keyword
    this.getGoodslist(true)
  }

  @action async setCate(id: string, product_category_name: string) {
    this.goodsData.goodsCondition.map((val, i) => {
      val.checked = id == val.id ? true : false;
    })
    this.goodsData.cate = { id, product_category_name }
    return this.goodsData.cate
  }

  @action async selectGoodsCondition(index: number) {
    this.goodsData.goodsCondition.map((val, i) => {
      val.checked = index == i ? true : false;
    })
    this.goodsData.cate = this.goodsData.goodsCondition[index];
    this.getGoodslist(true);
  }
  @action async setSort(index:number) {
    this.goodsData.goodsSort.map((val, i) => {
      val.checked = index == i ? true : false;
    })
    this.goodsData.sort = this.goodsData.goodsSort[index];
    return this.goodsData.sort
  }
  @action async selectGoodsSort(index: number) {
    this.goodsData.goodsSort.map((val, i) => {
      val.checked = index == i ? true : false;
    })
    this.goodsData.sort = this.goodsData.goodsSort[index];
    this.getGoodslist(true);
  }

  @action changeCollect() {
    let { goodsInfo } = this.goodsData
    this.goodsData.goodsInfo.is_collection = goodsInfo.is_collection == 0 ? 1 : 0
  }


}

const goodsStore = new Goods()

export default goodsStore