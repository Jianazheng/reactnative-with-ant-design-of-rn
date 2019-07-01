import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Train {
  constructor() {
    
  }
  @observable trainData = {
    trainInfo:{},
    goodsItem:{},
    promotionInfo:{},
    selectItem:[]
  }

  @computed get trainInfo(){
    return this.trainData.trainInfo
  }

  @computed get promotionInfo(){
    return this.trainData.promotionInfo
  }

  @computed get trainSelectItem(){
    return this.trainData.trainSelectItem
  }

  @action async getTrainInfo(id:string|number){
    try {
      let response = await new Fetch('/train/base_info','GET',{id},{});
      let trainInfo = response.data;
      this.trainData.trainInfo = trainInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainPromotion(id:string|number){
    try {
      let response = await new Fetch('/train/promotion_info','GET',{id},{});
      let promotionInfo = response.data;
      this.trainData.promotionInfo = promotionInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainSelectItem(id:string|number){
    try {
      let response = await new Fetch('/train/sku_info','GET',{id},{});
      let trainSelectItem = response.data;
      this.trainData.trainSelectItem = trainSelectItem;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectItem(item:object){
    this.trainData.goodsItem = item;
  }
}

const trainStore = new Train()

export default trainStore