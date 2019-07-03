import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';
import { Toast } from '@ant-design/react-native';

class Train {
  constructor() {
    
  }
  @observable trainData = {
    trainInfo:{},
    frontInfo:{detail:[]},
    trainSelectItem:[],
    promotionInfo:[],
    selectItem:{},
    classify:[],
    trainCourse:{//培训列表
      data:[],
      total:null,
      page:0
    },
    trainCourseInfo:{
      teacher:[],
      servers:''
    },
    trainService:{
      server:[]
    },
    serviceIdArr:[]
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

  @computed get trainCourse(){
    return this.trainData.trainCourse
  }

  @computed get trainCourseInfo(){
    return this.trainData.trainCourseInfo
  }

  @computed get trainService(){
    return this.trainData.trainService
  }

  @computed get serviceIdArr(){
    return this.trainData.serviceIdArr
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

  @action async getTrainCourse(){
    try {
      let {trainCourse} = this.trainData
      let params = {page:this.trainCourse.page}
      let response = await new Fetch('/train/mycourse/list','GET',{size:10,...params},{})
      let resd = response.data
      if(trainCourse.data.length>=resd.total)return response
      let newdata = trainCourse.data.concat(resd.data)
      trainCourse.data = newdata
      trainCourse.total = resd.total
      if(trainCourse.data.length<resd.total){
        trainCourse.page+=1
      }
      this.trainData.trainCourse = trainCourse
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainCourseInfo(id:string|number){
    try {
      let response = await new Fetch('/train/mycourse/detail','GET',{id},{});
      let trainCourseInfo = response.data;
      this.trainData.trainCourseInfo = trainCourseInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getTrainService(id:string|number){
    try {
      let response = await new Fetch('/train/server/info','GET',{id},{});
      let trainService = response.data;
      this.trainData.trainService = trainService;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectService(index:number|string){
    let {trainService} = this.trainData
    trainService.server[index].checked = trainService.server[index].checked?false:true
  }

  @action async serviceEnsure(){
    try {
      let {trainService} = this.trainData
      let newarr = []
      for(let i in trainService.server){
        if(trainService.server[i].checked){
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

  @action async toEnsureService(){
    try {
      let {trainService,serviceIdArr} = this.trainData
      let params = {
        id:trainService.id,
        server_id:serviceIdArr
      }
      let response = await new Fetch('/train/server/sure','POST',params,{});
      Toast.info('预约成功',1.4,undefined,false)
      return response
    } catch (error) {
      return null
    }
  }

}

const trainStore = new Train()

export default trainStore