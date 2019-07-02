import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { OP } from '../../fetch/option';

class Home {
  constructor() {
    
  }
  @observable homeData = {
    banner:[],
    announcement:[],
    trainCate:[],
    trainCateShow:[],
    trainItem:[],
    newItem:{},
    recommendTrain:[],
    recommendGoods:[]
  }

  @computed get banner(){
    return this.homeData.banner
  }

  @computed get announcement(){
    return this.homeData.announcement
  }

  @computed get trainCate(){
    return this.homeData.trainCate
  }

  @computed get trainCateShow(){
    return this.homeData.trainCateShow
  }

  @computed get trainItem(){
    return this.homeData.trainItem
  }

  @computed get newItem(){
    return this.homeData.newItem
  }

  @computed get recommendTrain(){
    return this.homeData.recommendTrain
  }

  @computed get recommendGoods(){
    return this.homeData.recommendGoods
  }

  @action async getBanner(){
    try {
      let response = await new Fetch('/banner/list','GET',{type:2},{});
      let banner = response.data;
      this.homeData.banner = banner;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getAnnouncement(){
    try {
      let response = await new Fetch('/announcement/list','GET',{type:1},{});
      let announcement = response.data;
      this.homeData.announcement = announcement;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainCate(){
    try {
      let response = await new Fetch('/train/train_cate_list','GET',{type:1},{});
      this.homeData.trainCateShow = response.data;
      let trainCate = response.data;
      trainCate.map((val,i)=>{
        val.title = val.category_name
      })
      trainCate.unshift({title:'推荐'});
      this.homeData.trainCate = trainCate;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainItem(id:number){
    try {
      let response = await new Fetch('/train/train_index_list','GET',{id},{});
      let trainItem = response.data.train;
      this.homeData.trainItem = trainItem;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getNewTrain(){
    try {
      let response = await new Fetch('/train/new_info','GET',{},{});
      let newItem = response.data;
      this.homeData.newItem = newItem;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getRecommendGoods(){
    try {
      let response = await new Fetch('/product/recommend_list','GET',{size:9,page:1},{});
      let recommendGoods = response.data.data;
      this.homeData.recommendGoods = recommendGoods;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getRecommendTrain(){
    try {
      let response = await new Fetch('/online/newcourse/list','GET',{size:8,page:1},{});
      let recommendTrain = response.data;
      this.homeData.recommendTrain = recommendTrain;
      return response
    } catch (error) {
      return null
    }
  }


}

const homeStore = new Home()

export default homeStore