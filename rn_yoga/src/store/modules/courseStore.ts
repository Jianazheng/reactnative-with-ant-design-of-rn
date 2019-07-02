import { observable, computed, action } from 'mobx';
import { Fetch } from './../../fetch/request';

class Course {
  constructor() {
    
  }
  @observable courseData = {
    recommendCourse:[],
    classify:[],
    classifySelect:{categroy_name:'全部',id:''},
    courseInfo:{},
    goodsItem:{},
    onlineCourse:{
      data:[],
      total:null,
      page:0
    },
    onlineCourseInfo:{
      chapter:[],
      teach_level:[]
    },
    onlineCourseStudy:{
      url:'',
      chapter:[]
    },
    keyword:'',
    category_id:'',
    orderby:{str:'默认排序',info:''},
    orderbyArr:[{str:'默认排序',info:''},{str:'人气排序',info:'popul'},{str:'价格最低',info:'pricemin'},{str:'价格最高',info:'pricemax'}],
    courseList:{
      data:[],
      current_page:1,
      total:null
    }
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

  @computed get onlineCourseInfo(){
    return this.courseData.onlineCourseInfo
  }

  @computed get onlineCourseStudy(){
    return this.courseData.onlineCourseStudy
  }

  @computed get classify(){
    return this.courseData.classify
  }

  @computed get classifySelect(){
    return this.courseData.classifySelect
  }

  @computed get courseList(){
    return this.courseData.courseList
  }

  @computed get orderbyArr(){
    return this.courseData.orderbyArr
  }

  @computed get orderby(){
    return this.courseData.orderby
  }

  @action setCondition(categroy_name:string,id:string){
    this.courseData.classifySelect = {categroy_name,id}
    this.courseData.category_id = id
  }

  //选择类型
  @action async selectGoodsCondition(index:number){
    let {classify} = this.courseData
    this.setCondition(classify[index].categroy_name,classify[index].id)
    for(let i in classify){
      classify[i].checked = i==index?true:false
    }
    this.getCourseList(true)
  }

  //选择排序
  @action async selectGoodsSort(index:number){
    let {orderbyArr} = this.courseData
    this.courseData.orderby = orderbyArr[index]
    for(let i in orderbyArr){
      orderbyArr[i].checked = i==index?true:false
    }
    this.getCourseList(true)
  }

  @action async getClassify(){
    try {
      let response = await new Fetch('/online/course/cate_list','GET',{},{});
      let classifys = response.data;
      classifys.data.unshift({categroy_name:'全部',id:''});
      this.courseData.classify = classifys.data;
      return response
    } catch (error) {
      return null
    }
  }

  @action async getCourseList(reload:boolean|undefined){
    try {
      
      let {keyword,category_id,orderby,courseList} = this.courseData
      let params = {
        category_id:category_id,
        keyword:keyword,
        orderby:orderby.info,
        page:courseList.current_page
      }
      if(reload){
        //重置列表
        courseList = {
          data:[],
          current_page:1,
          total:null
        }
      }
      let response = await new Fetch('/online/course/list','GET',{size:10,...params},{});
      let cl = response.data.data
      if(courseList.data.length>=cl.total&&cl.total>0)return response;
      let newdata = courseList.data.concat(cl.data);
      courseList.data = newdata;
      courseList.total = cl.total;
      courseList.current_page = cl.current_page;
      if(courseList.data.length<cl.total&&courseList.current_page>1){
        courseList.current_page+=1;
      }
      this.courseData.courseList = courseList
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

  @action async getOnlineCourseInfo(id:string|number){
    try {
      let response = await new Fetch('/online/mycourse/detail','GET',{id},{})
      let onlineCourseInfo = response.data
      this.courseData.onlineCourseInfo = onlineCourseInfo
      return response
    } catch (error) {
      return null
    }
  }

  @action async getOnlineCourseStudy(id:string|number,course_id:string|number,summary_id:string|number){
    try {
      let response = await new Fetch('/online/mycourse/enter_study','GET',{id,course_id,summary_id},{})
      let onlineCourseStudy = response.data
      this.courseData.onlineCourseStudy = onlineCourseStudy
      return response
    } catch (error) {
      return null
    }
  }
}

const courseStore = new Course()

export default courseStore