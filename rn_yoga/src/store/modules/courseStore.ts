import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Course {
  constructor() {
    
  }
  @observable courseData = {
    classify:[],
    recommendCourse:[]
  }

  @computed get classify(){
    return this.courseData.classify
  }

  @computed get recommendCourse(){
    return this.courseData.recommendCourse
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
}

const courseStore = new Course()

export default courseStore