import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Course {
  constructor() {
    
  }
  @observable courseData = {
    classify:[],
    recommendCourse:[],
    courseInfo:{},
    goodsItem:{}
  }

  @computed get classify(){
    return this.courseData.classify
  }

  @computed get recommendCourse(){
    return this.courseData.recommendCourse
  }

  @computed get courseInfo(){
    return this.courseData.courseInfo
  }

  @action async getClassify(){
    try {
      let response = await new Fetch('/train/list','GET',{},{});
      let classifys = response.data;
      if(classifys.length>0){
        classifys[0].checked = true;
      }
      this.courseData.classify = classifys;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getRecommendCourse(){
    try {
      let response = await new Fetch('/online/course/recomment_list','GET',{},{});
      let recommendCourse = response.data.data;
      this.courseData.recommendCourse = recommendCourse;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getCourseInfo(id:string|number){
    try {
      let response = await new Fetch('/online/course/detail','GET',{id},{});
      let courseInfo = response.data;
      // if(goodsInfo.sku.length>0){
      //   goodsInfo.sku.map((val,i)=>{
      //     if(val.image_url)val.image_url = 'http://'+val.image_url;
      //   })
      //   this.goodsData.goodsItem = goodsInfo.sku[0]
      // }
      
      this.courseData.courseInfo = courseInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectItem(item:object){
    this.courseData.goodsItem = item;
  }
}

const courseStore = new Course()

export default courseStore