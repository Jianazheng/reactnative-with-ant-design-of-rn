import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Train {
  constructor() {
    
  }
  @observable trainData = {
    trainInfo:{},
    frontInfo:{detail:[]},
    trainSelectItem:[],
    promotionInfo:[],
    selectItem:{},
    classify:[]
  }

  @computed get trainInfo(){
    return this.trainData.trainInfo
  }

  @computed get promotionInfo(){
    return this.trainData.promotionInfo
  }

  @computed get frontInfo(){
    return this.trainData.frontInfo
  }

  @computed get trainSelectItem(){
    return this.trainData.trainSelectItem
  }

  @computed get classify(){
    return this.trainData.classify
  }

  @action async getClassify(){
    try {
      let response = await new Fetch('/train/list','GET',{},{});
      let classifys = response.data;
      if(classifys.length>0){
        classifys[0].checked = true;
      }
      this.trainData.classify = classifys;
      return response
    } catch (error) {
      return null
    }
  }

  @action classifySelect(index:number|string){
    let {classify} = this.trainData
    classify.map((val,i)=>{
      val.checked = i==index?true:false
    })
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

  @action async getFrontInfo(id:string|number){
    try {
      let response = await new Fetch('/train/front_train_info','GET',{id},{});
      let frontInfo = response.data;
      this.trainData.frontInfo = frontInfo;
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
    this.trainData.selectItem = item;
  }
}

const trainStore = new Train()

export default trainStore