import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Goods {
  constructor() {
    
  }
  @observable goodsData = {
    goodsInfo:[],
    goodsItem:{},
    goodsClassify:[],
    recommendGoods:[],
    goodsCondition:[],
    goodsSort:[{sort:'default',str:'默认排序'},{sort:'sale',str:'销量最高'},{sort:'min_price',str:'最低价格'},{sort:'max_price',str:'最高价格'}],
    cate:{id:'',product_category_name:'全部'},
    sort:{sort:'default',str:'默认排序'},
    goodslist:[]
  }

  @computed get goodsInfo(){
    return this.goodsData.goodsInfo
  }

  @computed get goodsItem(){
    return this.goodsData.goodsItem
  }

  @computed get goodsClassify(){
    return this.goodsData.goodsClassify
  }

  @computed get recommendGoods(){
    return this.goodsData.recommendGoods
  }

  @computed get goodsCondition(){
    return this.goodsData.goodsCondition
  }

  @computed get goodsSort(){
    return this.goodsData.goodsSort
  }

  @computed get cate(){
    return this.goodsData.cate
  }

  @computed get sort(){
    return this.goodsData.sort
  }

  @computed get goodslist(){
    return this.goodsData.goodslist
  }

  @action async getGoodsInfo(id:string|number){
    try {
      let response = await new Fetch('/product/detail','GET',{id},{});
      let goodsInfo = response.data;
      if(goodsInfo.sku.length>0){
        goodsInfo.sku.map((val,i)=>{
          if(val.image_url)val.image_url = 'http://'+val.image_url;
        })
        this.goodsData.goodsItem = goodsInfo.sku[0]
      }
      
      this.goodsData.goodsInfo = goodsInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectItem(item:object){
    this.goodsData.goodsItem = item;
  }

  @action async getGoodsClassify(){
    try {
      let response = await new Fetch('/product/cate_list','GET',{},{});
      let goodsClassify = response.data;
      this.goodsData.goodsClassify = goodsClassify;
      this.goodsData.goodsCondition = goodsClassify;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getRecommendGoods(){
    try {
      let response = await new Fetch('/product/recommend_list','GET',{size:9,page:1},{});
      let recommendGoods = response.data.data;
      recommendGoods.map((val,i)=>{
        if(val.image_url.length>0){
          val.image_url[0] = 'http://'+val.image_url[0];
        }
      })
      this.goodsData.recommendGoods = recommendGoods;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getGoodslist(){
    try {
      let params = {
        cate_id:this.cate.id,
        sort:this.sort.sort
      }
      let response = await new Fetch('/product/list','GET',{size:10,...params},{});
      let goodslist = response.data.data;
      this.goodsData.goodslist = goodslist;
      return response
    } catch (error) {
      return null
    }
  }

  @action async selectGoodsCondition(index:number){
    this.goodsData.goodsCondition.map((val,i)=>{
      val.checked = index==i?true:false;
    })
    this.goodsData.cate = this.goodsData.goodsCondition[index];
    this.getGoodslist();
  }

  @action async selectGoodsSort(index:number){
    this.goodsData.goodsSort.map((val,i)=>{
      val.checked = index==i?true:false;
    })
    this.goodsData.sort = this.goodsData.goodsSort[index];
    this.getGoodslist();
  }


}

const goodsStore = new Goods()

export default goodsStore