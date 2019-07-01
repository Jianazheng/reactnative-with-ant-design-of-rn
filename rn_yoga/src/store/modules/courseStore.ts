import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Course {
  constructor() {
    
  }
  @observable courseData = {
    classify:[],
    recommendCourse:[],
    courseInfo:{},
    goodsItem:{},
    onlineCourse:{
      data:[],
      total:0,
      page:0
    },
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

  @computed get onlineCourse(){
    return this.courseData.onlineCourse
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
      this.courseData.courseInfo = courseInfo;
      return response
    } catch (error) {
      return null
    }
  }

  @action selectItem(item:object){
    this.courseData.goodsItem = item;
  }

  @action async getOnlineCourse(){
    try {
      let {onlineCourse} = this.courseData
      let params = {page:this.onlineCourse.page}
      let response = await new Fetch('/online/mycourse/list','GET',{size:10,...params},{})
      let resd = response.data
      if(onlineCourse.data.length>=resd.total)return response
      let newdata = onlineCourse.data.concat(resd.data)
      onlineCourse.data = newdata
      onlineCourse.total = resd.total
      if(onlineCourse.data.length<resd.total){
        onlineCourse.page+=1
      }
      this.courseData.onlineCourse = onlineCourse
      return response
    } catch (error) {
      return null
    }
  }
}

const courseStore = new Course()

export default courseStore